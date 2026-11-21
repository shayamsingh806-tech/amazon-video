"""Text-to-speech through OpenRouter's /api/v1/audio/speech endpoint.

usage: python3 or_tts.py <model> <voice> <out.wav> <text> [--instructions TEXT] [--rate 24000]
Reads OPENROUTER_API_KEY from the environment, else from .env at the repo root (git-ignored). Never prints the key.
Saves mp3 when the model gives it, else raw 16-bit PCM wrapped into a WAV via ffmpeg.
"""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request

ENV = Path(__file__).resolve().parents[2] / ".env"  # tools -> doorbell-reel -> repo root


def key():
    if os.environ.get("OPENROUTER_API_KEY"):
        return os.environ["OPENROUTER_API_KEY"]
    for line in open(ENV, encoding="utf-8"):
        if line.startswith("OPENROUTER_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("no key in .env")


def call(body):
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/audio/speech",
        data=json.dumps(body).encode("utf-8"),
        headers={"Authorization": "Bearer " + key(), "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            return r.read(), r.headers.get("Content-Type", ""), r.headers.get("X-Generation-Id", "")
    except urllib.error.HTTPError as e:
        return None, e.read().decode("utf-8", "replace")[:500], e.code


def main():
    a = sys.argv[1:]
    model, voice, out, text = a[0], a[1], a[2], a[3]
    instructions = None
    rate = "24000"
    if "--instructions" in a:
        instructions = a[a.index("--instructions") + 1]
    if "--rate" in a:
        rate = a[a.index("--rate") + 1]
    body = {"model": model, "input": text, "voice": voice, "response_format": "pcm"}
    if instructions:
        body["instructions"] = instructions
    data, ctype, gen = call(body)
    if data is None:
        sys.exit(f"error {gen}: {ctype}")
    with tempfile.NamedTemporaryFile(suffix=".raw", delete=False) as f:
        f.write(data)
        raw = f.name
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", rate, "-ac", "1", "-i", raw, out],
        check=True,
    )
    print(f"ok {out} bytes={len(data)} type={ctype} gen={gen}")


main()

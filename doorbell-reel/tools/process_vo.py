"""Trim, tighten and loudness-match the generated voice lines into the reel's assets/voice/.

usage: python3 -I process_vo.py <raw_dir> <out_dir>
Each line: keep the speech (cut points from silencedetect at -40 dB), 10 ms fade in, 60 ms fade out,
then static gain to TARGET LUFS. Prints final length, LUFS and peak.
"""
import json
import re
import subprocess
import sys

TARGET = -16.0
# out name: (raw file, [segments to keep in seconds], tempo)
PLAN = {
    "vo01": ("vo01", [(0.16, 3.30)], 1.0),
    "vo02": ("vo02", [(0.29, 2.05)], 1.0),
    "vo03": ("vo03", [(0.19, 2.05)], 1.0),
    "vo04": ("vo04", [(0.13, 2.14)], 1.0),
    "vo05": ("vo05", [(0.16, 1.79)], 1.0),
    "vo06": ("vo06", [(0.14, 1.81)], 1.0),
    "vo07": ("vo07", [(0.00, 1.78)], 1.0),
    "vo08": ("vo08", [(0.00, 1.52)], 1.0),
    "vo09": ("vo09", [(0.30, 1.15)], 1.0),
    "vo10": ("vo10", [(0.18, 2.70)], 1.0),
    "vo11": ("vo11", [(0.21, 1.94)], 1.0),
    "vo12": ("vo12", [(0.10, 2.45)], 1.06),
    "vo13a": ("vo15", [(0.20, 0.85), (1.09, 2.37)], 1.0),  # pause after "पर हाँ," cut from 0.39 to 0.15 s
    "vo13b": ("vo16", [(0.00, 1.41)], 1.0),
    "vo14": ("vo14", [(0.16, 2.62)], 1.0),
}


def ff(args):
    return subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-y", *args], capture_output=True, text=True)


def build_filter(segs, tempo, gain_db):
    parts = []
    for i, (a, b) in enumerate(segs):
        parts.append(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS[s{i}]")
    if len(segs) > 1:
        parts.append("".join(f"[s{i}]" for i in range(len(segs))) + f"concat=n={len(segs)}:v=0:a=1[c]")
    else:
        parts.append("[s0]anull[c]")
    chain = []
    if tempo != 1.0:
        chain.append(f"atempo={tempo}")
    total = sum(b - a for a, b in segs) / tempo
    chain += ["afade=t=in:d=0.01", f"afade=t=out:st={total - 0.06:.3f}:d=0.06", f"volume={gain_db:.2f}dB"]
    parts.append("[c]" + ",".join(chain) + "[o]")
    return ";".join(parts)


def measure(path):
    r = ff(["-i", path, "-af", "ebur128=peak=true", "-f", "null", "-"])
    tail = r.stderr[r.stderr.rfind("Summary:"):]
    lufs = float(re.search(r"I:\s+(-?[\d.]+) LUFS", tail).group(1))
    peak = float(re.search(r"Peak:\s+(-?[\d.]+|-inf) dBFS", tail).group(1))
    return lufs, peak


def main():
    raw, out = sys.argv[1], sys.argv[2]
    report = {}
    for name, (src, segs, tempo) in PLAN.items():
        dst = f"{out}/{name}.wav"
        ff(["-i", f"{raw}/{src}.wav", "-filter_complex", build_filter(segs, tempo, 0), "-map", "[o]", "-ar", "48000", dst])
        lufs, _ = measure(dst)
        gain = TARGET - lufs
        ff(["-i", f"{raw}/{src}.wav", "-filter_complex", build_filter(segs, tempo, gain), "-map", "[o]", "-ar", "48000", dst])
        lufs2, peak2 = measure(dst)
        dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", dst],
                                   capture_output=True, text=True).stdout)
        report[name] = {"dur": round(dur, 3), "lufs": lufs2, "true_peak": peak2, "gain": round(gain, 2)}
        print(f"{name}: {dur:.3f}s  {lufs2} LUFS  peak {peak2} dBTP  (gain {gain:+.1f} dB)")
    with open(f"{out}/levels.json", "w") as f:
        json.dump(report, f, indent=1)


main()

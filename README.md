# amazon-video

Instagram Reels / YouTube Shorts for Amazon affiliate products, made with [HyperFrames](https://hyperframes.heygen.com) (HTML + GSAP rendered to MP4). One folder per video.

## Videos

| Folder | Product | Final video | Length |
|---|---|---|---|
| [doorbell-reel](doorbell-reel/) | COSTAR Pebble T301 wireless doorbell | [renders/doorbell-reel-voice.mp4](doorbell-reel/renders/doorbell-reel-voice.mp4) | 39.5 s, 1080×1920, Hindi voiceover |

## Inside a video folder

| Path | What it is |
|---|---|
| `index.html`, `compositions/` | the video itself (root timeline + one file per scene) |
| `assets/sfx/` | sound effects (CC0, sources in `CREDITS.md`) |
| `assets/voice/` | Hindi voiceover clips (Gemini TTS via OpenRouter, voice Sulafat) |
| `FACTS.md` | every claim, from the Amazon listing and reviews |
| `STORYLINES.md`, `SPEC.md` | the story options and the frame-by-frame plan |
| `VOICEOVER.md`, `REVIEW.md` | voice script with timings; what was checked and measured |
| `renders/*.mp4` | finished videos |
| `renders/*.youtube.md` | YouTube Shorts title, description, tags and pinned comment |
| `tools/` | scene generator (`gen.mjs`) and voice scripts |

## Render

```bash
cd doorbell-reel
npm run check
npx --yes hyperframes@0.8.192 render --quality delivery --output renders/doorbell-reel-voice.mp4
```

Scenes are generated: edit `tools/gen.mjs`, then `node tools/gen.mjs .` rewrites `compositions/`.

## Voiceover

The voice scripts need an OpenRouter key in `.env` at the repo root:

```
OPENROUTER_API_KEY=...
```

`.env` is git-ignored. Never commit it.

```bash
cd doorbell-reel
python3 -I tools/gen_vo.py <raw_dir> [line numbers]        # text -> speech, one wav per line
python3 -I tools/process_vo.py <raw_dir> assets/voice      # trim, tighten, level to -16 LUFS
```

## Rules for every video

- No price on screen, no Amazon logo or photos (products are drawn).
- Disclose in every post: `#ad` and "As an Amazon Associate I earn from qualifying purchases."
- YouTube Shorts: description links are not clickable, so the link goes in the channel profile.

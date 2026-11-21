# REVIEW — Doorbell reel (Storyline A), 39.5 s with Hindi voiceover, 1080×1920

## Creative calls
- Look: "sticker book" — flat stickers with ink outline, white die-cut border, hard offset shadow; one accent (hot pink #FF2E88) only on the new doorbell's signal, one word per title, the end card.
- One world for the story: a vertical cutaway of a 2-storey house (door → room → terrace), so the camera can travel up with the sound. Fits 9:16.
- Transitions with a cause: notification grows into the next scene (colour flood) → zoom through the button into the house → zoom into the receiver into the honest scene → pink colour flood into the end card.
- Honest beat: "कुछ tunes धीमी हैं" with a quiet ding, then "तेज़ वाली चुनें" with a loud ding (from the reviews in FACTS.md). With the voiceover each ding plays in the gap after the line it illustrates.
- No music (the person can add trending audio in Instagram, kept low under the voice); recorded CC0 sound effects + Hindi voiceover.
- Voiceover: Gemini 3.8 Flash TTS via OpenRouter, voice Sulafat (picked by the person over Kokoro and MAI Kavya/Priya). 15 clips, first-person woman's voice; text and timings in VOICEOVER.md.
- To fit the voice: honest scene 5.4 → 7.1 s, end card 4.0 → 3.6 s, reel 38.2 → 39.5 s (inside the 30–40 s brief). Line 13 split into 13a/13b so the dings don't sit on speech. Effects that land under speech (notification, rewind, stick, pan, plug, pops, press) lowered ~25%; old-bell buzz shortened so it ends before line 2.
- Not built: Storyline B "दीवार मत तोड़ो" (split screen, wiring vs wireless) and C "आवाज़ की यात्रा" (one continuous take following the signal).

## Measured vs looked at
- `check`: ok, 0 errors. Layout/overlap infos only at single samples during transitions.
- Looked at: snapshot contact sheets for every beat, every seam (−0.2…+0.2 s) and the phone-width sheet (360 px). All titles readable at phone width.
- Sound: placed from measured onsets/peaks (`hyperframes audio`) so each hit lands about one frame after its picture. Not heard by anyone yet — check it in the preview.

## Render (renders/doorbell-reel.mp4)
- 1080×1920, 30 fps, H.264 + AAC, 38.2 s, 8.0 MB — matches the root duration.
- Audio measured on the file: −20.3 LUFS integrated, true peak −1.8 dBTP, no clipping. Hits land on the picture (old bell 3.63 s, stick 12.58 s, plug 15.58 s, press 20.73 s, doorbell 22.46–22.63 s, soft/loud ding 31.06 / 33.01 s).
- Quieter than the −16…−14 LUFS social target on purpose: it is sound effects only, and trending music gets added in Instagram on top.
- Decoded frames at 0.1, 22.8 and 36.5 s checked by eye.

## Render with voice (renders/doorbell-reel-voice.mp4)
- 1080×1920, 30 fps, H.264 + AAC 48 kHz stereo, 39.5 s (1185 frames), 8.5 MB — matches the root duration.
- −15.1 LUFS integrated, LRA 2.6 LU, true peak −1.2 dBTP, no clipping. Every voice line sits ≥3 dB above any effect under it (`hyperframes audio`).
- Silences in the final mix line up with the plan: voice ends 3.20 / 5.86 / 7.92 / 11.77 / 13.74 / 16.42 / 19.03 / 21.37 s, doorbell 22.46 s, "आई!" 23.36 s, line 13a 31.30 s, last word 38.62 s.
- `check`: ok, 0 errors; only the kept `line_unread` warning. Snapshots of the re-timed honest scene and end card, and decoded frames at 0.5 / 23.6 / 33.5 / 35.4 / 38.9 s, checked by eye.
- Not verified: nobody (including Claude) has listened to the voice. Pronunciation and tone of each Hindi line need a listen; any line can be regenerated alone.
- The earlier silent version stays at renders/doorbell-reel.mp4 (38.2 s, −20.3 LUFS).

## Weakest shot
- 9.6 s seam (miss → fix): about 0.15 s of plain mustard before the solution title slaps in. With more time: land the product stickers on the flood frame itself.
- The woman's acting is simple (a squash, a turn, a bubble); a richer rig would sell the "आई!" moment more.

## Warnings kept on purpose
- `line_unread` on the second "Delivery attempted" notification (9.0 s): it repeats the hook's notification the viewer already read at 0 s; it is a callback that becomes the transition, not new text.

## Facts
Every claim is in FACTS.md (Amazon listing + reviews, read 20 Nov 2026). Price is never shown. Product drawn as an illustration, tagged "चित्र सांकेतिक".

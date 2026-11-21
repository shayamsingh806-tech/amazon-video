"""Generate the reel's 14 voiceover lines through OpenRouter (Gemini TTS, voice Sulafat).

usage: python3 -I gen_vo.py <out_dir> [line numbers...]
Raw files land as vo01..vo16.wav; vo13 is the old long line (unused), vo15/vo16 become vo13a/vo13b in process_vo.py.
New OpenRouter accounts are rate-limited: run one line at a time if requests fail.
Only the script text and style instructions are sent. The key is read by or_tts.py from .env.
"""
import subprocess
from pathlib import Path
import sys
from concurrent.futures import ThreadPoolExecutor

OR = str(Path(__file__).with_name("or_tts.py"))
MODEL = "google/gemini-3.8-flash-tts"
VOICE = "Sulafat"
BASE = (
    "Natural conversational Hindi from India. A warm young Indian woman telling a friend a quick story "
    "in an Instagram reel. Brisk, natural pace with no long pauses, not robotic, not a newsreader."
)
LINES = [
    (1, "डिलीवरी वाला आया और चला गया… पर मैं तो घर पर ही थी!", "Exasperated on the first half, playful disbelief on the second."),
    (2, "पुरानी बेल की आवाज़ नीचे ही रह गई।", "Slightly annoyed, explaining what went wrong."),
    (3, "मैं छत पर थी, कुछ सुनाई ही नहीं दिया।", "Remembering it, a little frustrated."),
    (4, "इसलिए मैंने लगाई ये वायरलेस डोरबेल।", "Upbeat and pleased with herself, like revealing the fix."),
    (5, "बटन बाहर दरवाज़े पर…", "Casual, showing something, the sentence continues after."),
    (6, "और रिसीवर घर के अंदर प्लग करो।", "Casual, finishing the previous thought, easy and simple."),
    (7, "दोनों पहले से जुड़े आते हैं।", "Light and reassuring, no fuss."),
    (8, "अब कोई भी बटन दबाए…", "Building a little suspense, about to show the result."),
    (9, "आई!", "Calling out happily and loudly from upstairs, as if answering the doorbell. One quick word."),
    (10, "आवाज़ दीवारों के पार, छत तक पहुँची।", "Delighted and a bit amazed."),
    (11, "खुली जगह में रेंज तीन सौ मीटर तक।", "Confident and informative, quick."),
    (12, "बत्तीस रिंगटोन्स, पाँच वॉल्यूम लेवल।", "Quick, listing features."),
    (13, "पर सच कहूँ, कुछ ट्यून्स धीमी हैं — तो तेज़ वाली चुनना।", "Honest and confiding on the first half, then friendly advice. Quick."),
    (14, "लिंक चाहिए? कमेंट में लिंक लिखो, मैं डीएम कर दूँगी।", "Friendly, energetic call to action."),
    # line 13 split in two so the soft and loud dings can play between them
    (15, "पर हाँ, कुछ ट्यून्स धीमी हैं…", "Honest and confiding, a small caveat, slightly lower. Quick, no long pause."),
    (16, "तो तेज़ वाली चुनना!", "Friendly advice, bright, a little emphasis on तेज़. Quick."),
]


def run(item, out_dir):
    n, text, mood = item
    out = f"{out_dir}/vo{n:02d}.wav"
    r = subprocess.run(
        ["python3", "-I", OR, MODEL, VOICE, out, text, "--instructions", BASE + " " + mood],
        capture_output=True,
        text=True,
    )
    return n, (r.stdout.strip() or r.stderr.strip())[:300]


def main():
    out_dir = sys.argv[1]
    only = set(sys.argv[2:])
    items = [l for l in LINES if not only or str(l[0]) in only]
    with ThreadPoolExecutor(max_workers=4) as ex:
        for n, msg in ex.map(lambda i: run(i, out_dir), items):
            print(f"{n:02d} {msg}")


main()

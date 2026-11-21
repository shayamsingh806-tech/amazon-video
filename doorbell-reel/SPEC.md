# SPEC — "Delivery वापस चली गई" (Storyline A)

GOAL:    दर्शक सोचे "ये तो मेरे घर में भी होता है" → reel save करे और "LINK" comment करे।
OUTPUT:  HyperFrames, 1080 x 1920, 30 fps, Instagram Reel
TIME:    39.5 s x 30 = 1185 frames (voiceover के लिए honest scene 1.7 s लंबा किया, end card 0.4 s छोटा)। कोई music नहीं; recorded sound effects + Hindi voiceover (VOICEOVER.md)।

SAFE:    ऊपर 0–168 px खाली; हर शब्द और प्रोडक्ट 168–1330 px के band में; 1330 से नीचे सिर्फ़ सजावट; दाईं ओर x > 950 पर कोई text नहीं।
         Title zone: y 200–440. Stage: y 440–1330.

LOOK:    Medium = "sticker book": हर चीज़ एक die-cut sticker है।
         - sticker: solid flat fill, 6 px ink outline #1D1B1A, white die-cut border 10 px #FFFDF7 सिर्फ़ text stickers पर,
           hard offset shadow 8 px / 8 px, blur 0, ink at 22% opacity. कोई gradient नहीं, कोई glow नहीं।
         - ink #1D1B1A — हर पढ़ा जाने वाला शब्द और हर outline
         - accent hot pink #FF2E88 — सिर्फ़ नई doorbell का signal, उसकी LED burst, हर title में एक शब्द, end card
         - old bell की आवाज़: dashed grey arcs #6E6A66, 5 px
         - worlds: sky #9ED8F0; बाहर की दीवार #F2A65A; नीचे का कमरा #F7D79B; ऊपर का कमरा #F5C6A5;
           छत का फ़र्श #D9A273; दरवाज़ा #8B4A2B; reveal/proof ground mustard #F4B942; honest ground sky #9ED8F0; end ground pink #FF2E88
         - type: Poppins 800 (Devanagari), titles 76 px, line-height 1.25, tracking 0; hero sound-word 132 px;
           small tags 30 px Poppins 600. कोई पढ़ा जाने वाला शब्द 30 px से छोटा नहीं।
         - text stickers 2° तक टेढ़े (-2° / +1.5°), कभी सीधे centred card नहीं।

OBJECTS: - घर का cutaway (नीचे से ऊपर): गली + बरामदा (बाएँ, बाहर) → ground floor कमरा जिसमें पुरानी bell का गोल gong
           और दीवार पर तार → पहली मंज़िल का कमरा, सीढ़ी, socket → छत, parapet, कपड़े सुखाने की रस्सी, नीले आसमान में।
         - delivery वाला: लाल cap, नीली shirt, हाथ में भूरा parcel box (tape की पट्टी)।
         - घर वाली महिला: जूड़ा, हरी kurta, छत पर रस्सी पर कपड़ा टाँगती।
         - पुराना switch: सफ़ेद चौकोर plate, बीच में छोटा बटन, ऊपर से तार।
         - नई doorbell (illustration, "चित्र सांकेतिक"): काला pebble बटन (गोल किनारे, बीच में गोल बटन) और
           काला pebble receiver (speaker के छेद, LED का गोला, पीछे plug)।
         - phone notification sticker: सफ़ेद, box का icon, "Delivery attempted", "कोई घर पर नहीं था · अभी"।

MOTION:  - sticker आना = slap: scale 1.18→1, rotate ±6°→final, 0.32 s, back.out(1.6); shadow 0→8 px साथ में।
         - sticker जाना = peel: rotate +8°, y -40, opacity →0, 0.18 s, power3.in।
         - camera (world wrapper): power2.inOut, 0.9–1.6 s; zoom through = power3.in 0.45 s।
         - चलना: शरीर का bob 10 px हर 0.25 s (sine.inOut), पैर ±18° घूमें; हाथ alag offset से।
         - old arcs: 0.7 s में फैलें (expo.out), छत से टकराकर टूटें (dash opacity →0 0.25 s)।
         - pink arcs: हर 0.18 s एक नई arc, 1.2 s में 600 px फैले, छत की लकीरें पार करें।
         - title land होने के बाद बिल्कुल स्थिर।

SHOTS (कुल 39.5 s — बनाने के बाद का असली timing):
  miss 0.0–9.6
   0.0–2.5  HOOK: दरवाज़े पर camera (2.0x)। frame 0 पर notification + "घर पर थे, फिर भी parcel लौट गया?"; delivery वाला box लेकर बाएँ जा रहा।
   2.5–3.3  "10 मिनट पहले" stamp; delivery वाला उल्टा चलकर दरवाज़े पर (rewind)।
   3.3–6.0  पुराना switch (3.6) → gong से grey arcs, ground floor की छत पर कटते; camera पूरा घर (3.7–4.9)। title 4.0–6.0।
   5.4–7.7  छत (1.8x): महिला कपड़े टाँग रही। title "छत तक पहुँची ही नहीं" 6.1–7.7।
   7.6–9.6  दरवाज़ा; दोबारा press (8.5), कंधे उचकाए, चल दिया; notification (9.0) बड़ा होकर mustard flood।
  fix 9.6–19.8
   0.0–2.4  "इसका हल: Wireless doorbell" + बटन/receiver stickers + "चित्र सांकेतिक"।
   2.4–5.0  "बटन दरवाज़े के बाहर": दरवाज़े वाली दीवार, बटन चिपकता (2.95)।
   5.0–7.6  "Receiver अंदर plug करो": pan, receiver socket में (5.95)।
   7.6–10.2 "पहले से जुड़े आते हैं": pink dashed लकीर; 9.7–10.2 बटन में zoom through।
  ring 19.8–28.8
   0.0–0.55 बटन से zoom out → दरवाज़ा; delivery वाला आकर दबाता (0.85)।
   0.95–2.8 pink arcs ऊपर, camera साथ (1.2–2.8)।
   2.8      PAYOFF: LED burst + "डिंग-डॉन्ग!" + असली doorbell sound।
   3.2–4.5  महिला चौंकती, मुड़ती, "आई!"।
   4.6–8.45 पूरा घर; "दीवारों के पार भी पहुँची" (4.7–6.4); "300 मीटर तक range (खुली जगह में)" (6.5–8.45)।
   8.5–9.0  receiver में zoom (carry into next scene)।
  honest 28.8–35.9 (7.1 s): "32 ringtones, 5 volume level" (bars 5) → 2.4 "सच्ची बात: पर कुछ tunes धीमी हैं" → 4.35 धीमी ding, 4.53 bars 2 →
            4.9 "तेज़ वाली चुनें" → 6.3 तेज़ ding, 6.48 bars 5, 6.5 shake। 6.8–7.1 pink flood। हर ding आवाज़ की दो lines के बीच के खाली हिस्से में।
  end 35.9–39.5 (3.6 s): "कमेंट में लिखो" / "LINK" / "DM में link भेजेंगे" / "4.2★ · 1,925 ratings" / "आज का दाम link में · affiliate link"।

BANNED:  dark void; glow/bloom/particles; gradients; cream paper + serif; सब कुछ fade+slide-up; "01/02" numbering;
         three cards in a row; docked logo; emoji; Amazon logo या Amazon की photos; price; synthesized dings।
         हर claim FACTS.md से।

QA:      0.0 (thumbnail), 4.7 (arcs कटते), 6.8 (छत), 10.6 (प्रोडक्ट + "चित्र सांकेतिक"), 13.0, 15.6, 18.4 (pair लकीर),
         19.75–20.3 (zoom continuity), 22.7 (payoff), 24.0 ("आई!"), 26.8 (fact), 29.9–35.75 (honest), 38.9 (end card)। Phone width 360 पर हर title पढ़ने लायक।

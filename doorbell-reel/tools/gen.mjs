// Scene generator for doorbell-reel: writes compositions/{miss,fix,ring,honest,end}.html.
// usage (from doorbell-reel/):  node tools/gen.mjs .
// Regenerating drops the data-hf-id attributes the HyperFrames editor adds; they are re-added on open.
// Generates the scene files for the doorbell reel. Run: node gen.mjs <projectDir>
import fs from "fs";
import path from "path";

const OUT = process.argv[2];
const INK = "#1D1B1A";
const PK = "#FF2E88";
const SW = 5;
const SKIN_M = "#C68642";
const SKIN_W = "#B5753C";

const st = (fill, w = SW) => `fill="${fill}" stroke="${INK}" stroke-width="${w}" stroke-linejoin="round"`;

// ---------- drawings (world units) ----------
function stairs(x0, yBottom, yTop, n = 6, w = 40) {
  const h = (yBottom - yTop) / n;
  let pts = [`${x0},${yBottom}`];
  for (let i = 0; i < n; i++) {
    pts.push(`${x0 + w * i},${yBottom - h * (i + 1)}`);
    pts.push(`${x0 + w * (i + 1)},${yBottom - h * (i + 1)}`);
  }
  pts.push(`${x0 + w * n},${yBottom}`);
  return `<polygon points="${pts.join(" ")}" ${st("#D9A273")}/>`;
}

function cloud(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,40 Q0,10 30,12 Q40,-12 70,0 Q100,-8 110,20 Q140,22 136,46 Q134,62 110,62 L18,62 Q0,62 0,40 Z" ${st("#FFFDF7", 4)}/></g>`;
}

function house(p, { oldSwitch = true } = {}) {
  return `
  <rect x="-1600" y="-1600" width="4280" height="3100" fill="#9ED8F0"/>
  <circle cx="985" cy="150" r="64" ${st("#FFD166")}/>
  ${cloud(70, 170, 1.1)}${cloud(560, 60, 0.9)}${cloud(-420, 420, 1.2)}${cloud(1180, 380, 1)}
  <!-- ground -->
  <rect x="-1600" y="1500" width="4280" height="1600" fill="#8D8A85"/>
  <rect x="-1600" y="1500" width="4280" height="70" ${st("#D8D2C4")}/>
  <line x1="-1600" y1="1730" x2="2680" y2="1730" stroke="#FFFDF7" stroke-width="10" stroke-dasharray="70 50"/>
  <g transform="translate(560,1650)">
    <circle cx="-90" cy="40" r="38" ${st("#2B2D42",6)}/><circle cx="-90" cy="40" r="14" fill="#8D8A85"/>
    <circle cx="110" cy="40" r="38" ${st("#2B2D42",6)}/><circle cx="110" cy="40" r="14" fill="#8D8A85"/>
    <path d="M-150,10 Q-150,-40 -90,-40 L20,-40 L40,0 L150,0 Q160,30 140,30 L-150,30 Z" ${st("#E63946",6)}/>
    <rect x="-170" y="-120" width="110" height="80" rx="8" ${st("#C68B59",6)}/>
    <path d="M60,0 L110,-110" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
    <rect x="86" y="-128" width="60" height="16" rx="8" fill="${INK}"/>
  </g>
  <g transform="translate(-60,1500)"><rect x="-26" y="-60" width="52" height="60" rx="8" ${st("#E76F51")}/><path d="M0,-60 Q-40,-120 -10,-150 Q0,-110 0,-60 Q10,-130 40,-140 Q30,-100 0,-60" ${st("#2A9D8F", 4)}/></g>
  <!-- terrace -->
  <rect x="300" y="470" width="40" height="92" ${st("#F2A65A")}/>
  <rect x="1000" y="470" width="40" height="92" ${st("#F2A65A")}/>
  <rect x="372" y="330" width="12" height="232" ${st("#8B4A2B", 4)}/>
  <rect x="968" y="330" width="12" height="232" ${st("#8B4A2B", 4)}/>
  <path d="M378,360 Q676,480 974,360" fill="none" stroke="${INK}" stroke-width="4"/>
  <rect x="420" y="372" width="80" height="96" rx="4" ${st("#E76F51", 4)}/>
  <path d="M542,384 L620,390 L628,412 L612,416 L610,470 L554,466 L556,410 L540,408 Z" ${st("#F4F1DE", 4)}/>
  <rect x="868" y="372" width="76" height="90" rx="4" ${st("#3D5A80", 4)}/>
  <rect x="300" y="560" width="740" height="34" ${st("#D9A273")}/>
  <!-- first floor -->
  <rect x="340" y="594" width="660" height="436" fill="#F5C6A5"/>
  <rect x="400" y="680" width="150" height="170" ${st("#9ED8F0")}/>
  <line x1="475" y1="680" x2="475" y2="850" stroke="${INK}" stroke-width="4"/>
  <line x1="400" y1="765" x2="550" y2="765" stroke="${INK}" stroke-width="4"/>
  <rect x="388" y="850" width="174" height="16" ${st("#F2A65A", 4)}/>
  <circle cx="660" cy="700" r="38" ${st("#FFFDF7", 4)}/>
  <line x1="660" y1="700" x2="660" y2="676" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  <line x1="660" y1="700" x2="678" y2="708" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  <rect x="560" y="860" width="80" height="92" rx="10" ${st("#FFFDF7")}/>
  <circle cx="586" cy="894" r="7" fill="${INK}"/><circle cx="614" cy="894" r="7" fill="${INK}"/><circle cx="600" cy="926" r="8" fill="${INK}"/>
  ${stairs(760, 1030, 594)}
  <rect x="300" y="594" width="40" height="436" ${st("#F2A65A")}/>
  <rect x="1000" y="594" width="40" height="436" ${st("#F2A65A")}/>
  <rect x="300" y="1030" width="740" height="34" ${st("#C98B5E")}/>
  <!-- ground floor -->
  <rect x="340" y="1064" width="660" height="436" fill="#F7D79B"/>
  ${stairs(760, 1500, 1064)}
  <rect x="540" y="1420" width="170" height="80" rx="12" ${st("#E76F51")}/>
  <rect x="540" y="1370" width="40" height="80" rx="12" ${st("#E76F51")}/>
  <rect x="580" y="1380" width="130" height="50" rx="12" ${st("#F4A261")}/>
  <rect x="300" y="1064" width="40" height="436" ${st("#F2A65A")}/>
  <rect x="1000" y="1064" width="40" height="436" ${st("#F2A65A")}/>
  <!-- porch + facade -->
  <rect x="150" y="1226" width="190" height="274" ${st("#F2A65A")}/>
  <rect x="110" y="1200" width="240" height="28" ${st("#C98B5E")}/>
  <rect x="210" y="1262" width="104" height="238" ${st("#8B4A2B")}/>
  <rect x="226" y="1282" width="72" height="88" rx="4" fill="none" stroke="${INK}" stroke-width="4"/>
  <rect x="226" y="1390" width="72" height="92" rx="4" fill="none" stroke="${INK}" stroke-width="4"/>
  <circle cx="300" cy="1385" r="7" ${st("#FFD166", 3)}/>
  ${
    oldSwitch
      ? `${`  <g id="${p}-gong">
    <rect x="420" y="1094" width="20" height="18" ${st("#8D8A85", 4)}/>
    <circle cx="430" cy="1140" r="32" ${st("#C9C9C9")}/>
    <circle cx="430" cy="1140" r="11" ${st("#9C9C9C", 4)}/>
  </g>
  <path d="M340,1214 H400 V1172" fill="none" stroke="${INK}" stroke-width="4"/>
`}<g id="${p}-switch"><path d="M177,1290 V1214 H300" fill="none" stroke="${INK}" stroke-width="4"/>
  <rect x="158" y="1290" width="38" height="50" rx="6" ${st("#FFFDF7", 4)}/>
  <rect id="${p}-swbtn" x="170" y="1304" width="14" height="20" rx="3" ${st("#E5E5E5", 3)}/></g>`
      : ""
  }`;
}

function man(p, x) {
  return `
  <g id="${p}-man" transform="translate(${x},1500)"><g id="${p}-manflip"><g id="${p}-manbody">
    <g id="${p}-legb"><rect x="-22" y="-98" width="20" height="92" rx="9" ${st("#2B2D42")}/><rect x="-26" y="-16" width="32" height="16" rx="8" fill="${INK}"/></g>
    <g id="${p}-legf"><rect x="2" y="-98" width="20" height="92" rx="9" ${st("#2B2D42")}/><rect x="0" y="-16" width="32" height="16" rx="8" fill="${INK}"/></g>
    <g><rect x="-98" y="-156" width="78" height="62" rx="6" fill="#C68B59"/><rect x="-98" y="-131" width="78" height="12" fill="#E9D8A6"/><rect x="-98" y="-156" width="78" height="62" rx="6" fill="none" stroke="${INK}" stroke-width="${SW}"/></g>
    <rect x="-36" y="-198" width="72" height="112" rx="24" ${st("#3D5A80")}/>
    <rect x="-30" y="-186" width="20" height="70" rx="10" ${st("#3D5A80")}/>
    <rect x="-60" y="-128" width="46" height="20" rx="10" ${st("#3D5A80")}/>
    <circle cx="-60" cy="-118" r="11" ${st(SKIN_M, 4)}/>
    <rect x="-6" y="-214" width="16" height="20" ${st(SKIN_M, 4)}/>
    <circle cx="2" cy="-240" r="32" ${st(SKIN_M)}/>
    <path d="M-30,-246 A32,32 0 0 1 34,-248 L64,-246 Q68,-236 36,-236 L-30,-236 Z" ${st("#E63946")}/>
    <circle cx="20" cy="-228" r="4" fill="${INK}"/>
    <path d="M14,-214 Q22,-210 28,-216" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <g id="${p}-arm"><rect x="-4" y="-186" width="20" height="86" rx="10" ${st("#3D5A80")}/><circle cx="6" cy="-100" r="11" ${st(SKIN_M, 4)}/></g>
  </g></g></g>`;
}

function woman(p) {
  return `
  <g id="${p}-wom" transform="translate(700,560)"><g id="${p}-womflip"><g id="${p}-wombody">
    <g id="${p}-warm2"><rect x="-30" y="-176" width="18" height="80" rx="9" ${st("#2A9D8F")}/><circle cx="-21" cy="-96" r="10" ${st(SKIN_W, 4)}/></g>
    <ellipse cx="-10" cy="-4" rx="16" ry="7" fill="${INK}"/><ellipse cx="14" cy="-4" rx="16" ry="7" fill="${INK}"/>
    <rect x="-22" y="-64" width="44" height="60" rx="10" ${st("#F4F1DE")}/>
    <path d="M-30,-178 Q0,-188 30,-178 L46,-56 Q0,-48 -46,-56 Z" ${st("#2A9D8F")}/>
    <path d="M-28,-176 L34,-150 L42,-118 L-30,-150 Z" ${st("#F4A261", 4)}/>
    <rect x="-6" y="-194" width="14" height="18" ${st(SKIN_W, 4)}/>
    <circle cx="6" cy="-216" r="30" ${st(SKIN_W)}/>
    <path d="M-24,-206 C-30,-242 20,-260 36,-226 C22,-236 0,-236 -6,-222 C-10,-214 -16,-208 -24,-206 Z" fill="${INK}"/>
    <circle cx="-28" cy="-222" r="14" fill="${INK}"/>
    <circle cx="24" cy="-214" r="3.5" fill="${INK}"/>
    <path d="M18,-200 Q26,-194 32,-202" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <g id="${p}-warm"><rect x="12" y="-176" width="18" height="80" rx="9" ${st("#2A9D8F")}/><circle cx="21" cy="-96" r="10" ${st(SKIN_W, 4)}/></g>
  </g></g></g>`;
}

// product illustrations, local origin at centre
function btnShape(id, x, y, s, extra = "") {
  return `<g id="${id}" transform="translate(${x},${y})" ${extra}><g transform="scale(${s})">
    <rect x="-30" y="-42" width="60" height="84" rx="28" fill="none" stroke="#FFFDF7" stroke-width="14"/>
    <rect x="-30" y="-42" width="60" height="84" rx="28" ${st("#262626", 4)}/>
    <circle cx="0" cy="6" r="17" fill="#3A3A3A" stroke="#7A7A7A" stroke-width="3"/>
    <circle cx="0" cy="-26" r="3" fill="#7A7A7A"/>
  </g></g>`;
}
function rcvShape(id, x, y, s, ledId, extra = "") {
  let holes = "";
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) holes += `<circle cx="${-16 + c * 16}" cy="${2 + r * 15}" r="4" fill="#4A4A4A"/>`;
  return `<g id="${id}" transform="translate(${x},${y})" ${extra}><g transform="scale(${s})">
    <rect x="-45" y="-55" width="90" height="110" rx="38" fill="none" stroke="#FFFDF7" stroke-width="14"/>
    <rect x="-45" y="-55" width="90" height="110" rx="38" ${st("#262626", 4)}/>
    ${holes}
    <circle id="${ledId}" cx="0" cy="-30" r="9" fill="#3A3A3A" stroke="#7A7A7A" stroke-width="3"/>
  </g></g>`;
}
function burst(id, x, y, r0 = 40, r1 = 90, s = 1) {
  let rays = "";
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    rays += `<line x1="${(Math.cos(a) * r0).toFixed(1)}" y1="${(Math.sin(a) * r0).toFixed(1)}" x2="${(Math.cos(a) * r1).toFixed(1)}" y2="${(Math.sin(a) * r1).toFixed(1)}" stroke="${PK}" stroke-width="9" stroke-linecap="round"/>`;
  }
  return `<g transform="translate(${x},${y}) scale(${s})"><g id="${id}" opacity="0">${rays}</g></g>`;
}
function parcelIcon(size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 80 80"><rect x="8" y="18" width="64" height="52" rx="6" fill="#C68B59" stroke="${INK}" stroke-width="5"/><rect x="8" y="36" width="64" height="10" fill="#E9D8A6"/><rect x="8" y="18" width="64" height="52" rx="6" fill="none" stroke="${INK}" stroke-width="5"/><path d="M8,18 L20,6 L60,6 L72,18" fill="#D9A273" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></svg>`;
}

// ---------- shared css / helpers ----------
const CSS = (p) => `
  #root { position:absolute; inset:0; overflow:hidden; font-family:"Poppins", sans-serif; }
  .${p}-stk { position:absolute; left:70px; top:220px; max-width:860px; padding:12px 30px 16px; background:#FFFDF7; color:${INK};
    border:6px solid ${INK}; border-radius:26px; font-weight:800; font-size:76px; line-height:1.25;
    box-shadow:0 0 0 10px #FFFDF7, 10px 12px 0 10px rgba(29,27,26,0.25); opacity:0; }
  .${p}-tag { position:absolute; padding:6px 20px 8px; background:${INK}; color:#FFFDF7; border-radius:14px;
    font-weight:700; font-size:32px; line-height:1.3; box-shadow:0 0 0 7px #FFFDF7; opacity:0; }
  .${p}-pk { color:${PK}; }
`;
const HELPERS = `
  const slap=(tl,sel,t,rot)=>{rot=rot??-2;tl.fromTo(sel,{opacity:0,scale:1.18,rotation:rot-6},{opacity:1,scale:1,rotation:rot,duration:0.32,ease:"back.out(1.6)",immediateRender:false},t);};
  const peel=(tl,sel,t,rot)=>{rot=rot??-2;tl.fromTo(sel,{opacity:1,y:0,rotation:rot},{opacity:0,y:-40,rotation:rot+8,duration:0.18,ease:"power3.in",immediateRender:false},t);};
  const walk=(tl,p,t0,dur,step,dir)=>{step=step||0.25;dir=dir||1;const n=Math.max(1,Math.round(dur/step));
    tl.fromTo("#"+p+"-legf",{rotation:-18*dir},{rotation:18*dir,duration:step,ease:"sine.inOut",repeat:n-1,yoyo:true,transformOrigin:"50% 0%",immediateRender:false},t0);
    tl.fromTo("#"+p+"-legb",{rotation:18*dir},{rotation:-18*dir,duration:step,ease:"sine.inOut",repeat:n-1,yoyo:true,transformOrigin:"50% 0%",immediateRender:false},t0);
    tl.fromTo("#"+p+"-manbody",{y:0},{y:-8,duration:step/2,ease:"sine.inOut",repeat:2*n-1,yoyo:true,immediateRender:false},t0);
    tl.to(["#"+p+"-legf","#"+p+"-legb"],{rotation:0,duration:0.1,transformOrigin:"50% 0%"},t0+n*step);};
  const arc=(tl,sel,t,r0,r1,dur,o0)=>{tl.fromTo(sel,{attr:{r:r0},opacity:o0??1},{attr:{r:r1},opacity:0,duration:dur,ease:"power1.out",immediateRender:false},t);};
  const cam=(tl,sel,t,s,x,y,dur,ease)=>{tl.to(sel,{scale:s,x:x,y:y,duration:dur,ease:ease||"power2.inOut",transformOrigin:"0 0"},t);};
`;

function scene(id, dur, css, body, script) {
  return `<template>
  <style>${css}</style>
  <div id="root" data-composition-id="${id}" data-start="0" data-duration="${dur}" data-width="1080" data-height="1920">
${body}
  </div>
  <script>
  (function(){
  ${HELPERS}
  const tl = gsap.timeline({ paused: true });
${script}
  window.__timelines["${id}"] = tl;
  })();
  </script>
</template>
`;
}

// camera states for the house world
const CAM_DOOR = { s: 2.0, x: 140, y: -1800 };
const CAM_FULL = { s: 0.7, x: 130, y: 240 };
const CAM_TERRACE = { s: 1.8, x: -684, y: 50 };
const CAM_PAY = { s: 1.25, x: -272, y: -15 };
const camArgs = (c) => `${c.s},${c.x},${c.y}`;

// ================= MISS (0 – 9.6) =================
{
  const p = "m";
  const css =
    CSS(p) +
    `
  #${p}-sky { position:absolute; inset:0; background:#9ED8F0; }
  #${p}-cam { position:absolute; left:0; top:0; width:1080px; height:1900px; }
  #${p}-cam svg { position:absolute; left:0; top:0; overflow:visible; }
  .${p}-note { position:absolute; left:70px; top:196px; width:820px; display:flex; align-items:center; gap:22px; padding:16px 26px;
    background:#FFFDF7; border:6px solid ${INK}; border-radius:30px; color:${INK};
    box-shadow:0 0 0 10px #FFFDF7, 10px 12px 0 10px rgba(29,27,26,0.25); }
  .${p}-note b { display:block; font-size:40px; font-weight:800; line-height:1.2; }
  .${p}-note span { display:block; font-size:32px; font-weight:600; line-height:1.3; color:#4A4542; }
  #${p}-flood { position:absolute; inset:0; background:#F4B942; opacity:0; }
  #${p}-stamp { position:absolute; left:150px; top:250px; padding:8px 28px 12px; background:${INK}; color:#FFFDF7; border-radius:16px;
    font-weight:800; font-size:68px; line-height:1.25; box-shadow:0 0 0 9px #FFFDF7, 9px 11px 0 9px rgba(29,27,26,0.25); opacity:0; }
  `;
  const body = `
    <div id="${p}-sky"></div>
    <div id="${p}-cam">
      <svg width="1080" height="1900" viewBox="0 0 1080 1900">
        ${house(p)}
        <clipPath id="${p}-roomclip"><rect x="340" y="1064" width="660" height="436"/></clipPath>
        <g fill="none" stroke="#4A4542" stroke-width="9" stroke-dasharray="20 12" clip-path="url(#${p}-roomclip)">
          <circle id="${p}-oa1" cx="430" cy="1140" r="20" opacity="0"/>
          <circle id="${p}-oa2" cx="430" cy="1140" r="20" opacity="0"/>
          <circle id="${p}-oa3" cx="430" cy="1140" r="20" opacity="0"/>
          <circle id="${p}-oa4" cx="430" cy="1140" r="20" opacity="0"/>
        </g>
        ${woman(p)}
        ${man(p, 60)}
      </svg>
    </div>
    <div id="${p}-note1" class="${p}-note">${parcelIcon(84)}<div><b>Delivery attempted</b><span>कोई घर पर नहीं था · अभी</span></div></div>
    <div id="${p}-t1" class="${p}-stk" style="opacity:1; top:380px">घर पर थे, फिर भी<br/><span class="${p}-pk">parcel</span> लौट गया?</div>
    <div id="${p}-stamp">10 मिनट पहले</div>
    <div id="${p}-t2" class="${p}-stk">पुरानी bell की आवाज़<br/><span class="${p}-pk">नीचे ही</span> अटकी</div>
    <div id="${p}-t3" class="${p}-stk">छत तक <span class="${p}-pk">पहुँची</span> ही नहीं</div>
    <div id="${p}-note2" class="${p}-note" style="opacity:0">${parcelIcon(84)}<div><b>Delivery attempted</b><span>कोई घर पर नहीं था · अभी</span></div></div>
    <div id="${p}-flood"></div>`;
  const script = `
  const P="${p}";
  tl.set("#m-cam",{scale:${CAM_DOOR.s},x:${CAM_DOOR.x},y:${CAM_DOOR.y},transformOrigin:"0 0"},0);
  tl.set("#m-t1",{rotation:-2},0);
  tl.set("#m-note1",{rotation:1.5},0);
  tl.set("#m-manflip",{attr:{transform:"scale(-1 1)"}},0);
  tl.set("#m-warm",{rotation:-100,transformOrigin:"50% 0%"},0);
  tl.set("#m-warm2",{rotation:-112,transformOrigin:"50% 0%"},0);
  tl.set("#m-arm",{rotation:-20,transformOrigin:"50% 0%"},0);
  // HOOK: walking away
  tl.fromTo("#m-man",{x:60},{x:-160,duration:2.4,ease:"none",immediateRender:false},0);
  walk(tl,P,0,2.4,0.24);
  peel(tl,"#m-t1",2.35,-2); peel(tl,"#m-note1",2.4,1.5);
  // REWIND
  slap(tl,"#m-stamp",2.5,-6);
  tl.fromTo("#m-man",{x:-160},{x:85,duration:0.55,ease:"power2.inOut",immediateRender:false},2.6);
  walk(tl,P,2.6,0.55,0.11,-1);
  tl.set("#m-manflip",{attr:{transform:"scale(1 1)"}},3.25);
  // PRESS old switch
  tl.to("#m-arm",{rotation:-92,duration:0.16,ease:"power3.out",transformOrigin:"50% 0%"},3.45);
  tl.to("#m-swbtn",{x:2,duration:0.06},3.6);
  tl.to("#m-arm",{rotation:-20,duration:0.25,ease:"power2.inOut",transformOrigin:"50% 0%"},3.85);
  tl.to("#m-swbtn",{x:0,duration:0.06},3.85);
  peel(tl,"#m-stamp",3.9,-6);
  arc(tl,"#m-oa1",3.65,20,260,1.1); arc(tl,"#m-oa2",3.95,20,260,1.1); arc(tl,"#m-oa3",4.25,20,260,1.1);
  tl.fromTo("#m-gong",{rotation:-6},{rotation:6,duration:0.05,repeat:9,yoyo:true,transformOrigin:"50% 0%",immediateRender:false},3.62);
  cam(tl,"#m-cam",3.7,${camArgs(CAM_FULL)},1.2);
  slap(tl,"#m-t2",4.0,-2);
  // woman hanging clothes, unaware
  tl.fromTo("#m-warm",{rotation:-100},{rotation:-88,duration:0.4,ease:"sine.inOut",repeat:15,yoyo:true,transformOrigin:"50% 0%",immediateRender:false},0);
  peel(tl,"#m-t2",6.0,-2);
  cam(tl,"#m-cam",5.4,${camArgs(CAM_TERRACE)},1.0);
  slap(tl,"#m-t3",6.1,1.5);
  peel(tl,"#m-t3",7.7,1.5);
  cam(tl,"#m-cam",7.6,${camArgs(CAM_DOOR)},0.8);
  // second press
  tl.to("#m-arm",{rotation:-92,duration:0.16,ease:"power3.out",transformOrigin:"50% 0%"},8.42);
  tl.to("#m-arm",{rotation:-20,duration:0.2,ease:"power2.inOut",transformOrigin:"50% 0%"},8.7);
  arc(tl,"#m-oa4",8.55,20,200,0.8,0.8);
  // shrug and leave
  tl.fromTo("#m-manbody",{scaleY:1},{scaleY:0.93,duration:0.1,yoyo:true,repeat:1,transformOrigin:"50% 100%",immediateRender:false},8.75);
  tl.set("#m-manflip",{attr:{transform:"scale(-1 1)"}},8.95);
  tl.fromTo("#m-man",{x:85},{x:-40,duration:0.65,ease:"none",immediateRender:false},8.95);
  walk(tl,P,8.95,0.6,0.2);
  slap(tl,"#m-note2",9.0,1.5);
  tl.to("#m-note2",{scale:9,duration:0.4,ease:"power3.in",transformOrigin:"50% 50%"},9.2);
  tl.fromTo("#m-flood",{opacity:0},{opacity:1,duration:0.12,ease:"none",immediateRender:false},9.46);
  `;
  fs.writeFileSync(path.join(OUT, "compositions/miss.html"), scene("miss", 9.6, css, body, script));
}

// ================= FIX (9.6 – 19.8, 10.2 s) =================
{
  const p = "f";
  const css =
    CSS(p) +
    `
  #${p}-ground { position:absolute; inset:0; background:#F4B942; }
  #${p}-stage { position:absolute; left:0; top:0; width:2160px; height:1920px; }
  #${p}-stage svg { position:absolute; left:0; top:0; overflow:visible; }
  `;
  const body = `
    <div id="${p}-ground"></div>
    <div id="${p}-stage">
      <svg width="2160" height="1920" viewBox="0 0 2160 1920">
        <g id="${p}-facade" opacity="0">
          <rect x="60" y="520" width="960" height="900" ${st("#F2A65A", 7)}/>
          <rect x="540" y="650" width="300" height="770" ${st("#8B4A2B", 7)}/>
          <rect x="580" y="700" width="220" height="280" rx="8" fill="none" stroke="${INK}" stroke-width="6"/>
          <rect x="580" y="1030" width="220" height="330" rx="8" fill="none" stroke="${INK}" stroke-width="6"/>
          <circle cx="808" cy="1010" r="16" ${st("#FFD166", 5)}/>
          <rect x="20" y="480" width="1040" height="60" ${st("#C98B5E", 7)}/>
        </g>
        <g id="${p}-wall" opacity="0">
          <rect x="1140" y="520" width="960" height="900" ${st("#F5C6A5", 7)}/>
          <rect x="1140" y="1340" width="960" height="80" ${st("#C98B5E", 7)}/>
          <rect x="1535" y="860" width="170" height="200" rx="18" ${st("#FFFDF7", 7)}/>
          <circle cx="1592" cy="930" r="14" fill="${INK}"/><circle cx="1648" cy="930" r="14" fill="${INK}"/><circle cx="1620" cy="1000" r="16" fill="${INK}"/>
        </g>
        <path id="${p}-link" d="M300,930 Q960,420 1620,960" fill="none" stroke="${PK}" stroke-width="18" stroke-linecap="round" stroke-dasharray="40 34" mask="url(#${p}-mask)"/>
        <mask id="${p}-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="2160" height="1920">
          <path id="${p}-maskpath" d="M300,930 Q960,420 1620,960" fill="none" stroke="#fff" stroke-width="60" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>
        </mask>
        ${btnShape(`${p}-btn`, 330, 880, 2.6, 'style="opacity:0"')}
        ${rcvShape(`${p}-rcv`, 730, 870, 3.0, `${p}-led`, 'style="opacity:0"')}
      </svg>
    </div>
    <div id="${p}-t1" class="${p}-stk">इसका हल:<br/><span class="${p}-pk">Wireless</span> doorbell</div>
    <div id="${p}-tag" class="${p}-tag" style="left:120px; top:1200px">चित्र सांकेतिक</div>
    <div id="${p}-t2" class="${p}-stk">बटन दरवाज़े के <span class="${p}-pk">बाहर</span></div>
    <div id="${p}-t3" class="${p}-stk">Receiver अंदर<br/><span class="${p}-pk">plug</span> करो</div>
    <div id="${p}-t4" class="${p}-stk">पहले से <span class="${p}-pk">जुड़े</span> आते हैं</div>`;
  const script = `
  tl.set("#f-stage",{scale:1,x:0,y:0,transformOrigin:"0 0"},0);
  tl.set(["#f-btn","#f-rcv"],{transformOrigin:"50% 50%"},0);
  slap(tl,"#f-t1",0.15,-2);
  tl.fromTo("#f-btn",{scale:1.25,rotation:-12,opacity:0},{scale:1,rotation:-6,opacity:1,duration:0.36,ease:"back.out(1.7)",immediateRender:false},0.25);
  tl.fromTo("#f-rcv",{scale:1.25,rotation:10,opacity:0},{scale:1,rotation:4,opacity:1,duration:0.36,ease:"back.out(1.7)",immediateRender:false},0.4);
  slap(tl,"#f-tag",0.7,-3);
  peel(tl,"#f-t1",2.3,-2); peel(tl,"#f-tag",2.3,-3);
  // VERB 1: button on the door wall
  tl.to("#f-rcv",{x:1620,y:300,rotation:20,duration:0.4,ease:"power3.in"},2.35);
  tl.fromTo("#f-facade",{opacity:0,scale:1.06},{opacity:1,scale:1,duration:0.3,ease:"back.out(1.4)",transformOrigin:"50% 50%",immediateRender:false},2.45);
  tl.to("#f-btn",{x:300,y:930,rotation:0,duration:0.35,ease:"power3.out"},2.6);
  tl.fromTo("#f-btn",{scaleX:1,scaleY:1},{scaleX:1.08,scaleY:0.9,duration:0.08,yoyo:true,repeat:1,ease:"power2.out",immediateRender:false},2.95);
  slap(tl,"#f-t2",2.55,1.5);
  peel(tl,"#f-t2",4.9,1.5);
  // VERB 2: receiver into the socket
  tl.fromTo("#f-wall",{opacity:0},{opacity:1,duration:0.01,immediateRender:false},4.95);
  tl.to("#f-stage",{x:-1080,duration:0.55,ease:"power2.inOut"},5.0);
  slap(tl,"#f-t3",5.15,-2);
  tl.to("#f-rcv",{y:960,rotation:0,duration:0.35,ease:"power3.in"},5.6);
  tl.fromTo("#f-rcv",{scaleX:1,scaleY:1},{scaleX:1.07,scaleY:0.92,duration:0.08,yoyo:true,repeat:1,ease:"power2.out",immediateRender:false},5.95);
  peel(tl,"#f-t3",7.5,-2);
  // VERB 3: already paired
  tl.to("#f-stage",{scale:0.5,x:0,y:462,duration:0.7,ease:"power2.inOut"},7.6);
  slap(tl,"#f-t4",7.7,-2);
  tl.fromTo("#f-maskpath",{attr:{"stroke-dashoffset":1}},{attr:{"stroke-dashoffset":0},duration:0.7,ease:"power2.inOut",immediateRender:false},8.3);
  tl.fromTo("#f-led",{fill:"#3A3A3A"},{fill:"${PK}",duration:0.1,immediateRender:false},9.0);
  peel(tl,"#f-t4",9.6,-2);
  // zoom through the button
  tl.to("#f-stage",{scale:4,x:-660,y:-2860,duration:0.5,ease:"power3.in"},9.7);
  `;
  fs.writeFileSync(path.join(OUT, "compositions/fix.html"), scene("fix", 10.2, css, body, script));
}

// ================= RING (19.8 – 28.8, 9.0 s) =================
{
  const p = "r";
  const css =
    CSS(p) +
    `
  #${p}-sky { position:absolute; inset:0; background:#9ED8F0; }
  #${p}-cam { position:absolute; left:0; top:0; width:1080px; height:1900px; }
  #${p}-cam svg { position:absolute; left:0; top:0; overflow:visible; }
  #${p}-ding { position:absolute; left:190px; top:760px; padding:4px 30px 14px; background:#FFFDF7; color:${PK};
    border:7px solid ${INK}; border-radius:30px; font-weight:800; font-size:104px; line-height:1.2;
    box-shadow:0 0 0 11px #FFFDF7, 12px 14px 0 11px rgba(29,27,26,0.25); opacity:0; white-space:nowrap; }
  #${p}-bub { position:absolute; left:330px; top:300px; padding:6px 30px 12px; background:#FFFDF7; color:${INK};
    border:6px solid ${INK}; border-radius:40px; font-weight:800; font-size:72px; line-height:1.2; opacity:0; }
  #${p}-fact small { display:block; font-size:40px; font-weight:700; color:#4A4542; }
  `;
  let arcs = "";
  for (let i = 1; i <= 6; i++) arcs += `<circle id="${p}-pa${i}" cx="177" cy="1316" r="30" opacity="0"/>`;
  let rarcs = "";
  for (let i = 1; i <= 3; i++) rarcs += `<circle id="${p}-ra${i}" cx="600" cy="905" r="40" opacity="0"/>`;
  const body = `
    <div id="${p}-sky"></div>
    <div id="${p}-cam">
      <svg width="1080" height="1900" viewBox="0 0 1080 1900">
        ${house(p, { oldSwitch: false })}
        ${rcvShape(`${p}-rcv`, 600, 905, 1, `${p}-led`)}
        ${btnShape(`${p}-btn`, 177, 1316, 0.78)}
        <g fill="none" stroke="${PK}" stroke-width="10">${arcs}${rarcs}</g>
        ${burst(`${p}-burst`, 600, 905, 70, 125)}
        ${woman(p)}
        ${man(p, -160)}
      </svg>
    </div>
    <div id="${p}-ding">डिंग-डॉन्ग!</div>
    <div id="${p}-bub">आई!</div>
    <div id="${p}-t1" class="${p}-stk">दीवारों के <span class="${p}-pk">पार</span> भी पहुँची</div>
    <div id="${p}-fact" class="${p}-stk"><span class="${p}-pk">300 मीटर</span> तक range<small>(खुली जगह में)</small></div>`;
  const script = `
  const P="${p}";
  tl.set(["#r-rcv","#r-btn"],{transformOrigin:"50% 50%"},0);
  tl.set("#r-cam",{scale:13,x:${540 - 13 * 177},y:${860 - 13 * 1316},transformOrigin:"0 0"},0);
  cam(tl,"#r-cam",0,${camArgs(CAM_DOOR)},0.55,"power3.out");
  tl.set("#r-warm",{rotation:-100,transformOrigin:"50% 0%"},0);
  tl.set("#r-warm2",{rotation:-112,transformOrigin:"50% 0%"},0);
  tl.set("#r-arm",{rotation:-20,transformOrigin:"50% 0%"},0);
  tl.fromTo("#r-warm",{rotation:-100},{rotation:-88,duration:0.4,ease:"sine.inOut",repeat:7,yoyo:true,transformOrigin:"50% 0%",immediateRender:false},0);
  // arrives and presses the new button
  tl.fromTo("#r-man",{x:-160},{x:85,duration:0.7,ease:"power2.out",immediateRender:false},0);
  walk(tl,P,0,0.69,0.23);
  tl.to("#r-arm",{rotation:-92,duration:0.16,ease:"power3.out",transformOrigin:"50% 0%"},0.75);
  tl.to("#r-arm",{rotation:-20,duration:0.25,ease:"power2.inOut",transformOrigin:"50% 0%"},1.15);
  // signal climbs through the house
  for(let i=1;i<=6;i++){arc(tl,"#r-pa"+i,0.95+(i-1)*0.18,30,980,1.3);}
  cam(tl,"#r-cam",1.2,${camArgs(CAM_PAY)},1.6);
  // PAYOFF
  tl.fromTo("#r-led",{fill:"#3A3A3A"},{fill:"${PK}",duration:0.06,immediateRender:false},2.8);
  tl.fromTo("#r-burst",{opacity:0,scale:0.5},{opacity:1,scale:1,duration:0.2,ease:"expo.out",transformOrigin:"50% 50%",immediateRender:false},2.8);
  tl.to("#r-burst",{opacity:0,duration:0.3},3.9);
  for(let i=1;i<=3;i++){arc(tl,"#r-ra"+i,2.82+(i-1)*0.16,40,520,1.0);}
  tl.fromTo("#r-rcv",{x:600},{x:606,duration:0.04,repeat:11,yoyo:true,ease:"none",immediateRender:false},2.82);
  slap(tl,"#r-ding",2.85,-4);
  peel(tl,"#r-ding",4.3,-4);
  // she hears it
  tl.to("#r-warm",{rotation:-20,duration:0.25,ease:"power2.out",transformOrigin:"50% 0%"},3.25);
  tl.to("#r-warm2",{rotation:-20,duration:0.3,ease:"power2.out",transformOrigin:"50% 0%"},3.3);
  tl.fromTo("#r-wombody",{scaleX:1,scaleY:1},{scaleX:1.06,scaleY:0.9,duration:0.1,ease:"power2.out",transformOrigin:"50% 100%",immediateRender:false},3.2);
  tl.to("#r-wombody",{scaleX:0.97,scaleY:1.06,duration:0.12,ease:"power2.out",transformOrigin:"50% 100%"},3.3);
  tl.to("#r-wombody",{scaleX:1,scaleY:1,duration:0.2,ease:"power2.out",transformOrigin:"50% 100%"},3.42);
  tl.set("#r-womflip",{attr:{transform:"scale(-1 1)"}},3.4);
  slap(tl,"#r-bub",3.55,3);
  peel(tl,"#r-bub",4.45,3);
  // pull back + claims
  cam(tl,"#r-cam",4.6,${camArgs(CAM_FULL)},1.0);
  slap(tl,"#r-t1",4.7,-2);
  peel(tl,"#r-t1",6.4,-2);
  slap(tl,"#r-fact",6.5,1.5);
  peel(tl,"#r-fact",8.45,1.5);
  // carry into the receiver
  cam(tl,"#r-cam",8.5,3.5,${540 - 3.5 * 600},${860 - 3.5 * 905},0.5,"power3.in");
  `;
  fs.writeFileSync(path.join(OUT, "compositions/ring.html"), scene("ring", 9.0, css, body, script));
}

// ================= HONEST (28.8 – 35.9, 7.1 s; re-timed for the voiceover) =================
{
  const p = "h";
  const css =
    CSS(p) +
    `
  #${p}-ground { position:absolute; inset:0; background:#9ED8F0; }
  #${p}-flood { position:absolute; inset:0; background:${PK}; opacity:0; }
  #${p}-art { position:absolute; left:0; top:0; width:1080px; height:1920px; overflow:visible; }
  `;
  let bars = "";
  for (let i = 0; i < 5; i++) {
    const h = 70 + i * 46;
    bars += `<rect id="${p}-bar${i}" x="${650 + i * 56}" y="${1060 - h}" width="40" height="${h}" rx="8" ${st("#FFFDF7", 5)}/>`;
  }
  const body = `
    <div id="${p}-ground"></div>
    <svg id="${p}-art" width="1080" height="1920" viewBox="0 0 1080 1920">
      ${rcvShape(`${p}-rcv`, 540, 860, 3.5, `${p}-led`)}
      <g id="${p}-bars" opacity="0">${bars}</g>
    </svg>
    <div id="${p}-tag" class="${p}-tag" style="left:70px; top:206px">सच्ची बात</div>
    <div id="${p}-t1" class="${p}-stk" style="top:290px">32 ringtones,<br/><span class="${p}-pk">5 volume</span> level</div>
    <div id="${p}-t2" class="${p}-stk" style="top:290px">पर कुछ tunes<br/><span class="${p}-pk">धीमी</span> हैं</div>
    <div id="${p}-t3" class="${p}-stk" style="top:290px"><span class="${p}-pk">तेज़</span> वाली चुनें</div>
    <div id="${p}-tag2" class="${p}-tag" style="left:150px; top:1220px">चित्र सांकेतिक</div>
    <div id="${p}-flood"></div>`;
  const lit = (i, t, on) =>
    `tl.to("#h-bar${i}",{fill:"${on ? PK : "#FFFDF7"}",duration:0.08},${t});`;
  let script = `
  tl.set("#h-led",{fill:"${PK}"},0);
  tl.set("#h-rcv",{transformOrigin:"50% 50%"},0);
  tl.fromTo("#h-rcv",{x:540,y:860},{x:390,y:860,duration:0.45,ease:"power3.out",immediateRender:false},0.05);
  tl.fromTo("#h-bars",{opacity:0},{opacity:1,duration:0.2,immediateRender:false},0.3);
  slap(tl,"#h-t1",0.2,-2);
  slap(tl,"#h-tag2",0.5,-3);
  `;
  for (let i = 0; i < 5; i++) script += lit(i, 0.45 + i * 0.12, true);
  script += `
  peel(tl,"#h-t1",2.3,-2);
  slap(tl,"#h-tag",2.35,-4);
  slap(tl,"#h-t2",2.4,1.5);
  `;
  for (let i = 4; i >= 2; i--) script += lit(i, 4.53 + (4 - i) * 0.1, false);
  script += `
  peel(tl,"#h-t2",4.8,1.5);
  slap(tl,"#h-t3",4.9,-2);
  `;
  for (let i = 2; i < 5; i++) script += lit(i, 6.48 + (i - 2) * 0.12, true);
  script += `
  tl.fromTo("#h-rcv",{x:390},{x:396,duration:0.04,repeat:9,yoyo:true,ease:"none",immediateRender:false},6.5);
  peel(tl,"#h-tag",6.75,-4); peel(tl,"#h-tag2",6.75,-3);
  tl.fromTo("#h-flood",{opacity:0},{opacity:1,duration:0.3,ease:"power2.inOut",immediateRender:false},6.8);
  `;
  fs.writeFileSync(path.join(OUT, "compositions/honest.html"), scene("honest", 7.1, css, body, script));
}

// ================= END (35.9 – 39.5, 3.6 s) =================
{
  const p = "e";
  const css =
    CSS(p) +
    `
  #${p}-ground { position:absolute; inset:0; background:${PK}; }
  #${p}-link { position:absolute; left:150px; top:470px; padding:0 46px 22px; background:#FFFDF7; color:${INK};
    border:9px solid ${INK}; border-radius:44px; font-weight:800; font-size:230px; line-height:1.15; letter-spacing:4px;
    box-shadow:0 0 0 14px #FFFDF7, 16px 18px 0 14px rgba(29,27,26,0.3); opacity:0; }
  #${p}-art { position:absolute; left:0; top:0; width:1080px; height:1920px; overflow:visible; }
  `;
  const body = `
    <div id="${p}-ground"></div>
    <svg id="${p}-art" width="1080" height="1920" viewBox="0 0 1080 1920">
      <g id="${p}-parcel" opacity="0" transform="translate(300,1560)">
        <rect x="-150" y="-110" width="300" height="220" rx="16" fill="#C68B59" stroke="${INK}" stroke-width="9"/>
        <rect x="-150" y="-30" width="300" height="40" fill="#E9D8A6"/>
        <rect x="-150" y="-110" width="300" height="220" rx="16" fill="none" stroke="${INK}" stroke-width="9"/>
      </g>
      ${rcvShape(`${p}-rcv`, 760, 1560, 2.2, `${p}-led`, 'opacity="0"')}
    </svg>
    <div id="${p}-t0" class="${p}-stk" style="top:230px; font-size:64px">कमेंट में लिखो</div>
    <div id="${p}-link">LINK</div>
    <div id="${p}-t1" class="${p}-stk" style="top:860px; font-size:60px">DM में <span class="${p}-pk">link</span> भेजेंगे</div>
    <div id="${p}-tag1" class="${p}-tag" style="left:90px; top:1050px; font-size:36px">4.2★ · 1,925 ratings</div>
    <div id="${p}-tag2" class="${p}-tag" style="left:90px; top:1140px">आज का दाम link में · affiliate link</div>`;
  const script = `
  tl.set("#e-led",{fill:"${PK}"},0);
  tl.set(["#e-parcel","#e-rcv"],{transformOrigin:"50% 50%"},0);
  slap(tl,"#e-t0",0.05,-2);
  tl.fromTo("#e-link",{opacity:0,scale:1.35,rotation:-14},{opacity:1,scale:1,rotation:-4,duration:0.4,ease:"back.out(1.8)",immediateRender:false},0.2);
  tl.fromTo("#e-parcel",{opacity:0,y:1760,rotation:-20},{opacity:1,y:1560,rotation:-8,duration:0.45,ease:"back.out(1.5)",immediateRender:false},0.35);
  tl.fromTo("#e-rcv",{opacity:0,y:1760,rotation:20},{opacity:1,y:1560,rotation:8,duration:0.45,ease:"back.out(1.5)",immediateRender:false},0.45);
  slap(tl,"#e-t1",0.6,1.5);
  slap(tl,"#e-tag1",0.9,-2);
  slap(tl,"#e-tag2",1.1,1);
  `;
  fs.writeFileSync(path.join(OUT, "compositions/end.html"), scene("end", 3.6, css, body, script));
}
console.log("written");

import { stories } from './stories.mjs';

// An original illustrated broadsheet. No photographs or downloaded artwork.
export const leadId = 1;
export const cardIds = [3, 2, 6, 37, 31, 24, 21, 7, 17, 10, 35, 36];
export const briefIds = stories.map(s => s.id).filter(id => ![leadId, ...cardIds].includes(id));
const I = '#16363c', R = '#b63d2b', P = '#f4eddd', G = '#d9ac51', T = '#2e7570', B = '#335d88';
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const shape = (d, fill = I, stroke = 'none', width = 2) => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"/>`;
const box = (x, y, w, h, fill, stroke = 'none', sw = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const dot = (x, y, radius, fill, stroke = 'none', width = 1) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
const text = (x, y, content, size, fill = I, extra = '') => `<text x="${x}" y="${y}" font-family="Barlow" font-weight="700" font-size="${size}" fill="${fill}" ${extra}>${esc(content)}</text>`;
const hatch = (d, base = I) => shape(d, base) + shape(d, 'url(#woodhatch)');
const line = (d, color = I, width = 2) => shape(d, 'none', color, width);
const star = (cx, cy, radius, fill) => {
  const points = Array.from({ length: 10 }, (_, n) => {
    const angle = Math.PI * n / 5 - Math.PI / 2;
    const r = n % 2 ? radius * .43 : radius;
    return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
  }).join(' ');
  return `<polygon points="${points}" fill="${fill}"/>`;
};

function summitScene() {
  let skyline = '';
  [[4,83,23,50],[31,68,22,65],[58,91,20,42],[81,57,22,76],[110,88,23,45],[259,82,20,51],[285,63,17,70],[308,84,24,49],[339,53,26,80],[370,73,20,60]].forEach(([x,y,w,h]) => {
    skyline += box(x,y,w,h,'#a7b7aa') + box(x+4,y+7,3,h-13,'#d6d5b9');
  });
  const china = box(8, 9, 47, 30, R) + star(20, 20, 7, G) + [0,1,2,3].map((n) => star(31 + (n === 1 || n === 2 ? 4 : 0), 14 + n * 6, 2.3, G)).join('');
  const usa = box(340, 9, 48, 30, P) + Array.from({length: 7}, (_, n) => box(340,9+n*4.3,48,2.2,R)).join('') + box(340,9,21,17,B) + Array.from({length: 9},(_,n)=>dot(344+(n%3)*6,13+Math.floor(n/3)*5,1,P)).join('');
  return box(0,0,400,178,'#ded7b9') + dot(203,68,56,'#d6a24e') + skyline + china + usa
    + shape('M0 139L400 132V178H0Z','#b7baa3') + shape('M152 178l37-42h37l42 42Z',R)
    + hatch('M56 178l10-53 43-20h40l35 32 10 41Z',I)
    + shape('M110 108l12 45 17-45-14 11Z',P) + shape('M120 121l8-2 6 12-6 34-8-23Z',R)
    + shape('M103 48q-9 19 1 39l7 10v17l25 3 6-20 12-9 6-18-12-7-5-21Z','#d9b78f',I,1.7)
    + hatch('M98 53q-6-35 25-34 29 1 25 35l-9-7-26 2-8 12Z')
    + line('M133 64l7 1M131 83q7 5 14 0M146 66l7 12-9 2',I,1.8)
    + shape('M261 178l-18-45 26-24h46l30 22 16 47Z',B) + shape('M275 110l15 43 14-43-13 9Z',P)
    + shape('M285 121h10l8 27-10 25-10-29Z',R)
    + shape('M264 49q-8 15-3 24l-10 9 11 3 4 15 13 6v16l22-1 4-24 9-18-8-29Z','#d8ad84',I,1.7)
    + hatch('M258 57q-9-25 14-33 21-14 42 9l-5 26-14-8-18-7-16 10Z',G)
    + line('M271 67l-7 1M269 87q7 3 15-1M261 56l18-5',I,1.8)
    + hatch('M148 125l42 21 20-2 5 12-27 8-52-22Z',I)
    + hatch('M269 129l-43 14-20-2-11 12 12 10 27-4 47-14Z',B)
    + shape('M190 145l10-7 17 3 12 10-9 12-14-1-8-9-6 2-8-7Z','#d9b78f',I,1.5)
    + line('M203 144l14 11m-17-5 13 10m4-13 7 8',I,1)
    + text(73,168,'XI',18,P) + text(303,168,'TRUMP',18,P)
    + box(0,0,400,178,'url(#papergrain)');
}

const panelArt = {
  iran: () => box(0,0,90,109,'#e7b69b')
    + dot(28,34,25,'#ce7450') + line('M72 5Q44 13 48 44T22 90',R,2)
    + hatch('M11 24l31-3 10-13 4 12 22 6-1 6-23-1-12 17-4-17-27-2Z')
    + shape('M5 94l12-11 13 4 16-23 18 7 20-18v56H5Z','#c2b486')
    + dot(39,81,5,R,P,2) + dot(62,68,5,R,P,2)
    + line('M7 101h74M7 105h74',P,1),
  eu: () => box(0,0,90,109,'#cad7d8')
    + Array.from({length:12},(_,n)=>star(45+31*Math.cos(n*Math.PI/6),40+31*Math.sin(n*Math.PI/6),3.1,G)).join('')
    + hatch('M15 29l30-10 30 10v32q0 25-30 41Q15 86 15 61Z',B)
    + text(45,76,'€',55,P,'text-anchor="middle"')
    + shape('M14 99h62v5H14Z',G),
  gaza: () => box(0,0,90,109,'#cdd1b4') + dot(68,21,14,'#d8b66c')
    + hatch('M3 64V28h19v-9h18v45h7V38h25v26h15v35H3Z',T)
    + [10,27,54,66].map(x=>box(x,40,5,10,P)).join('')
    + box(15,76,60,20,I) + shape('M25 77l8-15h23l12 15Z',I)
    + box(46,57,35,5,I) + `<rect x="9" y="85" width="70" height="17" rx="8" fill="${I}"/>`
    + [21,35,49,63].map(x=>dot(x,93,4,P)).join('') + line('M2 106h86',R,2),
  voyager: () => box(0,0,90,109,'#123c55') + dot(2,105,30,T) + dot(3,105,22,B)
    + [ [12,13],[75,15],[57,48],[15,65],[78,83] ].map(([x,y])=>star(x,y,3,P)).join('')
    + line('M16 90L62 30',G,2) + line('M23 93L70 32',G,1)
    + `<g transform="rotate(-32 52 38)">${shape('M30 19q0 37 40 37Z',P)}${line('M32 20l39 37',I,3)}${line('M48 36V16M48 16l12-10M44 55l-4 17M59 55l13 11',P,3)}${box(65,49,18,14,G,I,1)}</g>`
    + text(80,103,'24h',17,G,'text-anchor="end"'),
  cop: () => box(0,0,90,109,'#155a56')
    + dot(45,47,33,'#d9b761',P,2)
    + line('M12 47h66M45 14q-33 32 0 66M45 14q33 32 0 66M17 29q28 18 56 0M17 65q28-18 56 0',T,2)
    + shape('M6 98l16-25 15 25Zm24 0 16-27 18 27Zm27 0 14-24 17 24Z',I)
    + line('M9 104h73',G,3),
  ipo: () => box(0,0,90,109,'#e0b697')
    + [13,28,43,58,73].map(x=>line(`M${x} 10V25M${x} 80v18`,I,3)).join('')
    + [33,49,65].map(y=>line(`M0 ${y}h13M73 ${y}h17`,I,3)).join('')
    + hatch('M14 23h60v59H14Z',R)
    + shape('M26 36h48l10 15-10 16H26Z',P,I,2)
    + dot(73,51,3,R) + text(49,58,'$83',25,I,'text-anchor="middle"')
    + line('M21 89h47',I,3),
  inflation: () => box(0,0,90,109,'#ecd9b0')
    + text(15,42,'£',42,R) + box(9,78,14,21,T) + box(33,60,14,39,T) + box(57,42,14,57,R)
    + shape('M23 60l45-44-12 1 1-7 29-1-1 28-7 1 1-13-49 43Z',R)
    + line('M4 104h80',I,3),
  border: () => box(0,0,90,109,'#d4c7a5')
    + shape('M0 6L42 0l-5 109H0Z','#b3ba99')
    + line('M44 3v15m0 6v15m0 6v15m0 6v15m0 6v18',R,3)
    + [15,31,61,77].map((x,n)=>dot(x,45+(n%2)*17,6,I)+hatch(`M${x-6} ${53+(n%2)*17}h12l4 28h-20Z`)+line(`M${x-3} ${80+(n%2)*17}v12m6-12v12`,I,3)).join('')
    + text(5,18,'ETH',12,I) + text(59,18,'ERI',12,I),
  fiji: () => box(0,0,90,109,'#e5c98e') + dot(62,27,22,R)
    + shape('M18 92q15-44 9-64l5-1q11 33-3 68Z',I)
    + shape('M29 29Q0 9 1 39l27-6Q8 43 4 60l28-25q9 21 24 16L36 29Q60 14 69 23 51 0 29 23 19-2 4 10Z',T)
    + shape('M0 94q37-12 90-3v18H0Z','#b99b60')
    + line('M3 103l25-3 8-6 10 15M36 100l27-4 9 13',I,2),
  venezuela: () => box(0,0,90,109,'#c6d3cb')
    + box(7,9,76,9,G) + box(7,18,76,9,B) + box(7,27,76,9,R)
    + [0,1,2,3,4].map(n=>star(30+n*7,22,2.3,P)).join('')
    + hatch('M0 55l17-10 25 21-17 30L0 84Z',B)
    + hatch('M90 55L73 45 48 66l17 30L90 84Z',R)
    + shape('M26 59l17-8 13 5 16 17-17 17-12-4-19-18Z',G,I,2)
    + line('M43 60l14 14m-19-8 14 14m-19-8 14 14',I,2),
  who: () => box(0,0,90,109,'#c3d5d0')
    + dot(37,42,25,T) + Array.from({length:8},(_,n)=>{
      const a=n*Math.PI/4;return line(`M${37+Math.cos(a)*22} ${42+Math.sin(a)*22}l${Math.cos(a)*12} ${Math.sin(a)*12}`,T,4);
    }).join('')
    + dot(29,34,4,P) + dot(45,46,5,P) + dot(31,51,3,P)
    + `<g transform="rotate(34 59 80)"><rect x="47" y="52" width="24" height="55" rx="12" fill="${P}" stroke="${I}" stroke-width="2"/>${shape('M47 78h24v17q0 12-12 12T47 95Z',R)}${line('M47 76l9 5 5-8 10 5',I,2)}</g>`,
  brain: () => box(0,0,90,109,'#d6c4b6')
    + shape('M45 19Q26 4 20 24 3 25 9 45-4 58 13 68q-1 19 23 15l9-10 10 10q20 6 24-14 17-9 6-24 6-21-10-23Q65 4 45 19Z',R,I,2)
    + line('M45 19v54M20 25q21-1 12 20M12 47q14-5 19 9M18 67q19-7 17 8M59 23q-9 12 2 21M67 40q14 0 15 13M60 58q13 1 14 13',P,2)
    + `<g transform="rotate(-30 53 91)"><rect x="26" y="81" width="54" height="19" rx="9" fill="${P}" stroke="${I}" stroke-width="2"/>${line('M53 82v17',I,2)}</g>`,
};

const cards = [
  {id:3, art:'iran', lines:['IRAN ATTACKS','KUWAIT &','BAHRAIN'], fill:'#f0d5c2'},
  {id:2, art:'eu', lines:['EU PROPOSES','€45bn FOR','UKRAINE'], fill:'#e2e9e3'},
  {id:6, art:'gaza', lines:['ISRAELI TANKS','RAID CENTRAL','GAZA'], fill:'#e5e4ce'},
  {id:37, art:'voyager', lines:['VOYAGER 1','ONE LIGHT-DAY','FROM EARTH'], fill:'#173d52', color:P},
  {id:31, art:'cop', lines:['COP31 STARTS','NEW CLIMATE','STOCKTAKE'], fill:'#21635e', color:P},
  {id:24, art:'ipo', lines:['ANTHROPIC','PRICES IPO','AT $83'], fill:'#efd4b9'},
  {id:21, art:'inflation', lines:['UK INFLATION','RISES TO','3.6%'], fill:'#f1e2bc'},
  {id:7, art:'border', lines:['ETHIOPIA–','ERITREA TROOPS','MASS AT BORDER'], fill:'#e0d9bb'},
  {id:17, art:'fiji', lines:['FIJI DECLARES','DROUGHT','DISASTER'], fill:'#ead7ae'},
  {id:10, art:'venezuela', lines:['US–VENEZUELA','MILITARY PACT'], fill:'#dbe3d7'},
  {id:35, art:'who', lines:['WHO WARNS:','ANTIBIOTICS','ARE FAILING'], fill:'#d6e3db'},
  {id:36, art:'brain', lines:['ALZHEIMER PILL:','MIXED TRIAL','RESULTS'], fill:'#e6d8ca'},
];

const briefText = {
  4:'Ukraine: Putin wants to fight on — report', 5:'Gaza peace board faults Israel and Hamas',
  8:'Myanmar reviews ASEAN relationship', 9:'IAEA flags N Korea uranium expansion',
  11:'Haiti assassination plot: pastor convicted', 12:'Jeffries wins Democrats’ Speaker nod',
  13:'Israel delays E1 settlement tenders', 14:'Spain opens Iglesias sex-abuse inquiry',
  15:'US sanctions Hezbollah funding network', 16:'Iraq gives six French ISIL members life',
  18:'Rio Tinto: $250m for PNG mine harm', 19:'Senegal migrant boat capsizes',
  20:'UNICEF: Yemen child death toll reaches 64', 22:'Australian wages lag rising prices',
  23:'Germany agrees electricity tax cut', 25:'Russian faces US tech-spying charges',
  26:'Arizona probes rogue AI in banks', 27:'US Senate plans AI-terror hearings',
  28:'US Senate panel blocks NSF nominee', 29:'US egg giant to cull 1.8m birds for flu',
  30:'German firms plan orbital weapons', 32:'30 nations back fossil-fuel treaty effort',
  33:'EU–Egypt aid benchmarks disputed', 34:'Study questions Australian forest offsets',
  38:'England clinch Australia ODI series', 39:'Cambridge word of the year: “human”',
  40:'Child aid denial up 16-fold: analysis', 41:'William and Catherine meet India’s Modi',
  42:'South Africa settles publisher case with X', 43:'Lammy urges UK pledge to rejoin EU',
  44:'Brazil clears Transnordestina rail works', 45:'German court rejects BSW recount appeal',
  46:'Trump meets Marcos in Manila', 47:'Alcaraz beats Medvedev at ATP Finals',
  48:'German minister visits Armenia, Azerbaijan', 49:'Garcia tells Trump allies to keep records',
  50:'FAA chief takes blame for flight outage',
};

function worldStrip() {
  const map = shape('M6 11l10-8 26 1 8 7-7 7-12 2-8 8-8-8Zm30 14 11-5 12 9-4 18-7 5-6-16Zm39-16 12-6 12 3-4 10-10 1Zm5 13 16-5 13 8-4 21-12 5-8-16Zm20-16 29-5 35 8 12 13-19 4-9 10-20-6-13-15-14 1Zm52 34 15-6 16 9-5 10-20-3Z','#98aaa0');
  const labels = [['N. AMERICA',B],['LATIN AMERICA',R],['EUROPE',I],['AFRICA',T],['MIDDLE EAST','#9c6830'],['ASIA',B],['PACIFIC',T]];
  return `<g transform="translate(18 122)">${box(0,0,988,36,'#e7dfcd')}<g transform="translate(1 -3) scale(.71)">${map}</g>${labels.map(([name,color],n)=>dot(146+n*120,18,4,color)+text(155+n*120,24,name,16,color)).join('')}</g>`;
}

function fitted(id, x, positions, lines, size, width, fill, kind) {
  return `<g class="fit" data-id="${id}" data-kind="${kind}" data-max-width="${width}" style="font-family:Barlow;font-weight:700;font-size:${size}px;fill:${fill}">${lines.map((s,n)=>`<text x="${x}" y="${positions[n]}">${esc(s)}</text>`).join('')}</g>`;
}

export function createFrontPage(fontFaces) {
  const artCards = cards.map((card,n) => {
    const x=18+(n%3)*332, y=354+Math.floor(n/3)*109;
    const positions=card.lines.length===2 ? [y+43,y+84] : [y+32,y+63,y+94];
    return `<g class="story" data-id="${card.id}">${box(x,y,324,103,card.fill)}<g clip-path="url(#clip${n})" transform="translate(${x} ${y})">${panelArt[card.art]()}</g>${box(x,y+100,324,3,I)}${fitted(card.id,x+98,positions,card.lines,card.lines.length===2?38:35,218,card.color??I,'card')}</g>`;
  }).join('\n');
  const briefs = briefIds.map((id,n) => {
    const col=Math.floor(n/13), row=n%13, x=21+col*332, y=825+row*14.7;
    const story=stories.find(s=>s.id===id);
    if (!briefText[id]) throw new Error(`Missing brief ${id}`);
    const color=story.region.includes('Africa')?T:story.region.includes('America')||story.region.includes('Caribbean')?R:story.region.includes('Asia')?B:story.region.includes('Oceania')?T:I;
    return `<g class="story" data-id="${id}">${dot(x+2,y-5,2.3,color)}${fitted(id,x+9,[y],[briefText[id]],17.2,310,I,'brief')}</g>`;
  }).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" role="img" aria-label="Wednesday 18 November 2026: fifty world news reports, thirteen illustrated panels">
  <defs><style>${fontFaces}text{paint-order:stroke fill}</style>
    <pattern id="woodhatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)"><path d="M1 0v7" stroke="${P}" stroke-width="1" opacity=".25"/></pattern>
    <pattern id="papergrain" width="29" height="31" patternUnits="userSpaceOnUse"><path d="M1 7h8m5 17h11M8 16h5" stroke="${I}" stroke-width=".6" opacity=".065"/><circle cx="23" cy="8" r=".6" fill="${I}" opacity=".08"/></pattern>
    ${cards.map((_,n)=>`<clipPath id="clip${n}"><rect width="90" height="103"/></clipPath>`).join('')}
  </defs>
  ${box(0,0,1024,1024,P)}${box(0,0,1024,1024,'url(#papergrain)')}
  <path d="M18 8h988M18 116h988" fill="none" stroke="${I}" stroke-width="3"/>
  <text x="18" y="36" font-family="Baskerville" font-weight="700" font-size="26" fill="${I}">THE WORLD IN ONE DAY</text>
  ${text(1006,34,'50 REPORTS · 13 DRAWN · 7 REGIONS',20,R,'text-anchor="end" letter-spacing=".7"')}
  ${text(512,106,'WEDNESDAY 18 NOVEMBER 2026',82,R,'text-anchor="middle"')}
  ${worldStrip()}
  <g class="story" data-id="1">${box(18,166,988,180,I)}<g transform="translate(18 167)">${summitScene()}</g>
    ${text(438,191,'SHENZHEN · APEC',19,G,'letter-spacing="2"')}
    ${fitted(1,435,[250,309],['XI WELCOMES','TRUMP TO CHINA'],64,554,P,'lead')}
    ${text(438,335,'Free-trade appeal as leaders gather',22,P)}
  </g>
  ${artCards}
  <path d="M18 790h988" stroke="${I}" stroke-width="2"/>
  ${text(20,808,'37 MORE REPORTS',19,R,'letter-spacing="1.3"')}
  ${text(1004,808,'TODAY’S EVENTS + NEW FINDINGS · DATE-CHECKED',17,I,'text-anchor="end" letter-spacing=".8"')}
  ${briefs}
  <path d="M18 1008h988M18 1017h988" stroke="${I}" stroke-width="2"/>
  </svg>`;
}

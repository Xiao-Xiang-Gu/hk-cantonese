// 把已通過安全匯入檢查、經 Claude 審稿的 Muse 內容，輸出成 App 用的 content-muse.js
// 用法：node tools/build-muse-batch.js notes/inbox/<匯入結果>.json [...更多]
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const files = process.argv.slice(2);
if (!files.length) { console.error('用法：node tools/build-muse-batch.js notes/inbox/<檔名>.json'); process.exit(1); }

const all = { lessons: [], stories: [], reactions: [] };
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (d.rejected && d.rejected.length) { console.error(`${f} 有 ${d.rejected.length} 筆被拒絕的內容，請先處理`); process.exit(1); }
  for (const k of Object.keys(all)) all[k].push(...(d[k] || []));
}

// Claude 審稿修正（2026-11-25 全內容香港實況審稿）
// LINE：找 hanzi 完全相同的句子覆蓋欄位；TEXT：說明／標題／場景等文字整段替換
const LINE = [
  ['咁我要兩斤，幫我揀啲靚啲嘅啦。', { mandarin: '那我要兩斤，幫我挑好一點的吧。' }],
  ['我睇下你個喉嚨先。開口「啊」一聲。', { hanzi: '我睇下你個喉嚨先。擘大個口，「啊」一聲。', jyutping: 'ngo5 tai2 haa5 nei5 go3 hau4 lung4 sin1. maak3 daai6 go3 hau2, aa1 jat1 seng1.', mandarin: '我先看一下你的喉嚨。嘴巴張大，「啊」一聲。' }],
  ['好呀，下一站就係中環，準備撳鐘啦。', { hanzi: '好呀，到站前我叫你，記得撳鐘落車呀。', jyutping: 'hou2 aa3, dou3 zaam6 cin4 ngo5 giu3 nei5, gei3 dak1 gam6 zung1 lok6 ce1 aa3.', mandarin: '好啊，到站前我叫你，記得按鈴下車喔。' }],
  ['護照', { note: '換錢時可能要出示證件，遊客通常用護照；香港居民用身份證 (san1 fan2 zing3)。' }],
  ['好，換啦。唔該問下，要唔要護照呀？', { hanzi: '好，換啦。想問吓，使唔使睇護照呀？', jyutping: 'hou2, wun6 laa1. soeng2 man6 haa5, sai2 m4 sai2 tai2 wu6 ziu3 aa3?', mandarin: '好，換吧。想請問一下，需要看護照嗎？' }],
  ['呢度，唔該。', { hanzi: '畀你，唔該。', jyutping: 'bei2 nei5, m4 goi1.', mandarin: '給你，謝謝。' }],
  ['係呀，呢條路冇咁塞車㗎。', { hanzi: '去到㗎，行呢條路冇咁塞車。', jyutping: 'heoi3 dou3 gaa3, haang4 ni1 tiu4 lou6 mou5 gam3 sak1 ce1.', mandarin: '到得了啦，走這條路比較不塞車。' }],
  ['唔緊要，不過你哋啲名真係好似。', { hanzi: '唔緊要，不過你朋友個名同我個名真係好似。', jyutping: 'm4 gan2 jiu3, bat1 gwo3 nei5 pang4 jau5 go3 meng2 tung4 ngo5 go3 meng2 zan1 hai6 hou2 ci5.', mandarin: '沒關係，不過你朋友的名字跟我的名字真的很像。' }],
  ['講多次。', { hanzi: '可唔可以講多次呀？', jyutping: 'ho2 m4 ho2 ji5 gong2 do1 ci3 aa3?', mandarin: '可以再說一次嗎？' }],
];
const TEXT = [
  ['診所通常要先拿號碼牌排隊。', '有些診所要先拿號碼牌排隊。'],
  ['換錢前可以先問「而家咩匯率？」', '換錢前可以先問「而家匯率幾多呀？」'],
  ['遊客在香港換錢要帶護照。', '換錢時職員可能會要求看證件，遊客通常出示護照。'],
  ['「兜路」是故意繞遠路，阿強懷疑司機在兜路。', '「兜路」是繞路。阿強見車資比平時高，懷疑司機兜遠咗。'],
  ['司機前面說這條路不塞，最後又用「今日塞車嘛」當藉口，前後矛盾正是笑點。', '司機說走這條路比較不塞，最後收費卻比平時貴很多，還用「今日塞車嘛」當藉口，這種落差正是笑點。'],
  ['落雨借遮', '落雨一齊擔遮'],
  ['在大樓門口遇到鄰居阿玲。', '在大樓門口遇到同事阿玲。'],
  ['阿強 (koeng4) 和阿昌 (coeng1) 讀音相近，所以才會搞混。', '阿明打錯電話是因為撳錯號碼；阿強 (koeng4) 和阿昌 (coeng1) 聽起來有點像，只是剛好的巧合。'],
];
const objs = [];
const walk = o => { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === 'object') { if (o.hanzi) objs.push(o); Object.values(o).forEach(walk); } };
walk(all);
for (const [h, patch] of LINE) {
  const hit = objs.filter(o => o.hanzi === h);
  if (hit.length !== 1) { console.error(`修正對到 ${hit.length} 句：${h}`); process.exit(1); }
  Object.assign(hit[0], patch);
}
for (const [a, b] of TEXT) {
  let n = 0;
  const rep = o => { for (const k in o) { if (typeof o[k] === 'string' && o[k].includes(a)) { o[k] = o[k].replace(a, b); n++; } else if (o[k] && typeof o[k] === 'object') rep(o[k]); } };
  rep(all);
  if (n !== 1) { console.error(`文字替換對到 ${n} 處：${a}`); process.exit(1); }
}

// 避免 id 重複
global.window = {};
require(path.join(root, 'lessons.js')); require(path.join(root, 'stories.js'));
const taken = new Set([...window.LESSONS, ...window.STORIES].map(x => x.id));
for (const x of [...all.lessons, ...all.stories]) if (taken.has(x.id)) { console.error('id 重複：' + x.id); process.exit(1); } else taken.add(x.id);

const out = `// Muse 撰寫、Claude 審稿修正的內容（由 tools/build-muse-batch.js 產生，請勿手動修改）
window.LESSONS.push(...${JSON.stringify(all.lessons, null, 2)});
window.STORIES.push(...${JSON.stringify(all.stories, null, 2)});
window.REACTIONS = ${JSON.stringify(all.reactions, null, 2)};
`;
fs.writeFileSync(path.join(root, 'content-muse.js'), out);
console.log(`課程 ${all.lessons.length}、短劇 ${all.stories.length}、口語反應 ${all.reactions.length} → content-muse.js`);

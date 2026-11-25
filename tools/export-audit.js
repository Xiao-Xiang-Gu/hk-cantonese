// 把 App 全部內容匯出成精簡文字，分批給 Codex 做「香港實況」初審
// 用法：node tools/export-audit.js  → notes/audit/batch-N.txt
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
global.window = {};
['lessons', 'patterns', 'stories', 'content-muse', 'weekly', 'codemix'].forEach(f => require(path.join(root, f + '.js')));
const W = global.window;

const units = []; // 每個單位是一段完整情境，不拆開
const L = (id, h, m, extra) => `${id}｜${h}｜${m}${extra ? '｜' + extra : ''}`;
W.LESSONS.forEach((l, i) => units.push([`## 課程 ${i + 1}：${l.title}`,
  ...l.vocab.map((v, j) => L(`L${i + 1}v${j + 1}`, v.hanzi, v.mandarin, v.note)),
  ...l.dialogue.map((d, j) => L(`L${i + 1}d${j + 1}`, `${d.speaker}：${d.hanzi}`, d.mandarin)),
  ...(l.tips || []).map((t, j) => `L${i + 1}t${j + 1}｜說明：${typeof t === 'string' ? t : JSON.stringify(t)}`)].join('\n')));
(W.PATTERNS || []).forEach((p, i) => units.push([`## 句型 ${i + 1}：${p.title}（${p.meaning}）`, `P${i + 1}x｜說明：${p.explain}`,
  ...p.examples.map((e, j) => L(`P${i + 1}e${j + 1}`, e.hanzi, e.mandarin))].join('\n')));
(W.STORIES || []).forEach((s, i) => units.push([`## 短劇 ${s.id}：${s.title}（場景：${s.scene}）`,
  ...s.lines.map((l, j) => L(`S${i + 1}l${j + 1}`, `${l.speaker}：${l.hanzi}`, l.mandarin)),
  ...(s.notes || []).map((t, j) => `S${i + 1}n${j + 1}｜說明：${t}`)].join('\n')));
units.push(['## 口語反應', ...(W.REACTIONS || []).map((r, j) => L(`R${j + 1}`, r.hanzi, r.mandarin, r.note))].join('\n'));
(W.CODEMIX || []).forEach((g, i) => units.push([`## 中英夾雜：${g.group}`,
  ...g.items.map((it, j) => L(`C${i + 1}i${j + 1}`, `[${it.term}，港式唸法 ${it.pron}] ${it.hanzi}`, it.mandarin, it.note))].join('\n')));
(W.WEEKLY || []).forEach((w, i) => units.push([`## 每週素材 ${w.date}`,
  ...w.slang.map((s, j) => L(`W${i + 1}s${j + 1}`, s.hanzi, s.mandarin, s.note)),
  ...w.media.flatMap((m, j) => m.examples.map((e, k) => L(`W${i + 1}m${j + 1}e${k + 1}`, e.hanzi, e.mandarin))),
  ...(w.compare ? [`W${i + 1}c｜比較：${JSON.stringify(w.compare)}`] : [])].join('\n')));

// 依字數平均分批
const dir = path.join(root, 'notes', 'audit');
fs.mkdirSync(dir, { recursive: true });
const total = units.reduce((n, u) => n + u.length, 0), N = Math.ceil(total / 9000);
const batches = Array.from({ length: N }, () => []);
let cur = 0, size = 0;
for (const u of units) { if (size > total / N && cur < N - 1) { cur++; size = 0; } batches[cur].push(u); size += u.length; }
batches.forEach((b, i) => fs.writeFileSync(path.join(dir, `batch-${i + 1}.txt`), b.join('\n\n')));
console.log(`共 ${total} 字，分 ${N} 批：` + batches.map(b => b.join('').length).join('、'));

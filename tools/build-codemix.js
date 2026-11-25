// 把 Codex 寫的「中英夾雜」單元套用審稿修正、做安全檢查後，輸出成 codemix.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const raw = fs.readFileSync(path.join(root, 'notes', 'codex_codemix.json'), 'utf8').replace(/^﻿/, '');
const data = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));

// Claude 審稿修正：[term 或例句開頭, 要覆蓋的欄位]
const ITEM_FIXES = [
  ['朱古力', { jyutping: 'syut3 gwai6 zung6 jau5 bun3 paai4 zyu1 gu1 lik1, nei5 sik6 m4 sik6?', pron: 'zyu1 gu1 lik1' }],
  ['菲林', { jyutping: 'ngo5 daai3 zo2 bou6 gau6 soeng3 gei1, daan6 hai6 m4 gei3 dak1 maai5 fei1 lam2.', pron: 'fei1 lam2' }],
  ['cancel', { mandarin: '雨下這麼大，不如取消今晚的聚餐吧。' }]
];
// 審稿後刪除的項目（term）
const REMOVE = [];
// 短劇修正：[story id, 台詞開頭, 要覆蓋的欄位]
const LINE_FIXES = [
  ['deadline-and-meeting', '仲爭兩個數', { mandarin: '還差兩個數字，我剛寄了封電子郵件問客戶。' }],
  ['deadline-and-meeting', '你再寫 email', { mandarin: '你再寄電子郵件催他的時候，記得把我也加進副本。' }],
  ['deadline-and-meeting', '好呀，趕得切', { mandarin: '好啊，要是趕得及在五點前交件，今晚就不用加班了。' }],
  ['lunch-group-chat', '我 book 咗一點', { mandarin: '我訂好下午一點的位子了，三位，等一下把地址傳給你們。' }]
];

const BAD = /[<>`]|javascript:|https?:\/\/|\$\{/i;
const JP_OK = /^[A-Za-z0-9 ,.?!'’\-…]*$/;
const str = (v, max, f) => { if (typeof v !== 'string' || !v.trim()) throw new Error(f + ' 空白'); const s = v.trim(); if (s.length > max || BAD.test(s)) throw new Error(f + ' 不合格：' + s.slice(0, 30)); return s; };
const jp = (v, f) => { const s = str(v, 300, f); if (!JP_OK.test(s)) throw new Error(f + ' 含粵拼以外字元：' + s); return s; };

for (const [key, patch] of ITEM_FIXES) {
  const it = data.groups.flatMap(g => g.items).find(i => i.term === key || i.hanzi.startsWith(key));
  if (!it) throw new Error('找不到要修正的項目：' + key);
  Object.assign(it, patch);
}
for (const g of data.groups) g.items = g.items.filter(i => !REMOVE.includes(i.term));
for (const [id, start, patch] of LINE_FIXES) {
  const l = data.stories.find(s => s.id === id)?.lines.find(l => l.hanzi.startsWith(start));
  if (!l) throw new Error(`找不到台詞：${id} ${start}`);
  Object.assign(l, patch);
}

const groups = data.groups.map(g => ({
  group: str(g.group, 20, 'group'),
  items: g.items.map((i, n) => ({
    term: str(i.term, 30, 'term'), hanzi: str(i.hanzi, 120, 'hanzi'), jyutping: jp(i.jyutping, 'jyutping'),
    mandarin: str(i.mandarin, 200, 'mandarin'), pron: jp(i.pron, 'pron'), note: str(i.note, 300, 'note')
  }))
}));
global.window = {}; require(path.join(root, 'lessons.js')); require(path.join(root, 'stories.js')); require(path.join(root, 'content-muse.js'));
const taken = new Set(window.STORIES.map(s => s.id));
const stories = data.stories.map(s => {
  if (taken.has(s.id)) throw new Error('短劇 id 重複：' + s.id);
  return {
    id: str(s.id, 60, 'id'), title: str(s.title, 30, 'title'), scene: str(s.scene, 150, 'scene'), style: str(s.style, 10, 'style'),
    lines: s.lines.map(l => ({ speaker: str(l.speaker, 20, 'speaker'), hanzi: str(l.hanzi, 120, 'hanzi'), jyutping: jp(l.jyutping, 'jyutping'), mandarin: str(l.mandarin, 200, 'mandarin') })),
    notes: (s.notes || []).map(t => str(t, 300, 'note'))
  };
});

fs.writeFileSync(path.join(root, 'codemix.js'), `// 港式中英夾雜（Codex 撰寫、Claude 審稿修正；由 tools/build-codemix.js 產生，請勿手動修改）
window.CODEMIX = ${JSON.stringify(groups, null, 2)};
window.STORIES.push(...${JSON.stringify(stories, null, 2)});
`);
console.log(`${groups.map(g => g.group + ' ' + g.items.length).join('、')}；短劇 ${stories.length}`);

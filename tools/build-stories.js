// 把 Codex 寫的短劇 JSON 套用審稿修正後，輸出成 stories.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const raw = fs.readFileSync(path.join(root, 'notes', 'codex_stories.json'), 'utf8').replace(/^﻿/, '');
const S = JSON.parse(raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1));

const fix = (id, hanziStart, patch) => {
  const line = S.find(s => s.id === id).lines.find(l => l.hanzi.startsWith(hanziStart));
  if (!line) throw new Error(`not found: ${id} ${hanziStart}`);
  Object.assign(line, patch);
};
// Claude 審稿修正
fix('dinner-at-home', '得喇。阿妹', { jyutping: 'dak1 laa3. aa3 mui1, nei5 gam1 jat6 faan1 hok6 dim2 aa3?' });
fix('office-pantry', '咁你聽日仲放唔放假', { jyutping: 'gam2 nei5 ting1 jat6 zung6 fong3 m4 fong3 gaa3?' });
fix('mall-shopping', '吓？減咗都要', { hanzi: '吓？減咗都要兩百八呀？', mandarin: '蛤？降價了還要兩百八喔？' });
fix('piglet-and-kitten', '咁我哋睇餐牌', { jyutping: 'gam2 ngo5 dei6 tai2 caan1 paai2 sin1 laa1.' });
fix('piglet-and-kitten', '食呀！佢又冇', { mandarin: '要啊！他又沒叫我的名字。' });

const out = '// 對話劇場：原創短劇（Codex 撰寫，Claude 審稿修正）\nwindow.STORIES = ' + JSON.stringify(S, null, 2) + ';\n';
fs.writeFileSync(path.join(root, 'stories.js'), out);
console.log(S.map(s => `${s.title} (${s.lines.length})`).join(' | '));

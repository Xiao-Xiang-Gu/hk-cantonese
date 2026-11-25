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
fix('office-pantry', '咁你聽日仲放唔放假', { jyutping: 'gam2 nei5 ting1 jat6 zung6 fong3 m4 fong3 gaa3 gaa3?' });
fix('mall-shopping', '吓？減咗都要', { hanzi: '吓？減咗都要兩百八呀？', mandarin: '蛤？降價了還要兩百八喔？' });
fix('piglet-and-kitten', '咁我哋睇餐牌', { jyutping: 'gam2 ngo5 dei6 tai2 caan1 paai2 sin1 laa1.' });
fix('piglet-and-kitten', '食呀！佢又冇', { mandarin: '要啊！他又沒叫我的名字。' });
// 2026-11-25 全內容香港實況審稿
fix('office-pantry', '好呀，如果早走到', { hanzi: '好呀，如果可以早啲走，我請你食飯！', jyutping: 'hou2 aa3, jyu4 gwo2 ho2 ji5 zou2 di1 zau2, ngo5 ceng2 nei5 sik6 faan6!' });
fix('piglet-and-kitten', '隔籬枱嘅豬仔包', { hanzi: '七號枱嘅豬仔包到喇！', jyutping: 'cat1 hou6 toi2 ge3 zyu1 zai2 baau1 dou3 laa3!', mandarin: '七號桌的豬仔包來囉！' });
const note = (id, start, text) => {
  const s = S.find(s => s.id === id), i = s.notes.findIndex(n => n.startsWith(start));
  if (i < 0) throw new Error(`note not found: ${id} ${start}`);
  s.notes[i] = text;
};
note('office-pantry', '「改多次份表」', '「改多次份表」就是「再改一次那份表」。「改多次」即係「改多一次」，「多次」放在動詞後表示再做一遍。');
note('office-pantry', '「如果早走到」', '「早啲走」是早一點離開，這裡指提早下班。');
note('mall-shopping', '「減咗都要', '「減咗都要兩百八呀？」的「都要」是「還要」，帶出折扣後的價格還是比預期高。「兩百八」就是兩百八十蚊，「蚊」是港幣金額的口語單位。');
note('piglet-and-kitten', '「佢講緊個包呀」', '「佢講緊個包呀」的「緊」放在動詞後，表示動作正在進行。前面已經提到豬仔包，所以直接說「個包」，對方就知道是哪個包。');
note('piglet-and-kitten', '「我以為叫我添」', '「添」在這裡可譯成「還」：「我以為叫我添」就是「我還以為是在叫我呢」。');

const out = '// 對話劇場：原創短劇（Codex 撰寫，Claude 審稿修正）\nwindow.STORIES = ' + JSON.stringify(S, null, 2) + ';\n';
fs.writeFileSync(path.join(root, 'stories.js'), out);
console.log(S.map(s => `${s.title} (${s.lines.length})`).join(' | '));

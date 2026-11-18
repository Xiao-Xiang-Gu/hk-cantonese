// 把 Codex 寫的句型 JSON 套用審稿修正後，輸出成 patterns.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const raw = fs.readFileSync(path.join(root, 'notes', 'codex_patterns.json'), 'utf8').replace(/^﻿/, '');
const P = JSON.parse(raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1));

const pat = title => { const p = P.find(p => p.title.startsWith(title)); if (!p) throw new Error('no pattern ' + title); return p; };
const ex = (title, hanziStart, patch) => {
  const e = pat(title).examples.find(e => e.hanzi.startsWith(hanziStart));
  if (!e) throw new Error(`no example ${title} ${hanziStart}`);
  Object.assign(e, patch);
};

// Claude 審稿修正
const gaa = pat('㗎');
Object.assign(gaa, {
  title: '㗎 gaa3',
  meaning: '用來說明或強調一件事確實如此，常帶有提醒或糾正的語氣。',
  explain: '「㗎」常用來補充背景、糾正對方的理解，或提醒對方某件事確實如此，國語可以譯成「喔」「的」或乾脆不譯。有「點解」的問句也常用「㗎」，帶一點不解或埋怨的語氣。'
});
ex('㗎', '呢杯係我嘅', { hanzi: '呢杯係我嘅，你嗰杯喺枱上面㗎。', jyutping: 'ni1 bui1 hai6 ngo5 ge3, nei5 go2 bui1 hai2 toi2 soeng6 min6 gaa3.' });
ex('㗎', '係㗎？', { hanzi: '呢度唔可以食嘢㗎。', jyutping: 'ni1 dou6 m4 ho2 ji5 sik6 je5 gaa3.', mandarin: '這裡不能吃東西喔。' });
ex('嘛', '我一個人拎唔晒', { jyutping: 'ngo5 jat1 go3 jan4 ling1 m4 saai3 maa3, nei5 bong1 ngo5 ling1 jat1 doi2 laa1.' });
ex('然後', '你行到街口', { jyutping: 'nei5 haang4 dou3 gaai1 hau2, jin4 hau6 hoeng3 zo2 zyun3.' });
ex('……晒', '我睇晒你畀我', { jyutping: 'ngo5 tai2 saai3 nei5 bei2 ngo5 go2 gei2 fan6 man4 gin2 laa3.' });
ex('……緊', '我呢排搵緊屋', { jyutping: 'ngo5 ni1 paai2 wan2 gan2 uk1, soeng2 bun1 kan5 gung1 si1 di1.' });

// Muse 交叉審稿：「啦」只讀 laa1，表示狀態改變的 laa3 要寫成「喇」
Object.assign(pat('啦'), {
  title: '啦 laa1／喇 laa3',
  meaning: '啦 laa1 用於提議或請人做事；喇 laa3 用於告知情況已經改變或某個時點到了。',
  explain: '「啦」laa1 常跟在建議、催促或邀請後面，像國語的「吧」。「喇」laa3 用在告知新情況，像國語的「了」。兩個字讀音只差聲調，意思卻不同：「走啦」laa1 是「走吧」，「走喇」laa3 是「我要走了」。'
});
pat('呀').explain += '另外，帶驚訝或想確認的問句常讀低降的 aa4，例如「你今晚又要加班呀？」（又要加班喔？），對話劇場裡會聽到。';
ex('啦', '夠鐘啦', { hanzi: '夠鐘喇，我哋要走喇。' });
ex('啦', '我到屋企啦', { hanzi: '我到屋企喇，你放心啦。' });

const out = '// 常用句型：句尾語氣詞、連接詞、口語句型（Codex 撰寫，Claude 審稿修正）\nwindow.PATTERNS = ' + JSON.stringify(P, null, 2) + ';\n';
fs.writeFileSync(path.join(root, 'patterns.js'), out);
console.log(P.length + ' patterns, ' + P.reduce((n, p) => n + p.examples.length, 0) + ' examples');

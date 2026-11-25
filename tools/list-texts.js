// 列出 App 裡所有需要發音的句子與對應聲音，輸出 JSON 給 gen-audio.py 使用
const path = require('path');
const root = path.join(__dirname, '..');
global.window = {};
['lessons', 'patterns', 'stories', 'content-muse', 'weekly', 'codemix'].forEach(f => require(path.join(root, f + '.js')));
const W = global.window;

const F1 = 'zh-HK-HiuMaanNeural', F2 = 'zh-HK-HiuGaaiNeural', M = 'zh-HK-WanLungNeural';
const MALE = /爸|阿仔|阿朗|阿聰|阿浩|阿強|阿明|阿文|司機|伙計|醫生|阿昌|阿俊|陌生人|職員/;
const FEMALE = /媽|阿女|阿晴|阿欣|阿敏|阿琪|阿琳|阿玲|圓圓/;

const out = new Map();
const add = (text, voice) => { if (text && !out.has(text)) out.set(text, voice); };

// 單字詞、例句、口語反應：清楚的女聲
W.LESSONS.forEach(l => l.vocab.forEach(v => add(v.hanzi, F1)));
(W.PATTERNS || []).forEach(p => p.examples.forEach(e => add(e.hanzi, F1)));
(W.REACTIONS || []).forEach(r => add(r.hanzi, F1));
(W.CODEMIX || []).forEach(g => g.items.forEach(i => add(i.hanzi, F2)));
(W.WEEKLY || []).forEach(w => { w.slang.forEach(s => add(s.hanzi, F1)); w.media.forEach(m => m.examples.forEach(e => add(e.hanzi, F2))); });
(W.TONES || []).forEach(t => add(t.hanzi, F1));
(W.TONE_PAIRS || []).forEach(p => { add(p.a.hanzi, F1); add(p.b.hanzi, F1); });

// 對話：每個角色固定一種聲音，讓對話聽起來像兩個人
// 同一段對話裡，每個角色的聲音都不一樣（男聲只有一種，第二位男性改用較低音調）
const M2 = M + '|-10Hz';
const dialog = lines => {
  const voices = {}, used = new Set(); let alt = 0;
  const pick = speaker => {
    const prefs = MALE.test(speaker) ? [M, M2] : FEMALE.test(speaker) ? [F2, F1] : [[F2, M, F1][alt++ % 3], F2, M, F1, M2];
    return prefs.find(v => !used.has(v)) || prefs[0];
  };
  lines.forEach(l => {
    if (!voices[l.speaker]) { voices[l.speaker] = pick(l.speaker); used.add(voices[l.speaker]); }
    add(l.hanzi, voices[l.speaker]);
  });
};
W.LESSONS.forEach(l => dialog(l.dialogue));
(W.STORIES || []).forEach(s => dialog(s.lines));

process.stdout.write(JSON.stringify([...out].map(([text, voice]) => ({ text, voice }))));

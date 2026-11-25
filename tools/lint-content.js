// 粵語內容自動檢查（不花 AI 額度）：抓書面語、粵拼字數對不上、常錯字讀音、標點
// 用法：node tools/lint-content.js          → 檢查 App 全部內容
//       node tools/lint-content.js --json 檔案 → 檢查還沒整合的新稿（含 hanzi/jyutping 的任何 JSON）
// 有「錯誤」時結束代碼為 1；「提醒」只供人工判斷
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');

// ---- 1. 收集要檢查的句子 ----
const items = []; // {id, hanzi, jyutping}
const add = (id, o) => { if (o && o.hanzi && o.jyutping) items.push({ id, hanzi: o.hanzi, jyutping: o.jyutping }); };
const jsonArg = process.argv.indexOf('--json');
if (jsonArg > 0) {
  const raw = fs.readFileSync(process.argv[jsonArg + 1], 'utf8').replace(/^﻿/, '');
  const walk = (o, p) => { if (Array.isArray(o)) o.forEach((x, i) => walk(x, `${p}[${i}]`)); else if (o && typeof o === 'object') { add(p || '根', o); for (const k in o) if (typeof o[k] === 'object') walk(o[k], p ? `${p}.${k}` : k); } };
  walk(JSON.parse(raw.slice(raw.search(/[[{]/))), '');
} else {
  global.window = {};
  ['lessons', 'patterns', 'stories', 'content-muse', 'weekly', 'codemix'].forEach(f => require(path.join(root, f + '.js')));
  const W = global.window;
  W.LESSONS.forEach((l, i) => { l.vocab.forEach((v, j) => add(`課${i + 1} 詞${j + 1}`, v)); l.dialogue.forEach((d, j) => add(`課${i + 1} 對話${j + 1}`, d)); });
  (W.PATTERNS || []).forEach((p, i) => p.examples.forEach((e, j) => add(`句型${i + 1}「${p.title}」例${j + 1}`, e)));
  (W.STORIES || []).forEach(s => s.lines.forEach((l, j) => add(`短劇 ${s.id} 第${j + 1}句`, l)));
  (W.REACTIONS || []).forEach((r, j) => add(`口語反應${j + 1}`, r));
  (W.CODEMIX || []).forEach(g => g.items.forEach(it => add(`中英夾雜 ${it.term}`, it)));
  (W.WEEKLY || []).forEach(w => { w.slang.forEach(s => add(`週報${w.date} ${s.hanzi}`, s)); w.media.forEach((m, j) => m.examples.forEach((e, k) => add(`週報${w.date} 影音${j + 1}例${k + 1}`, e))); });
  (W.TONES || []).forEach(t => add(`聲調 ${t.hanzi}`, t));
  (W.TONE_PAIRS || []).forEach(p => { add(`聲調對 ${p.a.hanzi}`, p.a); add(`聲調對 ${p.b.hanzi}`, p.b); });
}

// ---- 2. 規則 ----
// 書面語／國語用字：[字詞, 建議, 等級, 例外（含這些詞就不算）]
const WRITTEN = [
  ['嗎', '呀／咩／係咪…呀', '錯誤', []],
  ['他', '佢', '錯誤', []], ['她', '佢', '錯誤', []], ['它', '佢', '錯誤', []],
  ['們', '哋', '錯誤', []],
  ['什麼', '咩／乜嘢', '錯誤', []], ['甚麼', '咩／乜嘢', '錯誤', []], ['怎麼', '點', '錯誤', []],
  ['這', '呢', '錯誤', []],
  ['很', '好', '錯誤', []],
  ['吃', '食', '錯誤', []], ['喝', '飲', '錯誤', []],
  ['沒有', '冇', '錯誤', []], ['沒', '冇', '提醒', ['沒收']],
  ['的', '嘅', '提醒', ['的士', '的確', '目的', '的骰']],
  ['是', '係', '提醒', ['是但', '於是', '凡是', '但是']],
  ['在', '喺', '提醒', ['現在', '實在', '自在', '存在', '在意']],
  ['了', '咗／喇', '提醒', ['了解', '為了', '了不起', '受不了']],
  ['吧', '啦', '提醒', ['酒吧', '網吧']],
  ['那', '嗰／咁', '提醒', []],
  ['看', '睇', '提醒', ['看護']],
  ['給', '畀', '提醒', ['供給', '給予']],
  ['說', '講／話', '提醒', ['小說', '說明', '傳說']],
  ['東西', '嘢', '提醒', []],
  ['不', '唔', '提醒', ['不如', '不過', '不嬲', '不停', '不斷', '不同', '不止', '不得了', '不少', '不良', '不便', '不知幾', '不溜', '不時', '不論', '不其然', '不得不', '不要緊', '不錯', '不了']],
];
// 固定讀音（字詞 → 允許的粵拼）
const READ = {
  '啦': ['laa1'], '喇': ['laa3'], '嘞': ['laak3', 'lak3'], '咗': ['zo2'], '唔': ['m4'], '冇': ['mou5'], '佢': ['keoi5'],
  '喺': ['hai2'], '嚟': ['lai4'], '睇': ['tai2'], '嘢': ['je5'], '啲': ['di1'], '係': ['hai6'], '哋': ['dei6'], '嘅': ['ge3', 'ge2'],
  '咩': ['me1'], '乜': ['mat1'], '畀': ['bei2'], '攞': ['lo2'], '冧': ['lam1', 'lam3'], '揸': ['zaa1'], '嬲': ['nau1', 'lau1'],
  '餐牌': ['caan1 paai2'], '散紙': ['saan2 zi2'], '攞籌': ['lo2 cau2'], '匯率': ['wui6 leot2'], '身份證': ['san1 fan2 zing3'],
  '咪錶': ['mai1 biu1'], '咩話': ['me1 waa2'], '哎吔': ['aai1 jaa3'], '八達通': ['baat3 daat6 tung1'], '朱古力': ['zyu1 gu1 lik1'],
  '菲林': ['fei1 lam2'], '糖水': ['tong4 seoi2'], '多謝': ['do1 ze6'], '唔該': ['m4 goi1'], '早晨': ['zou2 san4'], '埋單': ['maai4 daan1'],
};

const CJK = /[㐀-鿿豈-﫿\u{20000}-\u{3134f}]/u;
const hTokens = s => s.match(/[㐀-鿿豈-﫿\u{20000}-\u{3134f}]|[A-Za-z0-9]+/gu) || [];
const jTokens = s => s.match(/[A-Za-z0-9]+/g) || [];
const SYL = /^[a-z]+[1-6]$/;

const out = [];
const report = (lv, it, msg) => out.push({ lv, id: it.id, hanzi: it.hanzi, msg });

for (const it of items) {
  const { hanzi: h, jyutping: j } = it;
  // 書面語
  for (const [w, sug, lv, exc] of WRITTEN) {
    let rest = h; exc.forEach(e => rest = rest.split(e).join('□'));
    if (rest.includes(w)) report(lv, it, `書面語／國語用字「${w}」→ 建議「${sug}」`);
  }
  // 標點
  if (CJK.test(j) || /[，。？！、：；「」]/.test(j)) report('錯誤', it, `粵拼裡有中文字或全形標點：${j}`);
  if (/[㐀-鿿][,?!](?!\d)|[㐀-鿿]\.(?!\.)/.test(h)) report('提醒', it, '中文句子用了半形標點');
  // 字數對齊
  const ht = hTokens(h), jt = jTokens(j);
  if (ht.length !== jt.length) { report('錯誤', it, `字數對不上：中文 ${ht.length} 個、粵拼 ${jt.length} 個（${j}）`); continue; }
  ht.forEach((t, k) => {
    if (CJK.test(t) && !SYL.test(jt[k])) report('錯誤', it, `「${t}」對到的不是粵拼音節：${jt[k]}`);
    if (!CJK.test(t) && t.toLowerCase() !== jt[k].toLowerCase()) report('提醒', it, `英文或數字「${t}」在粵拼裡寫成「${jt[k]}」`);
  });
  // 固定讀音
  for (const [w, ok] of Object.entries(READ)) {
    const wt = hTokens(w);
    for (let k = 0; k + wt.length <= ht.length; k++) {
      if (wt.every((c, n) => ht[k + n] === c)) {
        const got = jt.slice(k, k + wt.length).join(' ').toLowerCase();
        if (!ok.includes(got)) report('錯誤', it, `「${w}」讀音應為 ${ok.join(' 或 ')}，現在是 ${got}`);
      }
    }
  }
}

const errs = out.filter(o => o.lv === '錯誤'), warns = out.filter(o => o.lv === '提醒');
const show = list => list.forEach(o => console.log(`  [${o.id}] ${o.hanzi}\n      → ${o.msg}`));
console.log(`檢查 ${items.length} 句：錯誤 ${errs.length}、提醒 ${warns.length}`);
if (errs.length) { console.log('\n■ 錯誤（應該修正）'); show(errs); }
if (warns.length) { console.log('\n■ 提醒（請人工判斷，可能是正確的口語）'); show(warns); }
process.exit(errs.length ? 1 : 0);

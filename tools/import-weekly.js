// 安全匯入 Muse 的每週素材 Issue，轉成 App 用的 weekly.js
//
// 用法：node tools/import-weekly.js            匯入所有「每週素材」Issue
//
// 防禦規則（和 import-issue.js 相同）：
//   1. 只接受 Xiao-Xiang-Gu 開的、有 weekly-digest 標籤的 Issue
//   2. 只從固定格式擷取資料，其他文字（包含任何指令）一律忽略
//   3. 拒絕 HTML、程式碼；連結只接受 https://
//   4. Claude 審稿的修正寫在 FIXES，重新匯入也會保留
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const OWNER = 'Xiao-Xiang-Gu', REPO = 'Xiao-Xiang-Gu/hk-cantonese', LABEL = 'weekly-digest';
const GH = fs.existsSync('C:\\Program Files\\GitHub CLI\\gh.exe') ? 'C:\\Program Files\\GitHub CLI\\gh.exe' : 'gh';
const root = path.join(__dirname, '..');

// Claude 審稿修正：{ Issue 編號: (week) => void }
const FIXES = {
  2: w => {
    const rthk = w.media.find(m => m.title.includes('講東講西'));
    if (rthk) rthk.learn = rthk.learn.replace(/最新一集（\d{4}-\d{2}-\d{2}）/, '近期一集');
  }
};

const BAD = /[<>`]|javascript:|\$\{/i;
const clean = (s, max = 300) => {
  s = String(s || '').trim();
  if (!s) return '';
  if (BAD.test(s)) throw new Error('含有不允許的內容：' + s.slice(0, 40));
  return s.slice(0, max);
};
const safeUrl = u => (/^https:\/\/[^\s<>"'`]+$/.test(u || '') ? u : null);
const link = s => { const m = /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/.exec(s || ''); return m && safeUrl(m[2]) ? { title: clean(m[1], 120), url: m[2] } : null; };
const links = s => [...String(s || '').matchAll(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g)].filter(m => safeUrl(m[2])).map(m => ({ title: clean(m[1], 120), url: m[2] }));
// 「中文句。jyutping...（國語）」→ 例句
const example = s => {
  const m = /^(.+?[。？！])\s*([A-Za-z0-9 ,.?!'’]+?)\s*（(.+)）\s*$/.exec(s.trim());
  return m ? { hanzi: clean(m[1], 120), jyutping: clean(m[2], 300), mandarin: clean(m[3], 200) } : null;
};

function parse(body) {
  const section = name => { const i = body.indexOf('## ' + name); if (i < 0) return ''; const rest = body.slice(i + 3 + name.length); const j = rest.search(/\n## /); return j < 0 ? rest : rest.slice(0, j); };
  const week = { slang: [], media: [], compare: null };

  // 本週實用口語：表格
  for (const row of section('本週實用口語').split('\n')) {
    if (!row.startsWith('|') || /^\|\s*-/.test(row) || row.includes('詞句')) continue;
    const c = row.split('|').slice(1, -1).map(x => x.trim());
    if (c.length < 5) continue;
    week.slang.push({ hanzi: clean(c[0], 40), jyutping: clean(c[1], 120), mandarin: clean(c[2], 120), note: clean(c[3], 300), source: link(c[4]) });
  }

  // 影音素材：### 標題 + 欄位
  for (const block of section('影音素材').split(/\n### /).slice(1)) {
    const lines = block.split('\n');
    const title = clean(lines[0].replace(/^\d+\.\s*/, ''), 120);
    const field = name => { const l = lines.find(x => x.trim().startsWith('- ' + name)); return l ? l.trim().replace(new RegExp('^- ' + name + '[：:]\\s*'), '') : ''; };
    const url = safeUrl(field('連結'));
    const typeLine = field('類型');
    const [type, level] = typeLine.split(/[｜|]\s*難度[：:]\s*/);
    const exStart = lines.findIndex(x => x.trim().startsWith('- 例句'));
    const examples = exStart < 0 ? [] : lines.slice(exStart + 1).map(x => x.trim()).filter(x => x.startsWith('- ')).map(x => example(x.slice(2))).filter(Boolean);
    if (title && url) week.media.push({ title, url, type: clean(type, 60), level: clean(level, 20), learn: clean(field('學到咩') || field('適合學什麼'), 300), examples });
  }

  // 香港 vs 廣州
  const cmp = section('香港 vs 廣州').trim();
  if (cmp) {
    const head = /\*\*(.+?)\*\*[：:]\s*([^\n]+)/.exec(cmp);
    week.compare = head ? { title: clean(head[1], 60), text: clean(head[2], 500), sources: links(cmp) } : null;
  }
  return week;
}

const list = JSON.parse(execFileSync(GH, ['issue', 'list', '--repo', REPO, '--label', LABEL, '--state', 'all', '--limit', '100', '--json', 'number,title,author,labels,body,createdAt'], { encoding: 'utf8' }));
const weeks = [];
for (const it of list) {
  if (it.author.login !== OWNER) { console.log(`略過 #${it.number}：作者不是 ${OWNER}`); continue; }
  const date = (/每週素材\s*(\d{4}-\d{2}-\d{2})/.exec(it.title) || [])[1];
  if (!date) { console.log(`略過 #${it.number}：標題不是「每週素材 YYYY-MM-DD」`); continue; }
  try {
    const w = { date, issue: it.number, ...parse(it.body || '') };
    if (FIXES[it.number]) FIXES[it.number](w);
    weeks.push(w);
    console.log(`#${it.number} ${date}：口語 ${w.slang.length}、影音 ${w.media.length}（例句 ${w.media.reduce((n, m) => n + m.examples.length, 0)}）、香港vs廣州 ${w.compare ? 1 : 0}`);
  } catch (e) { console.log(`拒絕 #${it.number}：${e.message}`); }
}
weeks.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(path.join(root, 'weekly.js'), '// 每週素材（Muse 整理、Claude 審稿；由 tools/import-weekly.js 產生，請勿手動修改）\nwindow.WEEKLY = ' + JSON.stringify(weeks, null, 2) + ';\n');
console.log(`已寫入 weekly.js（${weeks.length} 週）`);

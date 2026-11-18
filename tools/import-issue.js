// 安全匯入 Muse 的內容草稿（不會修改 App 檔案）
//
// 用法：
//   node tools/import-issue.js <Issue 編號>   從 GitHub Issue 匯入
//   node tools/import-issue.js --file <路徑>  從貼上的文字檔匯入
//
// 防禦規則：
//   1. 只接受「由 Xiao-Xiang-Gu 開的」且「有 content-batch 或 weekly-digest 標籤」的 Issue
//   2. 只擷取 ```json 區塊，其餘文字（包含任何指令）一律忽略
//   3. 每個項目只保留白名單欄位，檢查型別與長度，拒絕 HTML、程式碼、網址
//   4. 結果只寫進 notes/inbox/，由 Claude 審稿、使用者核准後才會進 App
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');

const OWNER = 'Xiao-Xiang-Gu', REPO = 'Xiao-Xiang-Gu/hk-cantonese';
const LABELS = ['content-batch', 'weekly-digest'];
const GH = fs.existsSync('C:\\Program Files\\GitHub CLI\\gh.exe') ? 'C:\\Program Files\\GitHub CLI\\gh.exe' : 'gh';
const root = path.join(__dirname, '..');

// ---------- 取得內容 ----------
const args = process.argv.slice(2);
let body, source;
if (args[0] === '--file') {
  body = fs.readFileSync(args[1], 'utf8');
  source = 'file-' + path.basename(args[1]).replace(/[^\w.-]/g, '_');
} else if (/^\d+$/.test(args[0] || '')) {
  let issue;
  try { issue = JSON.parse(execFileSync(GH, ['issue', 'view', args[0], '--repo', REPO, '--json', 'author,labels,body,title,state'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })); }
  catch { fail(`找不到 Issue #${args[0]}，或 GitHub 尚未登入`); }
  const author = issue.author && issue.author.login;
  const labels = (issue.labels || []).map(l => l.name);
  if (author !== OWNER) fail(`拒絕：Issue 作者是「${author}」，只信任 ${OWNER}`);
  if (!labels.some(l => LABELS.includes(l))) fail(`拒絕：Issue 沒有 ${LABELS.join(' / ')} 標籤`);
  body = issue.body || '';
  source = 'issue-' + args[0];
} else {
  fail('用法：node tools/import-issue.js <Issue 編號> 或 --file <路徑>');
}

// ---------- 擷取 JSON 區塊 ----------
const blocks = [...body.matchAll(/```json\s*([\s\S]*?)```/g)].map(m => m[1]);
if (!blocks.length) blocks.push(body); // 貼上的純 JSON
const items = [], rejected = [];
for (const b of blocks) {
  try { const v = JSON.parse(b.trim()); (Array.isArray(v) ? v : [v]).forEach(x => items.push(x)); }
  catch (e) { rejected.push({ reason: 'JSON 解析失敗：' + e.message.slice(0, 80) }); }
}

// ---------- 驗證 ----------
const BAD = /[<>`]|javascript:|https?:\/\/|\bon\w+\s*=|\$\{|<\/?script/i;
const JP_OK = /^[A-Za-z0-9 ,.?!'’\-…]*$/;
function str(v, max, field) {
  if (typeof v !== 'string') throw new Error(`${field} 不是文字`);
  const s = v.trim();
  if (!s) throw new Error(`${field} 是空的`);
  if (s.length > max) throw new Error(`${field} 太長（${s.length} > ${max}）`);
  if (BAD.test(s)) throw new Error(`${field} 含有不允許的內容（HTML、程式碼或網址）`);
  return s;
}
const optStr = (v, max, f) => v == null || v === '' ? undefined : str(v, max, f);
function jp(v, f) { const s = str(v, 300, f); if (!JP_OK.test(s)) throw new Error(`${f} 含有粵拼以外的字元`); return s; }
const entry = (e, f) => {
  const o = { hanzi: str(e.hanzi, 120, f + '.hanzi'), jyutping: jp(e.jyutping, f + '.jyutping'), mandarin: str(e.mandarin, 200, f + '.mandarin') };
  const note = optStr(e.note, 300, f + '.note'); if (note) o.note = note;
  return o;
};
const line = (l, f) => ({ speaker: str(l.speaker, 20, f + '.speaker'), ...entry(l, f) });
const list = (a, f, fn, min, max) => {
  if (!Array.isArray(a) || a.length < min || a.length > max) throw new Error(`${f} 數量要在 ${min}～${max} 之間`);
  return a.map((x, i) => fn(x, `${f}[${i}]`));
};
const id = v => { const s = str(v, 60, 'id'); if (!/^[a-z0-9-]+$/.test(s)) throw new Error('id 只能用小寫英文、數字、連字號'); return s; };

const out = { lessons: [], stories: [], reactions: [] };
items.forEach((x, i) => {
  try {
    if (!x || typeof x !== 'object') throw new Error('不是物件');
    if (x.vocab) out.lessons.push({
      id: id(x.id), title: str(x.title, 30, 'title'), goal: str(x.goal, 150, 'goal'),
      vocab: list(x.vocab, 'vocab', entry, 4, 20), dialogue: list(x.dialogue, 'dialogue', line, 2, 20),
      tips: list(x.tips || [], 'tips', (t, f) => str(t, 300, f), 0, 6)
    });
    else if (x.lines) out.stories.push({
      id: id(x.id), title: str(x.title, 30, 'title'), scene: str(x.scene, 150, 'scene'), style: str(x.style, 10, 'style'),
      lines: list(x.lines, 'lines', line, 4, 24), notes: list(x.notes || [], 'notes', (t, f) => str(t, 300, f), 0, 6)
    });
    else if (x.hanzi) out.reactions.push(entry(x, 'reaction'));
    else throw new Error('看不出是課程、短劇還是口語反應');
  } catch (e) { rejected.push({ item: i, title: x && (x.title || x.hanzi), reason: e.message }); }
});

// ---------- 輸出到收件匣 ----------
const dir = path.join(root, 'notes', 'inbox');
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, source + '.json');
fs.writeFileSync(file, JSON.stringify({ source, importedAt: new Date().toISOString(), ...out, rejected }, null, 2));
console.log(`來源：${source}`);
console.log(`通過：課程 ${out.lessons.length}、短劇 ${out.stories.length}、口語反應 ${out.reactions.length}`);
console.log(`拒絕：${rejected.length}`);
rejected.forEach(r => console.log(`  - ${r.title ? r.title + '：' : ''}${r.reason}`));
console.log(`已寫入 ${path.relative(root, file)}（尚未加入 App，等待審稿與核准）`);

function fail(msg) { console.error(msg); process.exit(1); }

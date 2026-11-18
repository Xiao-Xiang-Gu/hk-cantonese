// 把今天 Claude 呼叫 Codex 的紀錄轉成易讀的 Markdown
// 用法：node tools/codex-log.js [日期 YYYY/MM/DD]
const fs = require('fs'), path = require('path'), os = require('os');
const now = new Date(), pad = n => String(n).padStart(2, '0');
const day = process.argv[2] || `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())}`; // 本地日期
const dir = path.join(os.homedir(), '.codex', 'sessions', ...day.split('/'));
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.jsonl')).sort() : [];
const text = c => (Array.isArray(c) ? c : [c]).map(p => typeof p === 'string' ? p : (p.text || '')).join('\n').trim();

let md = `# Claude ↔ Codex 對話紀錄（${day}）\n`;
let n = 0;
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').trim().split('\n').map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const meta = lines.find(l => l.type === 'session_meta')?.payload || {};
  if (meta.originator && !/exec/i.test(meta.originator)) continue; // 只留 codex exec 的對話
  const msgs = lines.filter(l => l.type === 'response_item' && l.payload?.type === 'message' && ['user', 'assistant'].includes(l.payload.role))
    .map(l => ({ role: l.payload.role, body: text(l.payload.content) }))
    .filter(m => m.body && !m.body.startsWith('<'));
  if (!msgs.length) continue;
  const time = f.match(/T(\d\d)-(\d\d)/);
  md += `\n---\n\n## 第 ${++n} 次（${time ? time[1] + ':' + time[2] : ''}）\n`;
  for (const m of msgs) md += `\n### ${m.role === 'user' ? '🟠 Claude 送出' : '🟢 Codex 回覆'}\n\n${m.body}\n`;
}
const out = path.join(__dirname, '..', 'notes', 'Codex對話紀錄.md');
fs.writeFileSync(out, md);
console.log(`寫入 ${n} 次對話 → ${out}`);

// 把已通過安全匯入檢查、經 Claude 審稿的 Muse 內容，輸出成 App 用的 content-muse.js
// 用法：node tools/build-muse-batch.js notes/inbox/<匯入結果>.json [...更多]
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const files = process.argv.slice(2);
if (!files.length) { console.error('用法：node tools/build-muse-batch.js notes/inbox/<檔名>.json'); process.exit(1); }

const all = { lessons: [], stories: [], reactions: [] };
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (d.rejected && d.rejected.length) { console.error(`${f} 有 ${d.rejected.length} 筆被拒絕的內容，請先處理`); process.exit(1); }
  for (const k of Object.keys(all)) all[k].push(...(d[k] || []));
}

// 避免 id 重複
global.window = {};
require(path.join(root, 'lessons.js')); require(path.join(root, 'stories.js'));
const taken = new Set([...window.LESSONS, ...window.STORIES].map(x => x.id));
for (const x of [...all.lessons, ...all.stories]) if (taken.has(x.id)) { console.error('id 重複：' + x.id); process.exit(1); } else taken.add(x.id);

const out = `// Muse 撰寫、Claude 審稿修正的內容（由 tools/build-muse-batch.js 產生，請勿手動修改）
window.LESSONS.push(...${JSON.stringify(all.lessons, null, 2)});
window.STORIES.push(...${JSON.stringify(all.stories, null, 2)});
window.REACTIONS = ${JSON.stringify(all.reactions, null, 2)};
`;
fs.writeFileSync(path.join(root, 'content-muse.js'), out);
console.log(`課程 ${all.lessons.length}、短劇 ${all.stories.length}、口語反應 ${all.reactions.length} → content-muse.js`);

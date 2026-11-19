// 檢查 GitHub 上 main 分支有沒有「不是 Claude 從本機提交」的變更（例如 Muse 透過 App 直接改程式碼）
// 用法：node tools/check-commits.js        檢查最近 30 筆
// Claude 的提交都在本機用 noreply 信箱提交，並帶有 Co-Authored-By: Claude 標記。
const { execFileSync } = require('child_process');
const fs = require('fs');
const GH = fs.existsSync('C:\\Program Files\\GitHub CLI\\gh.exe') ? 'C:\\Program Files\\GitHub CLI\\gh.exe' : 'gh';
const REPO = 'Xiao-Xiang-Gu/hk-cantonese';
const OWN_EMAIL = '38275130+Xiao-Xiang-Gu@users.noreply.github.com';

const commits = JSON.parse(execFileSync(GH, ['api', `repos/${REPO}/commits?sha=main&per_page=30`], { encoding: 'utf8' }));
const suspicious = commits.filter(c => {
  const msg = c.commit.message || '';
  const byLocal = c.commit.committer && c.commit.committer.email === OWN_EMAIL;
  const byClaude = /Co-Authored-By: Claude/i.test(msg);
  return !(byLocal && byClaude);
});

if (!suspicious.length) {
  console.log(`✅ 最近 ${commits.length} 筆提交都是 Claude 從本機提交的。`);
} else {
  console.log(`⚠️ 發現 ${suspicious.length} 筆不是 Claude 提交的變更，請先確認再上線：`);
  for (const c of suspicious) {
    const files = JSON.parse(execFileSync(GH, ['api', `repos/${REPO}/commits/${c.sha}`], { encoding: 'utf8' })).files || [];
    console.log(`- ${c.sha.slice(0, 7)} ${c.commit.committer.date} 作者:${c.commit.author.name} 提交者:${c.commit.committer.email}`);
    console.log(`  ${c.commit.message.split('\n')[0]}`);
    console.log(`  改了：${files.map(f => f.filename).join('、') || '（無檔案）'}`);
  }
  process.exitCode = 2;
}

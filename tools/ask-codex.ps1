# 呼叫 Codex（唯讀模式），完成後自動更新「Codex對話紀錄.md」
# 用法：
#   .\tools\ask-codex.ps1 -Prompt "你的問題"
#   Get-Content prompt.txt -Raw | .\tools\ask-codex.ps1
param([string]$Prompt)

if (-not $Prompt) { $Prompt = ($input | Out-String) }
if (-not $Prompt.Trim()) { Write-Error "請提供提示內容"; exit 1 }

$codex = Get-Command codex -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source
if (-not $codex) { $codex = Join-Path $env:USERPROFILE ".codex\plugins\.plugin-appserver\codex.exe" }
if (-not (Test-Path $codex)) { Write-Error "找不到 Codex，請確認已安裝 Codex 桌面版或 CLI"; exit 1 }

# 固定使用 gpt-6.2-sol、中等推理強度（與使用者在 Codex 桌面版的設定一致）
$Prompt | & $codex exec --skip-git-repo-check --sandbox read-only -m gpt-6.2-sol -c model_reasoning_effort="medium" - 2>$null
$code = $LASTEXITCODE

# 更新易讀的對話紀錄
node (Join-Path $PSScriptRoot "codex-log.js") | Out-Null
exit $code

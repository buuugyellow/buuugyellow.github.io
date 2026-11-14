# 把本地某个目录里的 Markdown 复制进 docs/notes/，然后由 git 推送发布。
# 用法: pwsh ./scripts/publish-notes.ps1 -Source ..\research
param(
  [Parameter(Mandatory = $true)][string]$Source,
  [string[]]$Filter = @()   # 可选：只复制指定的文件名，例如 "cloth.md","hair.md"
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $repo 'docs/notes'
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }

Get-ChildItem -Path $Source -Filter *.md -Recurse | ForEach-Object {
  if ($Filter.Count -gt 0 -and $Filter -notcontains $_.Name) { return }
  if ($_.FullName -like "*\docs\*") { return }
  $target = Join-Path $dest $_.Name
  Copy-Item $_.FullName $target -Force
  Write-Host "copied: $($_.Name)"
}

Write-Host ''
Write-Host '下一步: 在 docs/.vitepress/config.mts 的 sidebar 里登记新页面，然后 git add/commit/push。' -ForegroundColor Cyan

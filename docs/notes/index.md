# 笔记

这里放日常技术笔记。把 `.md` 文件丢进 `docs/notes/`，再在上面的侧边栏配置里加一行，就会出现在导航中。

已收录：

- [《代码整洁之道》阅读笔记](./clean-code.md)
- [写作约定](./writing.md)

## 批量导入本地 Markdown

仓库根目录的 `scripts/publish-notes.ps1` 可以把某个目录里的 md 批量复制进 `docs/notes/`：

```powershell
pwsh ./scripts/publish-notes.ps1 -Source ..\research -Filter "cloth.md","hair.md"
```

完成后 `git add -A; git commit -m "notes: 新增笔记"; git push`，一两分钟后线上就更新了。

# 写作约定

为了让站点长期好维护，建议几条约定：

1. **一页一文件**：`docs/notes/xxx.md`，文件名用英文小写加连字符，中文标题写在 frontmatter 的 `title` 里。
2. **加 frontmatter**：至少写 `title`，可选 `date`、`tags`、`description`。
3. **图片放 `docs/public/`**：引用写成 `![](/img/xxx.png)`（项目仓库要带 base 前缀）。
4. **不发布的内容不要放进 docs/**：比如公司核查、个人隐私之类的草稿。

```md
---
title: 布料与柔体头发的实现对比
date: 2026-11-14
tags: [UE, 布料, 头发]
---

正文……
```

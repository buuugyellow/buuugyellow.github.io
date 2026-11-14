---
title: 这个站点是怎么搭起来的
date: 2026-11-14
tags: [GitHub Pages, VitePress]
---

# 这个站点是怎么搭起来的

1. 内容写在 `docs/` 下的 Markdown 文件里；
2. 推到 GitHub 的 `main` 分支；
3. `.github/workflows/deploy.yml` 里定义的 GitHub Actions 会自动 `pnpm build`；
4. 构建产物上传到 Pages，站点更新。

排版、搜索、导航都由 VitePress 处理，不用写 HTML。

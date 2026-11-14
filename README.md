# 个人网站（VitePress + GitHub Pages）

用 Markdown 写内容，`git push` 后由 GitHub Actions 自动构建并发布到 GitHub Pages。

## 一、首次上线（大约 5 分钟）

1. 在 GitHub 新建仓库，二选一：
   - `<你的用户名>.github.io` → 站点地址 `https://<你的用户名>.github.io/`，`base` 保持 `'/'`；
   - 任意名字（如 `blog`）→ 站点地址 `https://<你的用户名>.github.io/blog/`，把 `docs/.vitepress/config.mts` 里的 `base` 改成 `'/blog/'`。
2. 推送本目录：

```powershell
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git branch -M main
git push -u origin main
```

3. 仓库 Settings → Pages → Build and deployment → Source 选 **GitHub Actions**。
4. 等 `Deploy to GitHub Pages` 这个 Action 跑完，打开站点地址。

## 二、日常写作

把 `.md` 放进 `docs/`，`git add -A && git commit -m "notes: xxx" && git push`，1–2 分钟后线上更新。

本地预览（需要 Node 18+ 和 pnpm）：

```powershell
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # 产物在 docs/.vitepress/dist
```

## 三、要改的地方

| 位置 | 改什么 |
| --- | --- |
| `docs/.vitepress/config.mts` | 站点标题、导航、侧边栏、GitHub 链接、base |
| `docs/index.md` | 首页 hero 与特性卡片 |
| `docs/about.md` | 自我介绍 |
| `docs/notes/`、`docs/posts/` | 笔记与文章 |

## 四、绑定自定义域名（可选）

1. 域名 DNS 添加 CNAME 指向 `<你的用户名>.github.io`；
2. 仓库 Settings → Pages → Custom domain 填域名，勾选 Enforce HTTPS；
3. 仓库根目录会自动生成 `CNAME` 文件，别删。

## 五、注意

- 不要把包含隐私/敏感信息的 Markdown 放进 `docs/`，这个目录的全部内容都会公开。
- 中文文件名可用，但 URL 会被编码；建议文件名用英文，标题写在 frontmatter 的 `title` 里。

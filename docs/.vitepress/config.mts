import { defineConfig } from 'vitepress'

// 仓库是 <你的用户名>.github.io 时 base 用 '/'
// 仓库是普通项目仓库（如 blog）时，改成 '/blog/'
const base = '/'

export default defineConfig({
  lang: 'zh-CN',
  title: '你的名字',
  description: '个人网站 · 笔记 · 文章',
  base,
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: `${base}favicon.svg` }]],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/notes/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/notes/': [
        {
          text: '笔记',
          items: [
            { text: '总览', link: '/notes/' },
            { text: '《代码整洁之道》笔记', link: '/notes/clean-code' },
            { text: '写作约定', link: '/notes/writing' }
          ]
        }
      ]
    },

    socialLinks: [
      // 改成你的主页
      { icon: 'github', link: 'https://github.com/你的用户名' }
    ],

    search: { provider: 'local' },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新' },
    notFound: {
      title: '页面不存在',
      quote: '这个链接可能已经失效了。',
      linkLabel: '返回首页'
    }
  }
})

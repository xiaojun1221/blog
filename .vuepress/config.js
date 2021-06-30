module.exports = {
  title: "jun的个人空间",
  description: 'A simple and beautiful vuepress blog theme .',
  dest: 'public',
  base:'/blog/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  locales: {
    '/': {
      lang: 'zh-CN'
    },
    '/en/': {
      lang: 'en-US'
    }
  },
  theme: 'reco',
  themeConfig: {
    mode: 'auto', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    modePicker: true, // 默认 true，false 不显示模式调节按钮，true 则显示
    nav: [
      { text: '主页', link: '/', icon: 'reco-home' },
      { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
      { text: '文档', 
        icon: 'reco-message',
        items: [
          { text: 'vuepress-reco', link: '/docs/theme-reco/' }
        ]
      },
      { text: '联系', 
        icon: 'reco-message',
        items: [
          { text: 'GitHub', link: 'https://github.com/recoluan', icon: 'reco-github' }
        ]
      }
    ],
    // sidebar: {
    //   '/docs/theme-reco/': [
    //     '',
    //     'theme',
    //     'plugin',
    //     'api'
    //   ]
    // },  
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      }
    },
    friendLink: [
      {
        title: 'wj',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1107375748@qq.com',
        link: 'https://www.recoluan.com'
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
    ],
    logo: '/logo.png',
    //语言设置
    locales: {
      '/': {
        lang: 'zh-CN'
      }
    },
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'jun',
    // 作者头像
    authorAvatar: '/avatar.jpg',
    // 备案号
    record: '京ICP备17067634号-1',
    // 项目开始时间
    startYear: '2017',
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['341b87e4c93156276d7d584b935958b0'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    valineConfig: {
      appId: 'B3oj6Kv5jgMD8munwJDdnAhb-gzGzoHsz',// your appId
      appKey: '8dxKkQW06STemdjfzVQioSbs', // your appKey
    },
    codeTheme: 'tomorrow' // default 'tomorrow'
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ["shizuku"],
        // clean: true,
        modelStyle: {
          position: "fixed",
          left: "0px",
          bottom: "0px",
          opacity: "0.9",
          zIndex: 99999
        }
      }
    ],
    [
      'cursor-effects',
      {
         size: 2, // size of the particle, default: 2
         shape: ['star' | 'circle'], // shape of the particle, default: 'star'
         zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
    ["vuepress-plugin-boxx"]
  ],
}  

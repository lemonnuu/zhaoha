const nav = require('./config/nav/index')
const sidebar = require('./config/sidebar/index')
const plugins = require('./config/plugins/index')

module.exports = {
  title: '爪哈の源泉',
  description: '愿你眼里长着太阳，笑里全是坦荡',
  base: '/zhaoha/',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }], // 移动端优化
  ],
  themeConfig: {
    nav, // 导航栏
    sidebar, // 侧边栏
    subSidebar: 'auto', // 子侧边栏(右侧)
    logo: '/assets/logo.gif',
    author: '爪哈',
    authorAvatar: '/assets/logo.gif',
    type: 'blog', // 博客类型(非默认)
    startYear: '2022', // 项目开始时间
    lastUpdated: 'Last Updated', // 上次更新时间 - 必须和 git 绑定, 是根据 git 提交时间绑定的
    repo: 'https://github.com/lemonnuu/zhaoha', // 仓库链接, 会放在 nav 的最右侧(其实也可以不放仓库，弄个外链也可以的)
    // repo: 'https://www.baidu.com/', // 仓库链接, 会放在 nav 的最右侧(其实也可以不放仓库，弄个外链也可以的)
    // repoLabel: '查看源码', // 仓库名字, 不填默认为 github 图标 + GitHub
    editLinks: true, // 是否可编辑, 必须有 repo 才会显示
    // docsRepo: 'zhaoha', // 编辑的其他配置, 假如文档仓库和项目仓库不在一个仓库
    docsDir: 'docs', // 编辑的其他配置, 假如文档不是放在仓库的根目录下
    // docsBranch: 'master', // 编辑的其他配置, 假如文档放在一个特定的分支下
    // editLinkText: '帮助我们改善此页面！', // 编辑的文字, 默认为 Edit this page
    smoothScroll: true, // 平滑滚动效果
    noFoundPageByTencent: true, // 404 腾讯公益界面是否打开
    // record: 'ICP 备案文案',
    // recordLink: 'ICP 备案指向链接',
    // cyberSecurityRecord: '公安部备案文案',
    // cyberSecurityLink: '公安部备案指向链接',
    blogConfig: { // 博客配置
      socialLinks: [ // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/lemonnuu/zhaoha' },
        { icon: 'reco-bilibili', link: 'https://space.bilibili.com/650511936?spm_id_from=333.1007.0.0' },
        { icon: 'reco-juejin', link: 'https://juejin.cn/user/3922674154473816' },
        { icon: 'reco-zhihu', link: 'https://www.zhihu.com/people/tang-cu-lao-pai-gu-45' },
        { icon: 'reco-sf', link: 'https://segmentfault.com/u/zhao_ha' }
        
      ]
    },
    friendLink: [ // 友链
      {
        title: 'vuepress',
        desc: 'A minimalist static website generator.',
        avatar: "/assets/vuelogo.png",
        link: 'https://vuepress.vuejs.org/zh/'
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
    ],
    // vssueConfig: { // 评论配置
    //   platform: 'github',
    //   owner: 'OWNER_OF_REPO',
    //   repo: 'NAME_OF_REPO',
    //   clientId: 'YOUR_CLIENT_ID',
    //   clientSecret: 'YOUR_CLIENT_SECRET',
    // },
    // keyPage: {
    //   keys: ['e10adc3949ba59abbe56e057f20f883e', 'c33367701511b4f6020ec61ded352059'], // 可以是多个密码, 但需要是 md5 密文, 希望有开源精神！(123456, 654321)
    //   color: '#42b983', // 登录页动画球的颜色
    //   lineColor: '#42b983' // 登录页动画线的颜色
    // },
    noFoundPageByTencent: false
  },
  plugins,
}
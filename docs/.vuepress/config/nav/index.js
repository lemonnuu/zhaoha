module.exports = [
  {text: '主页', link: '/', icon: 'reco-home'},
  {
    text: '博客',
    icon: 'reco-document',
    items: [
      {text: '分类', link: '/categories/随笔/', icon: 'reco-category'},
      {text: '标签', link: '/tag/', icon: 'reco-tag'}
    ]
  },
  {
    text: '文档',
    icon: 'reco-document',
    items: [
      { text: 'vuepress', link: '/vuepressDoc/start/'},
      {
        text: '语言基础',
        items: [
          {text: 'HTML/CSS', link: '/none0/', icon: 'reco-document'},
          {text: 'JS', link: '/none1/', icon: 'reco-document'},
          {text: 'TS', link: '/none2/', icon: 'reco-document'},
          {text: 'node.js', link: '/none3/', icon: 'reco-document'},
        ]
      },
      {
        text: '前端框架',
        items: [
          {text: 'vue', link: '/vueuse/basic/', icon: 'reco-document'},
          {text: 'react', link: '/none5/', icon: 'reco-document'},
        ]
      },
      {
        text: '前端工程化&&工具',
        items: [
          {text: '模块化', link: '/none6/', icon: 'reco-document'},
          {text: 'webpack', link: '/webpack/01-basic/001_introduce', icon: 'reco-document'},
        ]
      },
    ]
  },
  {
    text: '算法',
    icon: 'reco-suggestion',
    items: [
      {text: '数据结构', link: '/none8/', icon: 'reco-document'},
      {
        text: '算法思想',
        items: [
          {text: '双指针', link: '/none9/', icon: 'reco-document'},
          {text: '贪心', link: '/none10/', icon: 'reco-document'},
        ]
      },
    ]
  },
  {text: '灵魂拷问😚', link: '/faq/', icon: 'reco-faq'},
  {text: '时间线', link: '/timeline/', icon: 'reco-date'},
]
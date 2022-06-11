const vueUseSidebar = require('./vueUseSidebar')
const webpackSidebar = require('./webpackSidebar')
const javaScriptSidebar = require('./javaScriptSidebar')
module.exports = {
  '/vuepressDoc/': [
    {
      title: '入门',
      collapsable: true,
      children: [
        ['start/', 'Introduction'],
        'start/writing'
      ]
    },
    {
      title: '进阶',
      collapsable: true,
      children: [
        ['advanced/', 'Introduction'],
        {
          title: '测试样式',
          collapsable: true,
          children: [
            ['advanced/test/', 'Introduction'],
            'advanced/test/create-component'
          ]
        },
        'advanced/revise'
      ]
    }
  ],
  '/vueuse/': vueUseSidebar,
  '/webpack/': webpackSidebar,
  '/JavaScript/': javaScriptSidebar,
}
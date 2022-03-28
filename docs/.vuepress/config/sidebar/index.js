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
  '/vue2/': [
    {
      title: '基础',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        ['basic/', 'Introduction'],
        ['basic/instruction', '基础一'],
        ['basic/computed', '基础二'],
      ]
    },
    {
      title: '源码解析',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        ['source/', 'Introduction'],
        {
          title: '源码解析一',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['source/test/', '源码1-1'],
            ['source/test/test1', '源码1-1'],
            ['source/test/test2', '源码1-2'],
          ]
        },
        ['source/document', '源码解析二'],
      ]
    },
  ],
}
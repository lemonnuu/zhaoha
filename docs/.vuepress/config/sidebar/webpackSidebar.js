module.exports = [
  {
    title: 'webpack初体验',
    collapsable: true,
    children: [
      ['01-basic/001_introduce', 'webpack究竟是什么?'],
      ['01-basic/002_installWebpack', '搭建webpack环境'],
      ['01-basic/003_webpackConfig', 'webpack的配置文件'],
    ]
  },
  {
    title: 'webpack核心概念',
    collapsable: true,
    children: [
      ['02-core/001_start', '前言-基础构建配置'],
      ['02-core/002_loader', '使用loader打包静态资源'],
      ['02-core/003_plugins', '使用plugin管控输出'],
      ['02-core/004_entry-output', 'entry与output基础配置'],
      ['02-core/005_source-map', 'source-map'],
      ['02-core/006_webpack-dev-server', 'webpack-dev-server'],
      ['02-core/007_hot-module-replacement', 'hot module replacement'],
      ['02-core/008_babel', '使用Babel处理ES6语法'],
      ['02-core/009_tree-shaking', 'tree shaking'],
      ['02-core/010_development-production', 'development与production'],
      ['02-core/011_environment-variable', '环境变量'],
      ['02-core/012_code-spliting', '代码分割'],
      ['02-core/013_lazy-prefetch-loading', '懒加载与预加载'],
      ['02-core/014_packageing-analysis', '打包分析'],
    ]
  },
]
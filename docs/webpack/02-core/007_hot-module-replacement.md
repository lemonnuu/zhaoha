---
title: hot module replacement
author: 爪哈
date: 2022-05-20
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

模块热替换(hot module replacement 或 HMR) 是 webpack 最有用的功能之一。
**它允许在运行时更新所有类型的模块, 而无需完全刷新页面。**

:::warning
HMR 不适用生产环境, 应当用于开发环境。
:::

## 启用 HMR

webpack 内置了 HMR 插件, 更新 webpack 配置即可。

```diff
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
+ const webpack = require('webpack')

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.css/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    devServer: {
+     hot: 'only',
      open: true
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name]-[contenthash:6].js',
      clean: true
    },
    plugins: [
      new HtmlWebpackPlugin(),
+     new webpack.HotModuleReplacementPlugin()
    ]
  }
```

:::warning 需要注意的是
使用 HMR 的时候, 需要满足两个条件：
- 配置 `devServer.hot` 为 true
- 使用 `webpack.HotModuleReplacementPlugin` 插件

但是你会发现, 只配置`devServer.hot` 为 true 也会使得 HMR 开启！

这是因为 webpack-dev-server 内部自动帮我们完成了这个事情：[源码地址](https://github.com/webpack/webpack-dev-server/blob/8bbef6adf6ae5f6a3109ecd4a6246223d2f77cb2/lib/utils/addEntries.js)

```js
if (options.hot || options.hotOnly) {
  config.plugins = config.plugins || [];
  if (
    !config.plugins.find(
      // Check for the name rather than the constructor reference in case
      // there are multiple copies of webpack installed
      (plugin) => plugin.constructor.name === 'HotModuleReplacementPlugin'
    )
  ) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
}
```
:::

**只是配置了 HMR 还是远远不够的, 还需要在代码中告诉 webpack 接受更新哪些模块**

例如这样

```diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());

+ if (module.hot) { // 如果开启了 HMR
+   module.hot.accept('./print.js', function() { // 接受更新的模块 - 以及如何处理
+     console.log('Accepting the updated printMe module!');
+     printMe();
+   })
+ }
```

这个是必需的, 否则开启了 HMR 没有告诉 webapck 如何处理也没有什么卵用。

然后, 你就会神奇的发现, 如果只是修改样式而且代码并没有写这一坨恶心的东西, 仍然可以做到 HMR。

这不是来骗我这个六十九岁的老同志嘛 :anger:

只能说, 还是太天真了。

`style-loader` 在幕后偷偷的使用了 `module.hot.accept`, 在 CSS 依赖模块更新后, 会将其修补到 `<style>` 标签中。

哪有什么岁月静好, 不过是有人替你负重前行罢了 :heavy_exclamation_mark:

## 其他框架和代码

还有很多的 loader 可以使 HMR 与各种框架或库平滑的交互......

- React Hot Loader : 实时调整 react 组件。
- Vue Loader : 此 loader 支持 vue 组件的 HMR, 提供开箱即用体验。
- Angular HMR : 没有必要使用 loader! 直接修改 NgModule 主文件就够了, 它可以完全控制 HMR API。
- Svelte Loader : 此 loader 开箱即用地支持 Sevlte 组件地热更新。
- Elm Hot webpack Loader : 支持 ELm 编程语言的 HMR。

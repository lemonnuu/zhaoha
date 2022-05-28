---
title: CSS文件的代码分割
author: 爪哈
date: 2022-05-28
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

默认情况下, CSS 是糅合在 JS 里的 (CSS in JS), 可以借助 `mini-css-extract-plugin` 将 CSS 从主应用程序中分离出来。

## [MiniCssExtractPlugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/)

安装：

```bash
npm install mini-css-extract-plugin -D
```

:::danger
建议 `mini-css-extract-plugin` 与 `css-loader` 一起使用。

不要同时使用 `mini-css-extract-plugin` 与 `style-loader` :heavy_exclamation_mark:
:::

### chunkFilename

在使用 `mini-css-extract-plugin` 之间, 先来聊一聊 `output.chunkFilename` 是什么概念。

webpack.config.js

```js {21}
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.css/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve('dist'),
    clean: true
  }
}
```

src/index.js

```js
import './style.css'

async function createComponent () {
  const {default: _} = await import('lodash')
  const div = document.createElement('div')
  div.innerHTML = _.join(['Hello', 'World!'], '***')
  return div
}

createComponent().then(ele => {
  document.body.appendChild(ele)
})
```

src/style.css

```css
body {
  background-color: rgb(211, 35, 35);
}
```

打包：

```bash {2}
PS C:\Users\an'an'a's\Desktop\extract-css> npx webpack
asset vendors-node_modules_lodash_lodash_js.chunk.js 550 KiB [compared for emit] (id hint: vendors)
asset main.js 34 KiB [emitted] (name: main)
asset index.html 231 bytes [compared for emit]
runtime modules 8.23 KiB 13 modules
cacheable modules 541 KiB
  modules by path ./node_modules/ 539 KiB
    modules by path ./node_modules/style-loader/dist/runtime/*.js 5.75 KiB
      ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 2.44 KiB [built] [code generated]
      ./node_modules/style-loader/dist/runtime/styleDomAPI.js 1.38 KiB [built] [code generated]
      + 4 modules
    modules by path ./node_modules/css-loader/dist/runtime/*.js 2.33 KiB
      ./node_modules/css-loader/dist/runtime/noSourceMaps.js 64 bytes [built] [code generated]
      ./node_modules/css-loader/dist/runtime/api.js 2.26 KiB [built] [code generated]
    ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
  modules by path ./src/ 1.87 KiB
    ./src/index.js 297 bytes [built] [code generated]
    ./src/style.css 1.11 KiB [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./src/style.css 478 bytes [built] [code generated]
webpack 5.72.1 compiled successfully in 552 ms
```

:::warning
`filename` 是主入口命名规则, 而 `chunkFilename` 是主入口内引入的 chunk(非主入口) 命名规则
:::

### 配置

`mini-css-extract-plugin` 不能与 `style-loader` 一起使用。

webpack.config.js

```diff
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
+ const MiniCssExtractPlugin = require('mini-css-extract-plugin')

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
      rules: [{
        test: /\.css/,
        use: [
-         'style-loader',
+         MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }]
    },
    plugins: [
      new HtmlWebpackPlugin(),
+     new MiniCssExtractPlugin({
+       filename: '[name].css',
+       chunkFilename: '[id].css'
+     })
    ],
    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      path: path.resolve('dist'),
      clean: true
    }
  }
```

打包

```bash {6}
PS C:\Users\an'an'a's\Desktop\extract-css> npx webpack
assets by path *.js 565 KiB
  asset vendors-node_modules_lodash_lodash_js.chunk.js 550 KiB [compared for emit] (id hint: vendors)
  asset main.js 15 KiB [compared for emit] (name: main)
asset index.html 270 bytes [compared for emit]
asset main.css 261 bytes [compared for emit] (name: main)
Entrypoint main 15.3 KiB = main.css 261 bytes main.js 15 KiB
runtime modules 9.01 KiB 17 modules
orphan modules 2.79 KiB [orphan] 3 modules
cacheable modules 532 KiB (javascript) 48 bytes (css/mini-extract)
  modules by path ./src/*.css 50 bytes (javascript) 48 bytes (css/mini-extract)
    ./src/style.css 50 bytes [built] [code generated]
    css ./node_modules/css-loader/dist/cjs.js!./src/style.css 48 bytes [built] [code generated]
  ./src/index.js 297 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
webpack 5.72.1 compiled successfully in 532 ms
```

mini-css-extract-plugin 也可以配置 `filename` 与 `chunkFilename` 选项, 用于指定生成的 CSS 文件命名规则。

#### filename

入口 CSS 文件的命名规则, 此入口指的是 HtmlWebpackPlugin 引入的 CSS 文件。

#### chunkFilename

非入口的 chunk CSS 文件命名规则。

## CSSMinimizerWebpackPlugin

如果想要压缩生成的 CSS 文件, 可以使用 `css-minimizer-webpack-plugin` 插件。

安装

```bash
npm install css-minimizer-webpack-plugin -D
```

webpack.config.js

```diff
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
+ const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
      rules: [{
        test: /\.css/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }]
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
+     new CssMinimizerWebpackPlugin()
    ],
    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      path: path.resolve('dist'),
      clean: true
    }
  }
```

如果是想压缩 JS 文件, 只需要将 `optimization.minimize` 设置为 true 即可。

```diff
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
      rules: [{
        test: /\.css/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }]
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new CssMinimizerWebpackPlugin()
    ],
+   optimization: {
+     minimize: true
+   },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      path: path.resolve('dist'),
      clean: true
    }
  }
```
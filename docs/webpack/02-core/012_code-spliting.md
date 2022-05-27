---
title: code spliting
author: 爪哈
date: 2022-05-26
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

## 代码分离

代码分离是 webpack 中最引人注目的特性之一。

此特性能够把代码分离到不同的 bundle 中, 然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle, 以及控制资源加载优先级。
如果使用合理, 会极大地影响加载时间。

常用的代码分离有三种方法：

- 入口起点 : 使用 `entry` 手动配置分离代码。
- 防止重复 : 使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk。
- 动态导入 : 通过模块的内联函数调用来分离代码。

### 入口起点

这是迄今为止最简单直观的代码分离方式。不过, 这种方式手动配置较多, 且有一些隐患。

project

```diff
  webpack-demo
  |- /node_modules
  |- package.json
  |- package-lock.json
  |- webpack.config.js
  |- /src
+   |- index.js
+   |- another-module.js
```

src/index.js

```js
const _ = require('lodash')

console.log(_.join(['hello', 'world'], '~'));
```

src/another-module.js

```js
import _ from 'lodash'

console.log(_.join(['hello', 'world'], '*'));
```

webpack.config.js

```diff
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    mode: 'development',
+   entry: {
+     main: './src/index.js',
+     another: './src/another-module.js'
+   },
    plugins: [
      new HtmlWebpackPlugin()
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[contenthash:6].js',
      clean: true
    }
  }
```

正如前面提到的, 这种方式存在一些隐患：

- 如果入口 chunk 之间包含一些重复的模块, 那么重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活, 并且不能动态地将逻辑代码拆分出来。

### dependOn

配置 `dependOn` option 选项, 可以实现在多个 chunk 之间共享模块：

webpack.config.js

```diff
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    mode: 'development',
-   entry: {
-     main: './src/index.js',
-     another: './src/another-module.js'
-   },
+   entry: {
+     main: {
+       import: './src/index.js',
+       dependOn: 'shared'
+     },
+     another: {
+       import: './src/another-module.js',
+       dependOn: 'shared'
+     },
+     shared: 'lodash'
+   },
    plugins: [
      new HtmlWebpackPlugin()
    ],
+   optimization: {
+     runtimeChunk: 'single'
+   },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[contenthash:6].js',
      clean: true
    }
  }
```

如果要在一个 HTML 页面上使用多个入口时, 还需设置 `optimization.runtimeChunk: 'single'`。

打包：

```bash
PS C:\Users\an'an'a's\Desktop\test> npx webpack
asset shared-29db25.js 550 KiB [emitted] [immutable] (name: shared)
asset runtime-b4f750.js 7.59 KiB [emitted] [immutable] (name: runtime)
asset another-a058b6.js 1.68 KiB [emitted] [immutable] (name: another)
asset main-f5ae8b.js 1.33 KiB [emitted] [immutable] (name: main)
asset index.html 378 bytes [emitted]
Entrypoint main 1.33 KiB = main-f5ae8b.js
Entrypoint another 1.68 KiB = another-a058b6.js
Entrypoint shared 558 KiB = runtime-b4f750.js 7.59 KiB shared-29db25.js 550 KiB
runtime modules 3.63 KiB 8 modules
cacheable modules 531 KiB
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
  ./src/another-module.js 71 bytes [built] [code generated]
  ./src/index.js 76 bytes [built] [code generated]
webpack 5.72.1 compiled successfully in 326 ms
```

尽可能避免使用多入口 :heavy_exclamation_mark:

## SplitChunksPlugin

`splitChunkPlugin` 插件可以将公共的依赖模块提取到已有的入口 chunk 中, 或者提取到一个新生成的 chunk。

webpack.config.js

```diff
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    mode: 'development',

-   entry: {
-     main: {
-       import: './src/index.js',
-       dependOn: 'shared'
-     },
-     another: {
-       import: './src/another-module.js',
-       dependOn: 'shared'
-     },
-     shared: 'lodash'
-   },
+   entry: {
+     main: './src/index.js',
+     another: './src/another-module.js'
+   },
    plugins: [
      new HtmlWebpackPlugin()
    ],
    optimization: {
-     runtimeChunk: 'single'
+     splitChunks: {
+       chunks: 'all'
+     }
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[contenthash:6].js',
      clean: true
    }
  }
```

打包：

```bash
PS C:\Users\an'an'a's\Desktop\test> npx webpack
asset vendors-node_modules_lodash_lodash_js-37b263.js 550 KiB [emitted] [immutable] (id hint: vendors)
asset another-1dc623.js 8.71 KiB [emitted] [immutable] (name: another)
asset main-cd0394.js 6.98 KiB [emitted] [immutable] (name: main)
asset index.html 362 bytes [emitted]
Entrypoint main 557 KiB = vendors-node_modules_lodash_lodash_js-37b263.js 550 KiB main-cd0394.js 6.98 KiB
Entrypoint another 559 KiB = vendors-node_modules_lodash_lodash_js-37b263.js 550 KiB another-1dc623.js 8.71 KiB
runtime modules 6.43 KiB 13 modules
cacheable modules 531 KiB
  ./src/index.js 76 bytes [built] [code generated]
  ./src/another-module.js 71 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
webpack 5.72.1 compiled successfully in 323 ms
```

### 默认值

默认情况下, `SplitChunksPlugin` 只会影响到按需加载(动态导入)的 chunks, 因为修改 initial chunks 会影响到项目的 HTML 文件中的脚本标签。

webpack 将根据以下条件自动拆分 chunks：

- 新的 chunk 可以被共享, 或者模块来自于 `node_modules` 文件夹
- 新的 chunk 体积大于 20kb (在进行 min + gz 之前的体积)
- 当按需加载 chunks 时, 并行请求的最大数量小于或等于 30
- 当加载初始化页面时, 并行请求的最大数量小于或等于 30

当尝试满足最后两个条件时, 最好使用较大的 chunks。

默认配置：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

#### splitChunks.chunks

表明将选择哪些 chunk 进行优化。 当提供一个字符串, 有效值为 `async`(异步), `initial`(同步) 和 `all`(全部)。

#### splitChunks.minSize

模块被生成 chunk 需满足的最小体积。

#### splitChunks.maxSize

生成的 chunk 最大大小, chunk 由符合缓存组的模块混合而成。

#### splitChunks.minRemainingSize

在 webpack 5 中引入了 `splitChunks.minRemainingSize` 选项，通过确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块。
'development' 模式中默认为 0。
对于其他情况，`splitChunks.minRemainingSize` 默认为 `splitChunks.minSize` 的值，因此除需要深度控制的极少数情况外，不需要手动指定它。

#### splitChunks.minChunks

模块共享的 chunk 数大于此值才能被拆分(拆分至少被 n 个 chunk 引入), 注意是共享的 chunk 数而不是文件数, 默认为 1。

#### splitChunks.maxAsyncRequests

按需加载时最大并行请求数, 默认为 30。

#### splitChunks.maxInitialRequests

入口点的最大并行请求数, 默认为 30。

#### splitChunks.automaticNameDelimiter

默认情况下, webpack 将使用 chunk 的来源和名称生成名称(例如 `vendors~main.js`)。

此选项用于指定名称的分隔符, 默认为 `~`。

#### splitChunks.cacheGroups

当 `splitChunks.chunks` 设置为 `'all'` 时：

- 异步模块(按需加载)会进行 code spliting
- 同步代码还需要满足 `splitChunks.cacheGroups` 的条件才行。

缓存组可以继承和覆盖来自 `splitChunks.*` 的任何选项, 但是 `test`、`priority` 和 `reuseExisitingChunk` 只能在缓存组级别进行配置。
将它们设置为 `false` 以禁用任何默认缓存组。

##### splitChunks.cacheGroups.{cacheGroup}.test

缓存组的匹配规则。

##### splitChunks.cacheGroups.{cacheGroup}.priority

一个模块可以属于多个缓存组, 将优先考虑具有更高 `priority`(优先级) 的缓存组。

##### splitChunks.cacheGroups.{cacheGroup}.reuseExistingChunk

当为 `true` 时, 如果当前 chunk 包含已从主 bundle 中拆分出的模块, 则她将被重用, 而不是生成新的模块。这可能会影响 chunk 的结果文件名。

默认为 `true`。

## 动态导入(dynamic import)

可以使用 `import()` 语法来实现动态导入, 动态导入实际上也使用了 splitChunksPlugin。

project

```diff
  webpack-demo
  |- /node_modules
  |- package.json
  |- package-lock.json
  |- webpack.config.js
  |- /src
+   |- index.js
```

src.index.js

```js
function createComponent() {
  return import('lodash').then(({default: _}) => {
    const element = document.createElement('div')
    element.innerHTML = _.join(['hello', 'world'], '***')
    return element
  })
}

createComponent().then((component) => {
  document.body.appendChild(component)
})
```

webpack.config.js

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[contenthash:6].js',
    clean: true
  }
}
```

由于 `import()` 会返回一个 promise, 因此它可以和 `async` 函数一起使用。

src/index.js

```js
async function createComponent() {
  const {default: _} = await import('lodash')
  const element = document.createElement('div')
  element.innerHTML = _.join(['hello', 'world'], '***')
  return element
}

createComponent().then((component) => {
  document.body.appendChild(component)
})
```

打包：

```bash
PS C:\Users\an'an'a's\Desktop\test> npx webpack
asset vendors-node_modules_lodash_lodash_js-37b263.js 550 KiB [emitted] [immutable] (id hint: vendors)
asset main-a831e5.js 14.2 KiB [emitted] [immutable] (name: main)
asset index.html 238 bytes [emitted] [compared for emit]
runtime modules 7.93 KiB 11 modules
cacheable modules 532 KiB
  ./src/index.js 295 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
webpack 5.72.1 compiled successfully in 329 ms
```

### 魔法注释

这样一来, 单独为 lodash 生成了一个 chunk, 可以使用魔法注释更换 chunk 名字：

```diff
  async function createComponent() {
-   const {default: _} = await import('lodash')
+   const {default: _} = await import(/* webpackChunkName: 'lodash' */'lodash')
    const element = document.createElement('div')
    element.innerHTML = _.join(['hello', 'world'], '***')
    return element
  }

  createComponent().then((component) => {
    document.body.appendChild(component)
  })
```

打包：

```bash
PS C:\Users\an'an'a's\Desktop\test> npx webpack
asset lodash-4d9c7b.js 550 KiB [emitted] [immutable] (name: lodash) (id hint: vendors)
asset main-03856f.js 14.2 KiB [emitted] [immutable] (name: main)
asset index.html 238 bytes [emitted] [compared for emit]
runtime modules 7.93 KiB 11 modules
cacheable modules 532 KiB
  ./src/index.js 327 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
webpack 5.72.1 compiled successfully in 337 ms
```

:::warning
魔法注释 (`/* webpackChunkName: 'lodash' */`) 可以改变动态导入生成的 chunk 名。
:::
---
title: tree shaking
author: 爪哈
date: 2022-05-21
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

## tree shaking

`tree shaking`(摇树) 是一个术语, 用于描述移除 JavaScript 上下文中未引用的代码(dead-code)。

可以将应用程序想象成一颗树, 绿色表示实际用到的 source code(源码) 和 library(库), 是树上活着的树叶。
黄色表示 dead coe(未引用代码), 是枯萎的树叶。
为了除去枯萎的树叶, 必须摇动这棵树, 使它们落下。

:::danger
**tree shaking 依赖于 ES Moduel 的静态结构特性, 例如 `import` 和 `export`, 不支持 Common JS。**

`development` 环境下, tree shaking 是默认关闭的, `production` 环境下, tree shaking 是默认打开的。
:::

### 示例

src/math.js

```js
export function add (a, b) {
  return a + b
}

export function minus (a, b) {
  return a - b
}
```

src/index.js

```js
import { add } from './math'

add(1, 2)
```

webpack.config.js

```js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  }
}
```

示例中, `minus` 方法并没有被使用, 但是打包生成的 main.js 仍然会包含它。

![006-未使用tree-sahking](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/006-未使用tree-sahking.png)

现在, 来使用 tree shaking :heavy_exclamation_mark:

```diff
  const path = require('path')

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
+   optimization: {
+     usedExports: true
+   },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true
    }
  }
```

development 环境下, 为了让 souce map 定位到源代码的位置, 仍然会保留 dead code, 但会标记为未使用。

![007-development环境下的tree-shaking](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/007-development环境下的tree-shaking.png)

production 环境下, 是会不引入 dead code 的。

## sideEffects

### 将文件标记为 side-effect-free(无副作用)

在一个纯粹的 ESM 模块世界中, 很容易识别哪些文件有副作用。然而, 我们的项目无法达到这种纯度。
所以, 有必要提示 webpack compiler 哪些代码是纯粹部分。

:::danger side effect
side effect(副作用) 的定义是, 在导入时会执行特殊行为的代码, 而不仅仅是暴露一个 export 或多个 export。例如 polyfill, 它影响全局作用域, 并且通常不提供 export, 类似实现 `window.Promise` 这样的。

简单的说就是, tree shaking 只能够识别被 `import` 导入的模块有没有被使用, 例如像 `import './index.css'` 这样没有具体的模块是无法识别的。
:::

### sideEffects 配置

`sideEffects` 参数配置在 package.json 文件中, 用于告知 webpack 哪些是有"副作用"的引入, 可以是一个数组。

```js {4}
{
  "name": "tree-shaking",
  "version": "1.0.0",
  "sideEffects": ["*.css", "core-js/stable"],
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.18.0",
    "@babel/plugin-transform-runtime": "^7.18.0",
    "@babel/preset-env": "^7.18.0",
    "babel-loader": "^8.2.5",
    "core-js": "^3.22.5",
    "webpack": "^5.72.1",
    "webpack-cli": "^4.9.2"
  }
}
```

如果所有的代码都不包含副作用, 可以简单的将该属性标记为 `false`, 告知 webpack 可以安全的删除未用到的 export。

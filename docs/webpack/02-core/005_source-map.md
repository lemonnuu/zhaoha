---
title: source map
author: 爪哈
date: 2022-05-18
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

## source map

:heavy_check_mark: **当 webpack 打包源代码时, 可能会很难追踪到 error(错误) 和 warning(警告) 在源代码中的原始位置。**

例如, 如果将三个源文件(`a.js`, `b.js` 和 `c.js`) 打包到一个 bundle (`bundle.js`) 中, 而其中一个源文件包含一个错误, 那么堆栈跟踪就会直接指向到 `bundle.js`。
但是, 我们往往需要准确的知道错误来自哪个源文件, 而不是这种无用的信息。

:heavy_check_mark: 为了更容易地追踪 error 和 warning, JavaScript 提供了source map 功能, 它实际上就是一个 vlq 编码的信息文件, 保存着源代码的映射关系。

webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  }
}
```

## devtool

:::warning
:heavy_check_mark: development(开发) 模式下, source map是默认开启的, production(生产) 模式下, source map 是默认关闭的。

webpack5 的 `devtool` 配置项已经不能配置为 `'none'` 了, webpack4 可以采用此配置关闭 source map。
:::

**source map 有众多风格, 不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。**

:heavy_check_mark: **devtool 的风格模式可自由组合, 但不要混淆字符串的顺序: `[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`**

:o: `source-map` 会单独生成一个 `.js.map` 文件, 用于储存与源代码的映射关系。

:o: `inline-*` 不会单独生成文件, 而是以 base64 编码的形式写在 main.js 里头。

:o: `cheap-*` 不会映射列, 只会映射行, 且不映射第三方库。

:o: `cheap-module-*` module 必须搭配 cheap 使用, 在 cheap 的基础上映射第三方库代码。

:o: `eval` 每个模块都使用 `eval()` 执行, 且都有 `//@ sourceURL`, 此选项构建非常块! 但是, 映射的是转换后的代码, 而不是源代码。

:o: `eval-*` 每个模块使用 `eval()` 执行, 且会将 source map 转换为 DataUrl 后添加到 `eval()` 中, 能够正确映射, 初始化时较慢, 但重新构建时速度较快。

:o: `hidden-*` 与 `source-map` 相同, 但不会为 bundle 添加引用注释, 也就是不会向浏览器暴露 source map。

:o: `nosources-*` 创建的 source map 不包含 sourcesContent(源代码内容)。这只会暴露文件名和结构, 但不暴露原始代码。

## 环境选择配置

:::danger 生产环境下
:heavy_check_mark: source map 文件不应该被部署到 web 服务器, 而只是将其用于错误报告工具, 且应该将服务器配置为：不允许普通用户访问 source map 文件!

`nosources-*` 勉强可以部署到 web 服务器。
:::

### 生产环境

**生产环境一般不生成 source map, 如果需要, 可以使用 `nosources-cheap-module-source-map`。**

### 开发环境

:heavy_check_mark: **开发环境可以使用 `eval-cheap-module-source-map`。**

### 特定场景

针对一些第三方工具等特定场景, 可以使用 `inline-cheap-module-source-map`。

## source map 原理

分析一下 source map 生成的 `.js.map` 文件。
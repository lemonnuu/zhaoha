---
title: entry与output基础配置
author: 爪哈
date: 2022-05-17
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

## 多个入口起点

webpack.config.js

```js
module.exports = {
  entry: './src/index.js',
};
```

`entry` 属性的单个入口语法, 是以下形式的简写:

webpack.config.js

```js
module.exports = {
  entry: {
    main: './src/index.js',
  },
};
```

:heavy_check_mark: 上面的 "main" 实际上是 chunk name, 当采用默认配置时, 打包生成的文件名会默认采用 chunk name。

输出文件名是可以通过 `output.filename` 进行配置的：

```js
module.exports = {
  //...
  output: {
    filename: '[name].[contenthash].bundle.js',
  },
};
```

:heavy_check_mark: **虽然此选项被称为文件名, 但是还是可以使用像 `'js/[name]/bundle.js'` 这样的文件夹结构。**

### 占位符

可以使用以下占位符(通过 webpack 内部的 TemplatedPathPlugin):

编译层面:

- `[fullhash]` : compilation 完整的 hash 值
- `[hash]`<Badge type="error" text="废弃"/> : 同上, 但已弃用

chunk 层面:

- `[id]` : 此 chunk 的 ID
- `[name]` : 如果设置, 则为此 chunk 的名称, 否则使用 chunk 的 ID
- `[chunkhash]` : 此 chunk 的 hash 值, 包含该 chunk 的所有元素
- `[contenthash]` : 此 chunk 的 hash 值, 只包括该内容类型的元素(受 `optimization.realContentHash` 影响)

模块层面:

- `[id]` : 模块的 ID
- `[moduleid]`<Badge type="error" text="废弃"/> : 同上, 但已弃用
- `[hash]` : 模块的 Hash 值
- `[modulehash]`<Badge type="error" text="废弃"/> : 同上, 但已弃用
- `[contenthash]` : 模块内容的 Hash 值

文件层面:

- `[file]` : filename 和路径, 不含 query 或 fragment
- `[query]` : 带前缀 `?` 的 query
- `[fragment]` : 带前缀 `#` 的 fragment
- `[base]` : 只有 filename(包含扩展名), 不含 path
- `[filebase]`<Badge type="error" text="废弃"/> : 同上, 但已弃用
- `[path]` : 只有 path, 不含 filename
- `[name]` : 只有 filename, 不含扩展名或 path
- `[ext]` : 带前缀 `.` 的扩展名(对 output.filename不可用)

URL层面:

- `[url]` : URL

### 分离app(应用程序)和vendor(第三方库)入口<Badge type="warning" text="不建议"/>

webpack.config.js

```js
module.exports = {
  entry: {
    main: './src/app.js',
    vendor: './src/vendor.js',
  },
};
```

webpack.prod.js

```js
module.exports = {
  output: {
    filename: '[name].[contenthash].bundle.js',
  },
};
```

webpack.dev.js

```js
module.exports = {
  output: {
    filename: '[name].bundle.js',
  },
};
```

**这是什么？** 这是告诉 webpack 需要配置 2 个单独的入口点。

**为什么？** 这样可以在 `vendor.js` 中存入未做修改的必要 library 或文件(例如 Bootstrap, jQuery, 图片等资源), 
然后将它们打包在一起成为单独的 chunk。内容哈希保持不变, 这使浏览器可以独立地缓存它们, 从而减少了加载时间。

:::danger
:heavy_check_mark: 在 webpack < 4 时一般这样干, webpack >= 4 时是使用 `optimization.splitChunks` 选项, 将 vendor 与 app 模块分开, 并为其创建一个单独的文件。

不要为 vendor 或其他不是执行起点创建 entry。
:::

### 多页面应用程序

webpack.config.js

```js
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
  },
};
```

**这是什么？** 这是告诉 webpack 需要 3 个独立分离的依赖图。

**为什么？** 在多页面应用程序中, server 会拉取一个新的 HTML 文档给客户端, 页面重新加载此新文档, 并且资源被重新下载。
然而, 这给了我们特殊的机会去做很多事情, 例如使用 `optimization.splitChunks` 为页面间共享的应用程序代码创建 bundle。
由于入口起点数量的增多, 多页应用能够复用多个起点之间的大量代码/模块!!!

## hash, chunkhash, contenthash区别 

:::warning
hash 一般是结合 CDN 缓存来使用的, 当经过 webpack 构建后, 希望生成对应文件名自动带上对应的 MD5 值。
如果文件内容改变的话, 对应文件哈希值也应该改变, 对应 HTML 引用的 URL 地址就会变化, 从而触发更新本地缓存。
:::

hash, chunkhash, contenthash 还是有一定区别的:

:heart: `[hash]`与整个项目构建相关, 全部文件共用相同的 hash 值, 只要**项目**里有文件更改, 整个项目构建的 hash 值都会改变。

采用 hash 计算的话, 每一次构建后生成的哈希值都不一样, 即使文件内容压根没有改变, 这样是没办法实现缓存效果的。

:yellow_heart: `[chunkhash]` 和 `[hash]` 不一样, 只有当 chunk 块依赖的代码发生改变时, 它才会变化, 否则其哈希值不会受到影响。

chunkhash 虽然可以实现缓存效果, 但是却不够完美, 如果只是 chunk 块所依赖的很小一部分代码发生改变, 整个 chunk 块都将重新构建, 即使是未改变的部分,
例如 chunk 块的 js 文件发生改变, 但 css 文件却没有任何变化。

:green_heart: 这个时候, 就需要用到 `[contenthash]`, 它会对 chunk 更细一步划分为内容 content, 生成 contenthash。

## 每个入口使用多种文件类型

在不使用 `import` 样式文件的应用程序中(预单页应用程序或其他原因), 使用一个数组结构的 entry, 并在其中传入不同类型的文件, 
可以实现将 CSS 和 JavaScript (和其他) 文件分离在不同的 bundle。

举个例子。我们有一个具有两种页面类型的 PHP 应用程序：
home(首页) 和 account(帐户)。home 与应用程序其余部分（account 页面）具有不同的布局和不可共享的 JavaScript。
我们想要从应用程序文件中输出 home 页面的 home.js 和 home.css，为 account 页面输出 account.js 和 account.css。

home.js

```js
console.log('home page type');
```

home.scss

```scss
// home page individual styles
```

account.js

```js
console.log('account page type');
```

account.scss

```scss
// account page individual styles
```

在 production(生产) 模式中使用 MiniCssExtractPlugin 作为 CSS 的一个最佳实践。

webpack.config.js

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    home: ['./home.js', './home.scss'],
    account: ['./account.js', './account.scss'],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
```

由于我们未指定其他输出路径，因此使用以上配置运行 webpack 将输出到 ./dist。./dist 目录下现在包含四个文件：

- home.js
- home.css
- account.js
- account.css
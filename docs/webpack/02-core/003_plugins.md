---
title: 使用plugin管控输出
author: 爪哈
date: 2022-05-11
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

## plugin

plugin 是 webpack 的支柱功能。webpack 自身也是构建于 webpack 配置中用到的相同插件系统上。

plugin 是一个具有 `apply` 方法的 JavaScript 对象。`apply` 方法会被 webpack compiler 调用, 并且在整个编译生命周期都可以访问 compiler 对象。

plugin 可以在 webpack 运行到某个时刻的时候, 帮你做一些事情, 有点类似于生命周期。

### 用法

插件可以携带参数/选项, 必须在 webpack 配置中, 向 `plugins` 属性传一个 `new` 实例。

取决于 webpack 用法, 对应多种插件使用方式。

#### 配置方式

webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
```

`ProgressPlugin` 用于自定义编译过程中的进度报告, `HtmlWebpackPlugin` 将生成一个 HTML 文件, 并在其中使用 `script` 引入打包后的 JS 文件。

#### Node API 方式

在使用 Node API 时, 还可以通过配置中的 `plugins` 属性传入插件。

```js
const webpack = require('webpack'); // 访问 webpack 运行时(runtime)
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);

new webpack.ProgressPlugin().apply(compiler);

compiler.run(function (err, stats) {
  // ...
});
Tip
```

:::warning
你知道吗：以上看到的示例和 webpack 运行时(runtime)本身极其类似。webpack 源码中隐藏有大量使用示例, 可以将其应用在自己的配置和脚本中。
:::

## html-webpack-plugin

`HtmlWebpackPlugin` 简化了 HTML 文件的创建, 该插件可以生成一个 HTML 文件。

### 安装

```bash
npm install html-webpack-plugin -D
```

### 基本用法

该插件将会生成一个 HTML5 文件, 并在 body 域中使用 `script` 标签引入 webpack 生成的所有 bundle。

只需要添加该插件到 webpack 配置中, 如下所示：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

这将会生成一个包含以下内容的 `dist/index.html` 文件：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

如果有多个 webpack 入口, 他们都会在已生成 HTML 文件中的 `<script>` 标签内引入。

如果在 webpack 的输出中有任何 CSS 资源 (例如, 使用 MiniCssExtractPlugin 提取的 CSS), 那么这些资源也会在 HTML 文件 `<head>` 元素中的 `<link>` 标签内引入。

### 配置

`html-webpack-plugin` 的常用配置有：

| Name         | Type                 | Default       | Description                                                                                                                               |
| :----------- | :--------------------| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `template`   | `{String}`           |               | `webpack` 模板的相对或绝对路径。默认情况下, `src/index.ejs` 如果存在, 将使用它。                                                               |
| `title`      | `{String}`           | `Webpack App` | 生成的 HTML 标题                                                                                                                           |
| `filename`   | `{String | Function}`| `index.html`  | 将 HTML 写入到的文件, 默认为 `index.html`。也可以在此指定子目录 `assets/admin.html`。也可以是一个函数, 例如`(entryName) => entryName + ".html"` |
| `publicPath` | `{String | 'auto'}`  | `auto`        | 用于脚本和链接的 publicPath                                                                                                                 |

例如：

```js
{ 
  entry : 'index.js' , 
  output : { 
    path : __dirname  +  '/dist' , 
    filename : 'index_bundle.js' 
  } , 
  plugins : [ 
    new  HtmlWebpackPlugin ( { 
      title : 'My App' , 
      filename : 'assets/admin .html' 
    } ) 
  ] 
}
```

## 清理`/dist`文件夹

打包多次后, `/dist` 文件夹可能会相当杂乱, 通常比较推荐的做法是, 在每次构建前清理 `/dist` 文件夹, 这样只会剩余最后生成的文件。

在 webpack4 时期, 需要用到 `clean-webpack-plugin`, webpack5 则只需要将 `output.clean` 设置为 true 即可。

### clean-webpack-plugin

#### 安装

```bash
npm install clean-webpack-plugin -D
```

#### 使用

```js
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new CleanWebpackPlugin()],
};
```

### `output.clean`

```js
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
    clean: true
  }
};
```

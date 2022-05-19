---
title: webpack-dev-server
author: 爪哈
date: 2022-05-19
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

:anger: 在每次更改完代码后, 手动运行 `npm run build` 重新打包会很麻烦 :heavy_exclamation_mark:

可不可以在代码发生变化后能够自动编译代码 :question:

:new_moon: 可以, 不但可以, 还不止一种方式 :full_moon:

webpack 提供几种可选方式, 可以在代码发生改变后后自动编译：

1. webpack --watch
2. webpack-dev-server
3. webpack-dev-middleware

:::danger
当然还是首选 webpack-dev-server 啦 :heavy_exclamation_mark:
:::

## watch mode

可以通过 `webpack --watch` 命令指示 webpack 监听依赖图中所有文件的更改, 只要其中文件发生更改, 代码将会被重新编译。

package.json

```json {5}
{
  "name": "test",
  "version": "1.0.0",
  "scripts": {
    "watch": "webpack --watch"
  },
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^6.7.1",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.1",
    "webpack": "^5.72.1",
    "webpack-cli": "^4.9.2"
  }
}
```

在命令行中运行 `npm run watch`, 编译完成后并没有退出命令行, 这是因为 script 当前还在 watch 文件。

**`webpack --watch` 唯一的缺点就是需要刷新浏览器才能够看见变化。**

要是修改完代码自动编译后还能自动刷新浏览器就好了, 真是人丑还想得美, 满足你 :heavy_exclamation_mark:

## webpack-dev-server

`webpack-dev-server` 可以提供一个基本的 web server, 并且具有 live reloading(实时重新加载)功能。

安装

```bash
npm install webpack-dev-server -D
```

package.json

```json {6}
{
  "name": "test",
  "version": "1.0.0",
  "scripts": {
    "watch": "webpack --watch",
    "dev": "webpack-dev-server"
  },
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^6.7.1",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.1",
    "webpack": "^5.72.1",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.9.0"
  }
}
```

现在, 文件将可以通过 `http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]` 进行访问。

:::danger
webpack-dev-server 在编译后不会写入任何输出文件至硬盘, 而是将 bundle 文件保留在了内存中, 然后将它们 serve 到 server 中, 就好像是它们挂载在 server 根路径上的真实文件一样。
:::

### 配置

`webpack-dev-server` 具有许多可配置的选项, 下面列举一些常用的：

- `devServer.open` : 设置为 `true` 可在服务启动后自动打开默认浏览器
- `devServer.host` : 指定服务的 host
- `devServer.port` : 指定服务的端口
- `devServer.static` : 配置从目录提供静态文件的选项, 默认是 'public' 文件夹, 设置为 `false` 禁用, 可以是一个数组
- `devServer.hot` : 启用热模块更新特性
- `devServer.proxy` : 开启代理, 可解决浏览器的跨域问题, 用于接口请求

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: '8005',
    static: ['./public', './static'],
    hot: 'only',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[contenthash:6].js',
    clean: true
  }
}
```


## webpack-dev-middleware

`webpack-dev-middleware` 可以用来实现一个自己的 webpack-dev-server。 (可以, 但没必要, 但必须知道怎么做的) :heavy_exclamation_mark:

`webpack-dev-middleware` 是一个封装器(wrapper), 它可以把 webpack 处理过的文件发送到一个 server。

webpack-dev-server 在内部使用了它, 但是它也可以作为一个单独的 package 使用。

这个需要在 node 环境中使用, 安装：

```bash
npm install express webpack-dev-middleware -D
```

package

```diff
  webpack-demo
  |- /node_modules
  |- package.json
  |- package-lock.json
  |- /src
    |- index.js
    |- index.css
  |- webpack.config.js
+ |- serve.js
```

serve.js

```js
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
const compiler = webpack(config)

const app = express()
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.listen(3000, () => {
  console.log('The server is runing on port 3000!');
})
```

package.json

```diff
{
  "name": "test",
  "version": "1.0.0",
  "scripts": {
    "watch": "webpack --watch",
    "dev": "webpack-dev-server",
+   "serve": "node serve.js"
  },
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^6.7.1",
    "express": "^4.18.1",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.1",
    "webpack": "^5.72.1",
    "webpack-cli": "^4.9.2",
    "webpack-dev-middleware": "^5.3.3",
    "webpack-dev-server": "^4.9.0"
  }
}
```

需要注意的是, serve.js 只实现了代码更改自动编译代码的操作, 并不会自动刷新浏览器, 如果要实现和 webpack-dev-server 一样的功能, 需要添加非常多的东西。
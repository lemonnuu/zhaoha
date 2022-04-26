---
title: webpack 究竟是什么？
author: 爪哈
date: 2022-04-26
---

## webpack 出现的背景

### "远古时期"

在很久很久以前...... 咱们的代码结构可能是这样滴 :dash: :dash: :dash:

```
├── index.html       # 页面
├── index.js         # 业务逻辑
```

:::details 代码可能是这样的
- `index.html`
```html {12}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpack test</title>
</head>
<body>
  <h1>webpack test</h1>
  <div id="root"></div>
  <script src="./index.js"></script>
</body>
</html>
```
- `index.js`
```js
var root = document.getElementById('root')

var header = document.createElement('div')
header.innerText = 'header'
root.append(header)

var sidebar = document.createElement('div')
sidebar.innerText = 'sidebar'
root.append(sidebar)

var content = document.createElement('div')
content.innerText = 'content'
root.append(content)
```
:::

随着业务逻辑逐渐复杂, `index.js` 文件里的内容就会变得越来越大越来越大, 最终变得难以维护 :grimacing: :grimacing: :grimacing:

### "古代"

又发展了许久....... 面向对象的编程思想出现了, `index.js` 被抽离成很多个不同的 js 文件再引入到页面中, 咱们的代码结构可能就变成了这样 :dash: :dash: :dash:

```
├── index.html         # 页面
├── index.js           # 业务逻辑
├── header.js          # 业务逻辑
├── sidebar.js         # 业务逻辑
├── content.js         # 业务逻辑
```

:::details 代码可能变成了这样
- `index.html`
```html {12-15}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpack test</title>
</head>
<body>
  <h1>webpack test</h1>
  <div id="root"></div>
  <script src="./header.js"></script>
  <script src="./sidebar.js"></script>
  <script src="./content.js"></script>
  <script src="./index.js"></script>
</body>
</html>
```
- `header.js`
```js
function Header () {
  var header = document.createElement('div')
  header.innerText = 'header'
  root.append(header)
}
```
- `sidebar.js`
```js
function Sidebar () {
  var sidebar = document.createElement('div')
  sidebar.innerText = 'sidebar'
  root.append(sidebar)
}
```
- `content.js`
```js
function Content () {
  var content = document.createElement('div')
  content.innerText = 'content'
  root.append(content)
}
```
- `index.js`
```js
var root = document.getElementById('root')

new Header()
new Sidebar()
new Content()
```
:::

但是这样一来, JS 文件都是在页面中引入的, 文件只能按照 `<script>` 标签的书写顺序进行加载, 
首先咱们得理清各个 JS 文件之间的依赖关系并手动维护加载次序, 其次全局作用域下容易造成变量之间的相互冲突,
并且, 这样查错麻烦, 同样不好维护, 另外, 页面的 http 请求数也会增加, 网页加载速度也会变慢 :expressionless: :expressionless: :expressionless:

### "近代"

如果能在 `index.js` 中引入其他的 JS 文件, 在页面中只引入 `index.js` 就再好不过了, 由此, 模块化的概念应运而生 :kissing_closed_eyes:

:::details 代码可能又变成了这样
- `index.html`
```html {12-15}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpack test</title>
</head>
<body>
  <h1>webpack test</h1>
  <div id="root"></div>
  <script type="module" src="./index.js"></script>
</body>
</html>
```
- `header.js`
```js
function Header () {
  var header = document.createElement('div')
  header.innerText = 'header'
  root.append(header)
}

export default Header
```
- `sidebar.js`
```js
function Sidebar () {
  var sidebar = document.createElement('div')
  sidebar.innerText = 'sidebar'
  root.append(sidebar)
}

export default Sidebar
```
- `content.js`
```js
function Content () {
  var content = document.createElement('div')
  content.innerText = 'content'
  root.append(content)
}

export default Content
```
- `index.js`
```js
import Header from "./header"
import Sidebar from "./sidebar"
import Content from "./content"

var root = document.getElementById('root')

new Header()
new Sidebar()
new Content()
```
:::

但是哩, 模块化的方案有很多, 而主流浏览器目前仅支持 ESModules, 且还存在环境兼容问题; 随着模块的细分, 文件太碎, 网络请求频繁的问题仍未解决;
尤为重要的是, 不仅 JS 需要模块化, 所有的前端资源都需要模块化。

### "now"

有没有一种可能, 能让咱们开发阶段用 ES6 语法, 生产阶段却能出现相应 ES5 代码, 从而抹平环境兼容问题 :drooling_face: :drooling_face:

![0001-webpack由来](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0001-webpack由来.png)

有没有一种可能, 能让咱们开发阶段模块化, 生产阶段却将各个模块糅合成一个文件, 从而减少网络请求次数 :drooling_face: :drooling_face:

![0002-webpack由来](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0002-webpack由来.png)

有没有一种可能, 不仅能把 JS 模块化, 还能把其他前端资源给模块化了 :drooling_face: :drooling_face:

![0003-webpack由来](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0003-webpack由来.png)

### 模块打包工具

对于前两个需求, 借助构建系统配合一些编译工具就可以实现, 但对于最后一个需求就很难通过这个方式去解决了。

由此, 需要请出咱们今天的主角 : 模块打包工具 :heavy_check_mark:

主流的模块打包工具有 webpack, Rollup 与 Parcel, 在这里, 咱们主要了解 webpack 的相关知识。

## webpack 究竟是什么？

:::tip
webpack is a module bundler. (webpack 是一个静态模块打包工具)
:::

本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。
当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，
然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。
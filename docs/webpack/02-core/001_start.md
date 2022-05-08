---
title: 前言-基础构建配置
author: 爪哈
date: 2022-05-06
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

为了更好的讲解, 在开始了解 webpack 核心概念之前, 我们先来搭建一个基础配置。

首先, 新建一个目录, 初始化 npm, 然后在本地安装 `webpack`, `webpack-cli` 以及 `lodash`。

```bash
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli -D
npm install lodash -S
```

接下来, 创建以下目录结构、文件和内容：

project

```diff
  webpack-demo
  |- /node_modules
  |- package.json
  |- package-lock.json
+ |- /dist
+   |- index.html
+ |- /src
+   |- index.js
+ |- webpack.config.js
```

src/index.js

```js
import _ from 'lodash'

function component () {
  const element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack'], '')
  return element
}

document.body.append(component())
```

dist/index.html

```html {10}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpack demo</title>
</head>
<body>
  <script defer src="main.js"></script>
</body>
</html>
```

webpack.config.js

```js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

然后调整一下 `package.json` 文件。

package.json

```diff
  {
    "name": "webpack-demo",
    "version": "1.0.0",
-   "description": "",
-   "main": "index.js",
    "scripts": {
-     "test": "echo \"Error: no test specified\" && exit 1"
+     "build": "webpack"
    },
-   "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^5.72.0",
      "webpack-cli": "^4.9.2"
    },
    "dependencies": {
      "lodash": "^4.17.21"
    }
  }
```

现在, 就可以运行 `npm run build` 命令来打包项目了 :cow: :cow: :cow:

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset main.js 554 KiB [emitted] (name: main)
runtime modules 1.25 KiB 6 modules
cacheable modules 532 KiB
  ./src/index.js 214 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
webpack 5.72.0 compiled successfully in 303 ms
```

:::warning
需要注意的是, webpack 不会更改代码中除 `import` 和 `export` 以外的语句。
在使用其他 ES6 特性时, 确保在 webpack loader 系统中使用了一个像是 Babel 的转译器。
:::


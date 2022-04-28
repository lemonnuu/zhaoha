---
title: webpack的配置文件
author: 爪哈
date: 2022-4-28
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

## webpack初体验

当搭建好 webpack 环境后, 就可以利用 webpack 来打包项目资源了。假设工程目录如下:

```
├── node_modules
├── index.js
├── package.json
```

运行 `npx webpack ./index.js` 即可以 `index.js` 为入口文件进行打包, 打包后工程目录为:

```
├── dist
   ├── main.js       # webpack 打包输出文件
├── node_modules
├── index.js
├── package.json
```

打包主要输出文件的默认值为 `./dist/main.js`

## webpack配置文件

当命令行不指定打包入口时, 将需要用到 webpack 配置文件。
从 v4.0.0 版本开始, webpack 拥有默认配置文件, 可以不用再引入一个配置文件来打包项目, 但默认配置往往不满足实际运用场景。

### webpack默认配置文件

**webpack 配置文件名默认为 `webpack.config.json`, 尽可能使用它。**

如果需要以其他文件为配置文件进行打包, 需要配置 `config` 参数, 如

```shell
npx webpack --config webpackconfig.js
```

:::warning webpack默认配置:
```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};
```

由于 webpack 是基于 node 的, 须采用 CommonJS 规范导出配置文件
:::

当采用 webpack 默认配置时, 入口起点为 `./src/index.js`, 主要输出文件为 `./dist/main.js`, 
其他生成文件默认放置在 `./dist` 文件夹中。

如果不指定 mode, 将默认以 `production` 生产环境打包。

### webpack利用配置文件打包

webpack利用配置文件打包的方式有两种:

- 利用 npx 打包
```shell
npx webpack
```
- 利用 npm scripts 形式, 在 package.json 中声明脚本, 然后运行 `npm run xxx`
```js
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack"
  },
  "author": "爪哈",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2"
  }
}
```
```shell
npm run build
```

:::danger
在不添加 loader 的情况下, webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力, 并不能理解其他任何类型的文件。
:::

---
title: 环境变量
author: 爪哈
date: 2022-05-22
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

如果想要消除 `webpack.config.js` 在开发环境和生产环境之间的差异, 可能需要环境变量。

webpack 命令行环境配置的 `--env` 参数, 可以允许传入任意数量的环境变量, 在 `webpack.config.js` 中可以访问到这些环境变量。

**但是对于 webpack 配置, 有一个必须要修改的地方。通常, `module.exports` 指向配置对象, 要使用 `env` 变量, 必须将 `module.exports` 转换成一个函数。**

```bash
npx webpack --env production --env goal=local
```

webpack.config.js

```js
const path = require('path')
const {merge} = require('webpack-merge')

const comConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  }
}

const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].js',
  }
}

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name]-[contenthash:5].js',
  }
}

module.exports = (env) => {
  console.log(env);
  if (env.production) {
    return merge(comConfig, prodConfig)
  } else {
    return merge(comConfig, devConfig)
  }
}
```

打印的 env 为：

```bash
> webpack --env production --env goal=loacl

{
  WEBPACK_BUNDLE: true,
  WEBPACK_BUILD: true,
  production: true,
  goal: 'loacl'
}
```

**如果设置 `env` 变量, 却没有赋值, `--env production` 默认表示 `env.production` 设置为 true。**
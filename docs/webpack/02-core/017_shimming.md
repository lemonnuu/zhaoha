---
title: shimming
author: 爪哈
date: 2022-05-28
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

## shimming concept

webpack compiler 能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写的模块。

shimming(垫片) 只是一个类似于"兜底"的概念, 像 polyfill 实际就是一个 shimming。

下面是 shimming 的两种用例。

## 全局依赖

一些第三方库可能会引用一些全局依赖(例如 JQuery 中的 $, 挂载至 window 对象上), 因此这些 library 也可能会创建一些需要导出的全局变量。

这些 "broken modules(不符合规范的模块)" 就是 shimming 发挥作用的地方。

:::warning
不推荐使用全局依赖 :heavy_exclamation_mark: webpack 背后的理念是使前端开发更加模块化。
:::

要实现全局依赖, 需要使用 `ProvidePlugin` 插件。

使用 `ProvidePlugin` 后, 能够在 webpack 编译的每个模块中, 通过访问一个变量来获取一个 package。

如果 webpack 看到模块中用到这个变量, 它将在最终的 bundle 中引入给定的 package。

src/index.js

```js
function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}

document.body.appendChild(component());
```

注意其中并没有引入 `lodash`

webpack.config.js

```diff
  const path = require('path');
+ const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
+   plugins: [
+     new webpack.ProvidePlugin({
+       _: 'lodash',
+     }),
+   ],
  };
```

这么做的本质就是告诉 webpack:

如果遇到了 `_` 变量的模块实例, 就将 `lodash` package 引入进来。

还可以使用 `ProvidePlugin` 暴露出某个模块的单个导出, 通过配置一个"数组路径"(例如 [module, child, ...children]) 实现此功能。

例如, 无论 `join` 方法在何处调用, 都只获取到 `lodash` 提供的 `join` 方法。

src/index.js

```diff
function component() {
  const element = document.createElement('div');
- element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+ element.innerHTML = join(['Hello', 'webpack'], ' ');
  return element;
}

document.body.appendChild(component());
```

webpack.config.js

```diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join'],
      }),
    ],
  };
```

## 改变 this 指向

一些遗留模块依赖的 this 指向的是 window 对象。

而当模块运行在 CommonJS 上下文中, 这将变成一个问题, `this` 指向的是 `module.exports`。

在这种情况下, 可以通过 `imports-loader` 覆盖 `this` 指向。

webpack.config.js

```diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
+   module: {
+     rules: [
+       {
+         test: require.resolve('./src/index.js'),
+         use: 'imports-loader?wrapper=window',
+       },
+     ],
+   },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join'],
      }),
    ],
  };
```
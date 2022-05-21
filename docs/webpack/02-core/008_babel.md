---
title: 使用Babel处理ES6语法
author: 爪哈
date: 2022-05-21
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

在日常的开发中, 往往都是使用 ES6 语法去编写我们的代码, 但是一些浏览器可能并不认识这些"新语法" (IE: 你小子说谁呢) :anger:

如果能够实现编写时使用 ES6 语法, 但生产却能够输出 ES5 语法或相应 polyfills 就再好不过了, **babel 是一个很好的选择。**

## webpack 中使用 Babel

Babel 是一个 JavaScript 编译器, 主要用于将 ECMAScript 2015+ 代码转换为向后兼容的 JavaScript 版本。

Babel 有很多使用场景, 在 webpack 中使用 babel 主要是借助 `babel-loader`, 此外还需要安装 babel 的核心库 `@babel/core` 与 预设 `@babel/preset-env`。

安装：

```bash
npm install babel-loader @babel/core @babel/preset-env -D 
```

`babel-loader` 只是衔接 webpack 与 Babel 的桥梁, 要实现语法转换, 还得靠 `@babel/preset-env`。

webpack.config.js

```diff
  const path = require('path')

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
+   module: {
+     rules: [
+       {
+         test: /\.js$/,
+         exclude: /node_modules/,
+         use: {
+           loader: 'babel-loader',
+           options: {
+             presets: ['@babel/preset-env']
+           }
+         }
+       }
+     ]
+   },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true
    }
  }
```

使用 babel 转译时, 需要排除转译第三方库, 因为它们一般都是已经转译过了的, 包含进去会拖慢 webpack 打包速度。

src/index.js

```js
const arr = [
  new Promise(() => {})
]

arr.map(item => {
  console.log(item);
})
```

dist/main.js 片段

```js
eval("var arr = [new Promise(function () {})];\narr.map(function (item) {\n  console.log(item);\n});\n\n//# sourceURL=webpack://babeltest/./src/index.js?");
```

`const` 这样的 ES6 语法已经转译成了 `val` 这样的 ES5 语法, 但是 `Promise` 与 `map` 却没有变化, 因为 ES5 没有这样的概念, 需要 polyfill。

## @babel/polyfill 与 core-js

### @babel/polyfill

`@babel/polyfill` 实际就是包含一个自定义的 `regenerator 运行时` 和 `core-js`。它会污染全局变量, 自 Babel 7.4.0 开始已经被废弃

虽然 `@babel/polyfill` 已经被弃用, 但是取而代之的是 `core-js/stable`, 不过需要保证是安装了 `core-js@3`。

```bash
npm install core-js@3 -D
```

src/index.js

```diff
+ import "core-js/stable";

  const arr = [
    new Promise(() => {})
  ]

  arr.map(item => {
    console.log(item);
  })
```

手动引入 `core-js/stable` 会一股脑的将 polyfill 全部引入到打包后的文件中, 导致文件体积很大。

```bash {2}
PS C:\Users\an'an'a's\Desktop\babeltest> npx webpack
asset main-02bd7d.js 887 KiB [emitted] [immutable] (name: main)
runtime modules 1.13 KiB 5 modules
modules by path ./node_modules/core-js/modules/*.js 299 KiB
  ./node_modules/core-js/modules/es.symbol.js 308 bytes [built] [code generated]
  ./node_modules/core-js/modules/es.json.stringify.js 2.87 KiB [built] [code generated]
  ./node_modules/core-js/modules/es.symbol.description.js 2.47 KiB [built] [code generated]
  ./node_modules/core-js/modules/es.symbol.async-iterator.js 216 bytes [built] [code generated]
  + 260 modules
modules by path ./node_modules/core-js/internals/*.js 197 KiB
  ./node_modules/core-js/internals/path.js 71 bytes [built] [code generated]
  ./node_modules/core-js/internals/export.js 2.53 KiB [built] [code generated]
  ./node_modules/core-js/internals/global.js 592 bytes [built] [code generated]
  ./node_modules/core-js/internals/object-get-own-property-descriptor.js 1.1 KiB [built] [code generated]
  + 213 modules
./src/index.js 116 bytes [built] [code generated]
./node_modules/core-js/stable/index.js 10.1 KiB [built] [code generated]
webpack 5.72.1 compiled successfully in 1541 ms
```

如果需要转译生成器(generator)或异步函数(async)到 ES5, 并且 `@babel/core` 或 `@babel/plugin-transform-regenerator` 版本低于 `7.18.0`, 还必须加载 `regenerator runtime` 包。

就像这样

```diff
  import "core-js/stable";
+ import "regenerator-runtime/runtime";

  const arr = [
    new Promise(() => {})
  ]

  arr.map(item => {
    console.log(item);
  })
```

### core-js

除了手动引入 `core-js/stable` 外, 还可以将 `@babel/preset-env` 的 `useBuiltIns` 参数设置为 `usage` 编译时自动引入。

需要注意的是, 这需要使用到 `@babel/plugin-transform-runtime` 插件, 且需要指定 `core-js` 的版本, 默认是 2。

:::warning
`core-js@2` 已经封锁了分支, 新特性都将添加至 `core-js@3` 中, 不过 `core-js@3` 会增加打包体积。
:::

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
            loader: 'babel-loader',
            options: {
-             presets: ['@babel/preset-env']
+             presets: [['@babel/preset-env', {
+               useBuiltIns: 'usage',
+               corejs: 3
+             }]],
+             plugins: ['@babel/plugin-transform-runtime']
            }
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

src/index.js

```diff
- import "core-js/stable";

  const arr = [
    new Promise(() => {})
  ]

  arr.map(item => {
    console.log(item);
  })
```

这样一来, 只会将使用到的 ployfill 打包入文件中, 大大减少文件体积。

```bash {2}
PS C:\Users\an'an'a's\Desktop\babeltest> npx webpack
asset main-8d74af.js 160 KiB [emitted] [immutable] (name: main)
runtime modules 1.13 KiB 5 modules
modules by path ./node_modules/core-js/internals/*.js 63.7 KiB
  ./node_modules/core-js/internals/to-string-tag-support.js 210 bytes [built] [code generated]
  ./node_modules/core-js/internals/define-built-in.js 953 bytes [built] [code generated]
  ./node_modules/core-js/internals/object-to-string.js 371 bytes [built] [code generated]
  ./node_modules/core-js/internals/export.js 2.53 KiB [built] [code generated]
  + 102 modules
modules by path ./node_modules/core-js/modules/*.js 15.8 KiB
  ./node_modules/core-js/modules/es.object.to-string.js 397 bytes [built] [code generated]
  ./node_modules/core-js/modules/es.promise.js 332 bytes [built] [code generated]
  ./node_modules/core-js/modules/es.array.map.js 598 bytes [built] [code generated]
  ./node_modules/core-js/modules/es.promise.constructor.js 9.54 KiB [built] [code generated]
  ./node_modules/core-js/modules/es.promise.all.js 1.39 KiB [built] [code generated]
  + 4 modules
./src/index.js 222 bytes [built] [code generated]
webpack 5.72.1 compiled successfully in 997 ms
```

其实, `@babel/preset-env` 的 `useBuiltIns` 参数设置为 `usage` 时, 会自动加载 `@babel/plugin-transform-runtime` 插件。

这样配置效果是一样的：

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
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3
              }]],
-             plugins: ['@babel/plugin-transform-runtime']
            }
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

### .babelrc

当 babel 配置项非常多的时候, 都罗列在 `webpack.config.js` 会显得很臃肿, 可以把 `babel-loader` 的 options 配置项配置在 `.babelrc` 文件中。

```diff
  babeltest
  |- /node_modules
  |- package.json
  |- package-lock.json
+ |- .babelrc
  |- /src
    |- index.js
  |- webpack.config.js
```

需要注意的是, `.babelrc` 文件是 json 形式的。

.babelrc

```json
{
  "presets": [["@babel/preset-env", {
    "useBuiltIns": "usage",
    "corejs": 3
  }]]
}
```

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
            loader: 'babel-loader',
-           options: {
-             presets: [['@babel/preset-env', {
-               useBuiltIns: 'usage',
-               corejs: 3
-             }]]
-           }
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

## @babel/preset-env

前面提到了很多 `@babel/preset-env`, 但它究竟是个什么玩意儿呢 :question: :question: :question:

`@babel/preset-env` 是一个智能预设, 允许开发者使用最新的 JavaScript, 而无需微观管理目标环境需要哪些语法转换以及 polyfill。(very nice)

`@babel/preset-env` 借助了一些很棒的开源项目, 比如 `browserslist`、`compat-table`、和 `electron-to-chromium`。
它利用这些数据源来维护目标环境获得了JavaScript语法或浏览器功能支持的映射, 以及这些语法及功能到 core-js 的映射。

### 浏览器列表集成

对于基于浏览器或 Electron 的项目, 建议使用 `.browserslistrc` 文件来指定目标。

许多生态系统中的许多工具都在使用它, 例如熟悉的 `autoprefixer`, 还有 `stylelint`、`eslint-plugin-compat`等等。

默认情况下, `@babel/preset-env` 将基于 `.browserslistrc` 的配置项提供支持, 除非设置了 `target` 或 `ignoreBrowserslistConfig` 选项。

### 参数

`@babel/preset-env` 有很多参数, 这里只列举几个常用的：

#### target

`target` 选项表示需要支持的目标浏览器, 没有指定则会采用 `.browserslistrc` 配置。

举个栗子：

```json
{
  "targets": "> 0.25%, not dead"
}
```

```json
{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}
```

#### useBuiltIns

`useBuiltIns` 选项表示 polyfill 引入的方式, 有 `false`, `'entry'`, `usage` 三种方式, 默认为 `false`。

- `false` : 表示不引入 polyfill, 耶稣也救不了它。
- `entry` : 需要手动引入 `polyfill`, 如 `import 'core-js/stable'`, 且 `useBuiltIns` 未设置但手动引入后, 相当于设置成了 `entry`。
- `usage` : 转译时自动引入 `polyfill`, 需要得到 `@babel/plugin-transform-runtime` 的小小帮助。

:::danger
如果需要使用, 强烈推荐 `usage`。
:::

#### corejs

`corejs` 选项只在 `useBuiltIns: 'usage'` 时有效, 用于指定转译的 `core-js` 版本。
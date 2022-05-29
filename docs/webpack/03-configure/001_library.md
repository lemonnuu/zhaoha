---
title: library的打包
author: 爪哈
date: 2022-05-29
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

## 创建一个library

除了打包应用程序, webpack 还可用于打包 JavaScript library。

假设正在编写一个名为 `webpack-number` 的小 library, 可以将数字 1 到 5 转换为文本表示, 反之亦然, 例如将 2 转换为 'two'。

project

```diff
+ |- /node_modules
+ |- webpack.config.js
+ |- package.json
+ |- package-lock.json
+ |- /src
+   |- index.js
+   |- ref.json
```

src/ref.json

```json
[{
    "num": 1,
    "word": "One"
  },
  {
    "num": 2,
    "word": "Two"
  },
  {
    "num": 3,
    "word": "Three"
  },
  {
    "num": 4,
    "word": "Four"
  },
  {
    "num": 5,
    "word": "Five"
  },
  {
    "num": 0,
    "word": "Zero"
  }
]
```

src/index.js

```js
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.num === num ? ref.word : accum;
    },
    ''
  );
}

export function wordToNum(word) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum;
    },
    -1
  );
}
```

webpack.config.js

```js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js'
  }
}
```

### Expose the library

到目前为止, 一切都应与打包应用程序一样, 这里是不同的部分。

#### 标签引入

`output.library` 配置项暴露从入口导出的内容。

```diff
  const path = require('path')

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
+     library: "webpackNumbers",
    }
  }
```

**但是它只能通过被 `script` 标签引用而发挥作用, 它不能运行在 CommonJS、AMD、Node.js 等环境中**, 例如在生成的 dist 目录下新建 test.html。

dist/test.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./webpack-numbers.js"></script>
</head>
<body>
  <script>
    window.webpackNumbers.wordToNum('Five');
  </script>
</body>
</html>
```

实际上, 导出的对象将被挂载至 window 对象上。

#### 模块化引入

作为一个库作者, 当然希望它能够兼容不同的环境, 也就是说, 用户应该能够通过以下方式使用打包后的库：

- CommonJS module require:

```js
const webpackNumbers = require('webpack-numbers');
// ...
webpackNumbers.wordToNum('Two');
```

- AMD module require:

```js
require(['webpackNumbers'], function (webpackNumbers) {
  // ...
  webpackNumbers.wordToNum('Two');
});
```

- ES module require:

```js
import {wordToNum} from 'webpack-numbers';
// ...
wordToNum('Two');
```

- script tag:

```html
<script src="./webpack-numbers.js"></script>
<script>
  window.webpackNumbers.wordToNum('Five');
</script>
```

要支持模块化使用的方式, 只需要指定 `library.type` 为 `'umd'` 即可。

```diff
  const path = require('path')

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
-     library: "webpackNumbers",
+     library: {
+       name: 'webpackNumbers',
+       type: 'umd'
+     }
    }
  }
```

:::warning
在老版本的 webpack, 则是指定 `libraryTarget` 为 `'umd'`

```diff
  const path = require('path')

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
      library: "webpackNumbers",
+     libraryTarget: 'umd'
    }
  }
```
:::

### 外部化限制

现在, 如果进行打包, 会发现创建了一个体积相当大的文件, 原因是 lodash 也被打包到代码中了。

在这种场景中, 更倾向于把 lodash 当作 peerDependency, 换句话说, 使用者应该已经安装过 `lodash`。

可以使用 `externals` 配置项将 lodash 限制为外部依赖。

```diff
  const path = require('path')

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
      library: {
        name: 'webpackNumbers',
        type: 'umd'
      },
    },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_',
+     },
+   },
  }
```

## 发布至npm

现在, 只需要在 package.json 文件中暴露包的入口即可, 这里应该是 `dist/webpack-numbers.js` 文件。

```diff
  {
    ...
+   "main": "dist/webpack-numbers.js",
    ...
  }
```

或者, 将其添加为标准模块：

```diff
  {
    ...
+   "module": "src/index.js",
    ...
  }
```

这里的 `main` 是参照 `package.json` 标准, 而 `module` 是参照一个提案, 此提案允许 JavaScript 生态系统升级使用 ES2015 模块, 而不会破坏向后兼容性。

:::warning
module 属性应指向一个使用 ES2015 模块语法的脚本，但不包括浏览器或 Node.js 尚不支持的其他语法特性。
这使得 webpack 本身就可以解析模块语法，如果用户只用到 library 的某些部分，则允许通过 tree shaking 打包更轻量的包。
:::

### 登录npm账号

在 [npm](https://www.npmjs.com/) 注册好账号后, 可使用 `npm adduser` 命令登录账号。

:::danger
这里需使用 npm 官方源, 不可使用淘宝镜像 :heavy_exclamation_mark:
:::

```bash
npm adduser
```

登录成功后可使用 `npm who am i` 查看是否登录成功

```bash
npm who am i
```

### 发布

:::warning
需要注意的是, npm 上每个 package 包名不能重复, 如果重复就换一个名字即可。
:::

package.json

```diff
  {
+   "name": "webpack-numbers-zhaoha",
    ...
  }
```

一切准备就绪后, 就可通过 `npm publish` 将 package 发布至 NPM 官方网站上了 :100:

```bash
npm publish
```

OK :heavy_exclamation_mark: very nice :heavy_exclamation_mark:
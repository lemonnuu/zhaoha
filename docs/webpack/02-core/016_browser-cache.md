---
title: 浏览器缓存
author: 爪哈
date: 2022-05-28
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

在了解浏览器缓存之前, 先来了解以下 manifest 是什么。

在使用 webpack 构建的典型应用程序中, 有三种主要的代码类型：

- 源码
- 源码依赖的任何第三方 "library" 或 "vendor"
- webpack 的 runtime 和 manifest, 管理所有模块的交互

## runtime

浏览器运行过程中, webpack 用来连接模块化应用程序所需的的所有代码

- 在模块交互时, 连接模块所需的加载和解析逻辑
- 已经加载到浏览器中的连接模块逻辑, 以及尚未加载模块的延时加载逻辑

## manifest

当 compiler 开始执行、解析和映射应用程序时, 它会保留所有模块的详细要点, 这个数据集合成为 "manifest"。

通俗的讲, manifest 就是 chunk 之间的关系数据集合, 而runtime 会通过 manifest 来解析和加载模块。

无论选择哪种模块语法, 那些 `import` 或 `require` 语句都会转换为 `__webpack_require__` 方法, 此方法指向模块标识符(module identifier)。

通过使用 manifest 中的数据, runtime 能够检索这些标识符, 找出每个标识符背后对应的模块。

:::danger
在 chunk 里, 注入了 runtime 和 manifest, 而注入的 runtime 和 manifest 在每次构建后都会发生变化 :heavy_exclamation_mark:
:::

通过 `WebpackManifestPlugin` 插件, 可以将 manifest 数据提取为一个 JSON 文件以供使用。

## 缓存

浏览器使用了一种名为缓存的技术, 通过命中缓存, 可以降低网络流量, 使网站加载速度更快。

然而, 如果我们在部署新版本时不更改资源的文件名, 浏览器可能会认为它没有被更新, 就会使用它的缓存版本。
由于缓存的存在, 当需要获取新的代码时, 就会显得更棘手。

可以通过配置, 确保 webpack 编译生成的文件能够被客户端缓存, 而在文件内容变化后, 能够请求到新的文件。

:::danger
实际上就是当文件内容变化后, 编译生成不同的文件名即可。
:::

将输出的文件名加入 `contenthash` 即可。

```js {11,12}
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin()
  ],
  output: {
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[contenthash].js',
    path: path.resolve('dist'),
    clean: true
  }
}
```

:::danger
在老版本的 webpack 中, 虽然文件没有被修改, 但是再次构建时, 文件名却会改变 :heavy_exclamation_mark:

这是因为注入的 runtime 和 manifest 在每次构建后都会发生变化, 而这个被认为是 content 的一部分导致的。

输出结果和 webpack 版本有关, 新版本的就不会出现这样的问题, 但是仍然推荐提取引导模块和确定模块标识符, 确认结果可靠。
:::

### 提取引导模板

`optimization.runtimeChunk` 选项可以将 runtime 代码拆分为一个单独的 chunk。

将其设置为 `single` 来为所有 chunk 创建一个 runtime bundle :

webpack.config.js

```diff
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  
  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
      new HtmlWebpackPlugin()
    ],
+   optimization: {
+     runtimeChunk: 'single',
+   },
    output: {
      filename: '[name]-[contenthash].js',
      chunkFilename: '[name]-[contenthash].js',
      path: path.resolve('dist'),
      clean: true
    }
  }
```

### 模块标识符

如果添加或移除的依赖时, 模块标识符可能会发生改变。

每个 `module.id` 会默认地基于解析顺序(resolve order)进行增量。也就是说, 当解析顺序发生变化, ID 也会随之变化。

当 `module.id` 发生改变时, contenthash 也会随之改变, 可以将 `optimization.moduleIds` 配置为确定性的(`deterministic`)。

webpack.config.js

```diff
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  
  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
      new HtmlWebpackPlugin()
    ],
    optimization: {
+     moduleIds: 'deterministic',
      runtimeChunk: 'single',
    },
    output: {
      filename: '[name]-[contenthash].js',
      chunkFilename: '[name]-[contenthash].js',
      path: path.resolve('dist'),
      clean: true
    }
  }
```


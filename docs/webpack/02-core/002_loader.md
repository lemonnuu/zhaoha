---
title: 使用loader打包静态资源
author: 爪哈
date: 2022-05-06
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

前面说到, **webpack 只能理解 JavScript 和 JSON 文件, 想要处理其他类型的文件, 就必须使用 loader。**

loader 可以使得 webpack 有能力去处理其他类型的文件, 并将它们转换为有效模块, 添加到依赖图中。

## 使用loader

loader 有两种使用方式：

- **配置方式<Badge text="推荐" /> : 在 webpack.config.json 文件中指定 loader。**
- 内联方式 : 在每个 `import` 语句中显式指定 loader。

在 webpack4 版本还可以通过 CLI 使用 loader, 但是在 webpack5 中被废弃。

### 配置方式

示例：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```

`module.rules` 允许在 webpack 配置中指定多个 loader。

:::danger
**在 webpack 配置定义 rules 时, 一定要定义在 `module.rules` 中, 而不是 `rules` 中** :exclamation: :exclamation: :exclamation:
:::

**loader 从右到左 (或从下到上) 的取值与执行。** 在上面的例子中, 从 sass-loader 开始执行, 然后执行 css-loader, 最后执行 style-loader。

### 内联方式

可以在 `import` 语句或任何与 "import" 方法同等的引用方法中指定 loader。
使用 `!` 将资源中的 loader 分开。每个部分都会相对于当前目录解析。

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

通过为内联 `import` 语句添加前缀, 可以覆盖配置中的所有 loader, preLoader 和 postLoader :

- 使用 `!` 前缀, 将禁用所有已配置的 normal loader (普通 loader)

```js
import Styles from '!style-loader!css-loader?modules!./styles.css';
```

- 使用 `!!` 前缀, 将禁用所有已配置的 loader (preLoader, loader, postLoader)

```js
import Styles from '!!style-loader!css-loader?modules!./styles.css';
```

- 使用 `-!` 前缀, 将禁用所有已配置的 preLoader 和 loader, 但是不禁用 postLoader

```js
import Styles from '-!style-loader!css-loader?modules!./styles.css';
```

选项可以传递查询参数, 例如 `?key=value&foo=bar`, 或者一个 JSON 对象, 例如 `?{"key":"value","foo":"bar"}`

:::warning
尽可能使用 `module.rules`, 因为这样可以减少源码中样板文件的代码量, 并且可以在出错时, 更快地调式和定位 loader 中的问题。
:::

## loader特性

- **loader 支持链式调用。链中的每个 loader 会将转换 应用在已处理过的资源上。一组链式的 loader 将按照相反的顺序执行** 
链中的第一个 loader 将其结果 (也就是转换后的资源) 传递给下一个 laoder, 以此类推。
最后, 链中的最后一个 loader, 返回 webpack 所期望的 JavaScript。
- loader 可以是同步的, 也可以是异步的。
- loader 运行在 Node.js 中, 并且能够执行任何操作。
- 插件 (plugin) 可以为 loader 带来更多特性。
- loader 能够产生额外的任何文件。
- 除了常见的通过 `package.json` 和 `main` 来将一个 npm 模块导出为 loader, 还可以在 module.rules 中使用 `loader` 字段直接引用一个模块。

可以通过 loader 的预处理函数, 为 JavaScript 生态系统提供更多能力。用户现在可以更加灵活地引入细粒度逻辑, 例如：压缩、打包、语言转译 (或编译) 等特性。

:::warning
**loader 遵循标准模块解析规则。** 多数情况下, loader 将从模块路径加载 (通常是从 `npm install`, `node_modules` 进行加载)。
:::


## 使用loader打包图片

## 使用loader打包样式

## 使用loader打包字体
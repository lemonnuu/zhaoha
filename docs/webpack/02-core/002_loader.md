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

在开始之前, 我们对项目做一个修改：

project

```diff
  webpack-demo
  |- /node_modules
  |- package.json
  |- package-lock.json
  |- /dist
    |- index.html
  |- /src
+   |- avatar.jpg
    |- index.js
  |- webpack.config.js
```

src/index.js

```js
import avatar from './avatar.jpg'

const image = new Image()
image.src = avatar

const body = document.body
body.append(image)
```

在这里, 引入了一张 jpg 图片资源, webpack 是不认识这类文件的, 需要使用到相应的 loader 来告诉 webpack 如何处理它。

在 webpack4 时代, 可以使用 [file-loader](https://v4.webpack.docschina.org/loaders/file-loader/) 或 [url-loader](https://v4.webpack.docschina.org/loaders/url-loader/) 处理它。

:::warning
- file-loader 会将目标文件复制到输出路径。
- url-loader 与 file-loader 非常类似, 只不过当目标文件小于设置的 limit 值时, 会编译成 base64, 减少一次请求次数。
:::

### file-loader

因此先本地安装 `file-loader` 与 `url-loader`：

```bash
npm install file-loader url-loader -D
```

然后在 webpack 配置中添加这些 loader：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
+ module: {
+   rules: [
+     {
+       test: /\.(jpg|png|gif|jpeg)/,
+       use: 'file-loader'
+     }
+   ]
+ },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

现在运行 build 命令

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset 36642255ee8c0f6438c8ee246f2f57fb.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 5.8 KiB [emitted] (name: main)
runtime modules 1.72 KiB 5 modules
cacheable modules 212 bytes
  ./src/index.js 132 bytes [built] [code generated]
  ./src/avatar.jpg 80 bytes [built] [code generated]
webpack 5.72.0 compiled successfully in 222 ms
```

可以看到, 打包生成了一张图片。默认情况下, 生成文件的文件名, 是文件内容的 MD5 哈希值, 并会保留所引用资源的原始拓展名。

`name` 参数能够利用占位符修改生成的文件名：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
-       use: 'file-loader'
+       use: {
+         loader: 'file-loader',
+         options: {
+           name: '[name]-[hash:7].[ext]',
+         }
+       }
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

再来打包一次：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset avatar-3664225.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 5.78 KiB [emitted] (name: main)
runtime modules 1.72 KiB 5 modules
cacheable modules 194 bytes
  ./src/index.js 132 bytes [built] [code generated]
  ./src/avatar.jpg 62 bytes [built] [code generated]
webpack 5.72.0 compiled successfully in 212 ms
```

图片文件名已经变成了 avatar-3664225.jpg。默认情况下, 文件的输出路径为 output 配置项的输出路径。

`outputPath` 参数可将文件输出到指定位置：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:7].[ext]',
+           outputPath: 'images'
          }
        }
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

运行 build 命令：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset images/avatar-3664225.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 5.79 KiB [emitted] (name: main)
runtime modules 1.72 KiB 5 modules
cacheable modules 201 bytes
  ./src/index.js 132 bytes [built] [code generated]
  ./src/avatar.jpg 69 bytes [built] [code generated]
webpack 5.72.0 compiled successfully in 219 ms
```

### url-loader

现在我们使用 url-loader 处理图片文件, 改造一下配置：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
-       use: {
-         loader: 'file-loader',
-         options: {
-           name: '[name]-[hash:7].[ext]',
-           outputPath: 'images'
-         }
-       }
+       use: 'url-loader'
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

运行 build 命令：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset main.js 52.2 KiB [emitted] (name: main)
runtime modules 670 bytes 3 modules
cacheable modules 48.1 KiB
  ./src/index.js 132 bytes [built] [code generated]
  ./src/avatar.jpg 48 KiB [built] [code generated]
webpack 5.72.0 compiled successfully in 233 ms
```

可以看出, 这次并没有生成相应的图片文件, 但是图片仍然能够展示, 实际上, 图片文件已经被转化为了 base64。

`limit` 参数可以设置临界值。

- 当文件大小小于临界值时, 文件会被转化为 base64。 
- 当文件大小大于临界值时, url-loader 就相当于 file-loader 了。

将 limit 设置为 20kb：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
-       use: 'url-loader'
+       use: {
+         loader: 'url-loader',
+         options: {
+           limit: 20 * 1024,
+           name: '[name]-[hash:8].[ext]'
+         }
+       }
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

运行 build 命令：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset avatar-36642255.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 5.78 KiB [emitted] (name: main)
runtime modules 1.72 KiB 5 modules
cacheable modules 195 bytes
  ./src/index.js 132 bytes [built] [code generated]
  ./src/avatar.jpg 63 bytes [built] [code generated]
webpack 5.72.0 compiled successfully in 221 ms
```

可以看出, 生成了相应的图片文件。

### asset module

webpack5 时代, 出现了资源模块(asset module)。

资源模块是一种模块类型, 它允许使用资源文件(字体, 图标等)而无需配置额外 loader。

:::warning
可以理解为将 `file-loader`, `url-loader`, `raw-loader` 内置为了资源模块。

`raw-loader` 可以将文件导入为字符串, 相当于导出资源的源代码。
:::

资源模块有 4 种模块类型, 来替换这些 loader：

- `asset/resource` : 相当于 `file-loader`。
- `asset/inline` : 相当于没有 limit 的 `url-loader`。
- `asset/source` : 相当于 `raw-loader`。
- `asset` : 相当于有 limit 的 `url-loader`。

#### asset/resource

首先, 先使用 asset/resource 改造配置：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
-       use: {
-         loader: 'url-loader',
-         options: {
-           limit: 20 * 1024,
-           name: '[name]-[hash:8].[ext]'
-         }
-       }
+       type: 'asset/resource'
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

运行 build 命令：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset 36642255ee8c0f6438c8.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 4.82 KiB [emitted] (name: main)
runtime modules 1.33 KiB 3 modules
cacheable modules 174 bytes (javascript) 36 KiB (asset)
  ./src/index.js 132 bytes [built] [code generated]
  ./src/avatar.jpg 42 bytes (javascript) 36 KiB (asset) [built] [code generated]
webpack 5.72.0 compiled successfully in 116 ms
```

和 file-loader 的效果没什么区别, 但是文件名和输出路径的改变不同于 file-loader。

默认情况下, asset/resouce 模块以 `[hash][ext][query]` 文件名发送到输出目录, 有两种方式自定义输出文件名：

第一种是可以通过在 webpack 配置中设置 `output.assetModuleFilename` 来修改：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
        type: 'asset/resource'
      }
    ]
  },
  output: {
    filename: 'main.js',
-   path: path.resolve(__dirname, 'dist')
+   path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash:7]-name[ext]'
  }
}
```

:::danger
需要注意的是, 这里的占位符 `[ext]` 是带 `.` (点)号的, 如 `.jpg`。

而 file-loader 中的 `[ext]` 是不带 `.` (点)号的, 如 `jpg`。
:::

运行 build 命令：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset images/3664225-name.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 4.82 KiB [emitted] (name: main)
runtime modules 1.33 KiB 3 modules
cacheable modules 174 bytes (javascript) 36 KiB (asset)
  ./src/index.js 132 bytes [built] [code generated]
  ./src/avatar.jpg 42 bytes (javascript) 36 KiB (asset) [built] [code generated]
webpack 5.72.0 compiled successfully in 98 ms
```

第二种设置 `Rule.generator.filename` 来修改：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
-       type: 'asset/resource'
+       type: 'asset/resource',
+       generator: {
+         filename: 'images/[name]-[hash:6][ext]'
+       }
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
-   assetModuleFilename: 'images/[hash:7]-name[ext]'
  }
}
```

运行 build 命令：

```bash {6}
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset images/avatar-366422.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 4.82 KiB [emitted] [compared for emit] (name: main)
runtime modules 1.33 KiB 3 modules
cacheable modules 174 bytes (javascript) 36 KiB (asset)
  ./src/index.js 132 bytes [built] [code generated]
  ./src/avatar.jpg 42 bytes (javascript) 36 KiB (asset) [built] [code generated]
webpack 5.72.0 compiled successfully in 99 ms
```

#### asset/inline

接下来用 asset/inline 改造配置：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
-       type: 'asset/resource',
-       generator: {
-         filename: 'images/[name]-[hash:6][ext]'
-       }
+       type: 'asset/inline'
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

运行 build 命令：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset main.js 51.2 KiB [emitted] (name: main)
runtime modules 274 bytes 1 module
./src/index.js 132 bytes [built] [code generated]
./src/avatar.jpg 48.2 KiB [built] [code generated]
webpack 5.72.0 compiled successfully in 96 ms
```

可以看出, asset/inline 和 url-loader 效果一样。

#### asset

接下来用 asset 改造配置：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
-       type: 'asset/inline'
+       type: 'asset',
+       parser: {
+         dataUrlCondition: {
+           maxSize: 20 * 1024
+         }
+       }
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

运行 build 命令：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset 36642255ee8c0f6438c8.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 4.82 KiB [compared for emit] (name: main)
runtime modules 1.33 KiB 3 modules
cacheable modules 174 bytes (javascript) 36 KiB (asset)
  ./src/index.js 132 bytes [built] [code generated]
  ./src/avatar.jpg 42 bytes (javascript) 36 KiB (asset) [built] [code generated]
webpack 5.72.0 compiled successfully in 96 ms
```

## 使用loader打包样式

现在我们给图片加一些样式：

project
```diff
  webpack-demo
  |- /node_modules
  |- package.json
  |- package-lock.json
  |- /dist
    |- index.html
  |- /src
    |- avatar.jpg
+   |- index.css
    |- index.js
  |- webpack.config.js
```

src/index.css

```css
.avatar {
  width: 150px;
  height: 150px;
  transform: translate(100px, 100px);
}
```

src/index.js

```diff
  import avatar from './avatar.jpg'
+ import './index.css'

  const image = new Image()
  image.src = avatar
+ image.classList.add('avatar')

  const body = document.body
  body.append(image)
```

处理 css 文件需要用到 `style-loader` 与 `css-loader`。首先安装相应的依赖：

```bash
npm install style-loader css-loader -D
```

css-loader 是处理 css 文件之间的关系, style-loader 是将打包好的 css 通过 style 标签插入到 HTML 中。

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        }
      },
+     {
+       test: /\.css/,
+       use: ['style-loader', 'css-loader']
+     }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

注意 loader 的顺序不能写反, loader 的执行顺序是从右到左, 从下往上。

运行 build 命令：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset 36642255ee8c0f6438c8.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 25.2 KiB [emitted] (name: main)
runtime modules 1.98 KiB 6 modules
javascript modules 9.88 KiB
  modules by path ./node_modules/ 8.07 KiB
    modules by path ./node_modules/style-loader/dist/runtime/*.js 5.75 KiB
      ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 2.44 KiB [built] [code generated]
      ./node_modules/style-loader/dist/runtime/styleDomAPI.js 1.38 KiB [built] [code generated]
      + 4 modules
    modules by path ./node_modules/css-loader/dist/runtime/*.js 2.33 KiB
      ./node_modules/css-loader/dist/runtime/noSourceMaps.js 64 bytes [built] [code generated]
      ./node_modules/css-loader/dist/runtime/api.js 2.26 KiB [built] [code generated]
  modules by path ./src/ 1.8 KiB
    ./src/index.js 185 bytes [built] [code generated]
    ./src/index.css 1.11 KiB [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./src/index.css 520 bytes [built] [code generated]
./src/avatar.jpg 42 bytes (javascript) 36 KiB (asset) [built] [code generated]
webpack 5.72.0 compiled successfully in 408 ms
```

然而现在开发一般使用 scss, less, stylus 等 css 预处理器, 现在把 css 文件换成 scss 文件：

project

```diff
  webpack-demo
  |- /node_modules
  |- package.json
  |- package-lock.json
  |- /dist
    |- index.html
  |- /src
    |- avatar.jpg
-   |- index.css
+   |- index.scss
    |- index.js
  |- webpack.config.js
```

src/index.scss

```scss
html {
  .avatar {
    width: 150px;
    height: 150px;
    transform: translate(100px, 100px);
  }
}
```

src/index.js

```diff
  import avatar from './avatar.jpg'
- import './index.css'
+ import './index.scss'

  const image = new Image()
  image.src = avatar
  image.classList.add('avatar')

  const body = document.body
  body.append(image)
```

处理 scss 文件需要使用 `sass-loader`, 而且还需要预先安装 [Dart Sass](https://github.com/sass/dart-sass) 或 [Node Sass](https://github.com/sass/node-sass)

:::warning
Node Sass 不能与 Yarn Pnp 特性一起正常工作, 且不支持 @use rule。

推荐使用 Dart Sass
:::

```bash
npm install sass-loader sass -D
```

现在修改 webpack 配置:

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        }
      },
-     {
-       test: /\.css/,
-       use: ['style-loader', 'css-loader']
-     }
+     {
+       test: /\.scss/,
+       use: ['style-loader', 'css-loader', 'sass-loader']
+     }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

运行 build 命令：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset 36642255ee8c0f6438c8.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 25.7 KiB [emitted] (name: main)
runtime modules 1.98 KiB 6 modules
javascript modules 9.95 KiB
  modules by path ./node_modules/ 8.07 KiB
    modules by path ./node_modules/style-loader/dist/runtime/*.js 5.75 KiB
      ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 2.44 KiB [built] [code generated]
      ./node_modules/style-loader/dist/runtime/styleDomAPI.js 1.38 KiB [built] [code generated]
      + 4 modules
    modules by path ./node_modules/css-loader/dist/runtime/*.js 2.33 KiB
      ./node_modules/css-loader/dist/runtime/noSourceMaps.js 64 bytes [built] [code generated]
      ./node_modules/css-loader/dist/runtime/api.js 2.26 KiB [built] [code generated]
  modules by path ./src/ 1.88 KiB
    ./src/index.js 186 bytes [built] [code generated]
    ./src/index.scss 1.19 KiB [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.scss 517 bytes [built] [code generated]
./src/avatar.jpg 42 bytes (javascript) 36 KiB (asset) [built] [code generated]
webpack 5.72.0 compiled successfully in 585 ms
```

为了兼容性, 需要给 css 样式加上厂商前缀, 需要用到 `postcss-loader`。

:::danger
如果使用最新版本的 postcss-loader, 需要使用 webpack5, 如果使用 webpack4 的话, 需要安装 postcss-loader v4 的版本。
:::

这里采用最新的 postcss-loader, 需要安装 `postcss-loader` 与 `postcss`：

```bash
npm install postcss postcss-loader -D
```

如果只是要给 css 加上厂商前缀, 还需要安装 `autoprefixer` 插件并且配置：

```bash
npm install autoprefixer -D
```

配置 autoprefixer 有两种方式。

第一种是直接在 webpack 配置中配置：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        }
      },
      {
        test: /\.scss/,
-       use: ['style-loader', 'css-loader', 'sass-loader']
+       use: [
+         'style-loader', 
+         'css-loader', 
+         'sass-loader',
+         {
+           loader: 'postcss-loader',
+           options: {
+             postcssOptions: {
+               plugins: [
+                 'autoprefixer'
+               ]
+             }
+           }
+         }
+       ]
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

:::warning
需要注意的是, 需要配置 package.josn 文件的 browserslist 选项告知 webpack 需要支持的浏览器, autoprefixer 插件才能生效。
:::

```diff
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack"
  },
  "author": "",
  "license": "ISC",
+ "browserslist": [
+   "> 1%",
+   "not ie <= 8",
+   "last 2 versions"
+ ],
  "devDependencies": {
    "autoprefixer": "^10.4.7",
    "css-loader": "^6.7.1",
    "file-loader": "^6.2.0",
    "postcss": "^8.4.13",
    "postcss-loader": "^6.2.1",
    "sass": "^1.51.0",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    "url-loader": "^4.1.1",
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2"
  },
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

运行 build 命令：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset 36642255ee8c0f6438c8.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 26.4 KiB [emitted] (name: main)
runtime modules 2.04 KiB 6 modules
javascript modules 10.1 KiB
  modules by path ./node_modules/ 8.07 KiB
    modules by path ./node_modules/style-loader/dist/runtime/*.js 5.75 KiB
      ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 2.44 KiB [built] [code generated]
      ./node_modules/style-loader/dist/runtime/styleDomAPI.js 1.38 KiB [built] [code generated]
      + 4 modules
    modules by path ./node_modules/css-loader/dist/runtime/*.js 2.33 KiB
      ./node_modules/css-loader/dist/runtime/noSourceMaps.js 64 bytes [built] [code generated]
      ./node_modules/css-loader/dist/runtime/api.js 2.26 KiB [built] [code generated]
  modules by path ./src/ 2.06 KiB
    ./src/index.js 186 bytes [built] [code generated]
    ./src/index.scss 1.33 KiB [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/index.scss 564 bytes [built] [code generated]
./src/avatar.jpg 42 bytes (javascript) 36 KiB (asset) [built] [code generated]
webpack 5.72.0 compiled successfully in 1021 ms
```

这样一来, css 就加上了厂商前缀, 当然这只是 postcss-loader 的冰山一角。

第二种方式是配置 postcss.config.js 文件：

```diff
  webpack-demo
  |- /node_modules
  |- package.json
  |- package-lock.json
  |- /dist
    |- index.html
  |- /src
    |- avatar.jpg
    |- index.scss
    |- index.js
+ |- postcss.config.js
  |- webpack.config.js
```

postcss.config.js

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

修改一下 webpack 配置：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        }
      },
      {
        test: /\.scss/,
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader',
          {
            loader: 'postcss-loader',
-           options: {
-             postcssOptions: {
-               plugins: [
-                 'autoprefixer'
-               ]
-             }
-           }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

运行 build 命令：

```bash
PS C:\Users\an'an'a's\Desktop\webpack-demo> npm run build

> webpack-demo@1.0.0 build C:\Users\an'an'a's\Desktop\webpack-demo
> webpack

asset 36642255ee8c0f6438c8.jpg 36 KiB [emitted] [immutable] [from: src/avatar.jpg] (auxiliary name: main)
asset main.js 26 KiB [emitted] (name: main)
runtime modules 2.04 KiB 6 modules
javascript modules 10.1 KiB
  modules by path ./node_modules/ 8.07 KiB
    modules by path ./node_modules/style-loader/dist/runtime/*.js 5.75 KiB
      ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 2.44 KiB [built] [code generated]
      ./node_modules/style-loader/dist/runtime/styleDomAPI.js 1.38 KiB [built] [code generated]
      + 4 modules
    modules by path ./node_modules/css-loader/dist/runtime/*.js 2.33 KiB
      ./node_modules/css-loader/dist/runtime/noSourceMaps.js 64 bytes [built] [code generated]
      ./node_modules/css-loader/dist/runtime/api.js 2.26 KiB [built] [code generated]
  modules by path ./src/ 2.01 KiB
    ./src/index.js 186 bytes [built] [code generated]
    ./src/index.scss 1.28 KiB [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/index.scss 564 bytes [built] [code generated]
./src/avatar.jpg 42 bytes (javascript) 36 KiB (asset) [built] [code generated]
webpack 5.72.0 compiled successfully in 1046 ms
```

当引入的 scss 文件中通过 @import 还引入了其他的 scss 文件, 就会出现问题, 最后向 HTML 插入的 style 标签内为原始的 scss 文件导致失效。

@import 是当加载到含此语句的 css 文件时, 会发起新的请求获取样式资源, 如果 scss 文件含有此语句, 
此时再引入的 scss 文件不会经历 sass-loader, postcss-loader 的处理, 需要在 css-loader 中配置 `importLoaders`。

现在来改造一下项目：

project

```diff
  webpack-demo
  |- /node_modules
  |- package.json
  |- package-lock.json
  |- /dist
    |- index.html
  |- /src
    |- avatar.jpg
+   |- avatar.scss
    |- index.scss
    |- index.js
  |- postcss.config.js
  |- webpack.config.js
```

src/avatar.scss

```scss
html {
  .avatar {
    width: 150px;
    height: 150px;
    transform: translate(100px, 100px);
  }
}
```

src/index.scss

```scss
@import url('./avatar.scss');
```

当没有配置 css-loader 的 `importLoaders` 时, 运行 build 命令, 样式不生效, 查看 HTML 的 style 标签：

![005-css-loader没有配置importLoaders效果图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/005-css-loader没有配置importLoaders效果图.png)

现在修改 webpack 配置：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        }
      },
      {
        test: /\.scss/,
        use: [
          'style-loader', 
-         'css-loader', 
+         {
+           loader: 'css-loader',
+           options: {
+             importLoaders: 2
+           }
+         } ,
          'sass-loader',
          {
            loader: 'postcss-loader',
          }
        ]
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

`importLoader: 2` 的意思是当 css 遇上 import 其他样式资源时, 向上翻两层, 就是从 postcss-loader 开始处理此样式。

现在我们改造一下项目, 放置两张图片：

project

```diff
  webpack-demo
  |- /node_modules
  |- package.json
  |- package-lock.json
  |- /dist
    |- index.html
  |- /src
    |- avatar.jpg
+   |- avatar.js
    |- avatar.scss
    |- index.scss
    |- index.js
  |- postcss.config.js
  |- webpack.config.js
```

src/avatar.js

```js
import avatar from './avatar.jpg'

function component () {
  const image = new Image()
  image.src = avatar
  image.classList.add('avatar')

  const body = document.body
  body.append(image)
}

export default component
```

src/index.js

```diff
  import avatar from './avatar.jpg'
  import './index.scss'
+ import component from './avatar.js'

  const image = new Image()
  image.src = avatar
  image.classList.add('avatar')

  const body = document.body
  body.append(image)

+ component()
```

注意 src/avatar.js 并没有引入样式, 但是当打包运行时, 两张图片都会被运用样式, 为全局样式, 容易导致冲突, 所以需要把 css 模块化。

将 css-loader 的 `modules` 设置为 true 可以采用 css Modules, 修改 webpack 配置：

```diff
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        }
      },
      {
        test: /\.scss/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
+             modules: true
            }
          } ,
          'sass-loader',
          {
            loader: 'postcss-loader',
          }
        ]
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

这样一来, 使用 css 的方式也需要改变, 修改 src/index.js：

```diff
  import avatar from './avatar.jpg'
- import './index.scss'
+ import style from './index.scss'
  import component from './avatar.js'

  const image = new Image()
  image.src = avatar
- image.classList.add('avatar')
+ image.classList.add(style.avatar)

  const body = document.body
  body.append(image)

  component()
```

运行 build 命令之后运行, 会发现, 两张图片均未运用样式, 原因是 src/index.scss 内是通过 @import 引入的样式, 相当与独立的 css 文件。

:::danger
在 Vue 中, @import 之所以能生效是因为同时也处理了 html, 但通过 @import 引入外部作用域是全局的，可能会引发样式问题, 在生产环境中尽量不要使用 @import 引入css。

@import 并不是引入代码到 style 里面, 而是发起新的请求获取样式资源, 并没有加 scoped, 可以把 @import 改成 style src 引入, 如 `<style lang="" scoped src="..">`
:::

再修改 src/index.js：

```diff
  import avatar from './avatar.jpg'
- import style from './index.scss'
+ import style from './avatar.scss'
  import component from './avatar.js'

  const image = new Image()
  image.src = avatar
  image.classList.add('avatar')
  image.classList.add(style.avatar)

  const body = document.body
  body.append(image)

  component()
```

这样一来就可以了。

## 使用loader打包字体
---
title: 开发环境与生产环境
author: 爪哈
date: 2022-05-22
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

## 配置

**development(开发环境)和production(生产环境)的构建目标存在着巨大差异。**

在开发环境中, 可能需要强大的 source map 和一个有着 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server。
而生产环境目标则转移到了其它方面, 例如压缩 bundle, 更轻量的 source map, 资源优化等。

**由于要遵循逻辑分离, 建议为每个环境编写彼此独立的 webpack 配置。**

### webpack-merge

现在, 保留一个 common (通用配置), 差异部分分别为 webpack.dev.js 与 webpack.prod.js。

`webpack-merge` 工具可以将这些配置合并在一起：

```bash
npm install webpack-merge -D
```

package

```diff
  webpack-demo
  |- /node_modules
  |- package.json
  |- package-lock.json
  |- /src
    |- index.js
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
```

webpack.common.js

```diff
+ const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js',
+   },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Production',
+     }),
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist'),
+     clean: true,
+   },
+ };
```

webpack.dev.js

```diff
+ const { merge } = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'development',
+   devtool: 'inline-source-map',
+   devServer: {
+     static: './dist',
+   },
+ });
```

webpack.prod.js

```diff
+ const { merge } = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'production',
+ });
```

package.json

```diff
{
  ...
  "scripts": {
    "build": "webpack",
    "dev": "webpack --config webpack.dev.js",
    "prod": "webpack --config webpack.dev.js"
  },
  ...
}
```

这样一来, 便可很好管理开发配置与生产配置 :kiss: :kiss: :kiss:

## 指定 mode

许多 library 通过与 `process.env.NODE_ENV` 环境变量关联，以决定 library 中应该引用哪些内容。

例如，当 `process.env.NODE_ENV` 没有被设置为 'production' 时，某些 library 为了使调试变得容易，可能会添加额外的 log(日志记录) 和 test(测试) 功能。
并且，在使用 `process.env.NODE_ENV === 'production'` 时，一些 library 可能针对具体用户的环境，删除或添加一些重要代码，以进行代码执行方面的优化。

**从 webpack v4 开始, 指定 mode 会自动地配置 `DefinePlugin`**

webpack.config.js

```js {2}
module.exports = {
  mode: 'production',
}
```

- 当 `mode === production` 时, `process.env.NODE_ENV === production`
- 当 `mode === development` 时, `process.env.NODE_ENV === development`

:::danger webpack.config.js 中没有 process.env.NODE_ENV
从技术上讲, `process.env.NODE_ENV` 是一个 **Node.js 暴露给执行脚本的系统环境变量**。
通常用于决定在开发环境与生产环境下, server tools(服务器工具)、build scripts(构建脚本) 和 clientside libraries(客户端库)的行为。

在构建脚本 `webpack.config.js` 中, `process.env.NODE_ENV` 并没有被设置为 'production'。

因此, 在 webpack 配置文件中, `process.env.NODE_ENV === 'production' ? '[name].[contenthash].bundle.js' : '[name].bundle.js'` 这样的条件语句，无法按照预期运行。

可以理解为 `webpack(config)` 都还没有执行, `DefinePlugin` 都还没发挥作用, 哪来的 `process.env.NODE_ENV`。
但是任何业务代码(/src)都可以关联到 `process.env.NODE_ENV`, 诸如这样：

```js
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
```

如果配置文件需要判断的话, 可以借助环境变量实现 :heavy_exclamation_mark:
:::

### process.env.NODE_ENV

**在 node 中, 全局变量 `process` 表示的是当前 node 进程。**

**`process.env` 包含很多关于系统环境的信息, 但是并不存在 `NODE_ENV` 这个东西** :heavy_exclamation_mark:

**NODE_ENV 是用户自定义的变量, 在 webpack 中用于判断开发环境与生产环境。**

:::details 可以看一下 process 或 process.env 中有什么东西
```bash {4}
PS C:\Users\an'an'a's\Desktop\test> node
Welcome to Node.js v14.17.6.
Type ".help" for more information.
> console.log(process.env)
{
  ALLUSERSPROFILE: 'C:\\ProgramData',
  APPDATA: "C:\\Users\\an'an'a's\\AppData\\Roaming",
  CommonProgramFiles: 'C:\\Program Files\\Common Files',
  'CommonProgramFiles(x86)': 'C:\\Program Files (x86)\\Common Files',
  CommonProgramW6432: 'C:\\Program Files\\Common Files',
  COMPUTERNAME: 'LAPTOP-SJRR1F9B',
  ComSpec: 'C:\\WINDOWS\\system32\\cmd.exe',
  DacsSdkPath: 'D:\\dacs install\\DataCloak_DCube\\Bin\\DacsSdk',
  DriverData: 'C:\\Windows\\System32\\Drivers\\DriverData',
  HOMEDRIVE: 'C:',
  HOMEPATH: "\\Users\\an'an'a's",
  LOCALAPPDATA: "C:\\Users\\an'an'a's\\AppData\\Local",
  LOGONSERVER: '\\\\LAPTOP-SJRR1F9B',
  NUMBER_OF_PROCESSORS: '16',
  OneDrive: "C:\\Users\\an'an'a's\\OneDrive",
  OneDriveConsumer: "C:\\Users\\an'an'a's\\OneDrive",
  OS: 'Windows_NT',
  Path: "C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\WINDOWS\\System32\\OpenSSH\\;D:\\Git install\\Git\\cmd;D:\\Node install\\;D:\\Wechat devtool install\\微信web开发者
工具\\dll;D:\\Xshell7 install\\;C:\\Users\\an'an'a's\\AppData\\Local\\Microsoft\\WindowsApps;D:\\VSCode install\\Microsoft VS Code\\bin;C:\\Users\\an'an'a's\\AppData\\Roaming\\npm",
  PATHEXT: '.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.CPL',
  PROCESSOR_ARCHITECTURE: 'AMD64',
  PROCESSOR_IDENTIFIER: 'AMD64 Family 23 Model 104 Stepping 1, AuthenticAMD',
  PROCESSOR_LEVEL: '23',
  PROCESSOR_REVISION: '6801',
  ProgramData: 'C:\\ProgramData',
  ProgramFiles: 'C:\\Program Files',
  'ProgramFiles(x86)': 'C:\\Program Files (x86)',
  ProgramW6432: 'C:\\Program Files',
  PSModulePath: "C:\\Users\\an'an'a's\\Documents\\WindowsPowerShell\\Modules;C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules",
  PUBLIC: 'C:\\Users\\Public',
  SystemDrive: 'C:',
  SystemRoot: 'C:\\WINDOWS',
  TEMP: "C:\\Users\\AN'AN'~1\\AppData\\Local\\Temp",
  TMP: "C:\\Users\\AN'AN'~1\\AppData\\Local\\Temp",
  USERDOMAIN: 'LAPTOP-SJRR1F9B',
  USERDOMAIN_ROAMINGPROFILE: 'LAPTOP-SJRR1F9B',
  USERNAME: "an'an'a's",
  USERPROFILE: "C:\\Users\\an'an'a's",
  windir: 'C:\\WINDOWS',
  WSLENV: 'WT_SESSION::WT_PROFILE_ID',
  WT_PROFILE_ID: '{61c54bbd-c2c6-5271-96e7-009a87ff44bf}',
  WT_SESSION: 'c3446c12-acdd-4394-a99c-f7ca3c3b8b3e'
}
```
:::

那么 `process.env.NODE_ENV` 怎么配置 :question:

:::danger
手动将 `process.env.NODE_ENV` 设置为 `production` 后，所有的项目都会处于正式环境中。
此时使用命令 `npm install` 下载依赖包时，只会把 package.json 中的 dependencies 依赖项下载下来, 对于devDependencies中的依赖包是下载不下来的。
:::

一般不用去特意手动配置它, 它是一个与进程相关的用户自定义环境变量, 只需要知道 webpack 指定 mode 会自动地配置 `DefinePlugin`, 
而 `DefinePlugin` 会在编译时帮我们设置这个进程的 `process.env.NODE_ENV` 即可, 同样像 vue-cli 这样的脚手架内部也帮我们处理好了。

如果实在想手动配置, 就百度吧, 有点懒, 不想写...... :new_moon: :full_moon:

:::warning 顺带提一嘴
`process.argv` 是一个接收通过命令执行 node 程序时候所传入参数的数组。
:::

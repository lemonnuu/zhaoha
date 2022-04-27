---
title: 搭建webpack环境
author: 爪哈
date: 2022-4-27
---

## 安装 node.js

webpack 是基于 node.js 开发的, 首先咱们先安装一下 [node.js](https://nodejs.org/en/)。
在安装 node.js 的时候, 尽量安装最新稳定版本的 node.js, 因为新版本的 node.js 在很大程度上能提升 webpack 的打包速度。

:::warning
提升 webpack 打包速度有两个重要的点, 一个是保持 node.js 版本尽可能的新, 一个是 webpack 版本尽可能的新, 
高版本的 webpack 会利用新版本的 node.js 的一些特性来提升打包速度！:smiley: :smiley: :smiley:
:::

判断 node.js 是否安装成功可用以下命令 :sunglasses:

- 检测 node.js 版本
```shell
node -v
```
- 检测 npm 版本
```shell
npm -v
```

## 全局安装 webpack

在安装完 node.js 后就可以安装 webpack 了, 需要注意的是, 实际不仅需要安装 webpack, 还需要安装 webpack-cli :grimacing:

```shell
npm install webpack webpack-cli -g
```

:::warning
webpack CLI 为开发人员提供了一组灵活的命令，以在设置自定义 webpack 项目时提高速度。
从 webpack v4 开始，webpack 不需要配置文件，但开发人员通常希望根据他们的用例和需求创建更自定义的 webpack 配置。
webpack CLI 通过提供一组工具来改进自定义 webpack 配置的设置来满足这些需求。
:::

判断 webpack 是否安装成功可用以下命令 :sunglasses:

```shell
webpack -v
```

:::danger
强烈建议不要全局安装 webpack :roll_eyes: :roll_eyes: :roll_eyes:

全局安装 webpack 会导致一个问题, 当有两个运用不同版本的 webpack 项目时, 比如一个 3.0 版本的, 一个 4.0 版本的,
如果全局安装的是 4.0 版本的, 3.0 版本的 webpack 项目肯定运行不起来。

强烈建议不要全局安装 webpack :roll_eyes: :roll_eyes: :roll_eyes:
:::

全局卸载 webpack 命令如下:

```shell
npm uninstall webpack webpack-cli -g
```

## 局部安装 webpack

局部安装 webpack 的命令也非常简单 :yum:

```shell
npm install webpack webpack-cli -D
```

需要注意的是, 局部安装 webpack 在终端是没有 `webpack` 指令的, 但可以借助 [npx](/essay/node/001_npx) 来帮助我们运行 webpack 指令 :smirk: :smirk: :smirk:

```shell
npx webpack -v
```

可用以下命令查看 webpack 的一些信息

```
npm info webpack
```

可以用类似以下命令安装某一特定版本的 webpack

```
npm install webpack@4.46.0 webpack-cli -D
```

---
title: 打包分析
author: 爪哈
date: 2022-05-27
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

一旦开始分离代码, 一件很有帮助的事情就是, 分析输出结果来检查模块在何处结束。

可以在运行此命令生成工具所需的 JSON 文件：

```bash
webpack --profile --json > stats.json
```

## 官方分析工具

然后将它导入[官方分析工具](https://webpack.github.io/analyse/)中。

![008-webpack官方打包分析工具](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/008-webpack官方打包分析工具.png)

## webpack-chart

或者将它导入[webpack-chart](https://alexkuz.github.io/webpack-chart/)中。

![009-打包分析工具webpack-chart](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/009-打包分析工具webpack-chart.png)

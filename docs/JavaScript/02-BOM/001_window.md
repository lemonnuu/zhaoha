---
title: window
author: 爪哈
date: 2022-06-07 09:20:00
---

![0008_天空夕阳插画风景](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/wallpaper/0008_天空夕阳插画风景.jpg)

BOM(Browser Object Model, 浏览器对象模型) 是 JavaScript 与浏览器交互的接口。
 
BOM 的核心是 window 对象, 表示当前 JavaScript 脚本运行所处的窗口实例, 每一个窗口(包括 iframe )都拥有自己的 window 对象。

window 对象在浏览器中有两重身份, 一个是 ECMAScript 中的 Global 对象, 另一个就是浏览器窗口的 JavaScript 接口。

## Global作用域

因为 window 对象被复用为 ECMAScript 的 Global 对象, 所以通过 `var` 声明的所有全局变量和函数都会变成 window 对象的属性和方法。

## 窗口关系

当页面含有 iframe 时, 会形成窗口嵌套的场景。`window.top` 对象始终指向最上层(最外层)窗口, 即浏览器窗口本身。
`window.self` 对象始终指向 `window` 对象, 实际上, `window.self` 与 `window` 就是同一个对象。
`window.parent` 对象指向当前窗口的父窗口, 如果当前窗口就是浏览器窗口本身, 则 `window.parent` 等于 `window.top`。

最上层窗口(浏览器窗口本身)的 `window`, `window.self`, `window.top`, `window.parent` 都是等价的。可利用窗口关系来判断当前窗口是否在 iframe 框架中。

如果不想页面被嵌套在任何网页时, 可以这样：

```js
if (window.self !== window.top) {
  // 直接将页面替换成自己的网页
  window.top.location.replace(window.location)
}
```

如果不想页面被嵌套在其他网页, 但是可以嵌套在拥有相同域名的网页, 可以这样：

```js
if (window.location.host !== window.top.location.host) {
  // 直接将页面替换成自己的网页
  window.top.location.replace(window.location)
}
```

### X-Frame-Options

从服务器端的角度来说, 可以使用 `X-Frame-Options` 响应头, 它主要描述服务器网页资源的 iframe 权限, 有三个选项：

- `DENY` : 当前网页不能被嵌套在 iframe 里, 即使是在相同域名的网页中嵌套也不允许。
- `SAMEORIGIN` : 当前网页如果被嵌套, 只允许嵌套在相同域名的网页中。
- `ALLOW-FROM` : 当前网页可以在指定的 origin url 的 iframe 中被加载。

:::details iframe安全问题

:::

## 窗口位置与像素比
## 窗口大小
## 滚动
## 导航与打开新窗口
## 定时器
## 系统对话框

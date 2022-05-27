---
title: 懒加载与预加载
author: 爪哈
date: 2022-05-27
---

![0004-webpack官网图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack官网图.png)

同步代码的 code spliting 只能从缓存的角度去优化代码, 实际上这样的性能优化是非常低效的, 更好的做法是采用异步加载的方式。

异步加载可以加快首屏的渲染速度, 在正确的时间干正确的事情, 避免加载"无用"代码。

:::warning
其实像 vue, react 这样框架的路由都采取了懒加载的方式：

```js
component: () =>
  import(
    /* webpackChunkName: "xxx" */ "../views/xxx.vue"
  ),
```
:::

## 懒加载

懒加载是一种很好的优化网页和应用的方式。

它实际上就是按需加载的变种 : 当触发了一定的条件才进行按需加载。

这样加快了应用的初始加载速度, 减轻了它的总体积, 因为某些代码可能永远不会被加载。

src/index.js

```js {8-12}
async function createComponent() {
  const {default: _} = await import(/* webpackChunkName: 'lodash' */'lodash')
  const element = document.createElement('div')
  element.innerHTML = _.join(['hello', 'world'], '***')
  return element
}

document.addEventListener('click', () => {
  createComponent().then((component) => {
    document.body.appendChild(component)
  })
})
```

这就是一个懒加载, 是不是 very easy。

## 预加载

预加载其实又是对懒加载的一个变种, 有两种形式, 需要借助 magic notes 实现。

### prefetch

prefetch 会等加载完了父 chunks 后, 在浏览器闲置时偷偷摸摸下载。

```js {2}
async function createComponent() {
  const {default: _} = await import(/* webpackChunkName: 'lodash', webpackPrefetch: true */'lodash')
  const element = document.createElement('div')
  element.innerHTML = _.join(['hello', 'world'], '***')
  return element
}

document.addEventListener('click', () => {
  createComponent().then((component) => {
    document.body.appendChild(component)
  })
})
```

### preload

preload 会立即下载, 只不过优先级比父 chunk 低而已。

```js
async function createComponent() {
  const {default: _} = await import(/* webpackChunkName: 'lodash', webpackPreload: true */'lodash')
  const element = document.createElement('div')
  element.innerHTML = _.join(['hello', 'world'], '***')
  return element
}

document.addEventListener('click', () => {
  createComponent().then((component) => {
    document.body.appendChild(component)
  })
})
```

:::danger
不正确的使用 `webpackPreload` 会有损性能, 请谨慎使用。
:::

:::danger
主要还是使用 `webpackPrefetch`
:::
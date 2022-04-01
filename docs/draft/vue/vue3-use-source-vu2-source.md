---
title: Vue3源码解析前言
author: 爪哈
date: 2022-04-01
tags:
- 草稿
---

## 鲲之大, 一锅炖不下

### 为什么要学习源码?

前端技术日新月异的今天, 前端应用的复杂度也在日益提升, 掌握一门 MVVM 前端开发框架已经成为必要要求。

国内目前最火的MVVM前端框架: Vue.js, React, Angular

小程序跨端方案很多也选择了类Vue.js语法: Uniapp, Mpx, chamelemon, WePY

了解技术实现原理是前端工作的必然要求, 看源码是了解技术实现原理的直接手法, 是高效提升个人技术能力的有效途径

### Vue3.0为什么要做优化

Vue1.x -> Vue2.x : 引入了虚拟DOM

Vue2已经能支撑大部分需求开发, 但

Vue2.x 的痛点: 
- 源码自身的维护性
- 数据量大后带来的渲染和更新的性能问题
- 兼容性: 像舍弃但为了兼容一直保留的鸡肋API

Vue3想带来更好的体验:
- 更好的 TypeScript 支持
- 更好的逻辑复用实践

### Vue3.0做了哪些优化

#### 源码优化

源码优化的主要体现是在使用 monorepo 和 TypeScript 管理和开发源码, 这样做的目标是提升自身代码的可维护性.

##### 更好的代码管理方式: monorepo

Vue.js 的源码都在 src 目录下，其目录结构如下。

```
src
├── compiler        # 编译相关 (模板编译的相关代码)
├── core            # 核心代码 (与平台无关的通用运行时代码)
├── platforms       # 不同平台的支持 (平台专有代码)
├── server          # 服务端渲染 (服务端渲染的相关代码)
├── sfc             # .vue 文件解析 (.vue单文件解析相关代码)
├── shared          # 共享代码 (共享工具代码)
```

相对于 Vue2.js 的源码组织方式, monorepo 把这些模块拆分到不同的 package 中,
每个 package 有各自的 API、类型定义和测试

这样使得拆分模块更细化, 职责划分更明确, 模块之间的依赖关系也更加明确
开发人员也更容易阅读、理解和更改所有模块源码, 提升代码的可维护性

```
packages
├── compiler-core
├── compiler-dom
├── compiler-sfc
├── compiler-ssr
├── reactivity
├── runtime-core
├── runtime-dom
├── runtime-test
├── server-render
├── shared
├── size-check
├── template-explorer
├── vue
├── global.d.ts
```

package(比如 reactivity响应式库)是可以独立于Vue.js使用的, 这样用户如果只想使用 Vue3.js 的响应式能力, 
可单独依赖这个响应式库而不用去依赖整个 Vue.js

减小了引用包的体积大小, 而 Vue2.js 是做不到这一点的

##### 有类型的 JavaScript: TypeScript

可以在编码期间帮你做类型检查, 避免一些因为类型问题导致的错误

有利于它去定义接口的类型, 利于 IDE 对变量类型的推导

Vue2 是使用 Flow

Flow: Flow 是 Facebook 出品的 JavaScript 静态类型检查工具, 它可以以非常小的成本对已有的 JavaScript 代码迁入, 非常灵活,
这也是 Vue2 当初选型它时一方面的考量

但是 Flow 对于一些复杂场景类型的检查支持的并不好, 
在 Vue2 源码的某行代码注释还看到了对 Flow 的吐槽！

在组件更新 props 的地方:
```js
const propOptions: any = vm.$options.props // wtf flow?
```

#### 性能优化

Vue3在源码体积的减少方面做了哪些工作:

- 移除了一些冷门的 feature
- 引入了 tree-shaking 的技术

##### tree-shaking

依赖 ES2015 模块语法的静态结构(即 import 和 export)

通过编译阶段的静态分析, 找到没有引入的模块并打上标记

如果在项目里没有引入 Transition、KeepAlive 等组件, 那么它们对应的的代码就不会打包,
这样也就间接达到了减少项目引入的 Vue.js 包体积的目的

#### 数据劫持优化(有图)

实现DOM 功能, 必须劫持数据的访问与更新

当数据改变后, 为了自动更新 DOM, 就必须劫持数据的更新, 也就是说当数据发生改变后能自动执行一些代码去更新 DOM

##### Vue.js 怎么知道更新了哪一篇 DOM 呢

因为在渲染 DOM 的时候访问了数据, 我们可以对它进行劫持, 这样就在内部建立了依赖关系, 也就知道数据对应的 DOM 是什么了

Vue2 是通过 Object.defineProperty 这个API劫持数据的getter和setter实现的,
但是这个API 有缺陷, 必须提前知道需要劫持的 key 是什么

为了解决这个问题, 虽然 Vue2 提供了 Vue.$set(), Vue.$delete() 方法, 但是增加了使用者的负担

而且, 对于嵌套层级较深的对象来说, 需要递归调用这个对象, 把数据的每一层都用 Object.defineProperty() 建立监听联系,
如果定义的数据相对复杂, 就会有相当大的性能负担

Vue3 是使用了 Proxy API 做数据劫持:

注意的是: Proxy API 并不能监听到内部深层次的对象变化, 因此 Vue3 处理方式是在 getter 中去递归响应式

这样做的好处是: 只有真正访问到内部对象才会变成响应式, 而不是无脑递归, 这样无疑也在很大程度上提升了性能

#### 编译优化(有图)

Vue2:

new Vue -> init -> $mount -> compile -> render -> vnode -> patch -> DOM

除了数据劫持部分的优化, 我们可以在耗时相对较多的 patch 阶段想办法

Vue2 的数据更新并触发重新渲染的颗粒度是组件级的

举个栗子: vue2中如果某个组件里内部一个标签发生更新了, 实际是会diff这整个组件的, 导致 VNode 大小和模板大小正相关, 导致性能浪费

理想状态只需要 diff 更新的标签即可

Vue3:

通过编译阶段对静态模板的分析, 编译生成了 Block tree

##### Block tree

Blcok tree
- Block tree 是一个将模板基于动态节点指令切割的嵌套区块, 每个区块内部的节点结构是固定的, 每个区块只需要以一个 Array 来追踪自身包含的动态节点
- 借助 Block tree, Vue.js 将 vnode 更新性能由模板整体大小正相关提升为与动态内容的数量相关

Vue3 在编译阶段还包含对 Slot 的编译优化、事件侦听函数的缓存优化, 并且在运行时重写了 diff 算法

#### 语法 API 优化: Composition API

##### 优化逻辑组织

Vue1&&vue2: 编写组件的本质就是编写一个"包含了描述组件选项的对象", 我们称其为 Options API

##### Options API

- Options API 的设计是按照 methods、computed、data、props 这些不同的选项分类
- 当组件小的时候, 这种分类方式一目了然, 但在大型项目中, 一个组件可能有多个逻辑关注点, 
当使用Options API 时, 每个关注点都有自己的 Options

如果需要修改一个逻辑点关注点, 就需要在单个文件中不断上下切换和寻找

##### Composition API

Vue3 提供了一种新的 API: Composition API

就是将某个逻辑关注点相关的代码全都放在一个函数里, 这样当需要修改一个功能时, 就不再需要在文件中跳来跳去

#### 优化逻辑复用

Vue2: mixnis

mixin有一个很致命的问题: 命名冲突和数据来源不清晰

也是 Composition API 去优化解决

##### Composition API 的优缺点

优点: 
- 除了逻辑复用方面的优势, 也会有更好的类型支持
- 因为它们都是一些函数, 在调用函数时, 自然所有的类型都被推导出来了, 不像 Options API 所有的东西都使用 this
- 另外, Composition API 对 tree-shaking 友好, 代码也更容易压缩

注意: vue3 的 Composition API 属于API的增强, 并不是 Vue3 的组件开发范式, 如果组件足够简单, 同样可以使用 Options API

#### 引入 RFC

Vue2 后期就启用了:
RFC(Request For Comments): 旨在为新功能引入框架提供一个一致且受控的路径

实际就是用户提需求, 小组再讨论, 避免走弯路

Vue3 大规模启用 RFC 的模式

可以了解每一个 feature 采用或被废弃的前因后果
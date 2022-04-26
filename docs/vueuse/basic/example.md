---
title: (应用实例 && 组件实例) PK (Vue实例)
author: 爪哈
date: 2022-04-03
---

## Vue3 && Vue2

Vue3 与 Vue2 的 `Vue` 在结构上有很大差别, Vue3 的 `Vue` 是一个对象, Vue2 的 `Vue` 是一个函数, 且只能通过 `new` 调用。

:::details Vue3 的 Vue
![Vue3](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/Vue3.png)
:::

:::details Vue2 的 Vue
![Vue2](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/Vue2.png)
:::

## 应用实例 && 组件实例

### 创建一个应用实例

在 Vue3 中, 每个 Vue 应用都是通过 `createApp` 函数创建的, 该方法返回一个提供应用上下文的应用实例。

```js
const app = Vue.createApp({
	/* 选项 */
})
```

该应用实例是用来在应用中注册"全局"组件的, 应用实例挂载的整个组件树共享同一个上下文。

```js
app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)
```

应用实例暴露的方法大多数都会返回该同一实例, 允许链式调用。
这些方法可以在应用 API 中找到。

```js
const app = Vue.createApp({})
	.component('SearchInput', SearchInputComponent)
	.directive('focus', FocusDirective)
	.app.use(LocalePlugin)
```

:::details 应用实例图
![应用实例](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/应用实例.png)
:::

:::details 应用 API
- component : 注册或检索全局组件, 注册还会使用给定的 `name` 参数自动设置组件的 `name`
- config : 一个包含应用配置的对象
- directive : 注册或检索全局指令
- mixin : 将一个 mixin 应用在整个应用实例范围内, 一旦注册, 它们就可以在当前应用中的任何组件模板内使用它, 
	插件作者可以使用此方法将自定义行为注入组件。 不建议在应用代码中使用
- mount : 所提供 DOM 元素的 `innerHTML` 将会**替换**为应用根组件的模板渲染结果
- provide : 设置一个可以被注入到应用范围内所有组件中的值
- unmount : 卸载应用实例的根组件
- use : 安装 Vue.js 插件
- version : 以字符串形式提供已安装的 Vue 版本号
:::

### 根组件实例

`createApp` 函数接收两个参数用于配置根组件, 当我们挂载应用时, 该组件被用作渲染的起点。

```js
const app = Vue.createApp({
	/* 根组件配置选项 */
}, {
	/* 根组件 Prop */
})
```

一个应用需要被挂载到一个 DOM 中, 所提供 DOM 元素的 `innerHTML` 将被替换为应用根组件模板的渲染结果。

```html
<section id="root"></section>
```

```js
const vm = app.mount('#root')
```

与大多数应用方法不同的是, `mount` 不返回应用本身。相反, 它返回的是根组件实例。

:::details MVVM 架构体现
MVVM(Model-View-ViewModel) 是一种软件架构模式, 在 Vue 中的体现实际上就是数据的双向绑定。
![MVVM](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/Vue的MVVM.png)

- M(Model) : 数据, data
- V(View) : 视图, template
- VM(ViewModel) : 视图数据连接层, 根组件实例
:::

:::details 组件实例图
![组件实例](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/组件实例.png)
:::

### 组件实例 property

组件实例暴露了一些内置的 property, 如 `$data`, `$attrs`等。

组件实例创建之后, 可以通过 `vm.$data` 访问原始数据对象, 且组件实例也代理了 data 对象上所有的 property,
因此, 访问 `vm.a` 等价于访问 `vm.$data.a`。

以 `_` 或 `$` 开头的 property 不会被组件实例代理, 因为它们可能和 Vue 内置的 property、API 方法冲突,
但仍可使用 `vm.$data._property` 的方式访问这些 property。

:::details 组件实例内置属性
实例 property
- $data : 组件实例正在侦听的数据对象, `vm.$data.a === vm.a`
- $props : 当前组件接收到的 props 对象, `vm.$props.b === vm.b`
- $el : **仅可读**, 组件实例正在使用的根 DOM 元素
- $options : **仅可读**, 当前组件实例的初始化选项
- $parent : **仅可读**, 父实例, 如果当前实例有的话
- $root : **仅可读**, 当前组件树的根组件实例, 如果当前实例没有父实例, 此实例将会是其自己
- $slots : **仅可读**, 用来以编程方式访问通过插槽分发的内容
- $refs : **仅可读**, 一个对象, 持有注册过 `ref` attribute 的所有 DOM 元素和组件实例
- $attrs : **仅可读**, 包含了父作用域中不作为组件 props 或自定义事件的 attribute 绑定和事件

实例方法
- $watch : 侦听组件实例上的响应式 property 或函数计算结果的变化
- $emit : 触发当前实例上的事件, 附加参数都会传给监听器回调
- $forceUpdate : 迫使组件实例重新渲染, 注意它仅仅影响实力本身和插入插槽内容的子组件, 而不是所有子组件
- $nextTick : 将回调延迟到下次 DOM 更新循环之后执行
:::

## Vue 实例

### 创建一个 Vue 实例

在 Vue2 中, 每个应用都是通过用 `Vue` 函数创建一个新的 Vue 实例开始的。

```js
const vm = new Vue({
	/* 选项 */
})
```

`el` 选项用于将 Vue 实例挂载至 DOM 元素, 它只能够 `new` 创建实例时生效, 
如果在实例化时存在这个选项, 实例将立即进入编译过程, 否则, 需要显示调用 `vm.$mount()` 手动开始编译。

```js
const vm = new Vue({
	el: '#root'
})
```

:::warning
1. 提供的元素只能作为挂载点, 所有挂载元素会被 Vue 生成的 DOM 替换, 因此不推荐将 Vue 实例挂载至 `html` 或 `body` 上。
2. 如果 `render` 函数和 `template` 选项都不存在, 挂载 DOM 元素的 HTML 会被提取出来用作模板, 此时, 必须使用 Runtime + Compiler 构建的 Vue 库。
:::

如果 Vue 实例在实例化阶段没有接收到 `el` 选项, 则它处于"未挂载"状态, 没有与之关联的 DOM 元素,
但可以使用 `vm.$mount()` 手动地挂载一个未挂载的实例。

```js
const vm = new Vue({}).$mount('#root')
```

这个方法返回实例自身, 因而可以链式调用其他实例方法。

:::details Vue2 的 MVVM
- M(Model) : 数据, data
- V(View) : 视图, template
- VM(ViewModel) : 视图数据连接层, Vue 实例
:::

:::details Vue实例图
![Vue实例](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/Vue实例.png)
:::

### Vue 实例 property

和 Vue3 的组件实例一样, Vue 实例同样拥有很多内置 property, 但无疑更多。

Vue 实例创建之后, 可以通过 `vm.$data` 访问原始数据对象, 且 Vue 实例也代理了 data 对象上所有的 property,
因此, 访问 `vm.a` 等价于访问 `vm.$data.a`。

以 `_` 或 `$` 开头的 property 不会被 Vue 实例代理, 因为它们可能和 Vue 内置的 property、API 方法冲突,
但仍可使用 `vm.$data._property` 的方式访问这些 property。

:::details Vue 实例内置属性
实例 property
- $data : Vue 实例正在侦听的数据对象, `vm.$data.a === vm.a`
- $props : 当前组件接收到的 props 对象, `vm.$props.b === vm.b`
- $el : **仅可读**, Vue 实例正在使用的根 DOM 元素
- $options : **仅可读**, 当前 Vue 实例的初始化选项
- $parent : **仅可读**, 父实例, 如果当前实例有的话
- $root : **仅可读**, 当前组件树的根 Vue 实例, 如果当前实例没有父实例, 此实例将会是其自己
- $slots : **仅可读**, 用来以编程方式访问通过插槽分发的内容
- $refs : **仅可读**, 一个对象, 持有注册过 `ref` attribute 的所有 DOM 元素和组件实例
- $attrs : **仅可读**, 包含了父作用域中不作为组件 props 或自定义事件的 attribute 绑定和事件
- $children : **仅可读**, 当前实例的直接子组件, 注意 `$children` 并不能保证顺序, 也不是响应式的
- $listeners : **仅可读**, 包含父作用域中的(不含 `.native` 修饰器的) `v-on` 事件监听器
- $scopedSlots : **仅可读**, 用来访问作用域插槽
- isServer : **仅可读**, 当前 Vue 实例是否运行于服务器

实例方法/数据
- $watch : 侦听 Vue 实例上的响应式 property 或函数计算结果的变化
- $set : 全局 `Vue.set` 的别名, 设置值
- $delete : 全局 `Vue.delete` 的别名, 删除值

实例方法/事件
- $on : 监听当前实例上的自定义事件, 事件可以由 `vm.$emit()` 触发
- $once : 监听一个自定义事件, 但是只触发一次, 一旦触发后, 监听器就会被移除
- $off : 移除自定义事件监听器
- $emit : 触发当前实例的事件, 附加参数都会传给监听器回调

实例方法/生命周期
- $mount : 手动挂载未挂载的 Vue 实例
- $forceUpdate : 迫使 Vue 实例重新渲染, 注意它仅仅影响实力本身和插入插槽内容的子组件, 而不是所有子组件
- $nextTick : 将回调延迟到下次 DOM 更新循环之后执行
- $destroy : 完全销毁一个实例, 不应该使用
:::

## 总结

1. 较于 Vue2 的一把梭, Vue3 的模块拆分更细化。

:::tip
- Vue2 是把所有的东西都挂载至 Vue 实例上, 显得很臃肿
- Vue3 分为了应用实例和根组件实例, 职责更明确
:::

:::tip
其实, 是 Vue2 的全局 API 更改为了 Vue3 的应用程序 API, 但两者还是有挺大出入的。
并且, Vue3 的全局和内部 API 已经被重构为支持 tree-shake。
:::

2. Vue3 没有 `el` 组件配置选项, 挂载至 DOM 节点只能通过应用实例方法 `mount()` 手动挂载, 
	而 Vue2 则可通过 `el` 选项自动挂载和 Vue 实例方法 `$mount()` 手动挂载。
	
:::warning
Vue3 挂载节点的方式是替换所提供 DOM 元素的 `innerTHML`, 而 Vue2 是替换所提供的 DOM 元素
:::

:::tip
注意 Vue3 手动挂载的方式是 `mount()`, 而 Vue2 手动挂载的方式是 `$mount()`, 写法不一样!
:::

3. Vue3 没有 `propsData` 组件配置选项, 但它可通过 `Vue.createApp()` 的第二个参数实现相同的效果, Vue2 则是通过 `propsData` 选项来传入根组件 Prop。

:::tip
Vue2 的 `propsData` 选项只用于 `new` 创建的实例中。
:::

4. Vue3 移除了一些冷门的 feature

:::tip
组件实例较于 Vue 实例, 移除了 `$children`, `$scopedSlots`, `$isServer`, `$listeners` 四个实例 property。
:::

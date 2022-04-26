---
title: 模板语法
author: 爪哈
date: 2022-04-4
---

Vue.js 使用了基于 HTML 的模板语法, 允许开发者声明式地将 DOM 绑定至底层组件实例的数据。
所有 Vue.js 的模板都是合法的 HTML, 所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上, Vue 将模板编译成虚拟 DOM 渲染函数。
结合响应式系统, Vue 能够智能地计算出最少需要重新渲染多少组件, 并把 DOM 操作次数减到最少。

如果咱们要是熟悉虚拟 DOM 的话, 也可以不用模板, 直接上渲染(render)函数, 使用可选地 JSX 语法。:clown_face:

## 模板指令的变更

Vue3 在模板指令这块儿的变更主要体现在以下几点:

- 组件上 `v-model` 用法已更改, 以替换 `v-bind.sync`
- `<template v-for>` 和非 `v-for` 节点上的 `key` 用法已更改
- 在同一元素上使用的 `v-if` 和 `v-for` 优先级已更改
- `v-bind="object"` 现在排序敏感
- `v-on:event.native` 修饰符已移除
- `v-for` 中的 `ref` 不再注册 ref 数组

## 语句与表达式

在模板语法中, 允许使用表达式, 指令 attribute 的值预期是**单个 JavaScript 表达式**, `v-for` 与 `v-on` 除外。

- 表达式 : **一个表达式会产生一个值**, 可以放在任何一个需要值的地方
- 语句 : 表示一种行为

模板表达式都被放在沙盒中, 只能访问全局变量的一个白名单, 如 `Math` 和 `Date`。
咱们不应该在模板表达式中试图访问用户定义的全局变量。

## 插值

### Mustache(胡子语法)

数据绑定最常见的形式就是使用 "Mustache"(双大括号)语法的文本插值:

```html
<span>message: {{message}}</span>
```

Mustache 标签将会被替代为组件实例中 `message` property 的值, 即 `vm.message(vm.$data.message)`。
无论何时, 绑定的组件实例上 `message` property 发生了改变, 插值处的内容都会更新。

### v-text

`v-text` 小朋友想替咱们的"胡子大叔"分担一些压力, 但是推荐使用 Mustache 语法。

```html
<span v-text="message"></span>
<!-- 等价于 -->
<span>{{message}}</span>
```

### v-once

使用 `v-once` 指令, 咱们也能做到一次性的插值, 当数据改变时, 插值的内容不会被更新:

```js
<span v-once>初次渲染更新, 数据改变时不再更新: {{message}}</span>
```

### delimiters

如果咱们实在不喜欢"胡子大叔" :speak_no_evil: , 其实是可以自定义分隔符的, 但是非常不建议这样做。

在组件的配置选项中, 有一个叫 `delimiters` 的家伙, 但是只有 Vue 是完整构建版本的情况下在浏览器内编译才有用。

```js {3}
<script>
	const app = Vue.createApp({
		delimiters: ['${', '}'],
		data () {
			return {
				message: 'hello, world'
			}
		}
	})
	const vm = app.mount('#root')
</script>
```

```html {2}
<section id="root">
	<div>${message}</div>
</section>
```

这样一来, 分隔符就变成了 ES6 模板字符串风格。

### v-html

Mustache 会将数据解释为普通文本, 而非 HTML 代码, 如果咱们想要输出真正的 HTML, 需要使用 `v-html` 指令:

```js
<p>使用 Mustache: {{rawhtml}}</p>
<p>使用 v-html 指令: <span v-html="rawhtml"></span></p>
```

这个 `span` 内容会被替换为 `rawhtml` property 的值, 直接作为 HTML。

:::tip
需要注意的是, `v-html` 会忽略 `rawhtml` property 值中的数据绑定, 也就是:

```html
<section id="root">
	<div v-html="rawhtml"></div>
</section>
```

```js
<script>
	const app = Vue.createApp({
		data () {
			return {
				message: 'hello, world',
				rawhtml: `
					<p>{{message}}</p>
				`
			}
		}
	})
	const vm = app.mount('#root')
</script>
```

`rawhtml` 值里的 "message" 并不会显示为 "hello, world"。

因为 Vue 不是基于字符串的模板引擎, 对于 UI 界面, 组件更适合作为可重用和可组合的基本单位。
:::

:::warning
在站点上动态渲染任意的 HTML 是非常危险的, 很容易导致 **XSS攻击**, **绝不能将用户提供的内容作为插值**, 只对可信内容使用 HTML 插值。
:::

### v-bind

Mustache 语法不能在 HTML attribute 中使用, 如需将数据绑定至 attribute, 可以使用 `v-bind` 指令:

```js
<button v-bind:disabled="isButtonDisabled">按钮</button>
<button :disabled="isButtonDisabled">button</button>
```

当有参数时, `v-bind:` 可以直接简写为 `:`, 如 `v-bind:disabled` 与 `:disabled` 等价。 :heart_eyes:

:::warning
`v-bind` 这位兄弟对咱们可爱的 `String` 类型有点偏见哈, 按道理来说, 上面按钮绑定的值是 falsy, `disabled` attribute 就不应该被包含在内,
但是呢, 如果 `isButtonDisabled` 是个空字符串, 它也会被包含在内, 与 `<button disabled="">` 保持一致,
对于其他的 falsy 值, `disabled` 将被省略。

也就是说, `<button disabled="">` 与 `<button disabled>` 等价!
:::

`v-bind` 也可以绑定一个全是 attribute 的对象, 注意这个时候是没有参数的噢, 所以不能缩写:

```html
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
<!-- 等价于 -->
<div :id="someProp" :other-attr="otherProp"></div>
```

:::warning

在一个元素上动态绑定 attribute 时, 同时使用 `v-bind="object"` 语法和独立 attribute 是常见的常见, 然而, 这就引出了合并优先级的问题。

- 在 Vue2 中 : 如果一个元素同时定义了 `v-bind="object"` 和一个相同的独立 attribute, 那么这个独立的 attribute 总是会覆盖 `object` 中的绑定

	```html
	<!-- 模板 -->
	<div id="red" v-bind="{ id: 'blue' }"></div>
	<!-- 结果 -->
	<div id="red"></div>
	```
- 在 Vue3 里 : 如果一个元素同时定义了 `v-bind="object"` 和一个相同的独立 attribute, 那么绑定的声明顺序决定它们如何被合并, 后者会覆盖前者

	```html
	<!-- 模板 -->
	<div id="red" v-bind="{ id: 'blue' }"></div>
	<!-- 结果 -->
	<div id="blue"></div>
	
	<!-- 模板 -->
	<div v-bind="{ id: 'blue' }" id="red"></div>
	<!-- 结果 -->
	<div id="red"></div>
	```

:::

### v-pre

有没有一种可能, 咱们的确就是需要形同 Mustache 语法的字符串展示在页面上, 那么就得靠咱们的 `v-pre` 兄弟了:

```html
<span v-pre>{{ this will not be compiled }}</span>
```

`v-pre` 会跳过这个元素和它子元素的编译过程, 可以用来显示原始 Mustache 标签, 跳过大量没有指令的节点会加快编译。

### v-cloak

Vue.js 在渲染元素的时候, 放慢来看, 其实是会有一个闪现的过程的, 这是因为 Vue.js 读取和渲染元素需要一定时间。

解决的方法其实挺多, 巧了, `v-cloak` 就是其中一种, 原理就是咱开始就直接不展示嘛, 害。

```html
<div v-cloak>{{message}}</div>
```

```css
[v-cloak] {
	display: none;
}
```

这个指令会保持在元素上直到关联实例编译结束, 和 CSS 规则如 `[v-cloak] {display: none}` 一起用时, 可以隐藏未编译的 Mustache 标签直到实例准备完毕。

## 事件


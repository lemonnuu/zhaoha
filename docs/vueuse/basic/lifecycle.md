---
title: 生命周期
author: 爪哈
date: 2022-04-03
---

## Vue3 生命周期

:::details vue3生命周期图
![vue3生命周期图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/vue3生命周期.svg)
:::

```html
<section id="root">
	<div>{{message}}</div>
</section>
```

```js
<script>
	const app = Vue.createApp({
		data () {
			return {
				message: 'hello, world'
			}
		},
		// 初始化事件和生命周期函数之后调用, 此时还不能够访问 data
		beforeCreate () {
			console.log('beforeCreate', this.message);
		},
		// 初始化注入和响应式数据之后调用, 此时可以访问 data 了
		created () {
			console.log('created', this.message);
		},
		// 将 template 模板转化为 render 函数后, 生成真实 DOM 之前调用
		beforeMount () {
			console.log('beforeMount', document.getElementById('root').innerHTML || '无');
		},
		// 将生成的 DOM 挂载到 DOM 节点后调用
		mounted () {
			console.log('mounted', document.getElementById('root').innerHTML);
		},
		// 数据发生改变, 虚拟 DOM 生成之前调用
		beforeUpdate () {
			console.log('beforeUpdate', document.getElementById('root').innerHTML);
		},
		// 数据改变后, 页面更新后调用
		updated () {
			console.log('updated', document.getElementById('root').innerHTML);
		},
		// 卸载组件实例前调用, 此时还可正常访问 data 等
		beforeUnmount () {
			console.log('beforeUnmount', document.getElementById('root').innerHTML);
		},
		// 组件完全卸载后调用, 但数据仍可访问, 且卸载完成后 app 不能被重新挂载
		// 注意, 定时器不会被清空, 所有子组件实例被卸载, 事件监听器被移除, 指令解除绑定
		unmounted () {
			console.log('unMounted', document.getElementById('root').innerHTML || '无', this.message);
		}
	})
	const vm = app.mount('#root')
</script>
```

![Vue3生命周期例子图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/Vue3生命周期例子.png)

## Vue2 生命周期图

:::details vue2生命周期图
![vue2生命周期图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/vue2生命周期.png)
:::

```html
<section id="app">
	<div>{{message}}</div>
</section>
```

```js
<script>
	const vm = new Vue({
		el: '#app',
		data () {
			return {
				message: 'hello, world'
			}
		},
		template: '<div id="root">{{message}}</div>',
		// 初始化事件及生命周期函数后调用, 此时还不能够访问 data
		beforeCreate () {
			console.log('beforeCreate', this.message);
		},
		// 初始化注入和响应式数据后调用, 此时可以访问 data 了
		created () {
			console.log('created', this.message);
		},
		// 将 template 模板转化为 render 函数后调用, 生成真实 DOM 前调用
		beforeMount () {
			console.log('beforeMount', document.getElementById('root'));
		},
		// 将生成的 DOM 挂载到 DOM 节点后调用
		mounted () {
			console.log('mounted', document.getElementById('root'));
		},
		// 数据发生改变, 虚拟 DOM 生成之前调用
		beforeUpdate () {
			console.log('beforeUpdate', document.getElementById('root').innerHTML);
		},
		// 数据发生改变后, 页面更新后调用
		updated () {
			console.log('updated', document.getElementById('root').innerHTML);
		},
		// 实例销毁前调用, 此时还能正常访问所有东西
		beforeDestroy () {
			console.log('beforeDestroy', document.getElementById('root').innerHTML || '无', this.message);
		},
		// 实例销毁完成后调用, 但数据仍可访问, 不过卸载完成之后可以被重新挂载, 
		// 注意, 定时器不会被清空, 所有子组件实例被卸载, 事件监听器被移除, 指令解除绑定
		// 通过 vm.$destroy 方法并不会引起页面刷新, 但实例的确被销毁, 我们应该通过 v-if 的方式控制组件生命周期
		destroyed () {
			console.log('destroyed', document.getElementById('root').innerHTML || '无', this.message);
		}
	})
</script>
```

![Vue2生命周期例子图](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/Vue2生命周期例子.png)

### 总结

1. Vue3 和 Vue2 模板的挂载点不一样。

:::warning
- Vue3 : 所提供 DOM 元素的 `innerHTML` 将被替换为应用根组件的模板渲染结果
- Vue2 : 所提供的 DOM 元素会被 Vue 生成的 DOM 替换
:::

2. 当选项中没有 `template` 或 `render` 时, Vue3 和 Vue2 提取的模板不同。

:::warning
- Vue3 : 将抽取所提供 DOM 元素的 `innerHTML` 作为模板
- Vue2 : 将直接抽取所提供的 DOM 元素作为模板
:::

3. Vue3 与 Vue2 实例销毁的生命周期函数名称不同, 其他的保持一致。

:::tip
- Vue3: `beforeUnmount`, `unmounted`
- Vue2: `beforeDestroy`, `destroyed`
:::

4. 不管是 Vue3 还是 Vue2, 实例销毁时都不会销毁定时器, 需手动清除, 否则损耗性能。
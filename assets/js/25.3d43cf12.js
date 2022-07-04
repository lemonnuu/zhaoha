(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{613:function(t,s,a){"use strict";a.r(s);var e=a(5),v=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"vue3-vue2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue3-vue2"}},[t._v("#")]),t._v(" Vue3 && Vue2")]),t._v(" "),a("p",[t._v("Vue3 与 Vue2 的 "),a("code",[t._v("Vue")]),t._v(" 在结构上有很大差别, Vue3 的 "),a("code",[t._v("Vue")]),t._v(" 是一个对象, Vue2 的 "),a("code",[t._v("Vue")]),t._v(" 是一个函数, 且只能通过 "),a("code",[t._v("new")]),t._v(" 调用。")]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("Vue3 的 Vue")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/Vue3.png",alt:"Vue3"}})])]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("Vue2 的 Vue")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/Vue2.png",alt:"Vue2"}})])]),t._v(" "),a("h2",{attrs:{id:"应用实例-组件实例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#应用实例-组件实例"}},[t._v("#")]),t._v(" 应用实例 && 组件实例")]),t._v(" "),a("h3",{attrs:{id:"创建一个应用实例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建一个应用实例"}},[t._v("#")]),t._v(" 创建一个应用实例")]),t._v(" "),a("p",[t._v("在 Vue3 中, 每个 Vue 应用都是通过 "),a("code",[t._v("createApp")]),t._v(" 函数创建的, 该方法返回一个提供应用上下文的应用实例。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createApp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 选项 */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v('该应用实例是用来在应用中注册"全局"组件的, 应用实例挂载的整个组件树共享同一个上下文。')]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("component")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'SearchInput'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" SearchInputComponent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("directive")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'focus'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" FocusDirective"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("LocalePlugin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("应用实例暴露的方法大多数都会返回该同一实例, 允许链式调用。\n这些方法可以在应用 API 中找到。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createApp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("component")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'SearchInput'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" SearchInputComponent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("directive")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'focus'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" FocusDirective"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("LocalePlugin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("应用实例图")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/%E5%BA%94%E7%94%A8%E5%AE%9E%E4%BE%8B.png",alt:"应用实例"}})])]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("应用 API")]),t._v(" "),a("ul",[a("li",[t._v("component : 注册或检索全局组件, 注册还会使用给定的 "),a("code",[t._v("name")]),t._v(" 参数自动设置组件的 "),a("code",[t._v("name")])]),t._v(" "),a("li",[t._v("config : 一个包含应用配置的对象")]),t._v(" "),a("li",[t._v("directive : 注册或检索全局指令")]),t._v(" "),a("li",[t._v("mixin : 将一个 mixin 应用在整个应用实例范围内, 一旦注册, 它们就可以在当前应用中的任何组件模板内使用它,\n插件作者可以使用此方法将自定义行为注入组件。 不建议在应用代码中使用")]),t._v(" "),a("li",[t._v("mount : 所提供 DOM 元素的 "),a("code",[t._v("innerHTML")]),t._v(" 将会"),a("strong",[t._v("替换")]),t._v("为应用根组件的模板渲染结果")]),t._v(" "),a("li",[t._v("provide : 设置一个可以被注入到应用范围内所有组件中的值")]),t._v(" "),a("li",[t._v("unmount : 卸载应用实例的根组件")]),t._v(" "),a("li",[t._v("use : 安装 Vue.js 插件")]),t._v(" "),a("li",[t._v("version : 以字符串形式提供已安装的 Vue 版本号")])])]),t._v(" "),a("h3",{attrs:{id:"根组件实例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#根组件实例"}},[t._v("#")]),t._v(" 根组件实例")]),t._v(" "),a("p",[a("code",[t._v("createApp")]),t._v(" 函数接收两个参数用于配置根组件, 当我们挂载应用时, 该组件被用作渲染的起点。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createApp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 根组件配置选项 */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 根组件 Prop */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("一个应用需要被挂载到一个 DOM 中, 所提供 DOM 元素的 "),a("code",[t._v("innerHTML")]),t._v(" 将被替换为应用根组件模板的渲染结果。")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("section")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("root"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("section")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" vm "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#root'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("与大多数应用方法不同的是, "),a("code",[t._v("mount")]),t._v(" 不返回应用本身。相反, 它返回的是根组件实例。")]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("MVVM 架构体现")]),t._v(" "),a("p",[t._v("MVVM(Model-View-ViewModel) 是一种软件架构模式, 在 Vue 中的体现实际上就是数据的双向绑定。\n"),a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/Vue%E7%9A%84MVVM.png",alt:"MVVM"}})]),t._v(" "),a("ul",[a("li",[t._v("M(Model) : 数据, data")]),t._v(" "),a("li",[t._v("V(View) : 视图, template")]),t._v(" "),a("li",[t._v("VM(ViewModel) : 视图数据连接层, 根组件实例")])])]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("组件实例图")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B.png",alt:"组件实例"}})])]),t._v(" "),a("h3",{attrs:{id:"组件实例-property"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组件实例-property"}},[t._v("#")]),t._v(" 组件实例 property")]),t._v(" "),a("p",[t._v("组件实例暴露了一些内置的 property, 如 "),a("code",[t._v("$data")]),t._v(", "),a("code",[t._v("$attrs")]),t._v("等。")]),t._v(" "),a("p",[t._v("组件实例创建之后, 可以通过 "),a("code",[t._v("vm.$data")]),t._v(" 访问原始数据对象, 且组件实例也代理了 data 对象上所有的 property,\n因此, 访问 "),a("code",[t._v("vm.a")]),t._v(" 等价于访问 "),a("code",[t._v("vm.$data.a")]),t._v("。")]),t._v(" "),a("p",[t._v("以 "),a("code",[t._v("_")]),t._v(" 或 "),a("code",[t._v("$")]),t._v(" 开头的 property 不会被组件实例代理, 因为它们可能和 Vue 内置的 property、API 方法冲突,\n但仍可使用 "),a("code",[t._v("vm.$data._property")]),t._v(" 的方式访问这些 property。")]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("组件实例内置属性")]),t._v(" "),a("p",[t._v("实例 property")]),t._v(" "),a("ul",[a("li",[t._v("$data : 组件实例正在侦听的数据对象, "),a("code",[t._v("vm.$data.a === vm.a")])]),t._v(" "),a("li",[t._v("$props : 当前组件接收到的 props 对象, "),a("code",[t._v("vm.$props.b === vm.b")])]),t._v(" "),a("li",[t._v("$el : "),a("strong",[t._v("仅可读")]),t._v(", 组件实例正在使用的根 DOM 元素")]),t._v(" "),a("li",[t._v("$options : "),a("strong",[t._v("仅可读")]),t._v(", 当前组件实例的初始化选项")]),t._v(" "),a("li",[t._v("$parent : "),a("strong",[t._v("仅可读")]),t._v(", 父实例, 如果当前实例有的话")]),t._v(" "),a("li",[t._v("$root : "),a("strong",[t._v("仅可读")]),t._v(", 当前组件树的根组件实例, 如果当前实例没有父实例, 此实例将会是其自己")]),t._v(" "),a("li",[t._v("$slots : "),a("strong",[t._v("仅可读")]),t._v(", 用来以编程方式访问通过插槽分发的内容")]),t._v(" "),a("li",[t._v("$refs : "),a("strong",[t._v("仅可读")]),t._v(", 一个对象, 持有注册过 "),a("code",[t._v("ref")]),t._v(" attribute 的所有 DOM 元素和组件实例")]),t._v(" "),a("li",[t._v("$attrs : "),a("strong",[t._v("仅可读")]),t._v(", 包含了父作用域中不作为组件 props 或自定义事件的 attribute 绑定和事件")])]),t._v(" "),a("p",[t._v("实例方法")]),t._v(" "),a("ul",[a("li",[t._v("$watch : 侦听组件实例上的响应式 property 或函数计算结果的变化")]),t._v(" "),a("li",[t._v("$emit : 触发当前实例上的事件, 附加参数都会传给监听器回调")]),t._v(" "),a("li",[t._v("$forceUpdate : 迫使组件实例重新渲染, 注意它仅仅影响实力本身和插入插槽内容的子组件, 而不是所有子组件")]),t._v(" "),a("li",[t._v("$nextTick : 将回调延迟到下次 DOM 更新循环之后执行")])])]),t._v(" "),a("h2",{attrs:{id:"vue-实例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-实例"}},[t._v("#")]),t._v(" Vue 实例")]),t._v(" "),a("h3",{attrs:{id:"创建一个-vue-实例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建一个-vue-实例"}},[t._v("#")]),t._v(" 创建一个 Vue 实例")]),t._v(" "),a("p",[t._v("在 Vue2 中, 每个应用都是通过用 "),a("code",[t._v("Vue")]),t._v(" 函数创建一个新的 Vue 实例开始的。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" vm "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 选项 */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[a("code",[t._v("el")]),t._v(" 选项用于将 Vue 实例挂载至 DOM 元素, 它只能够 "),a("code",[t._v("new")]),t._v(" 创建实例时生效,\n如果在实例化时存在这个选项, 实例将立即进入编译过程, 否则, 需要显示调用 "),a("code",[t._v("vm.$mount()")]),t._v(" 手动开始编译。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" vm "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("el")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#root'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"title"}),a("ol",[a("li",[t._v("提供的元素只能作为挂载点, 所有挂载元素会被 Vue 生成的 DOM 替换, 因此不推荐将 Vue 实例挂载至 "),a("code",[t._v("html")]),t._v(" 或 "),a("code",[t._v("body")]),t._v(" 上。")]),t._v(" "),a("li",[t._v("如果 "),a("code",[t._v("render")]),t._v(" 函数和 "),a("code",[t._v("template")]),t._v(" 选项都不存在, 挂载 DOM 元素的 HTML 会被提取出来用作模板, 此时, 必须使用 Runtime + Compiler 构建的 Vue 库。")])])]),a("p",[t._v("如果 Vue 实例在实例化阶段没有接收到 "),a("code",[t._v("el")]),t._v(' 选项, 则它处于"未挂载"状态, 没有与之关联的 DOM 元素,\n但可以使用 '),a("code",[t._v("vm.$mount()")]),t._v(" 手动地挂载一个未挂载的实例。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" vm "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$mount")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#root'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("这个方法返回实例自身, 因而可以链式调用其他实例方法。")]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("Vue2 的 MVVM")]),t._v(" "),a("ul",[a("li",[t._v("M(Model) : 数据, data")]),t._v(" "),a("li",[t._v("V(View) : 视图, template")]),t._v(" "),a("li",[t._v("VM(ViewModel) : 视图数据连接层, Vue 实例")])])]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("Vue实例图")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/vue/Vue%E5%AE%9E%E4%BE%8B.png",alt:"Vue实例"}})])]),t._v(" "),a("h3",{attrs:{id:"vue-实例-property"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-实例-property"}},[t._v("#")]),t._v(" Vue 实例 property")]),t._v(" "),a("p",[t._v("和 Vue3 的组件实例一样, Vue 实例同样拥有很多内置 property, 但无疑更多。")]),t._v(" "),a("p",[t._v("Vue 实例创建之后, 可以通过 "),a("code",[t._v("vm.$data")]),t._v(" 访问原始数据对象, 且 Vue 实例也代理了 data 对象上所有的 property,\n因此, 访问 "),a("code",[t._v("vm.a")]),t._v(" 等价于访问 "),a("code",[t._v("vm.$data.a")]),t._v("。")]),t._v(" "),a("p",[t._v("以 "),a("code",[t._v("_")]),t._v(" 或 "),a("code",[t._v("$")]),t._v(" 开头的 property 不会被 Vue 实例代理, 因为它们可能和 Vue 内置的 property、API 方法冲突,\n但仍可使用 "),a("code",[t._v("vm.$data._property")]),t._v(" 的方式访问这些 property。")]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("Vue 实例内置属性")]),t._v(" "),a("p",[t._v("实例 property")]),t._v(" "),a("ul",[a("li",[t._v("$data : Vue 实例正在侦听的数据对象, "),a("code",[t._v("vm.$data.a === vm.a")])]),t._v(" "),a("li",[t._v("$props : 当前组件接收到的 props 对象, "),a("code",[t._v("vm.$props.b === vm.b")])]),t._v(" "),a("li",[t._v("$el : "),a("strong",[t._v("仅可读")]),t._v(", Vue 实例正在使用的根 DOM 元素")]),t._v(" "),a("li",[t._v("$options : "),a("strong",[t._v("仅可读")]),t._v(", 当前 Vue 实例的初始化选项")]),t._v(" "),a("li",[t._v("$parent : "),a("strong",[t._v("仅可读")]),t._v(", 父实例, 如果当前实例有的话")]),t._v(" "),a("li",[t._v("$root : "),a("strong",[t._v("仅可读")]),t._v(", 当前组件树的根 Vue 实例, 如果当前实例没有父实例, 此实例将会是其自己")]),t._v(" "),a("li",[t._v("$slots : "),a("strong",[t._v("仅可读")]),t._v(", 用来以编程方式访问通过插槽分发的内容")]),t._v(" "),a("li",[t._v("$refs : "),a("strong",[t._v("仅可读")]),t._v(", 一个对象, 持有注册过 "),a("code",[t._v("ref")]),t._v(" attribute 的所有 DOM 元素和组件实例")]),t._v(" "),a("li",[t._v("$attrs : "),a("strong",[t._v("仅可读")]),t._v(", 包含了父作用域中不作为组件 props 或自定义事件的 attribute 绑定和事件")]),t._v(" "),a("li",[t._v("$children : "),a("strong",[t._v("仅可读")]),t._v(", 当前实例的直接子组件, 注意 "),a("code",[t._v("$children")]),t._v(" 并不能保证顺序, 也不是响应式的")]),t._v(" "),a("li",[t._v("$listeners : "),a("strong",[t._v("仅可读")]),t._v(", 包含父作用域中的(不含 "),a("code",[t._v(".native")]),t._v(" 修饰器的) "),a("code",[t._v("v-on")]),t._v(" 事件监听器")]),t._v(" "),a("li",[t._v("$scopedSlots : "),a("strong",[t._v("仅可读")]),t._v(", 用来访问作用域插槽")]),t._v(" "),a("li",[t._v("isServer : "),a("strong",[t._v("仅可读")]),t._v(", 当前 Vue 实例是否运行于服务器")])]),t._v(" "),a("p",[t._v("实例方法/数据")]),t._v(" "),a("ul",[a("li",[t._v("$watch : 侦听 Vue 实例上的响应式 property 或函数计算结果的变化")]),t._v(" "),a("li",[t._v("$set : 全局 "),a("code",[t._v("Vue.set")]),t._v(" 的别名, 设置值")]),t._v(" "),a("li",[t._v("$delete : 全局 "),a("code",[t._v("Vue.delete")]),t._v(" 的别名, 删除值")])]),t._v(" "),a("p",[t._v("实例方法/事件")]),t._v(" "),a("ul",[a("li",[t._v("$on : 监听当前实例上的自定义事件, 事件可以由 "),a("code",[t._v("vm.$emit()")]),t._v(" 触发")]),t._v(" "),a("li",[t._v("$once : 监听一个自定义事件, 但是只触发一次, 一旦触发后, 监听器就会被移除")]),t._v(" "),a("li",[t._v("$off : 移除自定义事件监听器")]),t._v(" "),a("li",[t._v("$emit : 触发当前实例的事件, 附加参数都会传给监听器回调")])]),t._v(" "),a("p",[t._v("实例方法/生命周期")]),t._v(" "),a("ul",[a("li",[t._v("$mount : 手动挂载未挂载的 Vue 实例")]),t._v(" "),a("li",[t._v("$forceUpdate : 迫使 Vue 实例重新渲染, 注意它仅仅影响实力本身和插入插槽内容的子组件, 而不是所有子组件")]),t._v(" "),a("li",[t._v("$nextTick : 将回调延迟到下次 DOM 更新循环之后执行")]),t._v(" "),a("li",[t._v("$destroy : 完全销毁一个实例, 不应该使用")])])]),t._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("ol",[a("li",[t._v("较于 Vue2 的一把梭, Vue3 的模块拆分更细化。")])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("ul",[a("li",[t._v("Vue2 是把所有的东西都挂载至 Vue 实例上, 显得很臃肿")]),t._v(" "),a("li",[t._v("Vue3 分为了应用实例和根组件实例, 职责更明确")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[t._v("其实, 是 Vue2 的全局 API 更改为了 Vue3 的应用程序 API, 但两者还是有挺大出入的。\n并且, Vue3 的全局和内部 API 已经被重构为支持 tree-shake。")])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("Vue3 没有 "),a("code",[t._v("el")]),t._v(" 组件配置选项, 挂载至 DOM 节点只能通过应用实例方法 "),a("code",[t._v("mount()")]),t._v(" 手动挂载,\n而 Vue2 则可通过 "),a("code",[t._v("el")]),t._v(" 选项自动挂载和 Vue 实例方法 "),a("code",[t._v("$mount()")]),t._v(" 手动挂载。")])]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"title"}),a("p",[t._v("Vue3 挂载节点的方式是替换所提供 DOM 元素的 "),a("code",[t._v("innerTHML")]),t._v(", 而 Vue2 是替换所提供的 DOM 元素")])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[t._v("注意 Vue3 手动挂载的方式是 "),a("code",[t._v("mount()")]),t._v(", 而 Vue2 手动挂载的方式是 "),a("code",[t._v("$mount()")]),t._v(", 写法不一样!")])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("Vue3 没有 "),a("code",[t._v("propsData")]),t._v(" 组件配置选项, 但它可通过 "),a("code",[t._v("Vue.createApp()")]),t._v(" 的第二个参数实现相同的效果, Vue2 则是通过 "),a("code",[t._v("propsData")]),t._v(" 选项来传入根组件 Prop。")])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[t._v("Vue2 的 "),a("code",[t._v("propsData")]),t._v(" 选项只用于 "),a("code",[t._v("new")]),t._v(" 创建的实例中。")])]),a("ol",{attrs:{start:"4"}},[a("li",[t._v("Vue3 移除了一些冷门的 feature")])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[t._v("组件实例较于 Vue 实例, 移除了 "),a("code",[t._v("$children")]),t._v(", "),a("code",[t._v("$scopedSlots")]),t._v(", "),a("code",[t._v("$isServer")]),t._v(", "),a("code",[t._v("$listeners")]),t._v(" 四个实例 property。")])])])}),[],!1,null,null,null);s.default=v.exports}}]);
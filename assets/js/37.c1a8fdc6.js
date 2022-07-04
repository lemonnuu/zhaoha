(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{624:function(s,t,a){"use strict";a.r(t);var e=a(5),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/webpack/0004-webpack%E5%AE%98%E7%BD%91%E5%9B%BE.png",alt:"0004-webpack官网图"}})]),s._v(" "),a("p",[s._v("💢 在每次更改完代码后, 手动运行 "),a("code",[s._v("npm run build")]),s._v(" 重新打包会很麻烦 ❗️")]),s._v(" "),a("p",[s._v("可不可以在代码发生变化后能够自动编译代码 ❓")]),s._v(" "),a("p",[s._v("🌑 可以, 不但可以, 还不止一种方式 🌕")]),s._v(" "),a("p",[s._v("webpack 提供几种可选方式, 可以在代码发生改变后后自动编译：")]),s._v(" "),a("ol",[a("li",[s._v("webpack --watch")]),s._v(" "),a("li",[s._v("webpack-dev-server")]),s._v(" "),a("li",[s._v("webpack-dev-middleware")])]),s._v(" "),a("div",{staticClass:"custom-block danger"},[a("p",{staticClass:"title"}),a("p",[s._v("当然还是首选 webpack-dev-server 啦 ❗️")])]),a("h2",{attrs:{id:"watch-mode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#watch-mode"}},[s._v("#")]),s._v(" watch mode")]),s._v(" "),a("p",[s._v("可以通过 "),a("code",[s._v("webpack --watch")]),s._v(" 命令指示 webpack 监听依赖图中所有文件的更改, 只要其中文件发生更改, 代码将会被重新编译。")]),s._v(" "),a("p",[s._v("package.json")]),s._v(" "),a("div",{staticClass:"language-json extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1.0.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"watch"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"webpack --watch"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"license"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ISC"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"devDependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"css-loader"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^6.7.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"html-webpack-plugin"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^5.5.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"style-loader"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^3.3.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"webpack"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^5.72.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"webpack-cli"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^4.9.2"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("在命令行中运行 "),a("code",[s._v("npm run watch")]),s._v(", 编译完成后并没有退出命令行, 这是因为 script 当前还在 watch 文件。")]),s._v(" "),a("p",[a("strong",[a("code",[s._v("webpack --watch")]),s._v(" 唯一的缺点就是需要刷新浏览器才能够看见变化。")])]),s._v(" "),a("p",[s._v("要是修改完代码自动编译后还能自动刷新浏览器就好了, 真是人丑还想得美, 满足你 ❗️")]),s._v(" "),a("h2",{attrs:{id:"webpack-dev-server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webpack-dev-server"}},[s._v("#")]),s._v(" webpack-dev-server")]),s._v(" "),a("p",[a("code",[s._v("webpack-dev-server")]),s._v(" 可以提供一个基本的 web server, 并且具有 live reloading(实时重新加载)功能。")]),s._v(" "),a("p",[s._v("安装")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" webpack-dev-server -D\n")])])]),a("p",[s._v("package.json")]),s._v(" "),a("div",{staticClass:"language-json extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1.0.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"watch"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"webpack --watch"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"webpack-dev-server"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"license"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ISC"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"devDependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"css-loader"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^6.7.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"html-webpack-plugin"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^5.5.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"style-loader"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^3.3.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"webpack"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^5.72.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"webpack-cli"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^4.9.2"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"webpack-dev-server"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^4.9.0"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("现在, 文件将可以通过 "),a("code",[s._v("http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]")]),s._v(" 进行访问。")]),s._v(" "),a("div",{staticClass:"custom-block danger"},[a("p",{staticClass:"title"}),a("p",[s._v("webpack-dev-server 在编译后不会写入任何输出文件至硬盘, 而是将 bundle 文件保留在了内存中, 然后将它们 serve 到 server 中, 就好像是它们挂载在 server 根路径上的真实文件一样。")])]),a("h3",{attrs:{id:"配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[s._v("#")]),s._v(" 配置")]),s._v(" "),a("p",[a("code",[s._v("webpack-dev-server")]),s._v(" 具有许多可配置的选项, 下面列举一些常用的：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("devServer.open")]),s._v(" : 设置为 "),a("code",[s._v("true")]),s._v(" 可在服务启动后自动打开默认浏览器")]),s._v(" "),a("li",[a("code",[s._v("devServer.host")]),s._v(" : 指定服务的 host")]),s._v(" "),a("li",[a("code",[s._v("devServer.port")]),s._v(" : 指定服务的端口")]),s._v(" "),a("li",[a("code",[s._v("devServer.static")]),s._v(" : 配置从目录提供静态文件的选项, 默认是 'public' 文件夹, 设置为 "),a("code",[s._v("false")]),s._v(" 禁用, 可以是一个数组")]),s._v(" "),a("li",[a("code",[s._v("devServer.hot")]),s._v(" : 启用热模块更新特性")]),s._v(" "),a("li",[a("code",[s._v("devServer.proxy")]),s._v(" : 开启代理, 可解决浏览器的跨域问题, 用于接口请求")])]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" path "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'path'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" HtmlWebpackPlugin "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'html-webpack-plugin'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("mode")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'development'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("entry")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./src/index.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("devServer")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("open")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("host")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'127.0.0.1'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("port")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'8005'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./public'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./static'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("hot")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'only'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("proxy")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v("'/api'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("target")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http://localhost:3000'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("pathRewrite")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v("'^/api'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("output")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("path")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("__dirname"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'dist'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("filename")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'[name]-[contenthash:6].js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("clean")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("h2",{attrs:{id:"webpack-dev-middleware"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webpack-dev-middleware"}},[s._v("#")]),s._v(" webpack-dev-middleware")]),s._v(" "),a("p",[a("code",[s._v("webpack-dev-middleware")]),s._v(" 可以用来实现一个自己的 webpack-dev-server。 (可以, 但没必要, 但必须知道怎么做的) ❗️")]),s._v(" "),a("p",[a("code",[s._v("webpack-dev-middleware")]),s._v(" 是一个封装器(wrapper), 它可以把 webpack 处理过的文件发送到一个 server。")]),s._v(" "),a("p",[s._v("webpack-dev-server 在内部使用了它, 但是它也可以作为一个单独的 package 使用。")]),s._v(" "),a("p",[s._v("这个需要在 node 环境中使用, 安装：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" express webpack-dev-middleware -D\n")])])]),a("p",[s._v("package")]),s._v(" "),a("div",{staticClass:"language-diff extra-class"},[a("pre",{pre:!0,attrs:{class:"language-diff"}},[a("code",[a("span",{pre:!0,attrs:{class:"token unchanged"}},[a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(" webpack-demo\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- /node_modules\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- package.json\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- package-lock.json\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- /src\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v("   |- index.js\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v("   |- index.css\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- webpack.config.js\n")])]),a("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- serve.js\n")])])])])]),a("p",[s._v("serve.js")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" express "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'express'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" webpack "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'webpack'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" webpackDevMiddleware "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'webpack-dev-middleware'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" config "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./webpack.config'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" compiler "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("webpack")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("express")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("webpackDevMiddleware")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("compiler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("publicPath")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("output"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("publicPath\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("listen")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'The server is runing on port 3000!'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),a("p",[s._v("package.json")]),s._v(" "),a("div",{staticClass:"language-diff extra-class"},[a("pre",{pre:!0,attrs:{class:"language-diff"}},[a("code",[s._v("{\n"),a("span",{pre:!0,attrs:{class:"token unchanged"}},[a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(' "name": "test",\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(' "version": "1.0.0",\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(' "scripts": {\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "watch": "webpack --watch",\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "dev": "webpack-dev-server",\n')])]),a("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "serve": "node serve.js"\n')])]),a("span",{pre:!0,attrs:{class:"token unchanged"}},[a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(" },\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(' "license": "ISC",\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(' "devDependencies": {\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "css-loader": "^6.7.1",\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "express": "^4.18.1",\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "html-webpack-plugin": "^5.5.0",\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "style-loader": "^3.3.1",\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "webpack": "^5.72.1",\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "webpack-cli": "^4.9.2",\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "webpack-dev-middleware": "^5.3.3",\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "webpack-dev-server": "^4.9.0"\n')]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[s._v(" }\n")])]),s._v("}\n")])])]),a("p",[s._v("需要注意的是, serve.js 只实现了代码更改自动编译代码的操作, 并不会自动刷新浏览器, 如果要实现和 webpack-dev-server 一样的功能, 需要添加非常多的东西。")])])}),[],!1,null,null,null);t.default=n.exports}}]);
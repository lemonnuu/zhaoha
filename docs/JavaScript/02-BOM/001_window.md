---
title: window
author: 爪哈
date: 2022-06-07 09:20:00
---

![0001_BOM](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/JavaScript/0001_BOM.png)

BOM(Browser Object Model, 浏览器对象模型) 是 JavaScript 与浏览器交互的接口。

BOM 的核心是 window 对象, 表示当前 JavaScript 脚本运行所处的窗口实例, 每一个窗口(包括 iframe )都拥有自己的 window 对象。

window 对象在浏览器中有两重身份, 一个是 ECMAScript 中的 Global 对象, 另一个就是浏览器窗口的 JavaScript 接口。

## Global作用域

因为 window 对象被复用为 ECMAScript 的 Global 对象, 所以通过 `var` 声明的所有全局变量和函数都会变成 window 对象的属性和方法。

**但是通过 `var` 声明的全局变量成为 window 对象的属性或方法后不能被 `delete` 删除。**

:::danger 面试题
```js
var age = 29;
window.color = "red";
delete window.age; // 在IE<9时抛出错误，在其他所有浏览器中都返回false
delete window.color; // 在IE<9时抛出错误，在其他所有浏览器中都返回true

alert(window.name) // ''
alert(window.age) //29
alert(window.color) //undefined
```
使用 var 语句添加的 window 属性的 [[configurable]] 特性值会被设置为 false，这样定义的属性不可以通过delete操作符删除。所以 age 没有被删除, 输出29。
window 对象中本身有个 name 属性，window.name 表示当前 window 的名称。
而 color 是通过 window.color 赋值的, 所以可以被删除。
:::

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

## 窗口位置与像素比

浏览器提供了 `screenLeft` 和 `screenTop` 属性, 用于表示窗口相对于屏幕左侧和顶部的位置, 返回值的单位是 CSS 像素。

可以使用 `moveTo()` 和 `moveBy()` 方法移动窗口, 这两个方法都接收两个参数。

- `moveTo()` 接收移动到新位置的绝对坐标 x 和 y
- `moveBy()` 接收相对于当前位置在两个方向上移动的像素数

```js
window.moveTo(0, 0) // 把窗口移动到左上角
window.moveTo(200, 300) // 把窗口移动到坐标位置(200, 300)
window.moveBy(0, 100) // 把窗口向下移动 100 像素
window.moveBy(-50, 0) // 把窗口向左移动 50 像素
```

:::danger
`moveTo`, `moveBy`, `resizeTo` 等等窗口函数, 对于本地打开的浏览器窗口而言只有 IE 生效。

其它浏览器, 只有当窗口对象是 `window.open()` 出来的才能生效。
:::

### 像素比 (DPR)

CSS 像素是 Web 开发中使用的统一像素单位。这个单位的背后其实是一个角度: 0.0213°。
如果屏幕距离人眼一臂长, 则以这个角度计算的 CSS 像素大小约为 1/96 英寸。这样定义像素大小是为了在不同设备上统一标准。

比如, 低分辨率平板设备上 12 像素 (CSS像素) 的文字应该与高清 4K 屏幕下 12 像素 (CSS像素) 的文字具有相同大小。
这就带来了一个问题, 不同像素密度 (PPI, 每英寸物理像素个数) 的屏幕下就会有不同的缩放系数, 以便把物理像素 (屏幕实际的分辨率) 转换为 CSS 像素 (浏览器报告的虚拟分辨率)。

举个例子, 手机屏幕的物理分辨率可能是 1920 * 1080, 但因为其物理像素可能非常小, 所以浏览器就需要将其分辨率降为较低的逻辑分辨率, 比如 640 * 320。
这个物理像素与 CSS 像素之间的转换比率由 `window.devicePixelRatio` 属性提供。
对于分辨率从 1920 * 1080 转换为 640 * 320 的设备, `window.devicePixelRatio` 的值就是 3, 这样一来, 12px 的文字实际上就会用到 36物理像素来显示。

`window.devicePixelRatio` 表示物理像素与逻辑像素的缩放系数, 也就是 1px 需要用多少物理像素表示。

## 窗口大小

在不同浏览器中确定浏览器窗口大小没有想象的那么容易。所有现代浏览器都支持 4 个属性 : `outerWidth`, `outerHeight`, `innerWidth`, `innerHeight`。

- `window.outerWidth` : 浏览器窗口自身的宽度(包含边框、滚动条)
- `window.innerWidth` : 浏览器窗口中视口宽度(不包含边框, 但包含滚动条)
- `document.documentElement.clientWidth` : 页面视口宽度(不包含滚动条)
- `window.outerHeight` : 浏览器窗口自身的高度(包含边框、工具栏、滚动条)
- `window.innerWidth` : 浏览器窗口中视口高度(不包含边框、工具栏, 但包含滚动条)
- `document.documentElement.clientHeight` : 页面视口高度(不包含滚动条)

考虑到浏览器的兼容性, 可以如下获取页面视口的大小 :

```js
const viewportWidth = document.documentElement.clientWidth || window.innerWidth
const viewportHeight = document.documentElement.clientHeight || window.innerHeight
```

可以使用 `resizeTo()` 和 `resizeBy` 方法调整窗口大小, 这两个方法都接收两个参数。

- `resizeTo()` 接收新的宽度和高度值
- `resizeBy()` 接收宽度和高度各要缩放多少

```js
window.resizeTo(100, 100) // 缩放到 100 * 100
window.resizeBy(100, -150) // 宽度增加 100, 高度减少 150
```

:::danger
`moveTo`, `moveBy`, `resizeTo` 等等窗口函数, 对于本地打开的浏览器窗口而言只有 IE 生效。

其它浏览器, 只有当窗口对象是 `window.open()` 出来的才能生效。
:::

## 视口位置

浏览器窗口尺寸通常无法满足完整显示整个页面, 为此用户可以通过滚动在有限的视口中查看文档。

度量文档相对于视口滚动距离的属性有俩对, 返回相等的值：`window.pageXoffset/window.scrollX` 和 `window.pageYoffset/window.scrollY` 。

可以使用 `scroll()`、`scrollTo()` 和 `scrollBy()` 方法滚动页面。
这三个方法都接收表示相对视口距离的 x 和 y 坐标, 这两个参数在前两个方法中表示要滚动到的坐标, 在最后一个方法中表示要滚动的距离。

`scroll()` 与 `scrollTo()` 方法等价。

```js
window.scroll(0, 0) // 滚动到页面左上角
window.scrollTo(0, 0) // 滚动到页面左上角
window.scrollBy(0, 100) // 相对于当前视口向下滚动 100 像素
```

这几个方法也都接收一个 scrollToOptions 字典, 除了提供偏移值, 还可以通过 behavior 属性告知浏览器是否平滑滚动。

```js
window.scrollTo({
  left: 100,
  top: 100,
  behavior: 'auto' // 正常滚动
})

window.scrollTo({
  left: 100,
  top: 100,
  behavior: 'smooth' // 平滑滚动
})
```

:::danger
需要注意的是, 这些都是 window 对象的属性, 在元素中也有类似的属性或方法。

- Element 基类: `scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`、`clientWidth`、`clientHeight`、`clientTop`、`clientLeft`、
`scroll()`、`scrollTo()`、`scrollBy()`、`scrollIntoView()`
- HTMLElement 接口: `offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`
:::

## 导航与打开新窗口

`window.open()` 方法可以用于打开新浏览器窗口, 也可用于导航到指定 URL。这个方法接收 4 个参数：要加载的 URL、目的窗口、特性字符串
和表示新窗口在浏览器历史记录中是否替代当前加载页面的布尔值。

通常, 一般用这个方法打开新窗口, 导航一般用 `window.location.href` 与 `window.location.replace`。

弹窗只有在用户操作下才允许被创建, 在网页加载过程中调用 `window.open()` 没有效果, 而且还可能导致向用户显示错误。
弹窗通常可能在鼠标点击或按下键盘中某个键的情况下才能打开。

### 弹出窗口

如果 `window.open()` 的第二个参数是一个已经存在的窗口名字, 则会在对应的窗口中打开 URL。

```js
// 与<a href="http://www.xx.com" target="topFrame" /> 作用相同
window.open('http://www.xx.com', 'topFrame')
```

执行这行代码的结果就如同用户点击了一个 href 属性为 "http://www.xx.com", target 属性为 "topFrame" 的链接。
如果有一个窗口名叫 "topFrame", 则这个窗口就会打开 URL; 否则就会打开一个新窗口并将其命名为 "topFrame"。
第二个参数也可以是一个特殊的窗口名, 如 _self、_parent、_top、_blank。

<hr/>

如果 `window.open()` 的第二个参数不是已有窗口, 则会打开一个新窗口或标签页。第三个参数, 即特性字符串, 用于指定新窗口的配置。
如果没有传第三个参数, 则新窗口会带有所有默认的浏览器特性。如果打开的不是新窗口, 则忽略第三个参数。

特性字符串是一个逗号分隔的设置字符串, 用于指定新窗口包含的特性, 常用的就 `left`、`top`、`width` 与 `height`

| 设置   | 值   | 说明                                |
| ------ | ---- | ----------------------------------- |
| width  | 数值 | 新窗口宽度。这个值不能小于 100      |
| height | 数值 | 新窗口高度。这个值不能小于 100      |
| left   | 数值 | 新窗口的 x 轴坐标。这个值不能是负值 |
| top    | 数值 | 新窗口的 y 轴坐标。这个值不能是负值 |

这些设置需要以逗号分隔的键值对形式出现, 其中名值对以等号连接。(特性字符串中不能包含空格), 例如：

```js
window.open('http://www.xx.com', '_blank', 'width=200,height=200,top=50,left=30')
```

<hr/>

`window.open()` 方法返回一个对新建窗口的引用。这个对象与普通 window 对象没有什么区别, 可以使用这个对象操纵新打开的窗口。

```js
let winByOpen = window.open('http://www.xx.com', '_blank', 'width=200,height=200,top=50,left=30')
```

还可以使用 close() 方法像这样关闭新打开的窗口：

```js
winByOpen.close()
```

关闭窗口引用以后, 窗口的引用虽然还在, 但只能用于检查其 closed 属性了：

```js
winByOpen.close()
alert(winByOpen.closed) // true
```

新创建窗口的 window 对象有一个属性 opener, 指向打开它的窗口。

```js
alert(winByOpen.opener === window) // true
```

虽然新建窗口中有指向打开它的窗口的指针, 但反之则不然。窗口不会跟踪记录自己打开的新窗口, 因此需要自己记录。

### 弹窗屏蔽程序

所有现代浏览器都内置了屏蔽弹窗的程序, 因此大多数意料之外的弹窗都会被屏蔽。在浏览器屏蔽弹窗时, 可能会发生一些事情。
如果是浏览器内置的弹窗屏蔽程序阻止了弹窗, 那么 window.open() 很可能会返回 null。
此时, 只要检查这个方法的返回值就可以知道弹窗是否被屏蔽了, 比如：

```js
let winByOpen = window.open('http://www.xx.com', '_blank', 'width=200,height=200,top=50,left=30')
if (winByOpen == null) {
  alert('The popup was blocked!')
}
```

在浏览器或其他程序屏蔽弹窗时, window.open() 通常会抛出错误。因此要准确检测弹窗是否被屏蔽, 
除了检测 window.open() 的返回值, 还要用 try/catch 将它包装起来, 像这样：

```js
let blocked = false

try {
  let winByOpen = window.open('http://www.xx.com', '_blank', 'width=200,height=200,top=50,left=30')
  if (winByOpen == null) {
    blocked = true
  }
} catch (ex) {
  blocked = true
}
if (blocked) {
  alert('The popup was blocked!')
}
```

无论弹窗是用什么方法屏蔽的, 以上代码都可以准确判断调用 window.open() 的弹窗是否被屏蔽了。

:::warning
检测弹窗是否被屏蔽, 不影响浏览器显示关于弹窗被屏蔽的消息。
:::

## 定时器

JavaScript 在浏览器中是单线程执行的, 但允许使用定时器指定某个时间后或每隔一段时间就执行相应的代码。

setTimeout() 用于指定在一定时间后执行某些代码, 而 setInterval() 用于指定每隔一段时间执行某些代码。

### setTimeout

setTimeout() 方法通常接收两个参数：要执行的代码和将回调函数放入任务队列等待的时间(以毫秒计)。
**第一个参数可以是包含 JavaScript 代码的字符串**(类似传给 eval() 的字符串)或者一个函数, 比如：

```js
setTimeout(() => {alert('hello, world')}, 3000)
```

第二个是等待的毫秒数, 但不是执行代码的确切时间。JavaScript 是单线程的, 所以每次只能执行一段代码。
为了调度不同代码的执行, JavaScript 维护了一个任务队列。其中的任务会按照添加到队列的先后顺序执行。
**setTimeout() 的第二个参数只是告诉 JavaScript 引擎在指定的毫秒数过后把任务添加到这个队列。
如果这个队列是空的, 则会立即执行该代码。如果队列不是空的, 则代码必须等待前面的任务执行完才能执行。**

调用 setTimeout() 时, 会返回一个表示该超时排期的数值 ID。这个超时 ID 是被排期执行代码的唯一标识符, 可用于取消该任务。
要取消等待中的排期任务, 可以调用 clearTimeout() 方法并传入超时 ID, 例如：

```js
let timeoutId = setTimeout(() => alert('hello, world'), 1000)
clearTimeout(timeoutId)
```

只要在指定时间到达之前调用 clearTimeout(), 就可以取消超时任务。在任务执行后再调用 clearTimeout() 没有效果。

:::danger
所有超时执行的代码都会在全局作用域中的一个匿名函数中运行, 因此函数中的 this 值在非严格模式始终指向 window, 
而在严格模式下是 undefined。如果给 setTimeout() 提供一个箭头函数, 那么 this 会保留为定义它时所在的词汇作用域。
:::

### setInterval

setInterval() 与 setTimeout() 的使用方法类似, 只不过指定的任务会每隔指定时间就被推入任务队列一次, 直到取消循环定时或页面卸载。
setInterval() 同样可以接收两个参数：要执行的代码(字符或函数), 以及下一次将任务推入任务队列的时间(毫秒)。例如：

```js
setInterval(() => console.log('hello, world'), 3000)
```

:::warning
第二个参数, 也就是间隔时间, 指的是向任务队列添加新任务之前等待的时间。比如, 调用 setInterval() 的时间为 01:00:00,
间隔时间为 3000 毫秒。这意味着 01:00:03 时, 浏览器会把任务添加到执行队列。
浏览器不关心这个任务什么时候执行或执行要花多长时间。因此, 到了 01:00:06, 它会再次向任务队列添加一个任务。

**由此可见, 执行时间短, 非阻塞的回调函数比较适合 setInterval。**
:::

setInterval() 也会返回一个循环定时 ID, 可以用于在未来某个时间点上取消循环定时。要取消循环定时, 可以调用 clearInterval() 并传入定时 ID。
相对于 setTimeout() 而言, 取消定时的能力对 setInterval() 更加重要。毕竟, 如果一直不管它, 那么定时任务会一直执行到页面卸载。例如：

```js
let count = 0
let intervalId = setInterval(() => {
  if (count > 5) {
    clearInterval(intervalId)
    intervalId = null
  } else {
    count++
  }
}, 2000)
```

这个循环任务模式也可以用 setTimeout() 来实现, 比如：

<div style="page-break-before: always"></div>

```js
let count = 0
let loopFuc = () => {
  if (count > 5) {
    return ;
  } else {
    count++
    setTimeout(loopFuc, 2000)
  }
}
setTimeout(loopFuc, 2000)
```

利用 setTimeout() 实现循环任务是推荐的做法, setInterval() 在实践中很少会在生产环境下使用, 因为一个任务结束和下一个任务开始之间的时间间隔是无法保证的, 
有些任务可能会因此被跳过。而利用 setTimeout() 实现则能确保不会出现这种情况。一般来说, 最好不要使用 setInterval()

## 系统对话框

使用 alert()、confirm() 和 promt() 方法, 可以让浏览器调用系统对话框向用户显示消息。这些对话框与浏览器中设置的网页无关, 而且也不包含 HTML。
它们的外观由操作系统或浏览器决定, 无法使用 CSS 设置。

**此外, 这些对话框都是同步的模态对话框, 即在它们显示的时候, 代码会停止执行, 在它们消失后, 代码才会恢复执行**

<hr/>

警告框 alert() 只接收一个参数, 调用 alert() 时, 传入的字符串会显示在一个系统对话框。对话框只有一个 "OK"(确定) 按钮。
如果传给 alert() 的参数不是一个原始字符串, 则会调用这个值的 toString() 方法将其转换为字符串。

<hr/>

确认框 confirm() 与警告框很类似, 都会向用户显示消息。但不同之处在于, 确认框有两个按钮: "Cancel"(取消) 和 "OK"(确定)。
要知道用户单击了 OK 按钮或是 Cancel 按钮, 可以判断 confirm() 的返回值: true 表示单击了 OK 按钮, false 表示单击了 Cancel 按钮
或者通过单击某一角上的 X 图标关闭了确认框。

<hr/>

提示框 promt() 用途是提示用户输入消息。除了 OK 按钮和 Cancel 按钮, 提示框还会显示一个文本框, 让用户输入内容。
promt() 方法接收两个参数: 要显示给用户的文本, 以及文本框的默认值(可以是空字符串)。

如果用户单击了 OK 按钮, 则 promt() 会返回文本框中的值。如果用户单击了 Cancel 按钮, 或者提示框被关闭, 则 promt() 会返回 null。

<hr/>

JavaScript 还可以显示另外两种对话框: find() 和 print()。这两种对话框都是异步显示的, 即控制权会立即返回给脚本。
用户在浏览器菜单上选择 "查找"(find) 和 打印(print) 时显示的就是这两种对话框。
可以通过在 window 对象上调用 find() 和 print() 显示它们。

```js
window.find() // 显示查找对话框
window.print() // 显示打印对话框
```

这两个方法不会返回任何有关用户在对话框中执行了什么操作的信息。

:::danger
- 同步对话框: alert()、confirm()、promt()
- 异步对话框: find()、print()
:::

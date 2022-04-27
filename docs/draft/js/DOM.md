---
title: DOM 草稿
author: 爪哈
date: 2022-4-6
categories:
- 草稿
tags:
- HTML
---

DOM 表示由多层节点构成的文档, 通过它开发者可以添加、删除和修改页面的各个部分。

任何 HTML 或 XML 文档都可以用 DOM 表示为一个由节点构成的层级结构, 节点分为很多类型

document 节点表示每个文档的根节点, 根节点唯一子节点是 `<html>` 元素, 我们称之为文档元素

实时的活动对象，第一次访问时的快照

## Node 类型

DOM 中共有 12 种节点类型

### nodeName 与 nodeValue

nodeName 和 nodeValue 保存着有关节点的信息, 但这两个属性的值完全取决于节点类型,
在使用这两个属性前, 最好先检测一哈节点类型

对元素节点来说, nodeName 始终等于元素的标签名, nodeValue 始终是 null

### 节点关系

每个节点都有一个 childNodes 属性, 其中包含一个 NodeList 的实例, 
NodeList 是一个类数组对象, 用于存储可以按位置存取的有序节点。

NodeList 的独特之处就在于, 他其实是一个对 DOM 结构的查询,
因此 DOM 结构的变化会自动地在 NodeList 中反映出来。
我们通常说 NodeList 是实时的活动对象, 而不是第一次访问时所获得内容快照。

每个节点都有一个 parentNode 属性, 指向其 DOM 树中的父元素

childNodes, parentNode, previousSibling, nextSibling, firstChild, lastChild
第一个子节点的 previousSibling 是 null
最后一个子节点的 nextSibling 是 null

hasChildNodes() 返回 true, 代表有子节点, childNodes.length 也可以判断

### 操纵节点

appendChild(), 用于在 childNodes 列表末尾添加节点, 返回新添加的节点

如果把文档中已经存在的节点传给 appendChild(), 则这个节点会从之前的位置被转移到新位置

即使 DOM 树通过各种关系指针维系, 一个节点也不会同时出现在两个或更多地方,
因此，如果调用 appendChild() 传入父元素的第一个子节点, 则这个元素会成为父元素的最后一个子节点

如果要把节点放到 childNodes 中的特定位置而不是末尾, 则可以使用 insertBefore() 方法,
这个方法接收两个参数, 要插入的节点和参照节点,
调用这个方法后, 要插入的节点会变成参照节点的前一个同胞节点, 并被返回,
如果参照节点是 null, 则 insertBefore() 与 appendChild() 效果相同

replaceChild() 方法接收两个参数, 要插入的节点和替换的节点,
要替换的节点会被返回并从文档树中完全移除, 要插入的节点取而代之,
虽然被替换的节点从技术上来说仍然被同一个文档所拥有, 但文档中已经没有了它的位置

removeChild() 接收一个参数, 即要移除的节点

cloneNode(), 会返回与调用它的节点一模一样的节点,
接收一个布尔值参数, 表示是否深复制, 在传入 true 时, 会进行深复制,
只会复制 HTML 属性, 不会复制事件处理程序

normalize()

## Document 类型

document 是 window 对象的属性, 因此是一个全局对象, document 只能有一个 Element 类型的子节点, 即 html

nodeType = 9,
nodeName = '#document'

### 访问 html, body

document 上有一个属性 documentElement, 指向 `<html>` 元素

<!-- - document.childNodes[0]
- document.firstChild --> 没有用, 不准的, 得按照规矩来
- document.documentElement

document 上还有一个属性 body, 指向 `<body>` 元素

- document.body

### 访问 doctype

Document 类型的另一种可能的子节点是 DocumentType, `<!doctype>` 标签是文档中独立的部分

- document.doctype

### Comment 类型子节点

严格来说出现在 `<html>` 元素外面的注释也是文档的子节点, 它们的类型是 Comment,
不过由于浏览器识别不同, 这些注释不一定能够被识别, 或者表现不一致

一般来说, appendChild(), removeChild(), replaceChild() 方法不会用在 document 对象上,
这是因为文档类型(如果存在)是只读的, 而且只能有 Element 类型的子节点(即 html)

### 文档信息

#### title

document.title 包含 `<title>` 元素中的文本, 通常显示在浏览器窗口或标签页的标题栏,
通过这个属性可以读写页面的标题, 修改后的标题也会反映在浏览器标题栏上,
不过, 修改 title 属性并不会改变 `title` 元素

#### URL, domain, referrer

```js
document.URL // 取得完整的URL
document.domain // 包含网页的域名
document.referrer // 包含链接到当前网页的那个页面的 URL, 取得来源, 如果当前网页没有来源, 则 referrer 属性包含空字符串
```

URL 跟域名是相关的, 比如 document.URL 是 http://www.wrox.com/WilerCDA/, document.domain 就是 www.wrox.com

在这些属性中, 只有 domain 是可以设置的, 
出于安全考虑, 给 domain 属性设置的值是有限的,
只能设置 父域, 不能给这个属性设置 URL 中不包含的值

当网页中包含来自某个不同子域的窗格(`<frame>`)或内嵌窗格(`<iframe>`)时, 设置document.domain 是很有用的

### 定位元素

document.getElementById()
document.getElementByTagName()


这里要深究几个问题哈,
一个是 HTML 对大小写不敏感的问题
这几个方法是不是document特有 (ById, ByName 是特有的好像)

### 文档写入

write(), writeln() 用于动态包含外部资源



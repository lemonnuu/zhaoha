---
title: location
author: 爪哈
date: 2022-06-28 08:30:00
---

![0001_BOM](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/JavaScript/0001_BOM.png)

location 是最有用的 BOM 对象之一, 提供了当前窗口中加载文档的信息, 以及通常的导航功能。

这个对象独特的地方在于, 它既是 window 对象的属性, 也是 document 的属性, 也就是说, window.location 和 document.location 指向同一个对象。

location 对象不仅保存着当前加载文档的信息, 也保存着把 URL 解析为离散片段后能够通过属性访问的信息。

假设浏览器当前加载的 URL 是 `http://www.hostname.com:80/pathname/?search=abc#hash`, 那么 location 对象内容如下：

- `location.protocol` (协议) : `http:`
- `location.hostname` (服务器名) : `www.hostname.com`
- `location.port` (端口, 如果 URL 中没有端口, 则返回空字符串) : `80`
- `location.host` (服务器名及端口号) : `www.hostname.com:80`
- `location.origin` (URL 源地址) : `http://www.hostname.com`
- `location.pathname` (URL 路径或文件名) : `/pathname/`
- `location.search` (URL 的查询字符串, 这个字符串以问号开头) : `?search=abc`
- `location.hash` (URL 散列值, 井号后跟零个或多个字符串, 如果没有则为空字符串) : `#hash`
- `location.href` (当前加载页面的完整 URL, location.toString() 方法返回这个值) : `http://www.hostname.com:80/pathname/?search=abc#hash`



URL 篇
为什么要对 URL 进行编码
URL 编码方式, URL 长度
输入一个 URL 发生了什么
浏览器会对URL进行百分比编码, 但是符合的百分号不会再次编码

## 查询字符串

location 的多数信息都可以通过上面的属性获取, 但是 URL 中的查询字符串并不容易使用。

虽然 location.search 返回了从问号开始直到 URL 末尾的所有内容, 但没有办法逐个访问每个查询参数。

可以借助 node:querystring 库或 URLSearchParams 标准 API 检查和修改查询字符串。

下面的函数解析了查询字符串, 并返回一个以每个查询参数为属性的对象。

```js
function getQueryStringArgs (url) {
  // 取得没有❓开头的查询字符串
  let qs = (url.search ? url.search.substring(1) : '')
  // 保存参数数据的对象
  const args = {}
  for (let item of qs.split('&').map(kv => kv.split('='))) {
    // 查询字符串通常是被编码后的格式, 需要使用 decodeURIComponent() 进行解码
    let name = decodeURIComponent(item[0]), value = decodeURIComponent(item[1] || '')
    // 防止 value 没有值为 undefined 的情况下给它兜个底, 赋值 '' 空字符串
    args[name] 
      ? (Array.isArray(args[name]) ? args[name] = [...args[name], value] : args[name] = [args[name], value]) 
      : args[name] = value
  }
  return args
}
```

:::warning
当 search 属性重复时, 如 `q=javascript&num=10&num=20&num=30&test`, node:querystring 返回一个数组形式; 
URLSearchParams 也会存在两个相同属性的 search, 通过 get() 只能获取前一个, 
但是 toString() 时并不会丢失参数, 所以涉及到处理 URL 的操作, 最好不要自己实现切割, 使用现成的库或 API 更为稳妥。
:::

### [querystring](http://nodejs.cn/api/querystring.html)

**`querystring` API 被视为旧版的。虽然它仍在维护, 但是新的代码应该改为使用 `<URLSearchParams>` API。**

`node:querystring` 模块提供了用于解析和格式化网址查询字符串的实用工具。可以使用以下方式访问它：

```js
const querystring = require('node:querystring')
```

#### [querystring.parse(str[, sep[, eq[, options]]])](http://nodejs.cn/api/querystring.html#querystringparsestr-sep-eq-options)

- `str <string>` : 要解析的网址查询字符串, 不包含 ❓
- `sep <string>` : 查询字符串中分隔键值对的子字符串, 默认为 **'&'**
- `eq <string>` : 查询字符串中分隔键和值的子字符串, 默认为 **'='**
- `options <Object>` : 
    - `decodeURIComponent <Function>` : 对查询字符串中的百分比编码字符进行解码时使用的函数。默认为 **querystring.unescape()**
    - `maxKeys <number>` : 指定要解析的最大键数, 指定 0 以删除键的计数限制, 默认为 **1000**

`querystring.parse()` 方法将网址查询字符串(str)解析为键值对的集合。

例如, 查询字符串 `q=javascript&num=10&num=20&num=30&test` 被解析为:

```js
// 注意查询字符串没有 ❓
{
  q: 'javascript',
  num: [ '10', '20', '30' ],
  test: ''
}
```

`querystring.parse()` 方法返回的对象通常不是从 JavaScript `Object` 继承的原型。这意味着典型的 `Object` 方法, 
例如 `obj.toString()`、`obj.hasOwnProperty()` 和其他方法未定义且无法工作。

默认情况下, 查询字符串中的百分比编码字符将被假定为使用 UTF-8 编码。如果使用替代的字符编码, 则需要指定替代的 `decodeURIComponent` 选项:

```js
// 假设 gbkDecodeURIComponent 函数已存在...
querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null, { decodeURIComponent: gbkDecodeURIComponent })
```

:::warning
`querystring.decode()` 函数是 `querystring.parse()` 的别名。
:::

#### [querystring.stringify(obj[, sep[, eq[, options]]])](http://nodejs.cn/api/querystring.html#querystringstringifyobj-sep-eq-options)

- `obj <object>` : 要序列化为网址查询字符串的对象
- `sep <string>` : 用于在查询字符串中分隔键值对的子字符串, 默认为 **'&'**
- `eq <string>` : 用于在查询字符串中分隔键和值的子字符串, 默认为 **'='**
- `options`
  - `encodeURIComponent <Function>` : 将查询字符串某些字符转换为百分比编码的函数。默认为 **querystring.escape()**

`querystring.stringify()` 方法通过遍历给定对象 `obj` 的"自有属性" 生成网址查询字符串。

它序列化了 `obj` 中传入的以下类型的值: `<string> | <number> | <bigint> | <boolean> | <string[]> | <number[]> | <bigint[]> | <boolean[]>`。
数值必须是有限的。任何其他输入值都将被强制为空字符串。

```js
querystring.stringify({ foo: 'bar', baz: ['1', '2'], corge: null })
// 返回 'foo=bar&baz=1&baz=2&corge='

querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':')
// 返回 'foo:bar;baz:qux'
```

默认情况下, 查询字符串中需要百分比编码的字符将被编码为 UTF-8。如果需要替代编码, 需要指定替代的 `encodeURIComponent` 选项：

```js
// 假设 gbkEncodeURIComponent 函数已存在，
querystring.stringify({ w: '中文', foo: 'bar' }, null, null, { encodeURIComponent: gbkEncodeURIComponent })
```

:::warning
`querystring.encode()` 函数是 `querystring.stringify()` 的别名。
:::

#### [querystring.escape(str)](http://nodejs.cn/api/querystring.html#querystringescapestr)

- `str <string>`

querystring.escape() 方法以针对网址查询字符串的特定要求优化方式对给定的 `str` 执行网址百分比编码。

querystring.escape() 方法被 `querystring.stringify()` 使用, 通常不会直接被使用。
导出它主要是为了允许应用程序代码在必要时通过将 `querystring.escape()` 分配给替代函数来提供替换的百分比编码实现。

#### [querystring.unescape(str)](http://nodejs.cn/api/querystring.html#querystringunescapestr)

- `str <string>`

`querystring.unescape()` 方法在给定的 `str` 上执行网址百分比编码字符的解码。

`querystring.unescape()` 方法被 `querystring.parse()` 使用, 通常不会被直接使用。
导出它主要是为了允许应用程序代码在必要时通过将 `querystring.unescape()` 分配给替代函数来提供替代的解码实现。

默认情况下, `querystring.unescape()` 方法将尝试使用 JavaScript 内置的 `decodeURIComponent()` 方法进行解码。
如果失败, 则将使用更安全的不会因网址格式错误而抛出错误的同类方法。

### [URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)

URLSearchParams 提供了一组标准 API 方法, 通过它们可以检查和修改查询字符串。
给 URLSearchParams 构造函数传入一个查询字符串, 就可以创建一个实例。

```js
// 开头有没有 ❓ 效果是一样的, 开头的 ❓ 会被忽略
new URLSearchParams('?q=javascript&num=10&num=20&num=30&test')
new URLSearchParams('q=javascript&num=10&num=20&num=30&test')

// URLSearchParams { 'q' => 'javascript', 'num' => '10', 'num' => '20', 'num' => '30', 'test' => '' }
```

这个实例上暴露了 `get()`、`getAll()`、`set()`、`append()`、`delete()`、`sort()`、`entries()`、`toString()` 等一系列方法,
可以对查询字符串执行相应操作。例如：

```js
const str = '?q=javascript&num=10&num=20&num=30&test'
const searchParams = new URLSearchParams(str)
searchParams.has('q') // true
searchParams.get('num') // 10
searchParams.getAll('num') // [ '10', '20', '30' ]
searchParams.set('num', 'URLSearchParams')
searchParams.append('new', 'value')
searchParams.delete('q')
searchParams.toString() // num=URLSearchParams&test=&new=value
searchParams.sort()
searchParams.toString() // new=value&num=URLSearchParams&test=
```

大多数支持 URLSearchParams 的浏览器也支持将 URLSearchParams 的实例用作可迭代对象:

```js
const str = '?q=javascript&num=10&num=20&num=30&test'
const searchParams = new URLSearchParams(str)
for (let param of searchParams) {
  console.log(param);
}
// [ 'q', 'javascript' ]
// [ 'num', '10' ]
// [ 'num', '20' ]
// [ 'num', '30' ]
// [ 'test', '' ]
```

## 操作地址

### [location.assign()](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/assign)

可以通过修改 location 对象修改浏览器的地址。首先, 最常见的是使用 assign() 方法并传入一个 URL, 如下所示：

```js
location.assign('http://www.baidu.com')
```

这行代码会立即启动导航到新 URL 的操作, 同时在浏览器历史记录中增加一条记录, 如果给 location.href 或 window.location 设置一个 URL,
也会以同一个 URL 值调用 assign() 方法。

```js
window.location = 'http://www.baidu.com'
location.href = 'http://www.baidu.com'
```

在这 3 种修改浏览器地址的方法中, 设置 location.href 是最常见的。

修改 location 对象的属性也会修改当前加载的页面。其中, hash, search, hostname, pathname 和 port 属性被设置为新值之后都会修改当前 URL。

除了 hash 之外, 只要修改 location 的一个属性, 就会导致页面重新加载新 URL。

### [location.replace()](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/replace)

在以 `location.assign()`、`window.location`、`location.href` 修改 URL 之后, 浏览器的历史记录中就会增加相应的记录。
当用户单击 "后退" 按钮时, 就会导航到前一个页面。
如果不希望增加历史记录, 可以使用 replace() 方法。这个方法接收一个 URL 参数, 但重新加载后不会增加历史记录。
调用 replace() 之后, 用户不能回到前一页。

```js
location.replace('http://www.baidu.com')
```

### [location.reload()](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/reload)

最后一个修改地址的方法是 reload(), 它能重新加载当前显示的页面, 调用 reload() 而不传参数, 页面将会以最有效的方式重新加载。
也就是说, 如果页面自上次请求以来没有修改过, 浏览器可能会从缓存中加载页面, 
如果想强制从服务器加载, 可以给 reload() 传个 true。

```js
location.reload() // 重新加载, 可能是从缓存
location.reload(true) // 重新加载, 从服务器加载
```

:::warning
脚本中位于 reload() 调用之后的代码可能执行也可能不执行, 这取决于网络延迟和系统资源等因素。因此, 最好把 reload() 最为最后一行代码。

assign() 与 replace() 调用之后的代码会执行的 ❗❗❗
:::

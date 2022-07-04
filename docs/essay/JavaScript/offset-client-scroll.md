---
title: 『offset』『client』『scroll』
author: 爪哈
date: 2022-6-14
categories:
- 随笔
tags:
- JavaScript
---
![0008_offset-client-scroll三兄弟](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/essay/0008_offset-client-scroll三兄弟.jpg)

你分的清 `offsetWidth`, `offsetHeight`, `offsetLeft`, `offsetTop`, `clientWidth`, `clientHeight`, `clientLeft`, `clientTop`,
`srcollHeight`, `scrollWidth`, `scrollLeft`, `scrollTop` 嘛 :question: :question: :question:

## 『client』

client 家族是属于 Element 基类的一些属性

![0009_clientWidth-clientHeight](https://cdn.jsdelivr.net/gh/lemonnuu/PicGoPictureBed/markdown/essay/0009_clientWidth-clientHeight.png)

### Element.clientWidth

`Element.clientWidth` 属性表示元素的内部宽度, 以像素计, 内联元素的 `clientElement` 属性值为 0。
该属性包括元素的内边距 padding, 但不包括边框 border、外边距 margin 和垂直滚动条。

:::warning
`Element.clientWidth` 是一个只读属性, 且会被四舍五入为一个整数。如果需要小数值, 可使用 `Element.getBoundingClientRect()`。
:::

### Element.clientHeight

`Element.clientHeight` 属性表示元素内部高度, 以像素计, 内联元素的 `clientHeight` 属性值为 0。
该属性包括元素的内边距 padding, 但不包括边框 border、外边距 margin 和水平滚动条。

:::warning
`Element.clientHeight` 是一个只读属性, 且会被四舍五入为一个整数。如果需要小数值, 可使用 `Element.getBoundingClientRect()`。

备注：上面的有问题。
因为使用 `Element.getBoundingClientRect()` 只能获取元素的 width / height, 但是这个值是 offsetWidth / offsetHeight, 包括边框的长度, 
所以不能获取 clientWidth / clientHeight。
:::

### Element.clientLeft

`Element.clientLeft` 属性表示元素左边框的宽度, 以像素计, 且包括左滚动条, 是一个只读属性。

:::warning
当元素的文本方向是从右向左(RTL, right-to-left), 并且内容溢出就会形成左滚动条。
:::

### Element.clientTop

`Element.clientTop` 属性表示元素顶部边框的宽度, 以像素计, 是一个只读属性。

## 『scroll』

### Element.scrollWidth

`Element.scrollWidth` 属性在未出现水平滚动条时等于 `clientWidth`, 即为出现水平滚动条的最小宽度。
当含有水平滚动条时, 为元素内容的宽度, 包括由于 overflow 溢出在屏幕上不可见的内容。

:::warning
`Element.scrollWidth` 是一个只读属性, 且会被四舍五入为一个整数。如果需要小数值, 可使用 `Element.getBoundingClientRect()`。
:::

### Element.scrollHeight

`Element.scrollHeight` 属性在未出现垂直滚动条时等于 `clientHeight`, 即为出现垂直滚动条的最小高度。
当含有垂直滚动条时, 为元素内容的高度, 包括由于 overflow 溢出在屏幕上不可见的内容。

:::warning
`Element.scrollHeight` 是一个只读属性, 且会被四舍五入为一个整数。如果需要小数值, 可使用 `Element.getBoundingClientRect()`。
:::

### Element.scrollLeft

`Element.scrollLeft` 属性可以读取或设置元素滚动条到元素左边的距离。

:::warning
注意如果这个元素的内容排列方向 (direction) 是 rtl (right-to-left), 那么滚动条会位于最右侧(内容开始处), 
并且 `scrollLeft` 值为 0。此时, 当从右到左拖动滚动条时, scrollLeft 会从 0 变为负数。
:::

:::danger
`Element.scrollLeft` 可以是一个小数。
:::

### Element.scrollTop

`Element.scrollTop` 属性可以获取或设置一个元素的内容垂直滚动的像素数。

一个元素的 `scrollTop` 值是这个元素的内容顶部 (卷起来的) 到它视口可见内容 (的顶部) 的距离的度量。
当一个元素的内容没有产生垂直方向的滚动条, 那么它的 `scrollTop` 值为 0。

:::danger
`Element.scrollTop` 可以是一个小数。
:::

## 『offset』

### HTMLElement.offsetWidth

`HTMLElement.offsetWidth` 是一个只读属性, 返回一个元素的布局宽度。
一个典型的 offsetWidth 是包含元素的边框(border)、水平线上的内边距(padding)、垂直方向的滚动条(scrollbar, 如果存在的话)、以及 CSS 设置的宽度(width)。

:::warning
`HTMLElement.offsetWidth` 会四舍五入为一个整数, 是一个只读属性。如果需要小数值, 可使用 `Element.getBoundingClientRect()`。
:::

### HTMLElement.offsetHeight

`HTMLElement.offsetHeight` 是一个只读属性, 它返回该元素的像素高度, 高度包含该元素的垂直内边距和边框, 且是一个整数。不含伪类元素的高度。

### HTMLElement.offsetLeft

`HTMLElement.offsetLeft` 是一个只读属性, 返回当前元素左上角相对于 `HTMLElement.offsetParent` 节点的左边界偏移的像素值。

对于块级元素来说, `offsetTop`、`offsetLeft`、`offsetWidth` 及 `offsetHeight` 描述了元素相对于 `offsetParent` 的边界框。

然而, 对于可被截断到下一行的行内元素 (如 span) 来说, `offsetTop` 和 `offsetLeft` 描述的是第一个边界框的位置(使用 `Element.getClientRects()` 
来获取其位置)。因此, 使用 `offsetLeft`、`offsetTop`、`offsetWidth`、`offsetHeight` 来对应 left、top、width 和 height 的一个盒子将不会是
文本容器 span 的盒子边界。

### HTMLElement.offsetTop

`HTMLElement.offsetTop` 为只读属性, 它返回当前元素相对于其 `offsetParent` 元素顶部内边框的距离。

### HTMLElement.offsetParent

`HTMLElement.offsetParent` 是一个只读属性, 返回一个指向最近的(指包含层级上的最近)包含该元素的定位元素或者最近的 `table`、`td`、`th`、`body` 元素。
当元素的 `style.display` 设置为 "none" 时, `offsetParent` 返回 `null`。

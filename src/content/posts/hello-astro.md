---
title: 用 Astro 7 重写我的个人博客
description: 从零搭一个纯静态博客，先把地基和内容模型做对，样式留到最后。
pubDate: 2026-11-08
category: 技术相关
tags: [前端, 折腾, Astro]
---

之前用 Hexo 那套主题，改点东西要翻三层模板，最后干脆推倒重来。

这次的原则很简单：**内容先行**。先把 Markdown 的组织方式、URL 结构、查询函数定下来，再谈页面，最后才谈样式。

## 为什么选 Astro

默认输出零 JS 的 HTML，博客这种内容站几乎没有理由再背一个运行时。
需要交互的地方（搜索、主题切换、评论）再按岛屿局部加载。

```ts
const posts = await getCollection('posts', ({ data }) => !data.draft);
posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

## 这一层的边界

这一层只回答「文章数据长什么样、怎么查」，一行页面逻辑都不写。

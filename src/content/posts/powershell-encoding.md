---
title: PowerShell 里那点换行符的坑
description: CRLF、UTF-8 BOM、控制台编码，三个东西凑一起能把中文输出搞成乱码。
pubDate: 2026-11-05
updatedDate: 2026-11-09
category: 技术相关
tags: [工具链, 踩坑]
---

在 Windows 上写脚本，最先撞上的往往不是逻辑问题，而是编码。

## 现象

`git status` 提示 LF 将被替换为 CRLF，`Get-Content` 读出来的中文是乱码，但文件本身没坏。

## 原因

三件事叠在一起：

1. `core.autocrlf` 让 Git 在工作区做换行符转换；
2. 文件是 UTF-8，控制台按 GBK 解码；
3. BOM 有时候存在，有时候不存在。

## 处理

仓库里放一个 `.gitattributes`，把换行符统一成 LF：

```text
* text=auto eol=lf
```

判断文件到底坏没坏，别看终端，直接按字节解码验证：

```powershell
$s = [System.Text.Encoding]::UTF8.GetString([System.IO.File]::ReadAllBytes('file.html'))
$s.Contains('中文')
```

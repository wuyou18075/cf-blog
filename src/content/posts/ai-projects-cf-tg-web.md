---
title: AI 编程落地项目：CF 看板与虚拟地址生成器
published: 2026-07-24
description: 用 AI 辅助从需求到上线的真实项目合集：① CF 看板（多 VPS 流量 + TG 日报）② VirtualAddress（多国测试地址与数据生成）。
tags: [AI编程, 落地项目, Cloudflare, Telegram, VPS, 前端]
category: 项目
image: ./images/cf-tg-web-preview.jpg
slug: ai-projects-cf-tg-web
---

这篇文章记录几个**用 AI 辅助编程真正跑起来的落地项目**——不是 demo 玩具，而是解决自己场景的小系统。目前收录两个：

1. **CF 看板（cf-tg-web）**：多 VPS 流量集中管理 + Telegram 汇总  
2. **VirtualAddress**：多国家/地区测试地址与数据生成  

---

## 项目一：CF 看板 · 多 VPS 流量日报

| 项 | 内容 |
| --- | --- |
| 仓库 | [github.com/wuyou18075/cf-tg-web](https://github.com/wuyou18075/cf-tg-web) |
| 一句话 | 多台 VPS 的流量集中看板 + Telegram 汇总 / 日报 |
| 技术栈 | Cloudflare Workers、D1、VPS 侧 vnStat 定时上报、Telegram Bot |
| 预览 | 看板需登录鉴权，**不开放公网演示**；界面效果见下方截图 |

![CF 看板界面截图](./images/cf-tg-web-preview.jpg)

> 上图为本地/私有环境截取的 Web 看板界面，含机器列表、总流量统计与日/周/月/年切换。

### 解决什么问题

机子一多，每台 VPS 的流量、是否在线、今日/本月用量，单靠 SSH 或各机独立脚本很散。CF 看板把数据收到 **Cloudflare Worker + D1**，浏览器里统一看，并可选 **Telegram** 收汇总与离线告警。

### 两种用法

| 方案 | 适合谁 | 是否需要 CF / 看板 |
| --- | --- | --- |
| **仅 TG 日报** | 只想每天在 Telegram 收到各机流量 | 不需要；VPS 直连 Bot |
| **CF 看板** | 要 Web 管理、多机列表、历史曲线、离线告警、统一 TG 汇总 | 需要 Worker + D1 |

### 主要功能（看板）

- **机器列表**：今日 / 本月流量、在线状态、批量操作与排序筛选  
- **总流量统计**：日内折线、近 7 天 / 30 天 / 12 月报表，入站 / 出站可选  
- **单机流量**：行内弹窗看详情  
- **获取流量**：向 VPS 主动拉取（需回调端口可达）  
- **TG 汇报**：卡片 / 今日排行 / 详细等模板，定时或立即发送  
- **离线告警**：掉线通知一次，恢复后清标记  
- **安全**：密码门登录；同 IP 短时多次失败会锁定；每台 VPS 独立 `access_token`

### 架构简述

```
VPS（vnStat + 定时任务）──上报──▶ Cloudflare Worker + D1
                                      │
                         Web 看板 ◀───┤
                                      └──▶ Telegram 汇总 / 告警
```

平时以 VPS **主动上报**为主（默认约每小时），无长连接；需要时看板可「获取流量」回调机器。部署可用 GitHub Actions 自动创建 D1，或官方「部署到 Cloudflare Workers」按钮。

### 链接

- 源码：<https://github.com/wuyou18075/cf-tg-web>  
- 预览：需自行部署后登录查看（本文不提供公开演示地址）

---

## 项目二：VirtualAddress · 虚拟地址与测试数据生成

| 项 | 内容 |
| --- | --- |
| 仓库 | [github.com/wuyou18075/virtualAddress](https://github.com/wuyou18075/virtualAddress) |
| 一句话 | 多国家/地区地址与测试数据生成（纯前端 + CF Worker 托管） |
| 技术栈 | 静态 HTML/CSS/JS、JSON 数据分片、Cloudflare Workers Assets |
| 预览 | <https://virtualaddress.2n.cc.cd/> |

![VirtualAddress 界面截图](./images/virtual-address-preview.jpg)

> 上图为在线演示站截图：多国家入口、地址卡片与复制/地图验证等操作。

### 解决什么问题

开发、联调、填表测试时，经常需要**看起来像真的、又不能当真用的**地址和测试身份数据。VirtualAddress 用浏览器本地生成，数据 JSON 分片托管，部署轻（无 Vite/Webpack 构建），适合挂在 CF Workers 或任意静态主机上。

> **仅供开发 / 测试。** 生成的身份与卡号为虚构或测试格式，不可用于欺诈或绕过任何真实业务核验。

### 主要功能

- **多国家/地区地址生成**：美国、英国、加拿大、日本、中国、港台、德国、新加坡等入口  
- **美国免税州演示地址**、日本都道府县分片等区域数据  
- **身份与测试信用卡**：Luhn 合法测试卡号等配套字段  
- **MAC 生成与 OUI 解析**  
- **首页 / 国内页**：按出口 IP 附近检索居民住宅地址、中文地址转英文（基于 OpenStreetMap，无需 API Key）  
- 结果卡片可复制，并附 **Google 地图坐标验证** 链接

### 架构简述

- **纯前端静态资源**（`index.html`、`address/*.html`、`data/*.json`）  
- **`src/worker.js`**（CF 部署时）：旧路径 301、缓存与安全响应头  
- 部署可选：Cloudflare Workers + Assets（默认）、Vercel 静态、或 VPS + Nginx 一键脚本  

### 链接

- 源码：<https://github.com/wuyou18075/virtualAddress>  
- 在线预览：<https://virtualaddress.2n.cc.cd/>  

---

## 和「AI 编程」的关系

两个仓库都是**边写边用 AI 协作**落地的：人定边界与合规约束（尤其 VirtualAddress 仅测试用途），模型加速页面结构、Worker 路由与部署脚本，再在真实环境验通。重点不是「会不会写」，而是**能跑、能部署、能解决自己的问题**。

后续若有更多落地项目，会按同一结构继续补在本系列。欢迎从各仓库 README 的安装与部署章节动手搭一套。

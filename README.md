# Punk Skill

Punk Skill 是一组给 AI Agent 使用的实用 Skills，面向内容创作、视觉生成和发布工作流。

当前包含：

| 技能 | 用途 | 路径 |
| --- | --- | --- |
| `punk-cover` | 根据文章、笔记、公众号文章、X 推文或主题草稿生成封面图，并在环境支持时直接出图 | [`skills/punk-cover`](./skills/punk-cover) |

## 安装方式

把下面这段话发给支持 Skills 的 AI Agent，让它安装本项目里的全部 skills：

```text
请安装这个仓库里的全部 Skills：https://github.com/adrianpunk/Punk-Skill
```

## 可用技能

### punk-cover

`punk-cover` 是一个封面图生成 skill。它会先分析输入内容，再确认发布平台和视觉风格，最后使用精选风格模板生成完整图片提示词；如果当前环境有可用的图片生成工具，会继续生成封面图。

适合：

- 小红书封面
- 微信公众号封面
- X / Twitter 头图
- 文章、教程、观点、产品分析、科研主题的封面图
- 只需要生成可复用图片提示词的场景

#### 使用示例

只给文章内容时，skill 会先询问平台，并推荐 3 个风格：

```text
Use $punk-cover to create a cover image for this article:

这里粘贴文章、笔记或主题草稿
```

指定平台和风格时，会直接进入提示词保存和图片生成：

```text
Use $punk-cover to create a WeChat public account cover in 商业杂志头版 style:

这里粘贴文章内容
```

指定自定义比例：

```text
Use $punk-cover to create a cover image, aspect ratio 16:9, style 黑白极简概念:

AI Agent 正在改变内容生产方式
```

只要提示词，不生成图片：

```text
Use $punk-cover to create prompt-only output for this X cover, style 黑白灰先锋几何:

这里粘贴推文或文章摘要
```

#### 工作流

1. 分析文章或主题，提炼标题、摘要、主视觉、受众、情绪、隐喻和禁用元素。
2. 确认发布平台或画幅比例。
3. 如果用户没有指定风格，基于内容推荐 3 个风格并说明理由。
4. 使用选定模板生成最终提示词。
5. 保存 `punk-assets/punk-cover/{slug}/source.md` 和 `punk-assets/punk-cover/{slug}/prompts/01-cover.md`。
6. 如果环境支持图片生成，则继续生成 `punk-assets/punk-cover/{slug}/cover.png`。

> 长文章不会被原样复制进输出文件。`source.md` 只保存标题、摘要、平台、比例、风格、视觉方向等派生信息。

#### 平台比例

| 平台 | 默认比例 |
| --- | --- |
| 小红书 | `3:4` |
| 微信公众号 | `2.35:1` |
| X / Twitter | `5:2` |
| 自定义 | 使用用户输入的比例 |

#### punk-cover 输出文件

| 文件 | 内容 |
| --- | --- |
| `punk-assets/punk-cover/{slug}/source.md` | 派生元数据，不保存完整原文 |
| `punk-assets/punk-cover/{slug}/prompts/01-cover.md` | 完整可复用的最终图片提示词 |
| `punk-assets/punk-cover/{slug}/cover.png` | 生成成功后的封面图 |

## punk-cover 风格

`punk-cover` 内置 11 个封面向风格。用户可以直接指定风格，也可以让 skill 根据内容推荐。

| 风格 | 适合内容 |
| --- | --- |
| 黑白极简概念 | 抽象观点、战略、哲学、批判性主题 |
| 语义转译极简 | 单词、短句、口号、概念转译 |
| 复古手撕拼贴 | 社交传播、文化议题、街头感、复古杂志感 |
| 方块世界 | 教程、工具、系统搭建、升级、游戏化表达 |
| 巨型透视中文标题 | 中文标题主导、强冲击、活动和社媒封面 |
| 积木世界 | 搭建、团队、计划、教育、亲子和系统隐喻 |
| 咨询报告视觉 | 商业策略、方法论、产品分析、结构化观点 |
| 科研期刊概念 | 科研、医学、材料、生物、机制类主题 |
| 复古弥散渐变 | 艺术、设计、品牌、情绪化文章和杂志封面 |
| 商业杂志头版 | AI、创业、投资、趋势、商业科技封面 |
| 黑白灰先锋几何 | 实验性、现代主义、几何构成、强对比视觉 |

### 风格样例

| | | |
|:---:|:---:|:---:|
| ![黑白极简概念](./screenshots/punk-cover-styles/black-white-minimal-concept.png) | ![语义转译极简](./screenshots/punk-cover-styles/semantic-minimal-translation.png) | ![复古手撕拼贴](./screenshots/punk-cover-styles/retro-torn-collage.png) |
| 黑白极简概念 | 语义转译极简 | 复古手撕拼贴 |
| ![方块世界](./screenshots/punk-cover-styles/block-world.jpg) | ![巨型透视中文标题](./screenshots/punk-cover-styles/giant-perspective-chinese-title.png) | ![积木世界](./screenshots/punk-cover-styles/brick-world.png) |
| 方块世界 | 巨型透视中文标题 | 积木世界 |
| ![咨询报告视觉](./screenshots/punk-cover-styles/consulting-report-visual.jpg) | ![科研期刊概念](./screenshots/punk-cover-styles/research-journal-concept.jpg) | ![复古弥散渐变](./screenshots/punk-cover-styles/retro-diffuse-gradient.jpg) |
| 咨询报告视觉 | 科研期刊概念 | 复古弥散渐变 |
| ![商业杂志头版](./screenshots/punk-cover-styles/business-magazine-front-page.jpg) | ![黑白灰先锋几何](./screenshots/punk-cover-styles/black-white-gray-avant-geometry.jpg) | |
| 商业杂志头版 | 黑白灰先锋几何 | |

## 仓库结构

```text
.
├── README.md
├── screenshots/
│   └── punk-cover-styles/
└── skills/
    └── punk-cover/
        ├── SKILL.md
        ├── agents/openai.yaml
        └── references/
            ├── style-catalog.md
            └── templates/
```

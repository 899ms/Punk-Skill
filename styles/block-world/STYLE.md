# 方块世界

```yaml
id: block-world
name: 方块世界
input_modes: [text]
subjects: [concept, object, scene]
outputs: [cover, poster]
default_ratio: "3:4"
required_fields: [主题词, 画幅比例, 语言, 用途]
optional_fields: [副标题, 补充背景, 情绪倾向, 不想出现的元素]
source:
  - skills/punk-cover/references/templates/block-world.md
  - exports/Prompt列表_导出_2026-06-16/04_像素创想/提示词.md
  - exports/Prompt列表_导出_2026-06-16/10_像素创世/提示词.md
```

## Style Intent

Minecraft 式高饱和方块世界海报。主题文字被方块化重构成建筑、道路、传送门、矿洞、阶梯或场景结构，而不是后贴字幕。该 style 只负责方块世界的场景、材质和空间结构；平台适配、长文提炼和通用封面约束由 `punk-cover` 负责。

## Use For

- 教程、工具、系统搭建、升级和学习内容
- 游戏化表达、创造、探索、AI 工具和方法论
- 需要明亮、治愈、强传播感的社媒封面

## Avoid

- 普通像素滤镜或简单游戏插画
- 标题与场景分离
- 廉价蓝紫科技感、俗套机器人脸

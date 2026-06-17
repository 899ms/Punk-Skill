# 巨型透视中文标题

```yaml
id: giant-perspective-chinese-title
name: 巨型透视中文标题
input_modes: [text]
subjects: [concept, object, scene]
outputs: [cover, poster]
default_ratio: "3:4"
required_fields: [主题词, 画幅比例, 语言, 用途]
optional_fields: [副标题, 补充背景, 情绪倾向, 不想出现的元素]
source: skills/punk-cover/references/templates/giant-perspective-chinese-title.md
```

## Style Intent

以超大中文标题和强透视空间作为第一视觉，制造速度、压迫、冲突和事件海报感。适合中文标题主导的高冲击封面。该 style 只负责巨型中文标题、透视空间和冲击构图；平台适配、长文提炼和通用封面约束由 `punk-cover` 负责。

## Use For

- 小红书、活动、观点、热点和强传播封面
- 需要标题一眼抓住注意力的内容
- 适合中文短标题、强情绪和视觉冲突主题

## Avoid

- 标题错字、断字或不可读
- 弱化中文标题主体
- 普通标题加背景图

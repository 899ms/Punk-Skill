# 语义转译极简

```yaml
id: semantic-minimal-translation
name: 语义转译极简
input_modes: [text]
subjects: [concept, object, scene]
outputs: [cover, poster]
default_ratio: "5:2"
required_fields: [主题词, 核心文字, 画幅比例, 文字语言]
optional_fields: [补充背景, 情绪倾向, 不想出现的元素, 辅助文字说明]
source: skills/punk-cover/references/templates/semantic-minimal-translation.md
```

## Style Intent

把一个字、词、短句或口号转译成极简图形艺术海报。核心是语义理解、承载面、少量主体演绎和巨型文字骨架的咬合关系。

## Use For

- 单词、短语、口号、概念命名
- 需要聪明隐喻和强识别度的社媒封面
- 适合少字、强概念、强留白的海报

## Avoid

- 把词语当普通标题贴在插画上
- 无意义辅助文字、随机编号和装饰
- 元素堆叠、廉价渐变、复杂背景

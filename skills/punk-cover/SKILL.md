---
name: punk-cover
description: Generate cover images and reusable image prompts from the shared Punk style library for articles, Xiaohongshu notes, WeChat public account posts, X posts, topic drafts, and requests for covers, social cover images, poster prompts, style-template-based image prompts, or image generation from long-form text. Use this skill to analyze source content, confirm platform/aspect ratio and visual style, save the final prompt, and generate the image when an image-generation tool is available.
---

# Punk Cover

## Core Rule

`punk-cover` is a cover-generation workflow, not a style owner. Select exactly one reusable style from the repository-level `styles/` library, then compose the final image prompt from two layers:

1. `punk-cover` cover task instructions: platform, aspect ratio, title clarity, article summarization, cover communication goals, and universal output constraints.
2. The selected style's `PROMPT.md`: visual style atom only.

The style prompt defines how the cover should look. The skill task layer defines what the cover must accomplish.

## Resources

- Read `references/style-catalog.md` to list or choose cover styles.
- For the selected style, read both:
  - `../../styles/{style-id}/STYLE.md`
  - `../../styles/{style-id}/PROMPT.md`
- Only expose styles whose `STYLE.md` metadata has `outputs` containing `cover` or `poster`.
- Do not expose photo, avatar, portrait, pet-only, polaroid-only, or image-remix styles in the `punk-cover` menu unless their metadata explicitly includes `cover` or `poster`.
- Do not read the deprecated `references/templates/` directory for new runs. It is retained only for compatibility with old external references.

## Workflow

1. Analyze the source material:
   - Extract the core visual subject.
   - Preserve the complete user title or topic when one exists, but do not copy the full article body into any output field.
   - Draft an optional subtitle when the selected style has a subtitle field.
   - Summarize context, audience, mood, metaphor, and banned elements.
   - Convert long source material into concise derived fields: title/topic, 1-3 sentence context summary, visual subject, audience, mood, metaphor, and banned elements.

2. Confirm platform and aspect ratio before generating any prompt:
   - Xiaohongshu: `3:4`
   - WeChat public account: `2.35:1`
   - X: `5:2`
   - Custom: keep the user's ratio exactly.
   - If the user only provides source content, ask which platform they want to publish to. Do not generate the prompt yet.
   - If the user provides a custom ratio, use it and do not ask for platform unless the platform matters for wording.
   - Only skip this question when the user has already provided a platform, a ratio, or explicitly says to decide everything automatically.

3. Confirm style before generating any prompt:
   - If the user specifies one catalog style, use it.
   - If no style is specified, recommend exactly three eligible catalog styles based on the content and give a one-sentence reason for each, then ask the user to choose one or provide a custom style direction.
   - Do not show all eligible styles by default unless the user asks for the full menu.
   - Only auto-select one style when the user explicitly says to decide everything automatically, not merely because they provided an article.

4. Use this confirmation gate:
   - When platform/ratio or style is missing, stop after asking the question. Do not fill a style prompt, save prompt files, or generate an image.
   - The first response for article-only input should contain the platform question and three recommended styles.
   - If both platform/ratio and style are known, continue without asking.

5. Compose the final image prompt:
   - Start with the cover task instruction layer below.
   - Then append exactly one selected style visual layer from `../../styles/{style-id}/PROMPT.md`.
   - Replace explicit placeholders such as `{{主题词}}`, `{{副标题，可留空}}`, `{{画幅比例...}}`, `{{语言...}}`, `{{用途...}}`, `{{补充背景，可留空}}`, `{{情绪倾向...}}`, `{{不想出现的元素，可留空}}`, and any other explicit `{{...}}` fields in that prompt.
   - If a needed detail has no matching placeholder, merge it into the nearest existing field such as `补充语境` or `禁用元素`.
   - For long articles, fill `主题词` or equivalent title fields with a concise title/topic, not the article text.
   - Put only summarized context into `补充语境`; do not paste the original article body into the final prompt.
   - Leave optional fields blank only when the prompt says they can be blank.
   - Do not output analysis inside the final prompt.

6. Save files before image generation:
   - Create `punk-assets/punk-cover/{slug}/source.md` with derived metadata only: title/topic, platform, ratio, chosen style id and name, short summary, visual subject, audience, mood, metaphor, and banned elements.
   - Do not copy the full original article, note, post, transcript, or draft into `source.md` unless the user explicitly asks to archive the original text.
   - Create `punk-assets/punk-cover/{slug}/prompts/01-cover.md` with the complete filled prompt.
   - If image generation succeeds, save the image as `punk-assets/punk-cover/{slug}/cover.png`.

7. Generate an image by default after saving the prompt when a usable image-generation tool is available, such as `image_gen`. Skip image generation only when the user explicitly asks for prompt-only output or the current environment has no image-generation tool. If image generation is unavailable, return the prompt file path and the full prompt content.

## First Response Format

For article-only input with no platform and no style, ask concisely:

1. Which platform/aspect ratio should this cover target?
   - Xiaohongshu: `3:4`
   - WeChat public account: `2.35:1`
   - X: `5:2`
   - Custom: provide the ratio
2. Recommended styles:
   - `Style A`: reason tied to the article.
   - `Style B`: reason tied to the article.
   - `Style C`: reason tied to the article.

End by asking the user to choose a platform and one style, or to say "auto" if they want the skill to decide everything.

## Style Selection Heuristics

- Use styles whose `outputs` metadata contains `cover` or `poster`.
- Use business/report styles for strategy, product, AI, startup, industry, consulting, or analysis content.
- Use journal/concept styles for science, research, medicine, engineering, or mechanism-heavy content.
- Use collage, giant-title, block, brick, or diffuse styles for social posts that need stronger shareability.
- Use black-white minimal or avant-geometry styles for abstract, philosophical, critical, or high-contrast editorial themes.
- Do not recommend styles whose metadata is avatar-only, portrait-only, pet-only, polaroid-only, or image-only unless they also declare `cover` or `poster`.

## Cover Task Instruction Layer

Place this layer before the selected style visual layer in `prompts/01-cover.md`. Fill the braces with derived fields.

```text
# punk-cover cover task instructions

Create one single cover image for {platform}. Aspect ratio: {ratio}.

Use the following derived content only:
- Title/topic: {title_or_topic}
- Optional subtitle: {subtitle}
- Short context summary: {summary}
- Visual subject: {visual_subject}
- Audience: {audience}
- Mood: {mood}
- Visual metaphor: {metaphor}
- Banned elements: {banned_elements}

The main title must be complete, accurate, and clearly readable. If the source title is long, extract a short high-impact visual title while preserving the complete meaning through a smaller title, subtitle, or context line.

For long articles, use only derived fields such as title, summary, visual subject, metaphor, and supplemental context. Do not paste the original article body into the image, prompt, metadata, or small text system.

The cover must work for sharing: first glance identifies the topic, second glance reveals the visual metaphor. The image should feel like a deliberate editorial cover, not a generic illustration.

Avoid universal cover failures: PPT cover feel, course-cover feel, generic information-graphic template, e-commerce advertisement, unrelated decoration, misspelled title, missing title, title cropped beyond recognition, or title severely blocked by visual elements.

Generate only one final image. Do not output explanations, alternatives, grids, contact sheets, or multi-option compositions.
```

## Output Discipline

- The final generated prompt must contain the filled `punk-cover` cover task instruction layer first, followed by one filled style `PROMPT.md` visual layer.
- Do not copy long source text into the final prompt or saved source metadata; use summaries and extracted fields.
- Do not include style-selection rationale inside the prompt file.
- Do not combine multiple styles.
- Do not add a second custom style section beyond the selected style visual layer.
- Do not expose non-cover styles in the style menu.

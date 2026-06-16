---
name: punk-cover
description: Generate cover image prompts from curated visual style templates for articles, Xiaohongshu notes, WeChat public account posts, X posts, topic drafts, and requests for cover images, social covers, poster prompts, or style-template-based image prompts. Use when the user wants a cover prompt or wants to continue into image generation from text content using a named visual style.
---

# Punk Cover

## Core Rule

Use one selected template as the only skeleton for the final prompt. Replace only explicit `{{...}}` placeholder content. Do not rewrite, reorder, merge, summarize, or add sections to the template.

## Resources

- Read `references/style-catalog.md` to list or choose styles.
- Read exactly one file from `references/templates/` after the style is selected.
- Do not use photo, portrait, avatar, or pet templates; they are intentionally excluded from this skill.

## Workflow

1. Analyze the source material:
   - Extract the core visual subject.
   - Preserve the complete user title or topic unless the user asks for title rewriting.
   - Draft an optional subtitle when the template has a subtitle field.
   - Summarize context, audience, mood, metaphor, and banned elements.

2. Determine platform and aspect ratio:
   - Xiaohongshu: `3:4`
   - WeChat public account: `2.35:1`
   - X: `5:2`
   - Custom: keep the user's ratio exactly.
   - If platform and ratio are both missing, ask for the ratio unless the user says to decide automatically.

3. Determine style:
   - If the user specifies one catalog style, use it.
   - If the user says "you decide", "default", "directly generate", or equivalent, choose the best style from the catalog and mention the chosen style briefly before producing the prompt.
   - If no style is specified and the user has not delegated the choice, show the catalog style names and ask the user to choose.

4. Fill the selected template:
   - Replace explicit placeholders such as `{{主题词}}`, `{{副标题，可留空}}`, `{{画幅比例...}}`, `{{语言...}}`, `{{用途...}}`, `{{补充背景，可留空}}`, `{{情绪倾向...}}`, `{{不想出现的元素，可留空}}`, and any other explicit `{{...}}` fields in that template.
   - If a needed detail has no matching placeholder, merge it into the nearest existing field such as `补充语境` or `禁用元素`.
   - Leave optional fields blank only when the template says they can be blank.
   - Do not output analysis inside the final prompt.

5. Save files before image generation:
   - Create `cover-image/{slug}/source.md` with the user source material and inferred metadata.
   - Create `cover-image/{slug}/prompts/01-cover.md` with the complete filled prompt.
   - If image generation succeeds, save the image as `cover-image/{slug}/cover.png`.

6. Generate an image when a usable image-generation tool is available and the user wants an image, but only after saving the prompt. If image generation is unavailable, return the prompt file path and the full prompt content.

## Style Selection Heuristics

- Use business/report styles for strategy, product, AI, startup, industry, consulting, or analysis content.
- Use journal/concept styles for science, research, medicine, engineering, or mechanism-heavy content.
- Use collage, giant-title, block, brick, or diffuse styles for social posts that need stronger shareability.
- Use black-white minimal or avant-geometry styles for abstract, philosophical, critical, or high-contrast editorial themes.

## Output Discipline

- The final generated prompt must be the filled template only.
- Do not include template-selection rationale inside the prompt file.
- Do not combine multiple templates.
- Do not insert platform adaptation as a new section; place it into existing placeholder fields.
- Do not expose excluded photo, avatar, portrait, or pet styles in the style menu.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const skillPath = path.join(root, "skills", "punk-cover", "SKILL.md");
const blueprintPath = path.join(root, "skills", "punk-cover", "references", "cover-prompt-blueprint.md");
const stylesDir = path.join(root, "styles");

const requiredStyleFields = [
  "style_anchors:",
  "cover_shape_adaptation:",
  "must_preserve:",
  "avoid_when_applying_to_cover:",
];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function fail(message) {
  failures.push(message);
}

function fencedYaml(markdown) {
  const match = markdown.match(/```yaml\n([\s\S]*?)\n```/);
  return match ? match[1] : "";
}

const failures = [];

if (!fs.existsSync(blueprintPath)) {
  fail(`Missing cover prompt blueprint: ${path.relative(root, blueprintPath)}`);
}

const skill = read(skillPath);
for (const phrase of [
  "compile that style atom into the cover shape",
  "references/cover-prompt-blueprint.md",
  "Do not append the raw style prompt as a standalone second section",
]) {
  if (!skill.includes(phrase)) {
    fail(`SKILL.md missing required compile rule phrase: ${phrase}`);
  }
}

const styleFiles = fs
  .readdirSync(stylesDir)
  .map((name) => path.join(stylesDir, name, "STYLE.md"))
  .filter((file) => fs.existsSync(file));

let eligibleCount = 0;
for (const file of styleFiles) {
  const markdown = read(file);
  const yaml = fencedYaml(markdown);
  if (!yaml) {
    fail(`${path.relative(root, file)} has no fenced yaml metadata`);
    continue;
  }

  const isCoverStyle = /outputs:\s*\[[^\]]*\b(cover|poster)\b[^\]]*\]/.test(yaml);
  if (!isCoverStyle) continue;

  eligibleCount += 1;
  for (const field of requiredStyleFields) {
    if (!yaml.includes(field)) {
      fail(`${path.relative(root, file)} missing ${field}`);
    }
  }
}

if (eligibleCount === 0) {
  fail("No cover/poster styles found");
}

if (failures.length) {
  console.error("punk-cover validation failed:");
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`punk-cover validation passed for ${eligibleCount} cover/poster styles.`);

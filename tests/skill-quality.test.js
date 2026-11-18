const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const skill = fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf8');
const agentRules = fs.readFileSync(path.join(ROOT, 'AGENTS.md'), 'utf8');

test('skill metadata describes its intended use without guaranteeing outcomes', () => {
  const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(frontmatter, 'SKILL.md must start with YAML frontmatter');
  assert.match(frontmatter[1], /^name: nt-skill-supreme$/m);
  assert.match(frontmatter[1], /^description: "Use when .+"$/m);
  assert.doesNotMatch(frontmatter[1], /world-class|guarantee/i);
});

test('all relative reference links in the skill resolve', () => {
  const links = [...skill.matchAll(/\]\(\.\/references\/([^\)]+)\)/g)];
  assert.ok(links.length > 0, 'SKILL.md should link to its reference guides');

  for (const [, referencePath] of links) {
    assert.ok(
      fs.existsSync(path.join(ROOT, 'references', referencePath)),
      `Missing skill reference: ${referencePath}`,
    );
  }
});

test('core guidance balances premium quality with user intent and task scope', () => {
  assert.match(skill, /smallest complete change/i);
  assert.match(skill, /Premium is a quality bar, not a visual preset/i);
  assert.match(skill, /Do not infer new product features/i);
  assert.match(agentRules, /A missing model is not permission/i);
  assert.doesNotMatch(agentRules, /Complete 4-State Lifecycle for Every Action/i);
});
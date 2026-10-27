// Compile one explainer's scene.jsx to build/scene.js (same Babel setup as the
// repo's build.mjs). Run from the repo root:
//   node .claude/skills/dental-explainer/scripts/build-explainer.mjs explainers/<slug>
import { transformFileSync } from '@babel/core';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dir = resolve(process.argv[2] || '');
const src = join(dir, 'scene.jsx');
if (!existsSync(src)) { console.error(`No scene.jsx in ${dir}`); process.exit(1); }
const { code } = transformFileSync(src, {
  presets: [['@babel/preset-react', { runtime: 'classic' }]],
  comments: true, compact: false,
});
mkdirSync(join(dir, 'build'), { recursive: true });
writeFileSync(join(dir, 'build', 'scene.js'),
  `// GENERATED from scene.jsx — rebuild with build-explainer.mjs.\n(function () {\n${code}\n})();\n`);
console.log(`built ${join(dir, 'build', 'scene.js')}`);

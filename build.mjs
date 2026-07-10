// build.mjs — precompile the JSX sources to plain browser JS (React.createElement).
//
//   node build.mjs
//
// Transforms src/*.jsx → build/*.js using @babel/preset-react (classic runtime,
// so the output references the global `React` that vendor/react loads). No
// runtime Babel in the browser — index.html just loads the compiled files.

import { transformFileSync } from '@babel/core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, 'build');
mkdirSync(outDir, { recursive: true });

const files = ['engine', 'scene'];
for (const name of files) {
  const src = join(root, 'src', `${name}.jsx`);
  const { code } = transformFileSync(src, {
    presets: [['@babel/preset-react', { runtime: 'classic' }]],
    comments: true,
    compact: false,
  });
  const out = join(outDir, `${name}.js`);
  // Wrap in an IIFE so top-level declarations don't collide across the two
  // classic scripts (both share one global lexical scope in the browser).
  // Cross-file wiring goes through `window`, which the sources already use.
  const wrapped =
    `// GENERATED from src/${name}.jsx — run \`node build.mjs\` to rebuild.\n` +
    `(function () {\n${code}\n})();\n`;
  writeFileSync(out, wrapped);
  console.log(`built ${out}`);
}

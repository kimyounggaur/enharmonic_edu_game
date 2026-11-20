#!/usr/bin/env node
/**
 * Deterministically apply the exact supplied P01–P19 guide snippets.
 * Usage: node tools/assemble-core.mjs --through P19 --out /tmp/core.html
 * Optional: --guide /absolute/prompt-guide.md --audit /tmp/assembly.json
 * Without --out, writes generated HTML to stdout; never edits index implicitly.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2), options = {};
for (let i = 0; i < args.length; i++) {
  if (!['--through', '--out', '--guide', '--audit'].includes(args[i]) || !args[i + 1]) {
    throw new Error('Use --through P01…P19, --out PATH, --guide PATH, --audit PATH.');
  }
  options[args[i].slice(2)] = args[++i];
}
const through = options.through || 'P19';
if (!/^P(?:0[1-9]|1[0-9])$/.test(through)) throw new Error('Stage must be P01 through P19.');
const guide = path.resolve(options.guide || path.join(project, 'docs', 'prompt-guide.md'));
const source = fs.readFileSync(guide, 'utf8');
const blocks = [], audit = [];
for (const match of source.matchAll(/```(html|js|css)\n([\s\S]*?)\n```/g)) {
  const before = source.slice(0, match.index);
  const heading = [...before.matchAll(/^### (P\d+) .*$/gm)].at(-1);
  if (!heading || Number(heading[1].slice(1)) > Number(through.slice(1))) continue;
  blocks.push({ prompt: heading[1], language: match[1], code: match[2], context: before.slice(before.lastIndexOf('조각 ')) });
}
let html = '';
const occurrences = (needle) => html.split(needle).length - 1;
for (const block of blocks) {
  let action;
  if (block.prompt === 'P01') {
    if (html) throw new Error('Duplicate initial file snippet.');
    html = block.code + '\n';
    action = 'initial';
  } else if (block.context.includes('지울 것:')) {
    if (occurrences(block.code) !== 1) throw new Error(`${block.prompt}: removal must match exactly once.`);
    html = html.replace(block.code, '');
    action = 'delete exact snippet';
  } else {
    const marker = block.context.match(/넣을 자리: `([^`]+)`/)?.[1];
    if (!marker || occurrences(marker) !== 1) throw new Error(`${block.prompt}: insertion marker missing or ambiguous: ${marker}`);
    html = html.replace(marker, block.code + '\n' + marker);
    action = marker;
  }
  audit.push({ prompt: block.prompt, language: block.language, action, bytes: Buffer.byteLength(block.code), sha256: crypto.createHash('sha256').update(block.code).digest('hex') });
}
if (!html || !audit.some((x) => x.prompt === 'P01')) throw new Error('No valid core snippets found.');
if (options.out) fs.writeFileSync(path.resolve(options.out), html);
else process.stdout.write(html);
const summary = { through, snippets: audit.length, bytes: Buffer.byteLength(html), newlines: (html.match(/\n/g) || []).length, tests: (html.match(/^test\(/gm) || []).length, sha256: crypto.createHash('sha256').update(html).digest('hex'), audit };
if (options.audit) fs.writeFileSync(path.resolve(options.audit), JSON.stringify(summary, null, 2) + '\n');
console.error(JSON.stringify({ through: summary.through, snippets: summary.snippets, bytes: summary.bytes, newlines: summary.newlines, tests: summary.tests, sha256: summary.sha256 }));

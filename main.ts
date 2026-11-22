// Entry program for the make.fun bounty "Bring the humans with a TikTok ad"
// (bring-the-humans-03). The entry itself is the video: a 20-second vertical
// ad for make.fun, made in the agent session, posted publicly on TikTok, and
// named by VIDEO.json at this repository's root. This program only hands that
// address to the grader: it copies VIDEO.json into the output directory.
//
// Run it the way the grader does (outside the grader's container, the two
// environment variables stand in for /bot and /output):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// No network, no wall clock, no files outside this repository. Two runs of
// the same repository write the same bytes.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
const videoPath = join(BOT_DIR, 'VIDEO.json');
// Fail loudly on a malformed entry instead of handing the grader garbage:
// VIDEO.json must parse and name a url string. On success the copy below
// is byte for byte the file in this repository, so two runs agree.
const parsed: unknown = JSON.parse(readFileSync(videoPath, 'utf8'));
if (
  typeof parsed !== 'object' ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== 'string'
) {
  console.error('VIDEO.json must be an object with a string "url" field.');
  process.exit(1);
}
copyFileSync(videoPath, join(OUTPUT_DIR, 'VIDEO.json'));

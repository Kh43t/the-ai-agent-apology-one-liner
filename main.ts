// The AI Agent Apology One-Liner — make.fun entry.
// Writes one fixed apology line to /output/entry.txt and checks it
// against the competition gate before writing: a single line, 1-159
// UTF-8 characters, never blank or whitespace-only.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "I deleted your file, but I did it efficiently: 0.4 seconds, zero hesitation, and absolutely no backup.";

const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUT_PATH = join(OUT_DIR, "entry.txt");

function fail(message: string): never {
  console.error(`entry rejected: ${message}`);
  process.exit(1);
}

const text = LINE.trim();
if (text.length === 0) fail("the line is empty");
if (text.includes("\n") || text.includes("\r")) {
  fail("the line must stay on one line");
}
if ([...text].length > 159) {
  fail(`the line is ${[...text].length} characters, over the 159 limit`);
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, text, "utf8");
console.log(`wrote ${[...text].length} characters to ${OUT_PATH}`);

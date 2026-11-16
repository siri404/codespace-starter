import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { parseMission } from './parser.js';
import { executeCommands } from './rover.js';
import type { Position } from './types.js';

export function formatPosition({ x, y, heading }: Position): string {
  return `${x} ${y} ${heading}`;
}

/** Parses the input text, runs each rover in order and returns one output line per rover. */
export function run(input: string): string[] {
  const { plateau, rovers } = parseMission(input);
  return rovers.map((rover) => formatPosition(executeCommands(rover.start, rover.commands, plateau)));
}

async function main(): Promise<void> {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: pnpm start <input-file>');
    process.exitCode = 1;
    return;
  }

  try {
    const input = await readFile(file, 'utf8');
    for (const line of run(input)) {
      console.log(line);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}

import type { Command, Heading, Mission, Plateau, Position, RoverPlan } from './types.js';

const HEADINGS: readonly Heading[] = ['N', 'E', 'S', 'W'];
const COMMANDS: readonly Command[] = ['L', 'R', 'M'];

/**
 * Parses the classic Mars Rover input format:
 *
 *   5 5          <- plateau upper-right corner (lower-left is 0 0)
 *   1 2 N        <- rover 1 landing position and heading
 *   LMLMLMLMM    <- rover 1 commands
 *   3 3 E        <- rover 2 ...
 *   MMRMMRMRRM
 *
 * Blank lines are ignored. Throws an Error with the line number on bad input.
 */
export function parseMission(text: string): Mission {
  const lines = text
    .split(/\r?\n/)
    .map((content, index) => ({ content: content.trim(), lineNo: index + 1 }))
    .filter((line) => line.content.length > 0);

  const [plateauLine, ...roverLines] = lines;
  if (!plateauLine) {
    throw new Error('Input is empty: expected a plateau line such as "5 5"');
  }
  if (roverLines.length % 2 !== 0) {
    const last = roverLines[roverLines.length - 1]!;
    throw new Error(`Line ${last.lineNo}: rover position has no command line after it`);
  }

  const plateau = parsePlateau(plateauLine.content, plateauLine.lineNo);
  const rovers: RoverPlan[] = [];
  for (let i = 0; i < roverLines.length; i += 2) {
    const positionLine = roverLines[i]!;
    const commandLine = roverLines[i + 1]!;
    rovers.push({
      start: parsePosition(positionLine.content, positionLine.lineNo),
      commands: parseCommands(commandLine.content, commandLine.lineNo),
    });
  }

  return { plateau, rovers };
}

function parsePlateau(content: string, lineNo: number): Plateau {
  const match = /^(\d+)\s+(\d+)$/.exec(content);
  if (!match) {
    throw new Error(`Line ${lineNo}: expected plateau size like "5 5", got "${content}"`);
  }
  return { maxX: Number(match[1]), maxY: Number(match[2]) };
}

function parsePosition(content: string, lineNo: number): Position {
  const match = /^(\d+)\s+(\d+)\s+([A-Za-z])$/.exec(content);
  const heading = match?.[3]?.toUpperCase() as Heading | undefined;
  if (!match || !heading || !HEADINGS.includes(heading)) {
    throw new Error(`Line ${lineNo}: expected rover position like "1 2 N", got "${content}"`);
  }
  return { x: Number(match[1]), y: Number(match[2]), heading };
}

function parseCommands(content: string, lineNo: number): Command[] {
  const commands = content.toUpperCase().replace(/\s+/g, '').split('');
  const bad = commands.find((c) => !COMMANDS.includes(c as Command));
  if (bad !== undefined) {
    throw new Error(`Line ${lineNo}: unknown command "${bad}" (expected only L, R or M)`);
  }
  return commands as Command[];
}

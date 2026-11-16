import type { Command, Plateau, Position } from './types.js';

// ---------------------------------------------------------------------------
// TODO: implement the rover logic below. Each function is pure: it takes the
// current position and returns a new one, without mutating its input.
// Run `pnpm test:watch` and un-skip the specs in test/rover.test.ts as you go.
// ---------------------------------------------------------------------------

/** Spin 90 degrees left without moving: N -> W -> S -> E -> N. */
export function turnLeft(position: Position): Position {
  throw new Error('turnLeft: not implemented');
}

/** Spin 90 degrees right without moving: N -> E -> S -> W -> N. */
export function turnRight(position: Position): Position {
  throw new Error('turnRight: not implemented');
}

/**
 * Move one grid point in the direction the rover faces.
 * N is +y, E is +x, S is -y, W is -x.
 *
 * Decide what should happen if the move would leave the plateau
 * (throw? ignore the move?) and cover it with a test.
 */
export function moveForward(position: Position, plateau: Plateau): Position {
  throw new Error('moveForward: not implemented');
}

/** Apply every command in order and return the rover's final position. */
export function executeCommands(start: Position, commands: Command[], plateau: Plateau): Position {
  throw new Error('executeCommands: not implemented');
}

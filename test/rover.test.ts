import { describe, expect, it } from 'vitest';
import { run } from '../src/index.js';
import { executeCommands, moveForward, turnLeft, turnRight } from '../src/rover.js';
import type { Plateau } from '../src/types.js';

// These specs are skipped until you implement src/rover.ts.
// Change `describe.skip` to `describe` as you work through them.

const plateau: Plateau = { maxX: 5, maxY: 5 };

describe.skip('turnLeft / turnRight', () => {
  it('turns left through W, S, E back to N', () => {
    const p = { x: 0, y: 0, heading: 'N' } as const;
    expect(turnLeft(p).heading).toBe('W');
    expect(turnLeft(turnLeft(turnLeft(turnLeft(p))))).toEqual(p);
  });

  it('turns right through E, S, W back to N', () => {
    const p = { x: 0, y: 0, heading: 'N' } as const;
    expect(turnRight(p).heading).toBe('E');
    expect(turnRight(turnRight(turnRight(turnRight(p))))).toEqual(p);
  });
});

describe.skip('moveForward', () => {
  it('moves one grid point in the direction it faces', () => {
    expect(moveForward({ x: 2, y: 2, heading: 'N' }, plateau)).toEqual({ x: 2, y: 3, heading: 'N' });
    expect(moveForward({ x: 2, y: 2, heading: 'E' }, plateau)).toEqual({ x: 3, y: 2, heading: 'E' });
    expect(moveForward({ x: 2, y: 2, heading: 'S' }, plateau)).toEqual({ x: 2, y: 1, heading: 'S' });
    expect(moveForward({ x: 2, y: 2, heading: 'W' }, plateau)).toEqual({ x: 1, y: 2, heading: 'W' });
  });

  it.todo('handles a move off the edge of the plateau');
});

describe.skip('executeCommands', () => {
  it('runs rover 1 from the classic example', () => {
    const commands = [...'LMLMLMLMM'] as ('L' | 'R' | 'M')[];
    expect(executeCommands({ x: 1, y: 2, heading: 'N' }, commands, plateau)).toEqual({
      x: 1,
      y: 3,
      heading: 'N',
    });
  });
});

describe.skip('run (end to end)', () => {
  it('produces the expected output for examples/sample.txt', () => {
    expect(run('5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM\n')).toEqual(['1 3 N', '5 1 E']);
  });
});

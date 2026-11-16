import { describe, expect, it } from 'vitest';
import { parseMission } from '../src/parser.js';

describe('parseMission', () => {
  it('parses the plateau and each rover', () => {
    const mission = parseMission('5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM\n');

    expect(mission.plateau).toEqual({ maxX: 5, maxY: 5 });
    expect(mission.rovers).toHaveLength(2);
    expect(mission.rovers[0]).toEqual({
      start: { x: 1, y: 2, heading: 'N' },
      commands: ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M'],
    });
    expect(mission.rovers[1]?.start).toEqual({ x: 3, y: 3, heading: 'E' });
  });

  it('ignores blank lines, CRLF endings and surrounding whitespace', () => {
    const mission = parseMission('\r\n 5 5 \r\n\r\n1 2 n\r\n lmr \r\n');
    expect(mission.rovers[0]).toEqual({
      start: { x: 1, y: 2, heading: 'N' },
      commands: ['L', 'M', 'R'],
    });
  });

  it('allows a plateau with no rovers', () => {
    expect(parseMission('3 4').rovers).toEqual([]);
  });

  it('rejects empty input', () => {
    expect(() => parseMission('  \n')).toThrow(/empty/);
  });

  it('rejects a bad plateau line', () => {
    expect(() => parseMission('5\n')).toThrow(/Line 1/);
  });

  it('rejects a bad heading', () => {
    expect(() => parseMission('5 5\n1 2 X\nM')).toThrow(/Line 2/);
  });

  it('rejects an unknown command', () => {
    expect(() => parseMission('5 5\n1 2 N\nMMX')).toThrow(/Line 3: unknown command "X"/);
  });

  it('rejects a rover with no command line', () => {
    expect(() => parseMission('5 5\n1 2 N')).toThrow(/no command line/);
  });
});

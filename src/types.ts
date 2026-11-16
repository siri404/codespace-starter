/** Compass direction a rover is facing. */
export type Heading = 'N' | 'E' | 'S' | 'W';

/** A single instruction: spin Left, spin Right, or Move forward one grid point. */
export type Command = 'L' | 'R' | 'M';

/** Where a rover is and which way it faces. */
export interface Position {
  x: number;
  y: number;
  heading: Heading;
}

/** The plateau is a grid from (0, 0) to (maxX, maxY), inclusive. */
export interface Plateau {
  maxX: number;
  maxY: number;
}

/** One rover from the input file: its landing position and its commands. */
export interface RoverPlan {
  start: Position;
  commands: Command[];
}

/** Everything parsed from an input file. */
export interface Mission {
  plateau: Plateau;
  rovers: RoverPlan[];
}

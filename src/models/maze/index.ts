import { SpaceTypes } from '../space/types';

export interface Coord {
  x: number;
  y: number;
}

interface Space {
  type: SpaceTypes;
  visited: boolean;
}

export interface MazeInfo {
  [key: number]: Space[];
}

export interface Maze {
  mazeInfo: MazeInfo;
  clearMaze: MazeInfo;
}

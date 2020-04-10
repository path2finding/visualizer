import { SpaceTypes } from "../../components/Space/types";

export interface Coord {
  x: number;
  y: number;
}

export interface Space {
  type: SpaceTypes;
  visited: boolean;
  path: boolean;
  distanceFromStart: number;
  prev: Coord | null;
}

export interface MazeInfo {
  [key: number]: Space[];
}

export interface Maze {
  mazeInfo: MazeInfo;
  clearMaze: MazeInfo;
  bfsQueue: Coord[];
}

import { SpaceTypes } from "../../components/Space/types";

export interface Coord {
  x: number;
  y: number;
}

export interface Space {
  type: SpaceTypes;
  visited: boolean;
  path: boolean;
  parent: Coord | null | undefined;
  f: number;
  g: number;
  h: number;
}

export interface MazeInfo {
  [key: number]: Space[];
}

export interface Maze {
  mazeInfo: MazeInfo;
  clearMaze: MazeInfo;
  bfsQueue: Coord[];
  astarOpenSet: Coord[];
  astarClosedSet: Coord[];
  dfsStack: Coord[];
}

import { SpaceTypes } from "../../components/Space/types";

export interface Coord {
  x: number;
  y: number;
}

export interface IAStar {
  i: number; // y coord
  j: number; // x coord
  f: number;
  g: number;
  h: number; // heuristic dist from end
}

export interface Space {
  type: SpaceTypes;
  visited: boolean;
  path: boolean;
  parent: Coord | null | undefined;
  astar: IAStar;
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
}

import { Maze, MazeInfo } from "./";
import { SpaceTypes } from "../../components/Space/types";

// TODO - Limit Maze Size to 20 x 20
export const generateMaze = (
  x: number,
  y: number,
  clear?: boolean
): MazeInfo => {
  let maze: MazeInfo = {};
  for (let i = 0; i < x; i++) {
    maze[i] = [];
    for (let j = 0; j < y; j++) {
      if (i === 0 && j === 0 && !clear)
        maze[i].push({
          type: SpaceTypes.start,
          visited: false,
          path: false,
          parent: { x: i, y: j },
          f: 0,
          g: 0,
          h: 0,
        });
      else if (i === x - 1 && j === y - 1 && !clear)
        maze[i].push({
          type: SpaceTypes.end,
          visited: false,
          path: false,
          parent: null,
          f: 0,
          g: 0,
          h: 0,
        });
      else
        maze[i].push({
          type: SpaceTypes.empty,
          visited: false,
          path: false,
          parent: null,
          f: 0,
          g: 0,
          h: 0,
        });
    }
  }
  return maze;
};

export const initialState: Maze = {
  mazeInfo: generateMaze(20, 20),
  clearMaze: generateMaze(20, 20, true),
  bfsQueue: [],
  astarOpenSet: [],
  astarClosedSet: [],
};

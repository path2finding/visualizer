import { Maze, MazeInfo } from "./";
import { SpaceTypes } from "../../components/Space/types";

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
          path: false
        });
      else if (i === x - 1 && j === y - 1 && !clear)
        maze[i].push({
          type: SpaceTypes.end,
          visited: false,
          path: false
        });
      else
        maze[i].push({
          type: SpaceTypes.wall,
          visited: false,
          path: false
        });
    }
  }
  return maze;
};

export const initialState: Maze = {
  mazeInfo: generateMaze(5, 5),
  clearMaze: generateMaze(5, 5, true)
};

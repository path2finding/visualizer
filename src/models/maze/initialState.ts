import { Maze, MazeInfo, Coord } from "./";
import { SpaceTypes } from "../../components/Space/types";
import { number } from "prop-types";
import Space from "../../components/Space/Space";

// TODO - Limit Maze Size to 20 x 20
export const generateMaze = (
  x: number,
  y: number,
  clear?: boolean,

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
          distanceFromStart: -1,
          prev: null
        });
      else if (i === x - 1 && j === y - 1 && !clear)
        maze[i].push({
          type: SpaceTypes.end,
          visited: false,
          path: false,
          distanceFromStart: -1,
          prev: null
        });
      else
        maze[i].push({
          type: SpaceTypes.empty,
          visited: false,
          path: false,
          distanceFromStart: -1,
          prev: null
        });
    }
  }
  return maze;
};

export const initialState: Maze = {
  mazeInfo: generateMaze(5, 5),
  clearMaze: generateMaze(5, 5, true),
  bfsQueue: [],
};

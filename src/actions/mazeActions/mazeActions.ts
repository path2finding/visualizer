import { AnyAction } from "redux";
import { Coord, MazeInfo, Maze } from "../../models/maze";
import { generateMaze } from "../../models/maze/initialState";
export const CHANGE_START = "CHANGE_START";
export const CHANGE_END = "CHANGE_END";
export const MAKE_WALL = "MAKE_WALL";
export const MAKE_EMPTY = "MAKE_EMPTY";
export const LOAD_MAZE = "LOAD_MAZE";

export const handleChangeStart = (newPos: Coord): AnyAction => {
  return {
    type: CHANGE_START,
    payload: newPos
  };
};

export const handleChangeEnd = (newPos: Coord): AnyAction => {
  return {
    type: CHANGE_END,
    payload: newPos
  };
};

export const makeWall = (coord: Coord): AnyAction => {
  return {
    type: MAKE_WALL,
    payload: coord
  };
};

export const makeEmpty = (coord: Coord): AnyAction => {
  return {
    type: MAKE_EMPTY,
    payload: coord
  };
};

export const loadMaze = (maze: MazeInfo): AnyAction => {
  return {
    type: LOAD_MAZE,
    payload: { mazeInfo: maze, clearMaze: generateMaze(5, 5, true) } as Maze
  };
};

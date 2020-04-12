import { AnyAction } from "redux";
import { Coord, MazeInfo, Maze } from "../../models/maze";
import { generateMaze } from "../../models/maze/initialState";
import { ButtonProps } from "semantic-ui-react";
import { PAUSE_VISUALIZATION } from "../menuActions/menuActions";
export const CHANGE_START = "CHANGE_START";
export const CHANGE_END = "CHANGE_END";
export const MAKE_WALL = "MAKE_WALL";
export const MAKE_EMPTY = "MAKE_EMPTY";
export const LOAD_MAZE = "LOAD_MAZE";
export const STOP_VISUALIZATION = "STOP_VISUALIZATION";
export const PROGRESS_BFS = "PROGRESS_BFS";
export const UPDATE_GRID_SIZE = "UPDATE_GRID_SIZE";

export const handleChangeStart = (newPos: Coord): AnyAction => {
  return {
    type: CHANGE_START,
    payload: newPos,
  };
};

export const handleChangeEnd = (newPos: Coord): AnyAction => {
  return {
    type: CHANGE_END,
    payload: newPos,
  };
};

export const makeWall = (coord: Coord): AnyAction => {
  return {
    type: MAKE_WALL,
    payload: coord,
  };
};

export const makeEmpty = (coord: Coord): AnyAction => {
  return {
    type: MAKE_EMPTY,
    payload: coord,
  };
};

export const loadMaze = (mazeInfo: MazeInfo): AnyAction => {
  return {
    type: LOAD_MAZE,
    payload: { mazeInfo: mazeInfo },
  };
};

export const handlePauseVisualization = (
  _?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data?: ButtonProps
) => {
  return {
    type: PAUSE_VISUALIZATION,
    payload: null,
  };
};

export const handleStopVisualization = (
  _?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data?: ButtonProps
) => {
  return {
    type: STOP_VISUALIZATION,
    payload: null,
  };
};

export const progressBFS = (
  queue: Coord[],
  coord: Coord,
  neighbors: Coord[] | Coord
) => {
  return {
    type: PROGRESS_BFS,
    payload: {
      queue: queue,
      coord: coord,
      neighbors: neighbors,
    },
  };
};

export const updateGridSize = (cols: number, rows: number) => {
  return {
    type: UPDATE_GRID_SIZE,
    payload: {
      cols: cols,
      rows: rows,
    },
  };
};

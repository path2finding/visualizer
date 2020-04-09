import { AnyAction } from "redux";
import { Coord, MazeInfo, Maze } from "../../models/maze";
import { generateMaze } from "../../models/maze/initialState";
import { ButtonProps } from "semantic-ui-react";
export const CHANGE_START = "CHANGE_START";
export const CHANGE_END = "CHANGE_END";
export const MAKE_WALL = "MAKE_WALL";
export const MAKE_EMPTY = "MAKE_EMPTY";
export const LOAD_MAZE = "LOAD_MAZE";
export const SET_PATH = "SET_PATH";
export const SET_VISITED = "SET_VISITED";
export const STOP_VISUALIZATION = "STOP_VISUALIZATION";
export const UPDATE_BFS_QUEUE = "UPDATE_BFS_QUEUE";
export const PROGRESS_BFS = "PROGRESS_BFS";

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

export const loadMaze = (maze: MazeInfo): AnyAction => {
  return {
    type: LOAD_MAZE,
    payload: { mazeInfo: maze, clearMaze: generateMaze(5, 5, true) } as Maze,
  };
};

export const setPath = (coord: Coord): AnyAction => {
  return {
    type: SET_PATH,
    payload: coord,
  };
};

export const setVisited = (coord: Coord): AnyAction => {
  return {
    type: SET_VISITED,
    payload: coord,
  };
};

export const handleStopVisualization = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: STOP_VISUALIZATION,
    payload: null,
  };
};

export const updateBFSQueue = (queue: Coord[]): AnyAction => {
  return {
    type: UPDATE_BFS_QUEUE,
    payload: queue,
  };
};

export const progressBFS = (queue: Coord[], coord: Coord) => {
  return {
    type: PROGRESS_BFS,
    payload: {
      queue: queue,
      coord: coord,
    },
  };
};

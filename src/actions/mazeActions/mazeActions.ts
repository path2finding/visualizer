import { AnyAction } from "redux";
import { Coord, MazeInfo, Maze, IAStar } from "../../models/maze";
import { generateMaze } from "../../models/maze/initialState";
import { ButtonProps } from "semantic-ui-react";
import { PAUSE_VISUALIZATION } from "../menuActions/menuActions";
export const CHANGE_START = "CHANGE_START";
export const CHANGE_END = "CHANGE_END";
export const MAKE_WALL = "MAKE_WALL";
export const MAKE_EMPTY = "MAKE_EMPTY";
export const MAKE_VISITED = "MAKE_VISITED";
export const LOAD_MAZE = "LOAD_MAZE";
export const STOP_VISUALIZATION = "STOP_VISUALIZATION";
export const PROGRESS_BFS = "PROGRESS_BFS";
export const PROGRESS_ASTAR = "PROGRESS_ASTAR";
export const UPDATE_OPEN_SET = "UPDATE_OPEN_SET";
export const UPDATE_CLOSED_SET = "UPDATE_CLOSED_SET";

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

export const makeVisited = (coord: Coord): AnyAction => {
  return {
    type: MAKE_VISITED,
    payload: coord,
  };
};

export const loadMaze = (maze: MazeInfo): AnyAction => {
  return {
    type: LOAD_MAZE,
    payload: { mazeInfo: maze, clearMaze: generateMaze(5, 5, true) } as Maze,
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

export const progressAstar = (
  astar: IAStar,
  coord: Coord,
  parent?: Coord,
  openSet?: Coord[],
  closedSet?: Coord[]
) => {
  return {
    type: PROGRESS_ASTAR,
    payload: {
      astar,
      coord,
      parent,
      openSet,
      closedSet,
    },
  };
};

export const handleUpdateOpenSet = (openSet: Coord[]) => {
  return {
    type: UPDATE_OPEN_SET,
    payload: openSet,
  };
};

export const handleUpdateClosedSet = (closedSet: Coord[]) => {
  return {
    type: UPDATE_CLOSED_SET,
    payload: closedSet,
  };
};

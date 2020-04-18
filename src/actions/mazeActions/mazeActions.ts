import { AnyAction } from "redux";
import { Coord, MazeInfo } from "../../models/maze";

export const CHANGE_START = "CHANGE_START";
export const CHANGE_END = "CHANGE_END";
export const MAKE_WALL = "MAKE_WALL";
export const MAKE_EMPTY = "MAKE_EMPTY";
export const PROGRESS_BFS = "PROGRESS_BFS";
export const PROGRESS_DFS = "PROGRESS_DFS";
export const PROGRESS_ASTAR = "PROGRESS_ASTAR";

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

export const progressDFS = (
  stack: Coord[],
  coord: Coord,
  neighbors: Coord[] | Coord
) => {
  return {
    type: PROGRESS_DFS,
    payload: {
      stack: stack,
      coord: coord,
      neighbors: neighbors,
    },
  };
};

export const progressAstar = (
  openSet: Coord[],
  closedSet: Coord[],
  newMazeInfo: MazeInfo,
  end: Coord
) => {
  return {
    type: PROGRESS_ASTAR,
    payload: {
      openSet,
      closedSet,
      newMazeInfo,
      end,
    },
  };
};

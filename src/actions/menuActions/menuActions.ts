import { AnyAction } from "redux";
import { DropdownProps, ButtonProps } from "semantic-ui-react";
import { MazeInfo } from "../../models/maze";

export const CHANGE_ALGO = "CHANGE_ALGO";
export const START_VISUALIZATION = "START_VISUALIZATION";
export const PAUSE_VISUALIZATION = "PAUSE_VISUALIZATION";
export const STOP_VISUALIZATION = "STOP_VISUALIZATION";
export const CLEAR_GRID = "CLEAR_GRID";
export const TOGGLE_MOVE_START = "TOGGLE_MOVE_START";
export const TOGGLE_MOVE_END = "TOGGLE_MOVE_END";
export const LOAD_MAZE = "LOAD_MAZE";
export const CHANGE_SPEED = "CHANGE_SPEED";
export const RANDOMIZE_WALLS = "RANDOMIZE_WALLS";
export const UPDATE_GRID_SIZE = "UPDATE_GRID_SIZE";

export const handleStartVisualization = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: START_VISUALIZATION,
    payload: null,
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

export const handleChangeSpeed = (
  _: React.SyntheticEvent<HTMLElement, Event>,
  data: DropdownProps
) => {
  return {
    type: CHANGE_SPEED,
    payload: data.value,
  };
};

export const handleChangeAlgo = (
  _: React.SyntheticEvent<HTMLElement, Event>,
  data: DropdownProps
) => {
  return {
    type: CHANGE_ALGO,
    payload: data.value,
  };
};

export const handleChangeGridSize = (cols: number, rows: number) => {
  return {
    type: UPDATE_GRID_SIZE,
    payload: {
      cols: cols,
      rows: rows,
    },
  };
};

export const toggleMoveStart = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: TOGGLE_MOVE_START,
    payload: null,
  };
};

export const toggleMoveEnd = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: TOGGLE_MOVE_END,
    payload: null,
  };
};

export const randomizeWalls = () => {
  return {
    type: RANDOMIZE_WALLS,
    payload: null,
  };
};

export const handleClearGrid = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: CLEAR_GRID,
    payload: null,
  };
};

export const loadMaze = (mazeInfo: MazeInfo): AnyAction => {
  return {
    type: LOAD_MAZE,
    payload: { mazeInfo: mazeInfo },
  };
};

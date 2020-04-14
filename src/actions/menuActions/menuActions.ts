import { DropdownProps, ButtonProps } from "semantic-ui-react";
import { MazeInfo } from "../../models/maze";

export const CHANGE_ALGO = "CHANGE_ALGO";
export const START_VISUALIZATION = "START_VISUALIZATION";
export const PAUSE_VISUALIZATION = "PAUSE_VISUALIZATION";
export const CLEAR_GRID = "CLEAR_GRID";
export const TOGGLE_MOVE_START = "TOGGLE_MOVE_START";
export const TOGGLE_MOVE_END = "TOGGLE_MOVE_END";
export const LOAD_MAZE = "LOAD_MAZE";
export const SAVE_MAZE = "SAVE_MAZE";
export const CHANGE_SPEED = "CHANGE_SPEED";

export const handleDropdownChange = (
  _: React.SyntheticEvent<HTMLElement, Event>,
  data: DropdownProps
) => {
  return {
    type: CHANGE_ALGO,
    payload: data.value,
  };
};

export const handleDropdownSpeed = (
  _: React.SyntheticEvent<HTMLElement, Event>,
  data: DropdownProps
) => {
  return {
    type: CHANGE_SPEED,
    payload: data.value,
  };
};

export const handleStartVisualization = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  console.log('starting visualization');
  return {
    type: START_VISUALIZATION,
    payload: null,
  };
};

export const handlePauseVisualization = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: PAUSE_VISUALIZATION,
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

export const loadMaze = (maze: MazeInfo) => {
  console.log("load maze");
  return {
    type: LOAD_MAZE,
    payload: null,
  };
};

export const saveMaze = (maze: MazeInfo) => {
  console.log("This is not hooked up to a reducer");
  console.log(JSON.stringify(maze));
  return {
    type: SAVE_MAZE,
    payload: JSON.stringify(maze),
  };
};

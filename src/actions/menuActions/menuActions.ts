import { DropdownProps, ButtonProps} from "semantic-ui-react";
import { Maze, MazeInfo } from "../../models/maze";

export const CHANGE_ALGO = "CHANGE_ALGO";
export const START_VISUALIZATION = "START_VISUALIZATION";
export const PAUSE_VISUALIZATION = "PAUSE_VISUALIZATION";
export const STOP_VISUALIZATION = "STOP_VISUALIZATION";
export const CLEAR_GRID = "CLEAR_GRID";
export const TOGGLE_MOVE_START = "TOGGLE_MOVE_START";
export const TOGGLE_MOVE_END = "TOGGLE_MOVE_END";
export const SAVE_MAZE = "SAVE_MAZE"

export const handleDropdownChange = (
  _: React.SyntheticEvent<HTMLElement, Event>,
  data: DropdownProps
) => {
  return {
    type: CHANGE_ALGO,
    payload: data.value
  };
};

export const handleStartVisualization = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: START_VISUALIZATION,
    payload: null
  };
};

export const handlePauseVisualization = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: PAUSE_VISUALIZATION,
    payload: null
  };
};

export const handleStopVisualization = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: STOP_VISUALIZATION,
    payload: null
  };
};

export const handleClearGrid = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: CLEAR_GRID,
    payload: null
  };
};

export const toggleMoveStart = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: TOGGLE_MOVE_START,
    payload: null
  };
};

export const toggleMoveEnd = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  return {
    type: TOGGLE_MOVE_END,
    payload: null
  };
};

export const saveMaze = (
  maze: MazeInfo
) => {
  console.log(JSON.stringify(maze))
  return{
    type: SAVE_MAZE,
    payload: JSON.stringify(maze)
  }
}

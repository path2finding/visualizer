import { DropdownProps, ButtonProps } from "semantic-ui-react";

export const CHANGE_ALGO = "CHANGE_ALGO";
export const START_VISUALIZATION = "START_VISUALIZATION";
export const PAUSE_VISUALIZATION = "PAUSE_VISUALIZATION";
export const STOP_VISUALIZATION = "STOP_VISUALIZATION";
export const CLEAR_GRID = "CLEAR_GRID";

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

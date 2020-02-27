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
  console.log("Algorithm Switched to:", data.value);
  return {
    type: CHANGE_ALGO,
    payload: data.value
  };
};

export const handleStartVisualization = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  console.log("Start Clicked");
  return {
    type: START_VISUALIZATION,
    payload: null
  };
};

export const handlePauseVisualization = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  console.log("Pause Clicked");
  return {
    type: STOP_VISUALIZATION,
    payload: null
  };
};

export const handleStopVisualization = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  console.log("Stop Clicked");
  return {
    type: STOP_VISUALIZATION,
    payload: null
  };
};

export const handleClearGrid = (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) => {
  console.log("Clear Grid Clicked");
  return {
    type: CLEAR_GRID,
    payload: null
  };
};

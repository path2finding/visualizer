import { AnyAction } from "redux";
import { Coord } from "../../models/maze";
export const CHANGE_START = "CHANGE_START";
export const CHANGE_END = "CHANGE_END";
export const MAKE_WALL = "MAKE_WALL";
export const MAKE_EMPTY = "MAKE_EMPTY";

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

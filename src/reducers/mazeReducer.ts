import { MazeState } from "../models/maze";
import { initialState, clearMaze } from "../models/maze/initialState";
import { CLEAR_GRID } from "../actions/navbarActions";

export const mazeReducer = (
  state: MazeState = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case CLEAR_GRID:
      return {
        ...state,
        mazeInfo: clearMaze
      };
    default:
      return state;
  }
};

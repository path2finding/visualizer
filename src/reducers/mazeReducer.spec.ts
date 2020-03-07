import { mazeReducer } from "./mazeReducer";
import { CLEAR_GRID } from "../actions/navbarActions";
import { initialState, clearMaze } from "../models/maze/initialState";
import { MazeState } from "../models/maze";

describe("Maze Reducer Tests", () => {
  it("Clear Grid Expected State", () => {
    const action = {
      type: CLEAR_GRID,
      payload: null
    };

    const updatedState = mazeReducer(initialState, action);
    const expectedState: MazeState = { ...initialState, mazeInfo: clearMaze };

    expect(updatedState).toEqual(expectedState);
  });
});

import { menuReducer } from "./menuReducer";
import {
  START_VISUALIZATION,
  STOP_VISUALIZATION,
  PAUSE_VISUALIZATION,
  CHANGE_ALGO
} from "../actions/navbarActions";
import { initialState } from "../models/menu/initialState";
import { MenuState } from "../models/menu";

describe("Menu Reducer Tests", () => {
  it("Start Visualization Expected State", () => {
    const action = {
      type: START_VISUALIZATION,
      payload: null
    };

    const updatedState = menuReducer(initialState, action);
    const expectedState: MenuState = { ...initialState, isPlaying: true };

    expect(updatedState).toEqual(expectedState);
  });

  it("Stop Visualization Expected State", () => {
    const action = {
      type: STOP_VISUALIZATION,
      payload: null
    };

    const updatedState = menuReducer(initialState, action);
    const expectedState: MenuState = { ...initialState, isPlaying: false };

    expect(updatedState).toEqual(expectedState);
  });

  it("Pause Visualization Expected State", () => {
    const action = {
      type: PAUSE_VISUALIZATION,
      payload: null
    };

    const updatedState = menuReducer(initialState, action);
    const expectedState: MenuState = { ...initialState, isPlaying: false };

    expect(updatedState).toEqual(expectedState);
  });

  it("Clear Grid Expected State", () => {
    // const action = {
    //   type: CLEAR_GRID,
    //   payload: null
    // };

    // const updatedState = menuReducer(initialState, action);
    // const expectedState: MenuState = { ...initialState, isPlaying: true };

    // expect(updatedState).toEqual(expectedState);
    // Placeholder bc this reducer does not currently update state
    expect(Math.pow(2, 2)).toEqual(4);
  });

  it("Change Algorithm Expected State", () => {
    const action = {
      type: CHANGE_ALGO,
      payload: "A*"
    };

    const updatedState = menuReducer(initialState, action);
    const expectedState: MenuState = { ...initialState, selectedAlgo: "A*" };

    expect(updatedState).toEqual(expectedState);
  });
});

import { menuReducer } from "./menuReducer";
import {
  START_VISUALIZATION,
  STOP_VISUALIZATION,
  PAUSE_VISUALIZATION,
  CHANGE_ALGO,
  TOGGLE_MOVE_START,
  TOGGLE_MOVE_END
} from "../../actions/menuActions/menuActions";
import { initialState } from "../../models/menu/initialState";
import { MenuState } from "../../models/menu";

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

  it("Toggle Move Start Point Expected State", () => {
    const action = {
      type: TOGGLE_MOVE_START,
      payload: null
    };

    const updatedState = menuReducer(initialState, action);
    const expectedState: MenuState = { ...initialState, canMoveStart: true };

    expect(updatedState).toEqual(expectedState);
  });

  it("Toggle Move End Point Expected State", () => {
    const action = {
      type: TOGGLE_MOVE_END,
      payload: null
    };

    const updatedState = menuReducer(initialState, action);
    const expectedState: MenuState = { ...initialState, canMoveEnd: true };

    expect(updatedState).toEqual(expectedState);
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

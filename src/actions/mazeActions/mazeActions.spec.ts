import configureStore from "redux-mock-store";
import {
  handleChangeStart,
  handleChangeEnd,
  makeWall,
  makeEmpty,
  CHANGE_START,
  CHANGE_END,
  MAKE_WALL,
  MAKE_EMPTY,
} from "./mazeActions";
import { initialState } from "../../models/maze/initialState";

describe("Maze Action Tests", () => {
  const mockStore = configureStore();
  const reduxStore = mockStore({ maze: initialState });

  beforeEach(() => {
    reduxStore.clearActions();
  });

  describe("Change Start Point Test", () => {
    it("Should call CHANGE_START action", () => {
      const newPos = { x: 1, y: 1 };

      const expectedActions = [
        {
          type: CHANGE_START,
          payload: newPos,
        },
      ];
      reduxStore.dispatch(handleChangeStart(newPos));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Change End Point Test", () => {
    it("Should call CHANGE_END action", () => {
      const newPos = { x: 1, y: 1 };

      const expectedActions = [
        {
          type: CHANGE_END,
          payload: newPos,
        },
      ];
      reduxStore.dispatch(handleChangeEnd(newPos));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Make Wall Test", () => {
    it("Should call MAKE_WALL action", () => {
      const pos = { x: 1, y: 1 };

      const expectedActions = [
        {
          type: MAKE_WALL,
          payload: pos,
        },
      ];
      reduxStore.dispatch(makeWall(pos));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Make Empty Test", () => {
    it("Should call MAKE_EMPTY action", () => {
      const pos = { x: 1, y: 1 };

      const expectedActions = [
        {
          type: MAKE_EMPTY,
          payload: pos,
        },
      ];
      reduxStore.dispatch(makeEmpty(pos));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  // TODO: progressBFS

  // TODO: progressDFS

  // TODO: progressASTAR
});

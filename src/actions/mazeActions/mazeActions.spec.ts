import configureStore from "redux-mock-store";
import {
  handleChangeStart,
  handleChangeEnd,
  makeWall,
  makeEmpty,
  loadMaze,
  CHANGE_START,
  CHANGE_END,
  MAKE_WALL,
  MAKE_EMPTY,
  LOAD_MAZE
} from "./mazeActions";
import { initialState, generateMaze } from "../../models/maze/initialState";

describe("Maze Action Tests", () => {
  const mockStore = configureStore();
  const reduxStore = mockStore({ maze: initialState });

  beforeEach(() => {
    reduxStore.clearActions();
  });

  describe("Change Start Point Test", () => {
    it("Should dispatch correct action", () => {
      const newPos = { x: 1, y: 1 };

      const expectedActions = [
        {
          type: CHANGE_START,
          payload: newPos
        }
      ];
      reduxStore.dispatch(handleChangeStart(newPos));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Change End Point Test", () => {
    it("Should dispatch correct action", () => {
      const newPos = { x: 1, y: 1 };

      const expectedActions = [
        {
          type: CHANGE_END,
          payload: newPos
        }
      ];
      reduxStore.dispatch(handleChangeEnd(newPos));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Make Wall Test", () => {
    it("Should modify redux store", () => {
      const pos = { x: 1, y: 1 };

      const expectedActions = [
        {
          type: MAKE_WALL,
          payload: pos
        }
      ];
      reduxStore.dispatch(makeWall(pos));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Make Empty Test", () => {
    it("Should modify redux store", () => {
      const pos = { x: 1, y: 1 };

      const expectedActions = [
        {
          type: MAKE_EMPTY,
          payload: pos
        }
      ];
      reduxStore.dispatch(makeEmpty(pos));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Load Maze Test", () => {
    it("Should modify redux store", () => {
      const maze = generateMaze(5, 5, false);

      const expectedActions = [
        {
          type: LOAD_MAZE,
          payload: { mazeInfo: maze, clearMaze: generateMaze(5, 5, true) }
        }
      ];
      reduxStore.dispatch(loadMaze(maze));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });
});

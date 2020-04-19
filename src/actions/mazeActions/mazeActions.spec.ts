import configureStore from "redux-mock-store";
import {
  handleChangeStart,
  handleChangeEnd,
  makeWall,
  makeEmpty,
  progressBFS,
  progressDFS,
  progressAstar,
  CHANGE_START,
  CHANGE_END,
  MAKE_WALL,
  MAKE_EMPTY,
  PROGRESS_BFS,
  PROGRESS_DFS,
  PROGRESS_ASTAR,
} from "./mazeActions";
import { initialState } from "../../models/maze/initialState";
import { Coord } from "../../models/maze";

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

  describe("Progress BFS", () => {
    it("Should call PROGRESS_BFS action", () => {
      const queue: Coord[] = [];
      const coord = { x: 0, y: 0 };
      const neighbors = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ];

      const expectedActions = [
        {
          type: PROGRESS_BFS,
          payload: {
            queue: queue,
            coord: coord,
            neighbors: neighbors,
          },
        },
      ];
      reduxStore.dispatch(progressBFS(queue, coord, neighbors));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Progress DFS", () => {
    it("Should call PROGRESS_DFS action", () => {
      const stack: Coord[] = [];
      const coord = { x: 0, y: 0 };
      const neighbors = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ];

      const expectedActions = [
        {
          type: PROGRESS_DFS,
          payload: {
            stack: stack,
            coord: coord,
            neighbors: neighbors,
          },
        },
      ];
      reduxStore.dispatch(progressDFS(stack, coord, neighbors));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Progress A*", () => {
    it("Should call PROGRESS_ASTAR action", () => {
      const openSet: Coord[] = [];
      const closedSet: Coord[] = [];
      const newMazeInfo = initialState.mazeInfo;
      const end = { x: 1, y: 1 };

      const expectedActions = [
        {
          type: PROGRESS_ASTAR,
          payload: {
            openSet: openSet,
            closedSet: closedSet,
            newMazeInfo: newMazeInfo,
            end: end,
          },
        },
      ];
      reduxStore.dispatch(progressAstar(openSet, closedSet, newMazeInfo, end));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });
});

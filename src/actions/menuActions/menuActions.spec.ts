import configureStore from "redux-mock-store";
import {
  handleStartVisualization,
  handlePauseVisualization,
  handleStopVisualization,
  handleClearGrid,
  START_VISUALIZATION,
  PAUSE_VISUALIZATION,
  STOP_VISUALIZATION,
  CLEAR_GRID,
  CHANGE_ALGO,
  TOGGLE_MOVE_START,
  TOGGLE_MOVE_END,
  toggleMoveStart,
  toggleMoveEnd,
  handleChangeAlgo,
  loadMaze,
  LOAD_MAZE,
  CHANGE_SPEED,
  handleChangeSpeed,
  UPDATE_GRID_SIZE,
  handleChangeGridSize,
  RANDOMIZE_WALLS,
  randomizeWalls,
} from "./menuActions";
import { ButtonProps, DropdownProps } from "semantic-ui-react";
import { initialState } from "../../models/menu/initialState";
import { generateMaze } from "../../models/maze/initialState";

describe("Navbar Action Tests", () => {
  const mockStore = configureStore();
  const reduxStore = mockStore({ menu: initialState });

  beforeEach(() => {
    reduxStore.clearActions();
  });

  describe("Start Visualization Test", () => {
    it("Should call START_VISUALIZATION action", () => {
      const expectedActions = [
        {
          type: START_VISUALIZATION,
          payload: null,
        },
      ];
      reduxStore.dispatch(
        handleStartVisualization(
          { target: {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>,
          {} as ButtonProps
        )
      );
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Pause Visualization Test", () => {
    it("Should call PAUSE_VISUALIZATION action", () => {
      const expectedActions = [
        {
          type: PAUSE_VISUALIZATION,
          payload: null,
        },
      ];
      reduxStore.dispatch(
        handlePauseVisualization(
          { target: {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>,
          {} as ButtonProps
        )
      );
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Stop Visualization Test", () => {
    it("Should call STOP_VISUALIZATION action", () => {
      const expectedActions = [
        {
          type: STOP_VISUALIZATION,
          payload: null,
        },
      ];

      reduxStore.dispatch(
        handleStopVisualization(
          { target: {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>,
          {} as ButtonProps
        )
      );
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Change Visualization Speed", () => {
    it("Should call CHANGE_SPEED action", () => {
      const expectedActions = [
        {
          type: CHANGE_SPEED,
          payload: undefined,
        },
      ];
      reduxStore.dispatch(
        handleChangeSpeed(
          { target: {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>,
          {} as DropdownProps
        )
      );
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Change Algorithm Test", () => {
    it("Should call CHANGE_ALGO action", () => {
      const expectedActions = [
        {
          type: CHANGE_ALGO,
          payload: undefined,
        },
      ];
      reduxStore.dispatch(
        handleChangeAlgo(
          { target: {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>,
          {} as DropdownProps
        )
      );
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Change Grid Size Test", () => {
    it("Should call UPDATE_GRID_SIZE action", () => {
      const cols = 20;
      const rows = 20;

      const expectedActions = [
        {
          type: UPDATE_GRID_SIZE,
          payload: {
            cols: cols,
            rows: rows,
          },
        },
      ];
      reduxStore.dispatch(handleChangeGridSize(cols, rows));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Move Start Point Test", () => {
    it("Should call TOGGLE_MOVE_START action", () => {
      const expectedActions = [
        {
          type: TOGGLE_MOVE_START,
          payload: null,
        },
      ];
      reduxStore.dispatch(
        toggleMoveStart(
          { target: {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>,
          {} as ButtonProps
        )
      );
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Move End Point Test", () => {
    it("Should call TOGGLE_MOVE_END action", () => {
      const expectedActions = [
        {
          type: TOGGLE_MOVE_END,
          payload: null,
        },
      ];
      reduxStore.dispatch(
        toggleMoveEnd(
          { target: {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>,
          {} as ButtonProps
        )
      );
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Randomize Walls Test", () => {
    it("Should call RANDOMIZE_WALLS action", () => {
      const expectedActions = [
        {
          type: RANDOMIZE_WALLS,
          payload: null,
        },
      ];
      reduxStore.dispatch(randomizeWalls());
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Clear Grid Test", () => {
    it("Should call CLEAR_GRID action", () => {
      const expectedActions = [
        {
          type: CLEAR_GRID,
          payload: null,
        },
      ];
      reduxStore.dispatch(
        handleClearGrid(
          { target: {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>,
          {} as ButtonProps
        )
      );
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });

  describe("Load Maze Test", () => {
    it("Should call LOAD_MAZE action", () => {
      const maze = generateMaze(5, 5, false);

      const expectedActions = [
        {
          type: LOAD_MAZE,
          payload: { mazeInfo: maze },
        },
      ];
      reduxStore.dispatch(loadMaze(maze));
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });
});

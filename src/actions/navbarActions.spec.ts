import configureStore from "redux-mock-store";
import {
  handleStartVisualization,
  handleStopVisualization,
  handlePauseVisualization,
  handleClearGrid,
  START_VISUALIZATION,
  STOP_VISUALIZATION,
  PAUSE_VISUALIZATION,
  CLEAR_GRID,
  CHANGE_ALGO,
  handleDropdownChange
} from "./navbarActions";
import { ButtonProps, DropdownProps } from "semantic-ui-react";
import { initialState } from "../models/menu/initialState";

describe("Navbar Action Tests", () => {
  const mockStore = configureStore();
  const reduxStore = mockStore({ menu: initialState });

  beforeEach(() => {
    reduxStore.clearActions();
  });

  describe("Start Visualization Test", () => {
    it("Should dispatch correct action", () => {
      const expectedActions = [
        {
          type: START_VISUALIZATION,
          payload: null
        }
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

  describe("Stop Visualization Test", () => {
    it("Should dispatch correct action", () => {
      const expectedActions = [
        {
          type: STOP_VISUALIZATION,
          payload: null
        }
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

  describe("Pause Visualization Test", () => {
    it("Should modify redux store", () => {
      const expectedActions = [
        {
          type: PAUSE_VISUALIZATION,
          payload: null
        }
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

  describe("Clear Grid Test", () => {
    it("Should dispatch correct action", () => {
      const expectedActions = [
        {
          type: CLEAR_GRID,
          payload: null
        }
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

  describe("Change Algorithm Test", () => {
    it("Should dispatch correct action", () => {
      const expectedActions = [
        {
          type: CHANGE_ALGO,
          payload: undefined
        }
      ];
      reduxStore.dispatch(
        handleDropdownChange(
          { target: {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>,
          {} as DropdownProps
        )
      );
      expect(reduxStore.getActions()).toEqual(expectedActions);
    });
  });
});

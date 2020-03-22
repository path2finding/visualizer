import {
  CHANGE_ALGO,
  START_VISUALIZATION,
  PAUSE_VISUALIZATION,
  STOP_VISUALIZATION,
  TOGGLE_MOVE_START,
  TOGGLE_MOVE_END,
  LOAD_MAZE
} from "../../actions/menuActions/menuActions";
import { MenuState } from "../../models/menu";
import { initialState } from "../../models/menu/initialState";

export const menuReducer = (
  state: MenuState = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case CHANGE_ALGO:
      return {
        ...state,
        selectedAlgo: payload
      };
    case START_VISUALIZATION:
      return {
        ...state,
        isPlaying: true
      };
    case PAUSE_VISUALIZATION:
      return {
        ...state,
        isPlaying: false
      };
    case STOP_VISUALIZATION:
      return {
        ...state,
        isPlaying: false
      };
    case TOGGLE_MOVE_START:
      // Check for making `canMoveEnd` false if setting
      // `canMoveStart` to true
      if (!state.canMoveStart && state.canMoveEnd) {
        return {
          ...state,
          canMoveStart: !state.canMoveStart,
          canMoveEnd: false
        };
      }

      return {
        ...state,
        canMoveStart: !state.canMoveStart
      };
    case TOGGLE_MOVE_END:
      // Check for making `canMoveStart` false if setting
      // `canMoveEnd` to true
      if (state.canMoveStart && !state.canMoveEnd) {
        return {
          ...state,
          canMoveEnd: !state.canMoveEnd,
          canMoveStart: false
        };
      }
      
      return {
        ...state,
        canMoveEnd: !state.canMoveEnd
      };
    default:
      return state;
  }
};

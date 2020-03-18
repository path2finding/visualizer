import {
  CHANGE_ALGO,
  START_VISUALIZATION,
  PAUSE_VISUALIZATION,
  STOP_VISUALIZATION
} from '../../actions/menuActions/menuActions';
import { MenuState } from '../../models/menu';
import { initialState } from '../../models/menu/initialState';

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
    default:
      return state;
  }
};

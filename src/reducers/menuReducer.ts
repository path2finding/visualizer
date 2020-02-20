import { CHANGE_ALGO } from "../actions/navbarActions";
import { MenuState } from "../models/menu";
import { initialState } from "../models/menu/initialState";

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
    default:
      return state;
  }
};

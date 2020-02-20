import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { menuReducer } from "./menuReducer";

export const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history) as any,
    menu: menuReducer as any
  });

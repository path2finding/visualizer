import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

export const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history) as any
  });

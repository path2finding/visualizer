import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { menuReducer } from './menuReducer';
import { mazeReducer } from './mazeReducer';

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    menu: menuReducer,
    maze: mazeReducer
  });

export default rootReducer;

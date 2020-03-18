import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { menuReducer } from './menuReducer/menuReducer';
import { mazeReducer } from './mazeReducer/mazeReducer';

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    menu: menuReducer,
    maze: mazeReducer
  });

export default rootReducer;

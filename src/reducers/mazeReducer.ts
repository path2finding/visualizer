import { MazeState } from "../models/maze";
import { initialState, clearMaze } from "../models/maze/initialState";
import { CLEAR_GRID } from "../actions/navbarActions";
import {MAKE_EMPTY, MAKE_WALL} from "../actions/mazeActions"

export interface SpaceState {
  path: Boolean;
  type: string;
  visited: Boolean;
}


const changeSpaceType = (
  mazeInfo: {
    [key: number]: SpaceState[];
  },
  data: { data: {x:number, y:number},type: string}
) =>{
  console.log(data)
  let copy = mazeInfo;
  copy[data.data.x][data.data.y].type = data.type;
  return copy;
}

export const mazeReducer = (
  state: MazeState = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case CLEAR_GRID:
      return {
        ...state,
        mazeInfo: clearMaze
      };
      case MAKE_WALL:
      return{
        ...state,
        mazeInfo: changeSpaceType(state.mazeInfo , payload )
      };
    case MAKE_EMPTY:
      return{
        ...state,
        mazeInfo: changeSpaceType(state.mazeInfo , payload )
      };
    default:
      return state;
  }
};

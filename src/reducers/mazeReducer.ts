import { MazeState } from '../models/maze';
import { initialState } from '../models/maze/initialState';
import { CLEAR_GRID } from '../actions/navbarActions';
import { MAKE_EMPTY, MAKE_WALL } from '../actions/mazeActions';

export interface SpaceState {
  path: Boolean;
  type: string;
  visited: Boolean;
}

const changeSpaceType = (
  state: MazeState,
  coord: { x: number; y: number },
  spaceType: string
) => {
  const { mazeInfo } = state;

  let newMaze = mazeInfo;

  newMaze[coord.y][coord.x].type = spaceType;

  return newMaze;
};

export const mazeReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case CLEAR_GRID:
      return {
        ...state,
        mazeInfo: state.clearMaze
      };
    case MAKE_WALL:
      return {
        ...state,
        mazeInfo: changeSpaceType(state, payload, 'wall')
      };
    case MAKE_EMPTY:
      return {
        ...state,
        mazeInfo: changeSpaceType(state, payload, 'empty')
      };
    default:
      return state;
  }
};

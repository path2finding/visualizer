import { MazeState, Coord } from '../models/maze';
import { SpaceTypes } from '../models/space/types';
import { initialState, clearMaze } from '../models/maze/initialState';
import { CLEAR_GRID } from '../actions/navbarActions';
import { CHANGE_START } from '../actions/mazeActions';

const updateStartPos = (newPos: Coord, state: MazeState) => {
  const newMaze = state.mazeInfo;

  const startCoord = state.getSpaceCoord(SpaceTypes.start);

  if (startCoord) {
    newMaze[startCoord.x][startCoord.y].type = SpaceTypes.empty;
  }

  newMaze[newPos.x][newPos.y].type = SpaceTypes.start;

  return newMaze;
};

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
    case CHANGE_START:
      return {
        ...state,
        mazeInfo: updateStartPos(payload, state)
      };
    default:
      return state;
  }
};

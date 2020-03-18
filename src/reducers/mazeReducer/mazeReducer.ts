// import { MazeState, MazeInfo, Coord } from '../../models/maze';
import { SpaceTypes } from '../../models/space/types';
import { initialState } from '../../models/maze/initialState';
import { Maze, MazeInfo, Coord } from '../../models/maze/index';
import { CLEAR_GRID } from '../../actions/menuActions/menuActions';
import { CHANGE_START } from '../../actions/mazeActions/mazeActions';

const getMazeSize = (mazeInfo: MazeInfo): Coord => {
  return {
    x: mazeInfo[0].length,
    y: Object.keys(mazeInfo).length
  };
};

// // Gets the coordinate of either the start or end points
const getCoord = (
  mazeInfo: MazeInfo,
  spaceType: SpaceTypes.start | SpaceTypes.end
) => {
  const mazeSize = getMazeSize(mazeInfo);

  for (let y = 0; y < mazeSize.y; y++) {
    for (let x = 0; x < mazeSize.x; x++) {
      if (mazeInfo[y][x].type === spaceType) {
        return { x, y };
      }
    }
  }
  return null;
};

const updateStartPos = (newPos: Coord, state: Maze) => {
  const { mazeInfo } = state;
  let newMaze = mazeInfo;

  const startCoord = getCoord(mazeInfo, SpaceTypes.start);

  if (startCoord) {
    newMaze[startCoord.y][startCoord.x].type = SpaceTypes.empty;
  }

  newMaze[newPos.y][newPos.x].type = SpaceTypes.start;

  return newMaze;
};

export const mazeReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case CLEAR_GRID:
      return {
        ...state,
        mazeInfo: state.clearMaze
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

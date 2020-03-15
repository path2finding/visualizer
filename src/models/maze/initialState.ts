import { MazeState, MazeInfo, Coord } from './';
import { SpaceTypes } from '../space/types';

// Gets the coordinate of either the start or end points
const getCoord = (
  mazeInfo: MazeInfo,
  mazeSize: Coord,
  spaceType: SpaceTypes.start | SpaceTypes.end
) => {
  for (let y = 0; y < mazeSize.y; y++) {
    for (let x = 0; x < mazeSize.x; x++) {
      if (mazeInfo[y][x].type === spaceType) {
        return { x, y };
      }
    }
  }
  return null;
};

export const initialState: MazeState = {
  mazeInfo: {
    0: [
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.start, visited: false },
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false }
    ],
    1: [
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false }
    ],
    2: [
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false }
    ],
    3: [
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.end, visited: false },
      { type: SpaceTypes.wall, visited: false },
      { type: SpaceTypes.wall, visited: false }
    ]
  },
  getSize() {
    return {
      x: this.mazeInfo[0].length,
      y: Object.keys(this.mazeInfo).length
    };
  },
  getSpaceCoord(spaceType: SpaceTypes.start | SpaceTypes.end) {
    return getCoord(this.mazeInfo, this.getSize(), spaceType);
  }
};

export const clearMaze: MazeState['mazeInfo'] = {
  0: [
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.start, visited: false },
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false }
  ],
  1: [
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false }
  ],
  2: [
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false }
  ],
  3: [
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.end, visited: false },
    { type: SpaceTypes.wall, visited: false },
    { type: SpaceTypes.wall, visited: false }
  ]
};

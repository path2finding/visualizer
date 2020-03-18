import { Maze } from './';
import { SpaceTypes } from '../space/types';

export const initialState: Maze = {
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
      { type: SpaceTypes.empty, visited: false }
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
  clearMaze: {
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
  }
};

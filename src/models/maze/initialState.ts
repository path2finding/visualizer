import { MazeState } from './';

export enum SpaceTypes {
  wall = 'wall',
  empty = 'empty',
  start = 'startpoint',
  end = 'endpoint'
}

export const initialState: MazeState = {
  mazeInfo: {
    0: [
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.start, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false }
    ],
    1: [
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.empty, visited: false, path: false }
    ],
    2: [
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false }
    ],
    3: [
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.end, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false }
    ]
  },
  clearMaze: {
    0: [
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.start, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false }
    ],
    1: [
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false }
    ],
    2: [
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false }
    ],
    3: [
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.end, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false },
      { type: SpaceTypes.wall, visited: false, path: false }
    ]
  }
};

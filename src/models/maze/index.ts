import { SpaceState } from '../space';

export interface MazeState {
  mazeInfo: {
    [key: number]: SpaceState[];
  };
}

import { SpaceState } from '../space';
import { SpaceTypes } from '../space/types';

export interface MazeInfo {
  [key: number]: SpaceState[];
}

export interface Coord {
  x: number;
  y: number;
}

export interface MazeState {
  mazeInfo: MazeInfo;
  getSize: () => Coord;
  getSpaceCoord: (spaceType: SpaceTypes.start | SpaceTypes.end) => Coord | null;
}

import { SpaceTypes } from './types';

export interface SpaceState {
  type: SpaceTypes;
  position?: number[];
  key: number;
  visited: Boolean;
}

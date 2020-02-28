import { MazeState } from '../models/maze';
import { initialState } from '../models/maze/initialState';

export const mazeReducer = (
  state: MazeState = initialState,
  { type, payload }: any
) => {
  switch (type) {
    default:
      return state;
  }
};

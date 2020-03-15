import { Coord } from '../models/maze';
export const CHANGE_START = 'CHANGE_START';

export const handleChangeStart = (newPos: Coord) => {
  return {
    type: CHANGE_START,
    payload: newPos
  };
};

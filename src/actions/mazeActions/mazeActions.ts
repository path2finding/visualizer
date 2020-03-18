import { AnyAction } from 'redux';
import { Coord } from '../../models/maze';
export const CHANGE_START = 'CHANGE_START';

export const handleChangeStart = (newPos: Coord): AnyAction => {
  return {
    type: CHANGE_START,
    payload: newPos
  };
};

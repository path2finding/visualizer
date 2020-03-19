export const MAKE_WALL = 'MAKE_WALL';
export const MAKE_EMPTY = 'MAKE_EMPTY';

export const makeWall = (coord: { x: number; y: number }) => {
  return {
    type: MAKE_WALL,
    payload: coord
  };
};

export const makeEmpty = (coord: { x: number; y: number }) => {
  return {
    type: MAKE_EMPTY,
    payload: coord
  };
};

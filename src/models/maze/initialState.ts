import { MazeState } from "./";

export const initialState: MazeState = {
  mazeInfo: {
    0: [
      { type: "wall", visited: false },
      { type: "wall", visited: false },
      { type: "startpoint", visited: false },
      { type: "wall", visited: false },
      { type: "wall", visited: false }
    ],
    1: [
      { type: "wall", visited: false },
      { type: "wall", visited: false },
      { type: "wall", visited: false },
      { type: "wall", visited: false },
      { type: "wall", visited: false }
    ],
    2: [
      { type: "wall", visited: false },
      { type: "wall", visited: false },
      { type: "wall", visited: false },
      { type: "wall", visited: false },
      { type: "wall", visited: false }
    ],
    3: [
      { type: "wall", visited: false },
      { type: "wall", visited: false },
      { type: "endpoint", visited: false },
      { type: "wall", visited: false },
      { type: "wall", visited: false }
    ]
  }
};

export const clearMaze: MazeState["mazeInfo"] = {
  0: [
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false }
  ],
  1: [
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false }
  ],
  2: [
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false }
  ],
  3: [
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false },
    { type: "wall", visited: false }
  ]
};

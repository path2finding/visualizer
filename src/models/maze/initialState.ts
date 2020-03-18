import { MazeState } from "./";

export const initialState: MazeState = {
  mazeInfo: {
    0: [
      { type: "wall", visited: false, path: false},
      { type: "wall", visited: false , path: false},
      { type: "startpoint", visited: false , path: false},
      { type: "wall", visited: false , path: false},
      { type: "wall", visited: false , path: false}
    ],
    1: [
      { type: "wall", visited: false , path: false},
      { type: "empty", visited: true , path: true},
      { type: "empty", visited: true , path: false},
      { type: "empty", visited: false , path: false},
      { type: "wall", visited: false , path: false}
    ],
    2: [
      { type: "wall", visited: false , path: false},
      { type: "wall", visited: false , path: false},
      { type: "wall", visited: false , path: false},
      { type: "wall", visited: false , path: false},
      { type: "wall", visited: false , path: false}
    ],
    3: [
      { type: "wall", visited: false , path: false},
      { type: "wall", visited: false , path: false},
      { type: "endpoint", visited: false, path: false },
      { type: "wall", visited: false, path: false },
      { type: "wall", visited: false, path: false }
    ],
    4: [
      { type: "wall", visited: false, path: false },
      { type: "wall", visited: false , path: false},
      { type: "endpoint", visited: false , path: false},
      { type: "wall", visited: false, path: false },
      { type: "wall", visited: false , path: false}
    ]

  }
};

export const clearMaze: MazeState["mazeInfo"] = {
  0: [
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false }
  ],
  1: [
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false }
  ],
  2: [
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false, path: false }
  ],
  3: [
    { type: "wall", visited: false , path: false},
    { type: "wall", visited: false, path: false },
    { type: "wall", visited: false , path: false},
    { type: "wall", visited: false , path: false},
    { type: "wall", visited: false , path: false}
  ]
};

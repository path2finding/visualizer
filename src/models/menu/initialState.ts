import { MenuState } from "./";

export const initialState: MenuState = {
  selectedAlgo: "A*",
  algorithms: [
    { value: "A*", text: "A*" },
    { value: "Djikstras", text: "Djikstras" },
    { value: "BFS", text: "BFS" },
    { value: "DFS", text: "DFS" },
  ],
  isPlaying: false,
  canMoveStart: false,
  canMoveEnd: false,
  speed: [
    { value: 0.5, text: "x0.5" },
    { value: 1, text: "x1" },
    { value: 1.5, text: "x1.5" },
    { value: 2, text: "x2" },
  ],
  currentSpeed: 1,
};

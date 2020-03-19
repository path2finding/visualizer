import { MenuState } from "./";

export const initialState: MenuState = {
  selectedAlgo: undefined,
  algorithms: [
    { value: "A*", text: "A*" },
    { value: "Djikstras", text: "Djikstras" },
    { value: "BFS", text: "BFS" },
    { value: "DFS", text: "DFS" }
  ],
  isPlaying: false,
  canMoveStart: false,
  canMoveEnd: false
};

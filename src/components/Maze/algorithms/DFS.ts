import { MazeInfo, Coord } from "../../../models/maze";
import { SpaceTypes } from "../../Space/types";
import { getValidNeighbors, getCoord } from "./";

interface Props {
  mazeInfo: MazeInfo;
  isPlaying: boolean;
  dfsStack: Coord[];
  currentSpeed: number;
  handlePauseVisualization: () => void;
  progressDFS: (
    queue: Coord[],
    coord: Coord,
    neighbors: Coord[] | Coord
  ) => void;
}

const runDFS = (props: Props) => {
  const {
    mazeInfo,
    isPlaying,
    dfsStack,
    currentSpeed,
    handlePauseVisualization,
    progressDFS,
  } = props;

  let stack = dfsStack;
  // This gets run once at the start
  if (isPlaying && stack.length === 0) {
    // console.log("Init DFS");
    const start = getCoord(mazeInfo, SpaceTypes.start);

    if (start) {
      stack.push(start);
    }
  }

  setTimeout(function () {
    // peek the last index in the stack
    var curr = stack[stack.length - 1];
    // if the stack is not empty
    if (curr && isPlaying) {
      // get neighbors
      const currNeighbors = getValidNeighbors(curr, mazeInfo);

      // If currNeighbors is an array then we keep going.
      // If it's a single object then we've found our end
      if (Array.isArray(currNeighbors)) {
        // if a cell has neighbors, push them to the stack
        if (currNeighbors.length > 0) {
          currNeighbors.forEach((n) => {
            stack.push(n);
          });
        }
        // if no neighbors, pop to backtrack to other cells
        else {
          var tempcurr = stack.pop();
          if (tempcurr) curr = tempcurr;
        }
        progressDFS(stack, curr, currNeighbors);
      } else {
        handlePauseVisualization();
        progressDFS([], curr, currNeighbors);
      }
    }
  }, 100 / currentSpeed);
};

const dfsDesc = `### DFS Info\
\nDepth-first search is a pathfinding or tree spanning algorithm that follows one branch to its deepest point before backtracking. \
It was created in the 19th century by French mathematician Charles Pierre Trémaux. \
\n### Runtime:\
\nO( | V | + | E |) where V is the number of nodes and E the number of edges.\
\n### Helpful links:\
\n[Brilliant (articel)] (https://brilliant.org/wiki/depth-first-search-dfs)\
\n[Go GATE IIT (video)](https://www.youtube.com/watch?v=iaBEKo5sM7w)`;

export { runDFS, dfsDesc };

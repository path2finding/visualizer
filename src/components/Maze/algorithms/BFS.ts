import { Coord, MazeInfo } from "../../../models/maze";
import { SpaceTypes } from "../../Space/types";
import { getValidNeighbors, getCoord } from "./";

interface Props {
  mazeInfo: MazeInfo;
  isPlaying: boolean;
  bfsQueue: Coord[];
  currentSpeed: number;
  handlePauseVisualization: () => void;
  progressBFS: (
    queue: Coord[],
    coord: Coord,
    neighbors: Coord[] | Coord
  ) => void;
}

const runBFS = (props: Props) => {
  const {
    mazeInfo,
    isPlaying,
    bfsQueue,
    currentSpeed,
    handlePauseVisualization,
    progressBFS,
  } = props;

  let queue = bfsQueue;
  // This gets run once at the start
  if (isPlaying && queue.length === 0) {
    const start = getCoord(mazeInfo, SpaceTypes.start);

    if (start) {
      queue.push(start);
    }
  }

  setTimeout(function () {
    if (queue.length > 0 && isPlaying) {
      // Removes any queued spaces that were previously visited
      while (mazeInfo[queue[0].y][queue[0].x].visited) {
        queue.shift();

        // If we end up removing the last space we end BFS
        if (queue.length === 0) {
          if (isPlaying) handlePauseVisualization();
          return;
        }
      }

      const curr = queue[0];
      const currNeighbors = getValidNeighbors(curr, mazeInfo);

      // If currNeighbors is an array then we keep going.
      // If it's a single object then we've found our end
      if (Array.isArray(currNeighbors)) {
        // Add neighbors to queue
        queue = queue.concat(currNeighbors);
        // Dequeue curr
        queue.shift();
        // Update bfsQueue and set curr to visited
        progressBFS(queue, curr, currNeighbors);
      } else {
        if (isPlaying) handlePauseVisualization();
        progressBFS([], curr, currNeighbors);
      }
    }
  }, 100 / currentSpeed);

  return;
};

const bfsDesc = `### BFS Info\
\nBreadth-First Search is a graph or tree traversing algorithm that looks at all nodes at the current level \
before moving onto the next deepest set of nodes. It was created by Konrad Zuse in 1945 and later reinvented by Edward F. Moore in 1959. \
\n### Runtime:\
\nO( | V | + | E |) where V is the number of nodes and E the number of edges.\
\n### Helpful links: \
\n[TheHippieCat (video)] (https://www.youtube.com/watch?v=WvR9voi0y2I)\
\n[Nesbox (README)] (https://github.com/nesbox/TIC-80/wiki/Pathfinding%EA%9E%89-BFS-Algorithm)`;

export { runBFS, bfsDesc };

import { MazeInfo, Coord } from "../../../models/maze";
import { SpaceTypes } from "../../Space/types";
import {
  getLowestFScore,
  includesCoord,
  removeFromArr,
  getValidNeighbors,
  getCoord,
} from "./";

interface Props {
  mazeInfo: MazeInfo;
  isPlaying: boolean;
  astarOpenSet: Coord[];
  astarClosedSet: Coord[];
  currentSpeed: number;
  handlePauseVisualization: () => void;
  progressAstar: (
    openSet: Coord[],
    closedSet: Coord[],
    newMazeInfo: MazeInfo,
    end: Coord
  ) => void;
}

const runDjikstras = (props: Props) => {
  const {
    mazeInfo,
    isPlaying,
    astarOpenSet,
    astarClosedSet,
    currentSpeed,
    handlePauseVisualization,
    progressAstar,
  } = props;

  let openSet = astarOpenSet;
  let closedSet = astarClosedSet;
  // Run at the beginning
  if (isPlaying && openSet.length === 0) {
    const start = getCoord(mazeInfo, SpaceTypes.start);
    if (start) {
      openSet.push(start);
    }
  }
  setTimeout(function () {
    if (isPlaying && openSet.length > 0) {
      let newMazeInfo = mazeInfo;
      let current = getLowestFScore(openSet, mazeInfo);
      const end = getCoord(mazeInfo, SpaceTypes.end) as Coord;
      // Check if finished
      if (includesCoord(closedSet, end)) {
        // Find the Path
        handlePauseVisualization();
        // openSet = [];
        return;
      }
      // Add current to closedSet
      if (!includesCoord(closedSet, current)) {
        closedSet.push(current);
      }
      // Remove current from openSet
      if (includesCoord(openSet, current)) {
        openSet = removeFromArr(openSet, current);
      }
      let neighbors = getValidNeighbors(current, mazeInfo);
      if (!Array.isArray(neighbors)) {
        neighbors = [neighbors];
      }
      if (Array.isArray(neighbors)) {
        neighbors.forEach((neighbor) => {
          if (!includesCoord(closedSet, neighbor)) {
            let tentG = mazeInfo[current.y][current.x].g;
            if (includesCoord(openSet, neighbor)) {
              if (tentG < mazeInfo[neighbor.y][neighbor.x].g) {
                newMazeInfo[neighbor.y][neighbor.x].g = tentG;
              }
            } else {
              newMazeInfo[neighbor.y][neighbor.x].g = tentG;
              openSet.push(neighbor);
            }
            let neighborSpace = newMazeInfo[neighbor.y][neighbor.x];
            if (end) {
              neighborSpace.h = 0;
            }
            neighborSpace.f = neighborSpace.g + neighborSpace.h;
            neighborSpace.parent = current;
          }
        });
        progressAstar(openSet, closedSet, newMazeInfo, end);
      }
    } else {
      if (isPlaying) handlePauseVisualization();
      return;
    }
  }, 100 / currentSpeed);
};

const djikstrasDesc = `### Djikstra's Algorithm Info\
        \nDjikstra's shortest path first Algorithm is a pathfinding algorithm created by Edsger W. Djikstra in 1956. \
        It uses a min-priority queue to find the shortest path of a weighted graph. \
        \n### Runtime: \
        \n(Min-priority queue) O(| V | +| E |log| V |) (where | V | s the number of nodes and | E | is the number of edges)\
        \n(Array) O(V^2)\
        \n### Helpful links:\
        \n[Computerphile (video)](https://www.youtube.com/watch?v=GazC3A4OQTE)\
        \n[Clément Mihailescu (video)] (https://www.youtube.com/watch?v=msttfIHHkak&t=2826s)`;

export { runDjikstras, djikstrasDesc };

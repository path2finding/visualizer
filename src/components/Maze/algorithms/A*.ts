import { MazeInfo, Coord } from "../../../models/maze";
import { SpaceTypes } from "../../Space/types";
import {
  getLowestFScore,
  includesCoord,
  removeFromArr,
  getValidNeighbors,
  getCoord,
} from "./";

const heuristic = (a: Coord, b: Coord): number => {
  // Manhattan distance formula
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  // Diagonal Distance Formula
  // return Math.sqrt(Math.pow(a.x - b.y, 2) + Math.pow(a.y - b.y, 2));
};

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

const runAstar = (props: Props) => {
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
            let tentG =
              mazeInfo[current.y][current.x].g + heuristic(neighbor, current);

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
              neighborSpace.h = heuristic(neighbor, end);
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

export default runAstar;

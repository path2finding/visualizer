import _ from "lodash";
import runBFS from "./BFS";
import runDFS from "./DFS";
import runAstar from "./A*";
import runDjikstras from "./Djikstras";
import { Coord, MazeInfo } from "../../../models/maze";
import { SpaceTypes } from "../../Space/types";
import { getMazeSize } from "../Maze";

const inMazeBoundaries = (coord: Coord, mazeSize: Coord) => {
  if (
    coord.x >= 0 &&
    coord.y >= 0 &&
    coord.x < mazeSize.x &&
    coord.y < mazeSize.y
  ) {
    return true;
  }
  return false;
};

// const checkCorners = (cur: Coord, mazeInfo: MazeInfo): boolean => {
//   const mazeSize = getMazeSize(mazeInfo);
//   if (
//     cur.x < mazeSize.x - 1 &&
//     cur.y < mazeSize.y - 1 &&
//     cur.x > 0 &&
//     cur.y > 0
//   ) {
//     return !(
//       (mazeInfo[cur.y + 1][cur.x].type === SpaceTypes.wall &&
//         mazeInfo[cur.y][cur.x + 1].type === SpaceTypes.wall) ||
//       (mazeInfo[cur.y - 1][cur.x].type === SpaceTypes.wall &&
//         mazeInfo[cur.y][cur.x - 1].type === SpaceTypes.wall)
//     );
//   }
//   return true;
// };

const getValidNeighbors = (
  coord: Coord,
  mazeInfo: MazeInfo
): Coord[] | Coord => {
  const mazeSize = getMazeSize(mazeInfo);
  let validNeighbors: Coord[] = [];
  let endCoord = null;
  const neighbors = [
    {
      x: coord.x,
      y: coord.y + 1,
    },
    {
      x: coord.x + 1,
      y: coord.y,
    },
    {
      x: coord.x,
      y: coord.y - 1,
    },
    {
      x: coord.x - 1,
      y: coord.y,
    },
    // {
    //   x: coord.x + 1,
    //   y: coord.y + 1,
    // },
    // {
    //   x: coord.x + 1,
    //   y: coord.y - 1,
    // },
    // {
    //   x: coord.x - 1,
    //   y: coord.y - 1,
    // },
    // {
    //   x: coord.x - 1,
    //   y: coord.y + 1,
    // },
  ];

  neighbors.forEach((neighbor) => {
    if (inMazeBoundaries(neighbor, mazeSize)) {
      const neighborSpace = mazeInfo[neighbor.y][neighbor.x];

      if (
        neighborSpace.type === SpaceTypes.empty &&
        // checkCorners(neighbor, mazeInfo) &&
        !neighborSpace.visited
      ) {
        validNeighbors.push(neighbor);
      } else if (neighborSpace.type === SpaceTypes.end) {
        endCoord = neighbor;
      }
    }
  });

  // If we find the end, only return that because that's all we care about
  if (endCoord) {
    return endCoord;
  }

  return validNeighbors;
};

const getLowestFScore = (openSet: Coord[], mazeInfo: MazeInfo): Coord => {
  let lowest = openSet[0];

  openSet.forEach((coord) => {
    if (mazeInfo[coord.y][coord.x].f < mazeInfo[lowest.y][lowest.x].f) {
      lowest = coord;
    }
  });

  return lowest;
};

// Gets the coordinate of either the start or end points
const getCoord = (
  mazeInfo: MazeInfo,
  spaceType: SpaceTypes.start | SpaceTypes.end
) => {
  const mazeSize = getMazeSize(mazeInfo);

  for (let y = 0; y < mazeSize.y; y++) {
    for (let x = 0; x < mazeSize.x; x++) {
      if (mazeInfo[y][x].type === spaceType) {
        return { x, y };
      }
    }
  }
  return null;
};

// Checks if a coordinate is in a array of coordinates
const includesCoord = (arr: Coord[], coord: Coord) => {
  let containsElem = false;

  arr.forEach((elem) => {
    if (_.isEqual(elem, coord)) {
      containsElem = true;
    }
  });

  return containsElem;
};

function removeFromArr<T>(arr: T[], ele: T) {
  return arr.filter((n: T) => n !== ele);
}

export {
  runBFS,
  runDFS,
  runAstar,
  runDjikstras,
  includesCoord,
  getCoord,
  getLowestFScore,
  getValidNeighbors,
  removeFromArr,
};

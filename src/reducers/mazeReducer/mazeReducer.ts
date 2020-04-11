import _ from "lodash";
import { SpaceTypes } from "../../components/Space/types";
import { initialState, generateMaze } from "../../models/maze/initialState";
import { Maze, MazeInfo, Coord, Space, IAStar } from "../../models/maze/index";
import { CLEAR_GRID } from "../../actions/menuActions/menuActions";
import {
  CHANGE_START,
  CHANGE_END,
  MAKE_WALL,
  MAKE_EMPTY,
  LOAD_MAZE,
  STOP_VISUALIZATION,
  PROGRESS_BFS,
  PROGRESS_ASTAR,
  MAKE_VISITED,
} from "../../actions/mazeActions/mazeActions";

const getMazeSize = (mazeInfo: MazeInfo): Coord => {
  return {
    x: mazeInfo[0].length,
    y: Object.keys(mazeInfo).length,
  };
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

const changeSpaceType = (
  state: Maze,
  coord: Coord,
  spaceType:
    | SpaceTypes.wall
    | SpaceTypes.empty
    | SpaceTypes.start
    | SpaceTypes.end
) => {
  const { mazeInfo } = state;
  let newMaze = mazeInfo;

  // If the space we are updating is the start of end point we need to get rid of the old one
  if (spaceType === SpaceTypes.end) {
    const oldCoord = getCoord(mazeInfo, spaceType);

    if (oldCoord) {
      newMaze[oldCoord.y][oldCoord.x].type = SpaceTypes.empty;
    }
  } else if (spaceType === SpaceTypes.start) {
    const oldCoord = getCoord(mazeInfo, spaceType);

    if (oldCoord) {
      newMaze[oldCoord.y][oldCoord.x].type = SpaceTypes.empty;
      newMaze[oldCoord.y][oldCoord.x].parent = null;
    }
    newMaze[coord.y][coord.x].parent = coord;
  }

  newMaze[coord.y][coord.x].type = spaceType;

  return newMaze;
};

const makeVisited = (coord: Coord, state: Maze) => {
  const { mazeInfo } = state;
  const newMaze = mazeInfo;
  newMaze[coord.y][coord.x].visited = true;
  return newMaze;
};

const showShortestPath = (endPoint: Coord, mazeInfo: MazeInfo) => {
  console.log("PATH");
  let curr = endPoint;

  while (
    !_.isEqual(mazeInfo[curr.y][curr.x].parent, { x: curr.x, y: curr.y })
  ) {
    const currSpace = mazeInfo[curr.y][curr.x];
    currSpace.path = true;

    if (currSpace.parent) {
      curr = currSpace.parent;
    }
  }
};

const updateSpaceProp = (
  coord: Coord,
  mazeInfo: MazeInfo,
  neighbors: Coord[] | Coord | null
) => {
  let newMaze = mazeInfo;

  // Sets the current space to visited
  newMaze[coord.y][coord.x].visited = true;

  if (neighbors) {
    // If neighbors is an array we keep going with BFS
    // Else if neighbors is a single object we've found the end and can show the path
    if (Array.isArray(neighbors)) {
      // Sets the parent of each neighbor
      neighbors.forEach((neighbor) => {
        newMaze[neighbor.y][neighbor.x].parent = coord;
      });
    } else {
      // Sets the parent of the end point
      newMaze[neighbors.y][neighbors.x].parent = coord;

      showShortestPath(neighbors, newMaze);
    }
  }

  return newMaze;
};

const heuristic = (a: Coord, b: Coord): number => {
  // Manhattan distance formula
  console.log(a, b);
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

// const updateAstar = (coord: Coord, maze: Maze, neighbors: Coord[]) => {
//   let newMaze = maze.mazeInfo;
//   let { astarOpenSet, astarClosedSet } = maze;

//   if (
//     astarOpenSet.length === 0 &&
//     newMaze[coord.y][coord.x].type === SpaceTypes.start
//   ) {
//     let start = getStart(newMaze);
//     let end = getEnd(newMaze);
//     if (start && end) {
//       astarOpenSet.push(start);
//       return {
//         ...maze,
//         astarOpenSet,
//         astarClosedSet,
//         mazeInfo: newMaze,
//       } as Maze;
//     }
//   }

//   if (astarOpenSet.includes(coord)) {
//     astarOpenSet = astarOpenSet.filter((n) => n !== coord);
//     console.log("TAG", "REMOVING", coord);
//   }

//   if (!astarClosedSet.includes(coord)) {
//     astarClosedSet.push(coord);
//     console.log("TAG", "ADDING", coord);
//   }

//   if (astarOpenSet.length > 0) {
//     newMaze[coord.y][coord.x].visited = true;
//     neighbors.forEach((neighbor) => {
//       if (!astarClosedSet.includes(neighbor)) {
//         let tempG = newMaze[coord.y][coord.x].astar.g + 1;

//         let newPath = false;
//         if (astarOpenSet.includes(neighbor)) {
//           if (tempG < newMaze[neighbor.y][neighbor.x].astar.g) {
//             newMaze[neighbor.y][neighbor.x].astar.g = tempG;
//             newPath = true;
//           }
//         } else {
//           newMaze[neighbor.y][neighbor.x].astar.g = tempG;
//           newPath = true;
//           astarOpenSet.push(neighbor);
//         }

//         if (newPath) {
//           let tempH = heuristic(neighbor, getEnd(newMaze) as Coord);
//           console.log("HEURISTIC", tempH);
//           newMaze[neighbor.y][neighbor.x].astar.h = tempH;
//           newMaze[neighbor.y][neighbor.x].astar.f =
//             newMaze[neighbor.y][neighbor.x].astar.g + tempH;
//           newMaze[neighbor.y][neighbor.x].parent = neighbor;
//         }
//       }
//     });
//   }

//   return {
//     ...maze,
//     astarOpenSet,
//     astarClosedSet,
//     mazeInfo: newMaze,
//   } as Maze;
// };

export const mazeReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case CLEAR_GRID:
      return {
        ...state,
        mazeInfo: generateMaze(
          Object.keys(state.mazeInfo).length,
          state.mazeInfo[0].length,
          true
        ),
      };
    case CHANGE_START:
      return {
        ...state,
        mazeInfo: changeSpaceType(state, payload, SpaceTypes.start),
      };
    case CHANGE_END:
      return {
        ...state,
        mazeInfo: changeSpaceType(state, payload, SpaceTypes.end),
      };
    case MAKE_WALL:
      return {
        ...state,
        mazeInfo: changeSpaceType(state, payload, SpaceTypes.wall),
      };
    case MAKE_EMPTY:
      return {
        ...state,
        mazeInfo: changeSpaceType(state, payload, SpaceTypes.empty),
      };
    case MAKE_VISITED:
      return {
        ...state,
        mazeInfo: makeVisited(payload, state),
      };
    case LOAD_MAZE:
      return payload;
    case STOP_VISUALIZATION:
      return {
        ...state,
        mazeInfo: Object.keys(state.mazeInfo).map(
          (value: string, i: number) => {
            return state.mazeInfo[+value].map(
              (value: Space, j: number): Space => {
                return {
                  type:
                    value.type === SpaceTypes.start ||
                    value.type === SpaceTypes.end
                      ? value.type
                      : SpaceTypes.empty,
                  path: false,
                  visited: false,
                  parent:
                    value.type === SpaceTypes.start ? { x: i, y: j } : null,
                  f: 0,
                  g: 0,
                  h: 0,
                } as Space;
              }
            );
          }
        ) as MazeInfo,
      };
    case PROGRESS_BFS:
      return {
        ...state,
        mazeInfo: updateSpaceProp(
          payload.coord,
          state.mazeInfo,
          payload.neighbors
        ),
        bfsQueue: payload.queue,
      };
    case PROGRESS_ASTAR:
      // let updatedMaze = updateAstar(payload.coord, state, payload.neighbors);
      let newMazeInfo = payload.newMazeInfo;
      let openSet = payload.openSet;
      let closedSet = payload.closedSet;
      // console.log(includesCoord(payload.openSet, payload.end));

      if (includesCoord(payload.openSet, payload.end)) {
        console.log("HERE");
        closedSet.push(payload.end);
        // _.once(() => showShortestPath(payload.end, newMazeInfo));
        showShortestPath(payload.end, newMazeInfo);
        openSet = [];
      }

      payload.closedSet.forEach((coord: Coord) => {
        newMazeInfo[coord.y][coord.x].visited = true;
      });

      return {
        ...state,
        mazeInfo: newMazeInfo,
        astarOpenSet: openSet,
        astarClosedSet: payload.closedSet,
      };
    default:
      return state;
  }
};

const includesCoord = (arr: Coord[], coord: Coord) => {
  let containsElem = false;

  arr.forEach((elem) => {
    if (_.isEqual(elem, coord)) {
      containsElem = true;
    }
  });

  return containsElem;
};

const getStart = (mazeInfo: MazeInfo) => {
  const mazeSize = getMazeSize(mazeInfo);

  for (let y = 0; y < mazeSize.y; y++) {
    for (let x = 0; x < mazeSize.x; x++) {
      if (mazeInfo[y][x].type === SpaceTypes.start) {
        return { x, y };
      }
    }
  }
  return null;
};

const getEnd = (mazeInfo: MazeInfo) => {
  const mazeSize = getMazeSize(mazeInfo);

  for (let y = 0; y < mazeSize.y; y++) {
    for (let x = 0; x < mazeSize.x; x++) {
      if (mazeInfo[y][x].type === SpaceTypes.end) {
        return { x, y };
      }
    }
  }
  return null;
};

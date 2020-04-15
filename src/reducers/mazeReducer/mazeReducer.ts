import _ from "lodash";
import { SpaceTypes } from "../../components/Space/types";
import { initialState, generateMaze } from "../../models/maze/initialState";
import { Maze, MazeInfo, Coord, Space } from "../../models/maze/index";
import { includesCoord } from "../../components/Maze/algorithms/";
import { getCoord } from "../../components/Maze/algorithms/";
import {
  CLEAR_GRID,
  STOP_VISUALIZATION,
  RANDOMIZE_WALLS,
  UPDATE_GRID_SIZE,
  LOAD_MAZE,
} from "../../actions/menuActions/menuActions";
import {
  CHANGE_START,
  CHANGE_END,
  MAKE_WALL,
  MAKE_EMPTY,
  PROGRESS_BFS,
  PROGRESS_DFS,
  PROGRESS_ASTAR,
} from "../../actions/mazeActions/mazeActions";

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

const showShortestPath = (endPoint: Coord, mazeInfo: MazeInfo) => {
  let curr = endPoint;

  // Backtracks from the end point to the start point using the parents we set
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

const updateSpaceProps = (
  coord: Coord,
  mazeInfo: MazeInfo,
  neighbors: Coord[] | Coord | null
) => {
  let newMaze = mazeInfo;

  // Sets the current space to visited
  newMaze[coord.y][coord.x].visited = true;

  if (neighbors) {
    // If neighbors is an array we keep going with BFS/DFS
    // Else if neighbors is a single object we've found the end and can show the path
    if (Array.isArray(neighbors)) {
      // Sets the parent of each neighbor
      neighbors.forEach((neighbor) => {
        newMaze[neighbor.y][neighbor.x].parent = coord;
      });
    } else {
      const endPoint = neighbors;

      newMaze[endPoint.y][endPoint.x].parent = coord;

      showShortestPath(endPoint, newMaze);
    }
  }

  return newMaze;
};

const randomizeWalls = (mazeInfo: MazeInfo) => {
  let newMaze: MazeInfo = mazeInfo;

  newMaze = Object.keys(newMaze).map((key: string) => {
    return newMaze[+key].map((space: Space) => {
      if (space.type === SpaceTypes.start || space.type === SpaceTypes.end) {
        return space;
      }
      return {
        ...space,
        type: Math.random() < 0.3 ? SpaceTypes.wall : SpaceTypes.empty,
      } as Space;
    });
  });

  return newMaze;
};

export const mazeReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case CLEAR_GRID:
      return {
        ...state,
        astarOpenSet: [],
        astarClosedSet: [],
        bfsQueue: [],
        mazeInfo: generateMaze(
          Object.keys(state.mazeInfo).length,
          state.mazeInfo[0].length,
          true
        ),
      };
    case UPDATE_GRID_SIZE:
      return {
        ...state,
        mazeInfo: generateMaze(payload.rows, payload.cols, true),
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
    case RANDOMIZE_WALLS:
      return {
        ...state,
        mazeInfo: randomizeWalls(state.mazeInfo),
      };
    case LOAD_MAZE:
      return {
        ...state,
        mazeInfo: payload.mazeInfo,
      };
    case STOP_VISUALIZATION:
      return {
        ...state,
        astarOpenSet: [],
        astarClosedSet: [],
        bfsQueue: [],
        mazeInfo: Object.keys(state.mazeInfo).map(
          (value: string, i: number) => {
            return state.mazeInfo[+value].map(
              (value: Space, j: number): Space => {
                return {
                  type:
                    value.type === SpaceTypes.start ||
                    value.type === SpaceTypes.end ||
                    value.type === SpaceTypes.wall
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
        mazeInfo: updateSpaceProps(
          payload.coord,
          state.mazeInfo,
          payload.neighbors
        ),
        bfsQueue: payload.queue,
      };
    case PROGRESS_DFS:
      return {
        ...state,
        mazeInfo: updateSpaceProps(
          payload.coord,
          state.mazeInfo,
          payload.neighbors
        ),
        dfsStack: payload.stack,
      };
    case PROGRESS_ASTAR:
      let newMazeInfo = payload.newMazeInfo;
      let openSet = payload.openSet;
      let closedSet = payload.closedSet;

      // Checks if the endpoint is in the open set
      if (includesCoord(payload.openSet, payload.end)) {
        closedSet.push(payload.end);
        showShortestPath(payload.end, newMazeInfo);
        openSet = [];
      }

      // Sets all the coordinates in the closed set to visited
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

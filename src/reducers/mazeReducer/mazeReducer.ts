import _ from "lodash";
import { SpaceTypes } from "../../components/Space/types";
import { initialState, generateMaze } from "../../models/maze/initialState";
import { Maze, MazeInfo, Coord, Space } from "../../models/maze/index";
import { CLEAR_GRID } from "../../actions/menuActions/menuActions";
import {
  CHANGE_START,
  CHANGE_END,
  MAKE_WALL,
  MAKE_EMPTY,
  LOAD_MAZE,
  SET_PATH,
  SET_VISITED,
  STOP_VISUALIZATION,
  UPDATE_BFS_QUEUE,
  PROGRESS_BFS,
} from "../../actions/mazeActions/mazeActions";

enum SpaceProps {
  path = "path",
  visited = "visited",
}

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
  if (spaceType === SpaceTypes.start || spaceType === SpaceTypes.end) {
    const oldCoord = getCoord(mazeInfo, spaceType);

    if (oldCoord) {
      newMaze[oldCoord.y][oldCoord.x].type = SpaceTypes.empty;
    }
  }

  newMaze[coord.y][coord.x].type = spaceType;

  return newMaze;
};

const showShortestPath = (endPoint: Coord, mazeInfo: MazeInfo) => {
  let curr = endPoint;

  while (
    !_.isEqual(mazeInfo[curr.y][curr.x].parent, { x: curr.x, y: curr.y })
  ) {
    // console.log(mazeInfo[curr.y][curr.x].parent === { x: 0, y: 0 });

    const currSpace = mazeInfo[curr.y][curr.x];
    // console.log(currSpace);

    currSpace.path = true;
    if (currSpace.parent) {
      curr = currSpace.parent;
    }
  }
  return mazeInfo;
};

const updateSpaceProp = (
  coord: Coord,
  mazeInfo: MazeInfo,
  prop: SpaceProps,
  neighbors: Coord[] | Coord | null
) => {
  let newMaze = mazeInfo;

  newMaze[coord.y][coord.x][prop] = !mazeInfo[coord.y][coord.x][prop];

  // Adds the parent coordinate to all the neighbors found in this iteration
  if (neighbors) {
    if (Array.isArray(neighbors)) {
      neighbors.forEach((neighbor) => {
        newMaze[neighbor.y][neighbor.x].parent = coord;
      });
    } else {
      newMaze[neighbors.y][neighbors.x].parent = coord;

      // Show the path
      newMaze = showShortestPath(neighbors, newMaze);
    }
  }

  return newMaze;
};

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
    case LOAD_MAZE:
      console.log(payload);
      return payload;
    case SET_PATH:
      return {
        ...state,
        mazeInfo: updateSpaceProp(
          payload,
          state.mazeInfo,
          SpaceProps.path,
          null
        ),
      };
    case SET_VISITED:
      return {
        ...state,
        mazeInfo: updateSpaceProp(
          payload,
          state.mazeInfo,
          SpaceProps.visited,
          null
        ),
      };
    case STOP_VISUALIZATION:
      return {
        ...state,
        mazeInfo: Object.keys(state.mazeInfo).map((value: string) => {
          return state.mazeInfo[+value].map(
            (value: Space): Space => {
              return {
                ...value,
                path: false,
              } as Space;
            }
          );
        }) as MazeInfo,
      };
    case UPDATE_BFS_QUEUE:
      return {
        ...state,
        bfsQueue: payload,
      };
    case PROGRESS_BFS:
      return {
        ...state,
        mazeInfo: updateSpaceProp(
          payload.coord,
          state.mazeInfo,
          SpaceProps.visited,
          payload.neighbors
        ),
        bfsQueue: payload.queue,
      };
    default:
      return state;
  }
};

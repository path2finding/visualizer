import { mazeReducer } from "./mazeReducer";
import { initialState, generateMaze } from "../../models/maze/initialState";
import {
  CLEAR_GRID,
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
import { Maze, Coord } from "../../models/maze";
import { SpaceTypes } from "../../components/Space/types";
import { getCoord } from "../../components/Maze/algorithms";
import { heuristic } from "../../components/Maze/algorithms/A*";

describe("Maze Reducer Tests", () => {
  it("Clear Grid Expected State", () => {
    const action = {
      type: CLEAR_GRID,
      payload: null,
    };

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: initialState.clearMaze,
    };

    expect(updatedState).toEqual(expectedState);
  });

  it("Moves the Start Point", () => {
    const newCoord = { x: 0, y: 0 };

    const action = {
      type: CHANGE_START,
      payload: newCoord,
    };

    let newMaze = initialState.mazeInfo;
    newMaze[newCoord.y][newCoord.x].type = SpaceTypes.start;

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: newMaze,
    };

    expect(updatedState).toEqual(expectedState);
  });

  it("Moves the End Point", () => {
    const newCoord = { x: 0, y: 0 };

    const action = {
      type: CHANGE_END,
      payload: newCoord,
    };

    let newMaze = initialState.mazeInfo;
    newMaze[newCoord.y][newCoord.x].type = SpaceTypes.end;

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: newMaze,
    };

    expect(updatedState).toEqual(expectedState);
  });

  it("Changes a Wall to an Empty Space", () => {
    // NOTE: Dependent on this space being a WALL
    const newCoord = { x: 0, y: 0 };

    const action = {
      type: MAKE_EMPTY,
      payload: newCoord,
    };

    let newMaze = initialState.mazeInfo;
    newMaze[newCoord.y][newCoord.x].type = SpaceTypes.empty;

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: newMaze,
    };

    expect(updatedState).toEqual(expectedState);
  });

  it("Changes a Empty Space to an Wall", () => {
    // NOTE: Dependent on this space being a EMPTY space
    const newCoord = { x: 1, y: 0 };

    const action = {
      type: MAKE_WALL,
      payload: newCoord,
    };

    let newMaze = initialState.mazeInfo;
    newMaze[newCoord.y][newCoord.x].type = SpaceTypes.wall;

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: newMaze,
    };

    expect(updatedState).toEqual(expectedState);
  });

  it("Updates MazeInfo and bfsQueue", () => {
    const queue: Coord[] = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ];
    const currCoord: Coord = { x: 0, y: 0 };
    const neighbors: Coord[] = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ];

    const action = {
      type: PROGRESS_BFS,
      payload: {
        queue: queue,
        coord: currCoord,
        neighbors: neighbors,
      },
    };

    let newMaze = initialState.mazeInfo;
    // Sets current position to visited
    newMaze[currCoord.y][currCoord.x].visited = true;
    // Sets the parent of all the neighbors
    neighbors.forEach((neighbor) => {
      newMaze[neighbor.y][neighbor.x].parent = currCoord;
    });

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: newMaze,
      bfsQueue: queue,
    };
    expect(updatedState).toEqual(expectedState);
  });

  it("Updates MazeInfo and dfsStack", () => {
    const stack: Coord[] = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ];
    const currCoord: Coord = { x: 0, y: 0 };
    const neighbors: Coord[] = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ];

    const action = {
      type: PROGRESS_DFS,
      payload: {
        stack: stack,
        coord: currCoord,
        neighbors: neighbors,
      },
    };

    let newMaze = initialState.mazeInfo;
    // Sets current position to visited
    newMaze[currCoord.y][currCoord.x].visited = true;
    // Sets the parent of all the neighbors
    neighbors.forEach((neighbor) => {
      newMaze[neighbor.y][neighbor.x].parent = currCoord;
    });

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: newMaze,
      dfsStack: stack,
    };
    expect(updatedState).toEqual(expectedState);
  });

  it("Updates MazeInfo and openSet and closedSet", () => {
    const currentSpace = { x: 0, y: 0 };
    const openSet: Coord[] = [];
    const closedSet: Coord[] = [currentSpace];
    let newMazeInfo = initialState.mazeInfo;
    const end = getCoord(initialState.mazeInfo, SpaceTypes.end);

    // Update the G value of all the neighbors of the current space
    const neighbors = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ];
    neighbors.forEach((neighbor) => {
      const tempG =
        initialState.mazeInfo[currentSpace.y][currentSpace.x].g +
        heuristic(neighbor, currentSpace);
      newMazeInfo[neighbor.y][neighbor.x].g = tempG;
    });

    const action = {
      type: PROGRESS_ASTAR,
      payload: {
        openSet: openSet,
        closedSet: closedSet,
        newMazeInfo: newMazeInfo,
        end: end,
      },
    };

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: newMazeInfo,
      astarOpenSet: openSet,
      astarClosedSet: closedSet,
    };
    expect(updatedState).toEqual(expectedState);
  });

  // TODO: stopVis

  // TODO: randomizeWalls

  it("Changes the size of the gird", () => {
    const newHeight = 30;
    const newWidth = 30;

    const action = {
      type: UPDATE_GRID_SIZE,
      payload: {
        cols: newWidth,
        rows: newHeight,
      },
    };

    let newMaze = generateMaze(newWidth, newHeight, true);

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: newMaze,
    };

    expect(updatedState).toEqual(expectedState);
  });

  it("Loads a maze", () => {
    const loadedMaze = generateMaze(30, 30, true);

    const action = {
      type: LOAD_MAZE,
      payload: {
        mazeInfo: loadedMaze,
      },
    };

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: loadedMaze,
    };

    expect(updatedState).toEqual(expectedState);
  });
});

import { mazeReducer } from "./mazeReducer";
import { initialState } from "../../models/maze/initialState";
import { CLEAR_GRID } from "../../actions/menuActions/menuActions";
import {
  CHANGE_START,
  CHANGE_END,
  MAKE_WALL,
  MAKE_EMPTY,
  SET_PATH,
  SET_VISITED,
} from "../../actions/mazeActions/mazeActions";
import { Maze } from "../../models/maze";
import { SpaceTypes } from "../../components/Space/types";

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

  it("Changes a space's property 'path' to true", () => {
    const coord = { x: 2, y: 2 };

    const action = {
      type: SET_PATH,
      payload: coord,
    };

    let newMaze = initialState.mazeInfo;
    newMaze[coord.y][coord.x].path = true;

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: newMaze,
    };

    expect(updatedState).toEqual(expectedState);
  });

  it("Changes a space's property 'visited' to true", () => {
    const coord = { x: 2, y: 2 };

    const action = {
      type: SET_VISITED,
      payload: coord,
    };

    let newMaze = initialState.mazeInfo;
    newMaze[coord.y][coord.x].visited = true;

    const updatedState = mazeReducer(initialState, action);
    const expectedState: Maze = {
      ...initialState,
      mazeInfo: newMaze,
    };

    expect(updatedState).toEqual(expectedState);
  });
});

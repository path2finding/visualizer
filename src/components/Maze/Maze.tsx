import React, { useEffect } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import _ from "lodash";

// Components
import Space from "../../components/Space/Space";

// Interfaces
import { Maze as IMaze, MazeInfo } from "../../models/maze/index";
import { Coord } from "../../models/maze";

import "./Maze.scss";
import { Vector3 } from "three";
import { SpaceTypes } from "../Space/types";

// Helper functions
const getMazeSize = (mazeInfo: MazeInfo) => {
  return {
    x: mazeInfo[0].length,
    y: Object.keys(mazeInfo).length,
  };
};

const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 2;
    controls.maxDistance = 30;
    controls.keyPanSpeed = 20;

    controls.maxAzimuthAngle = 0;
    controls.minAzimuthAngle = 0;
    controls.maxPolarAngle = 0;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

const populateMaze = (props: Props, openSet: Coord[], closedSet: Coord[]) => {
  const {
    canMoveStart,
    canMoveEnd,
    handleChangeStart,
    handleChangeEnd,
    makeWall,
    makeEmpty,
  } = props;
  const { mazeInfo } = props.maze;
  const mazeSize = getMazeSize(mazeInfo);
  let list = [];
  let key = 0;

  for (let y = 0; y < mazeSize.y; y++) {
    for (let x = 0; x < mazeSize.x; x++) {
      key++;
      list.push(
        <Space
          type={mazeInfo[y][x].type}
          visited={mazeInfo[y][x].visited}
          path={mazeInfo[y][x].path}
          position={[x, 0, y]}
          inOpenSet={includesCoord(openSet, { x, y } as Coord)}
          inClosedSet={includesCoord(closedSet, { x, y } as Coord)}
          key={key}
          canMoveStart={canMoveStart}
          canMoveEnd={canMoveEnd}
          onChangeStart={() => handleChangeStart({ x, y })}
          onChangeEnd={() => handleChangeEnd({ x, y })}
          onSetWall={() => makeWall({ x, y })}
          onSetEmpty={() => makeEmpty({ x, y })}
        />
      );
    }
  }

  return list;
};

const getStart = (mazeInfo: MazeInfo): Coord | null => {
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

const getEnd = (mazeInfo: MazeInfo): Coord | null => {
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

function removeFromArr<T>(arr: T[], ele: T) {
  return arr.filter((n: T) => n !== ele);
}

const getLowestFScore = (openSet: Coord[], mazeInfo: MazeInfo): Coord => {
  let lowest = openSet[0];

  openSet.forEach((coord) => {
    if (mazeInfo[coord.y][coord.x].f < mazeInfo[lowest.y][lowest.x].f) {
      lowest = coord;
    }
  });

  return lowest;
};

const heuristic = (a: Coord, b: Coord): number => {
  // Manhattan distance formula
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  // Diagonal Distance Formula
  // return Math.sqrt(Math.pow(a.x - b.y, 2) + Math.pow(a.y - b.y, 2));
};

const heuristic_djikstras = (a: Coord, b: Coord): number => {
  // Manhattan distance formula
  return 0;

  // Diagonal Distance Formula
  // return Math.sqrt(Math.pow(a.x - b.y, 2) + Math.pow(a.y - b.y, 2));
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

interface Props {
  maze: IMaze;
  canMoveStart: boolean;
  canMoveEnd: boolean;
  isPlaying: boolean;
  selectedAlgo:
    | string
    | number
    | boolean
    | (string | number | boolean)[]
    | undefined;
  currentSpeed: number;
  handleChangeStart: (newPos: Coord) => void;
  handleChangeEnd: (newPos: Coord) => void;
  makeWall: (coord: Coord) => void;
  makeEmpty: (coord: Coord) => void;

  makeVisited: (coord: Coord) => void;

  progressBFS: (
    queue: Coord[],
    coord: Coord,
    neighbors: Coord[] | Coord
  ) => void;

  progressDFS: (
    stack: Coord[],
    coord: Coord,
    neighbors: Coord[] | Coord
  ) => void;

  progressAstar: (
    openSet: Coord[],
    closedSet: Coord[],
    newMazeInfo: MazeInfo,
    end: Coord
  ) => void;

  handlePauseVisualization: () => void;
  // handleUpdateOpenSet: (openSet: Coord[]) => void;
  // handleUpdateClosedSet: (closedSet: Coord[]) => void;
}

const Maze: React.FC<Props> = (props) => {
  const {
    isPlaying,
    selectedAlgo,
    currentSpeed,
    progressBFS,
    progressDFS,
    progressAstar,
    handlePauseVisualization,
    // handleUpdateOpenSet,
    // handleUpdateClosedSet,
  } = props;
  const { mazeInfo, bfsQueue, astarOpenSet, astarClosedSet, dfsStack } = props.maze;

  // console.log(selectedAlgo);
  if (selectedAlgo === "BFS") {
    let queue = bfsQueue;
    // This gets run once at the start
    if (isPlaying && queue.length === 0) {
      console.log("Init BFS");
      const start = getStart(mazeInfo);

      if (start) {
        queue.push(start);
      }
    }

    setTimeout(function () {
      if (queue.length > 0 && isPlaying) {
        console.log("Going through BFS", queue);

        // Removes any queued spaces that were previously visited
        while (mazeInfo[queue[0].y][queue[0].x].visited) {
          queue.shift();

          // If we end up removing the last space we end BFS
          if (queue.length === 0) {
            handlePauseVisualization();
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
          handlePauseVisualization();
          progressBFS([], curr, currNeighbors);
        }
      }
    }, 100 / currentSpeed);
  } 
  else if (selectedAlgo === "DFS") {
    let stack = dfsStack;
    // This gets run once at the start
    if (isPlaying && stack.length === 0) {
      console.log("Init DFS");
      const start = getStart(mazeInfo);

      if (start) {
        stack.push(start);
      }
    }

    setTimeout(function () {
      // peek the last index in the stack
      var curr = stack[stack.length-1];
      // if the stack is not empty
      if (curr && isPlaying) {

        // get neighbors
        const currNeighbors = getValidNeighbors(curr, mazeInfo);

        // If currNeighbors is an array then we keep going.
        // If it's a single object then we've found our end
        if (Array.isArray(currNeighbors)) {
          // if a cell has neighbors, push them to the stack
          if(currNeighbors.length > 0){
            currNeighbors.forEach(n => {
              stack.push(n);
            })
          }
          // if no neighbors, pop to backtrack to other cells
          else{
            var tempcurr = stack.pop();
            if(tempcurr) curr = tempcurr;
          }
          progressDFS(stack, curr, currNeighbors);
        } else {
          handlePauseVisualization();
          progressDFS([], curr, currNeighbors);
        }
      }
    }, 100 / currentSpeed);
  }
  else if (selectedAlgo === "A*") {
    let openSet = astarOpenSet;
    let closedSet = astarClosedSet;

    // Run at the beginning
    if (isPlaying && openSet.length === 0) {
      console.log("Init Astar");
      const start = getStart(mazeInfo);

      if (start) {
        openSet.push(start);
      }
    }

    setTimeout(function () {
      if (isPlaying && openSet.length > 0) {
        console.log("Running Astar");
        let newMazeInfo = mazeInfo;
        let current = getLowestFScore(openSet, mazeInfo);
        const end = getEnd(mazeInfo) as Coord;

        // Check if finished
        if (includesCoord(closedSet, end)) {
          // Find the Path
          console.log("DONE");
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
              console.log("Setting parent of ", neighbor, current);
              neighborSpace.parent = current;
            }
          });

          progressAstar(openSet, closedSet, newMazeInfo, end);
        }
      } else {
        console.log("NO SOLUTION");
        handlePauseVisualization();
        return;
      }
    }, 100 / currentSpeed);
    }
    else if (selectedAlgo === "Djikstras") {
      let openSet = astarOpenSet;
      let closedSet = astarClosedSet;
  
      // Run at the beginning
      if (isPlaying && openSet.length === 0) {
        console.log("Init Astar");
        const start = getStart(mazeInfo);
  
        if (start) {
          openSet.push(start);
        }
      }
  
      setTimeout(function () {
        if (isPlaying && openSet.length > 0) {
          console.log("Running Astar");
          let newMazeInfo = mazeInfo;
          let current = getLowestFScore(openSet, mazeInfo);
          const end = getEnd(mazeInfo) as Coord;
  
          // Check if finished
          if (includesCoord(closedSet, end)) {
            // Find the Path
            console.log("DONE");
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
                  mazeInfo[current.y][current.x].g + heuristic_djikstras(neighbor, current);
  
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
                  neighborSpace.h = heuristic_djikstras(neighbor, end);
                }
                neighborSpace.f = neighborSpace.g + neighborSpace.h;
                console.log("Setting parent of ", neighbor, current);
                neighborSpace.parent = current;
              }
            });
  
            progressAstar(openSet, closedSet, newMazeInfo, end);
          }
        } else {
          console.log("NO SOLUTION");
          handlePauseVisualization();
          return;
        }
      }, 100 / currentSpeed);
  }

  return (
    <Canvas
      className="Maze"
      //uncomment for isomentric mode ;)
      // orthographic
      // camera={{
      //   position: new Vector3(0, 0, 0),
      //   left: 100,
      //   right: 100,
      //   bottom: 100,
      //   top: 10
      // }}
      camera={{
        position: new Vector3(0, 10, 0),
      }}
    >
      <CameraController />
      <ambientLight />

      {/* background grid */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.5, -0.5, 0.5]}>
        <planeBufferGeometry attach="geometry" args={[100, 100, 100, 100]} />
        <meshPhongMaterial attach="material" wireframe={true} color={"grey"} />
      </mesh>
      {populateMaze(props, props.maze.astarOpenSet, props.maze.astarClosedSet)}
    </Canvas>
  );
};

export default Maze;

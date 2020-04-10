import React, { useEffect } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Components
import Space from "../../components/Space/Space";

// Interfaces
import { Maze as IMaze, MazeInfo, IAStar } from "../../models/maze/index";
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

const populateMaze = (props: Props) => {
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

const heuristic = (a: Coord, b: Coord): number => {
  // Manhattan distance formula
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
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
  ];

  neighbors.forEach((neighbor) => {
    if (inMazeBoundaries(neighbor, mazeSize)) {
      const neighborSpace = mazeInfo[neighbor.y][neighbor.x];

      if (neighborSpace.type === SpaceTypes.empty && !neighborSpace.visited) {
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

function removeFromArr<T>(arr: T[], ele: T) {
  return arr.filter((n: T) => n !== ele);
}

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
  progressAstar: (astar: IAStar, coord: Coord, parent?: Coord) => void;
  handlePauseVisualization: () => void;
  handleUpdateOpenSet: (openSet: Coord[]) => void;
  handleUpdateClosedSet: (closedSet: Coord[]) => void;
}

const Maze: React.FC<Props> = (props) => {
  const {
    isPlaying,
    selectedAlgo,
    makeVisited,
    progressBFS,
    progressAstar,
    handlePauseVisualization,
    handleUpdateOpenSet,
    handleUpdateClosedSet,
  } = props;
  const { mazeInfo, bfsQueue, astarOpenSet, astarClosedSet } = props.maze;

  // console.log(selectedAlgo);
  if (selectedAlgo === "BFS") {
    let queue = bfsQueue;
    // This gets run once at the start
    if (isPlaying && queue.length === 0) {
      console.log("Init BFS");
      const start = getStart(mazeInfo);
      console.log("Start BFS");
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
    }, 100);
  } else if (selectedAlgo === "A*") {
    let openSet = astarOpenSet;
    let closedSet = astarClosedSet;
    let start: Coord | null;
    let end: Coord | null;
    // This gets run once at the start
    if (isPlaying && openSet.length === 0) {
      start = getStart(mazeInfo);
      end = getEnd(mazeInfo);
      if (start && end) {
        openSet.push(start);
      }
    }
    if (isPlaying) {
      setTimeout(function () {
        if (openSet.length > 0 && start && end) {
          let winner = 0;
          for (let i = 0; i < openSet.length; i++) {
            let coord: Coord = openSet[i];
            console.log(coord);
            makeVisited(coord);
            // Check if current space has lower fScore than current winning index
            if (
              mazeInfo[coord.y][coord.x].astar.f <
              mazeInfo[openSet[winner].y][openSet[winner].x].astar.f
            ) {
              winner = i;
            }
          }

          let current = openSet[winner];
          console.log("CURRENT", current);
          if (mazeInfo[current.y][current.x].type === SpaceTypes.end) {
            console.log("Done");
            handlePauseVisualization();
          }

          openSet = removeFromArr<Coord>(openSet, current);
          closedSet.push(current);
          handleUpdateOpenSet(openSet);
          handleUpdateClosedSet(closedSet);

          let neighbors = getValidNeighbors(current, mazeInfo);
          if (!Array.isArray(neighbors)) neighbors = [neighbors];

          for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            console.log("Current Neighbor", neighbor);

            // Verify neighbor hasn't been checked
            if (!closedSet.includes(neighbor)) {
              let tempG = mazeInfo[current.y][current.x].astar.g + 1;
              console.log("TempG", tempG);

              let newPath = false;
              if (openSet.includes(neighbor)) {
                console.log("OpenSet includes", neighbor);
                if (tempG < mazeInfo[neighbor.y][neighbor.x].astar.g) {
                  // set neighbors new gScore to tempG
                  console.log("better g score than neighbor");
                  progressAstar(
                    {
                      ...mazeInfo[neighbor.y][neighbor.x].astar,
                      g: tempG,
                    },
                    neighbor
                  );
                  newPath = true;
                  console.log("newpath is true");
                }
              } else {
                // set neighbors new gScore to tempG
                console.log("setting neighbors score to tempG");
                progressAstar(
                  {
                    ...mazeInfo[neighbor.y][neighbor.x].astar,
                    g: tempG,
                  },
                  neighbor
                );
                newPath = true;
                openSet.push(neighbor);
                handleUpdateOpenSet(openSet);
                console.log("After setting g", openSet);
              }

              if (newPath) {
                let h = heuristic(neighbor, end);
                progressAstar(
                  {
                    ...mazeInfo[neighbor.y][neighbor.x].astar,
                    h,
                    f: mazeInfo[neighbor.y][neighbor.x].astar.g + h,
                  },
                  neighbor,
                  current
                );
              }
            }
          }
        } else {
          console.log("NO SOLUTION");
          handlePauseVisualization();
        }
      }, 1000);
    }
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
      {populateMaze(props)}
    </Canvas>
  );
};

export default Maze;

import React, { useEffect } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Vector3 } from "three";

// Components
import Space from "../../components/Space/Space";

// Algorithms
import {
  runBFS,
  runDFS,
  runAstar,
  runDjikstras,
  includesCoord,
} from "./algorithms/";

// Interfaces
import { Maze as IMaze, MazeInfo, Coord } from "../../models/maze/index";

import "./Maze.scss";

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

export const getMazeSize = (mazeInfo: MazeInfo) => {
  return {
    x: mazeInfo[0].length,
    y: Object.keys(mazeInfo).length,
  };
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
          position={{ x: x - mazeSize.x / 2, z: 0, y: y - mazeSize.y / 2 }}
          inOpenSet={includesCoord(openSet, { x, y })}
          inClosedSet={includesCoord(closedSet, { x, y })}
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

interface Props {
  maze: IMaze;
  canMoveStart: boolean;
  canMoveEnd: boolean;
  isPlaying: boolean;
  selectedAlgo: string;
  currentSpeed: number;
  handleChangeStart: (newPos: Coord) => void;
  handleChangeEnd: (newPos: Coord) => void;
  handlePauseVisualization: () => void;
  makeWall: (coord: Coord) => void;
  makeEmpty: (coord: Coord) => void;
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
  } = props;
  const {
    mazeInfo,
    bfsQueue,
    astarOpenSet,
    astarClosedSet,
    dfsStack,
  } = props.maze;

  // Props that all the algorithms have in common
  const baseAlgoProps = {
    mazeInfo,
    isPlaying,
    currentSpeed,
    handlePauseVisualization,
  };

  if (selectedAlgo === "BFS") {
    runBFS({ ...baseAlgoProps, bfsQueue, progressBFS });
  } else if (selectedAlgo === "DFS") {
    runDFS({ ...baseAlgoProps, dfsStack, progressDFS });
  } else if (selectedAlgo === "A*") {
    runAstar({ ...baseAlgoProps, astarOpenSet, astarClosedSet, progressAstar });
  } else if (selectedAlgo === "Djikstras") {
    runDjikstras({
      ...baseAlgoProps,
      astarOpenSet,
      astarClosedSet,
      progressAstar,
    });
  }

  return (
    <Canvas
      className="Maze"
      // Uncomment for isometric mode ;)
      // orthographic
      // camera={{
      //   position: new Vector3(0, 0, 0),
      //   left: 100,
      //   right: 100,
      //   bottom: 100,
      //   top: 10
      // }}
      camera={{
        position: new Vector3(0, getMazeSize(mazeInfo).x, 0),
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

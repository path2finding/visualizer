import React, { useEffect } from "react";
import { Canvas, useThree, useFrame } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Components
import Space from "../../components/Space/Space";

// Interfaces
import { Maze as IMaze, MazeInfo } from "../../models/maze/index";
import { Coord } from "../../models/maze";

import "./Maze.scss";
import { Vector3, MOUSE } from "three";

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

interface Props {
  maze: IMaze;
  canMoveStart: boolean;
  canMoveEnd: boolean;
  handleChangeStart: (newPos: Coord) => void;
  handleChangeEnd: (newPos: Coord) => void;
  makeWall: (coord: Coord) => void;
  makeEmpty: (coord: Coord) => void;
  setPath: (coord: Coord) => void;
  setVisited: (coord: Coord) => void;
}

const Maze: React.FC<Props> = (props) => {
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

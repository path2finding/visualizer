import React, { useEffect } from "react";
import { Canvas, useThree, useFrame } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Components
import Space from "../../components/Space/Space";

// Interfaces
import { Maze as IMaze, MazeInfo } from "../../models/maze/index";
import { Coord, Space as ISpace } from "../../models/maze";


import "./Maze.scss";
import { Vector3, MOUSE } from "three";
import { SpaceTypes } from "../Space/types";
import { Grid } from "semantic-ui-react";
import { start } from "repl";

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
          distanceFromStart={mazeInfo[y][x].distanceFromStart}
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

const getValidNeighbors = (coord: Coord, mazeInfo: MazeInfo) => {
  console.log("Get neighbors");
  const mazeSize = getMazeSize(mazeInfo);
  let validNeighbors: Coord[] = [];
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
    // console.log(mazeInfo);
    // console.log(neighbor);
    if (inMazeBoundaries(neighbor, mazeSize)) {
      const neighborSpace = mazeInfo[neighbor.y][neighbor.x];
      if (neighborSpace.type === SpaceTypes.empty && !neighborSpace.visited) {
        validNeighbors.push(neighbor);
      }
    }
  });

  return validNeighbors;
};

interface Props {
  maze: IMaze;
  canMoveStart: boolean;
  canMoveEnd: boolean;
  isPlaying: boolean;
  handleChangeStart: (newPos: Coord) => void;
  handleChangeEnd: (newPos: Coord) => void;
  makeWall: (coord: Coord) => void;
  makeEmpty: (coord: Coord) => void;
  setPath: (coord: Coord) => void;
  setVisited: (coord: Coord) => void;
  updateBFSQueue: (queue: Coord[]) => void;
  progressBFS: (queue: Coord[], coord: Coord) => void;
  progressDJIKSTRA: (queue : Coord[], coord: Coord) => void;
}

const Maze: React.FC<Props> = (props) => {
  const { isPlaying, progressBFS, progressDJIKSTRA } = props;
  const { mazeInfo, bfsQueue } = props.maze;

  //set distance to all non 'startpoint' spaces to Infinity
  
 let curr = null;
 let row = 0;
 let index = 0;
 let currRow = 0;
 let currIndex = 0;

  Object.keys(props.maze.mazeInfo).map((rowIndex: string) => {
    props.maze.mazeInfo[+rowIndex].map((space: ISpace) => {
       if(space.type == "startpoint"){
          space.distanceFromStart = 0 
          curr = space
          currRow = row
          currIndex = index
        }else{
          space.distanceFromStart = Infinity  
        }
        index++;
    });
    row++;
  });
  //START DJIKSTRAS
  setTimeout(function () {
    let djik = true;
    while(djik){
      let currCoord: Coord  = { x: currRow, y: currIndex }
      const currNeighbors = getValidNeighbors( currCoord  , mazeInfo)
      
    }
  }, 2000);

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

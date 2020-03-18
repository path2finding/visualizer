import React, { useEffect } from 'react';
import {Canvas, useThree} from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Components
import Space from '../Space/Space';

// Interfaces
import { MazeState } from '../../models/maze';
import { SpaceState } from '../../models/space';

import './Maze.scss';
import { makeWall, makeEmpty } from '../../actions/mazeActions';

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);
  
      controls.minDistance = 5;
      controls.maxDistance = 30;
      controls.keyPanSpeed = 10;

      //uncomment to limit orbit rotation
      // controls.maxAzimuthAngle = (Math.PI / 360) * angle;
      // controls.minAzimuthAngle = (Math.PI / 360) * -angle;

      controls.maxPolarAngle = (Math.PI / 360) * 180 ;
      
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

const populateMaze = (
  mazeSize: { x: number; y: number },
  mazeInfo: { [key: number]: SpaceState[] },
  makeWall: (data: {x: number; y: number}, type: string) => void,
  makeEmpty: (data: {x: number; y: number}, type: string) => void
) => {
  console.log(mazeInfo);
  let list = [];
  let key = 0;

  for (let j = 0; j < mazeSize.y; j++) {
    for (let i = 0; i < mazeSize.x; i++) {
      key++;
      console.log('visited: ' + mazeInfo[j][i].visited);
      list.push(
        <Space type={mazeInfo[j][i].type} visited={mazeInfo[j][i].visited} path={mazeInfo[i][j].path} position={[i, 0, j]} key={key} 
        onSetWall={() => makeWall( {x:i, y:j}, "empty" )}
        onSetEmpty={() => makeEmpty( {x:i, y:j}, "wall" )}
        />
      );
    }
  }

  return list;
};

interface Props extends MazeState {
  makeWall: any;
  makeEmpty: any;
}

const Maze: React.FC<Props> = props => {
  const { mazeInfo } = props;
  const mazeSize = {
    x: mazeInfo[0].length,
    y: Object.keys(mazeInfo).length
  };


  return (
    <Canvas
      className="Maze"
      //uncomment for isomentric mode ;)
      // orthographic 
      // camera = {{
      //   position: new Vector3(0,0,0),
      //   left: 100,
      //   right: 100,
      //   bottom: 100,
      //   top: 10
      // }}
    >
      <CameraController />
      <ambientLight />

      {/* background grid */}
      <mesh rotation={[(Math.PI/2),0,0]} position={[0.5,-0.5,0.5]}>
        <planeBufferGeometry attach="geometry" args={[100, 100, 100, 100]}/>
        <meshPhongMaterial attach="material" wireframe={true} color={'grey'}/>
      </mesh>
      {populateMaze(mazeSize, mazeInfo, props.makeWall, props.makeEmpty)}
    </Canvas>
  );
};

export default Maze;

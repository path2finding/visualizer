import React, { MutableRefObject, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { Mesh } from 'three';
import './Grid.scss';
import Space from '../Box/index';

const createGridSpaces = (
  props: Props,
  mesh: MutableRefObject<Mesh | undefined>,
  gridSize: { x: number; y: number }
) => {
  let list = [];
  let key = 0;

  for (let j = 0; j < gridSize.y; j++) {
    for (let i = 0; i < gridSize.x; i++) {
      key++;
      list.push(
        <Space type="wall" position={[i, j, 0]} key={key}/>
      );
    }
  }

  return list;
};

interface Props {
  gridSize: {
    x: number;
    y: number;
  };
}

const Grid: React.FC<Props> = props => {
  const { gridSize } = props;

  // This reference will give us direct access to the mesh
  const mesh: MutableRefObject<Mesh | undefined> = useRef();

  return (
    <Canvas
      className="Grid"
      camera={{ fov: 100, position: [gridSize.x / 2, gridSize.y / 2, 10] }}
    >
      <ambientLight />
      {/* <pointLight position={[10, 10, 10]} /> */}
      {createGridSpaces(props, mesh, gridSize)}
    </Canvas>
  );
};
export default Grid;

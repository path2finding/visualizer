import React from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';

interface Wall {
  type: string;
}

const Wall: React.FC<Wall> = props => {
  const texture = useLoader(
    THREE.TextureLoader,
    `${process.env.PUBLIC_URL}${props.type}.png`
  );

  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhongMaterial attach="material" map={texture} />
    </mesh>
  );
};

export default Wall;

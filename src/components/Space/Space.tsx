import * as THREE from 'three';
import React, { useRef, useState, MutableRefObject, Suspense } from 'react';
import { useLoader } from 'react-three-fiber';
import { Mesh } from 'three';

// Interfaces
import { SpaceState } from '../../models/space';

const GenericSpace: React.FC<BoxProps> = props => {
  console.log(props);
  const texture = useLoader(
    THREE.TextureLoader,
    `${process.env.PUBLIC_URL}${props.type}.png`
  );
  const mesh: MutableRefObject<Mesh | undefined> = useRef();

  if (props.type === 'empty') {
    return <mesh></mesh>;
  }

  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhongMaterial attach="material" map={texture} />
    </mesh>
  );
};

const Space: React.FC<BoxProps> = props => {
  const [hovered, setHover] = useState(false);

  const spaceClicked = () => {
    console.log('space clicked');
  };

  return (
    <mesh
      position={props.position}
      onClick={e => spaceClicked()}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <Suspense fallback="none">
        <GenericSpace type={props.type} />
      </Suspense>
    </mesh>
  );
};

export interface BoxProps {
  position?: number[];
  type?: string;
}

export default Space;

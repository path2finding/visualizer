import * as THREE from 'three';
import React, {
  useRef,
  useState,
  MutableRefObject,
  Suspense,
  useEffect
} from 'react';
import { useLoader, useFrame, stateContext } from 'react-three-fiber';
import { Mesh, Vector3 } from 'three';

const Wall: React.FC<BoxProps> = props => {
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

const Empty: React.FC<BoxProps> = props => {
  return (
    <mesh position={new Vector3(0, -0.5, 0)} rotation={[-(Math.PI / 2), 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 1, 1]} />
      <meshPhongMaterial
        attach="material"
        color={props.visited ? (props.path ? 'red' : 'yellow') : 'blue'}
      />
    </mesh>
  );
};

const GenericSpace: React.FC<BoxProps> = props => {
  const mesh: MutableRefObject<Mesh | undefined> = useRef();

  if (props.type === 'empty') {
    return <Empty visited={props.visited} path={props.path} />;
  } else {
    return (
      <Suspense fallback="none">
        <Wall type={props.type} />
      </Suspense>
    );
  }
};

const Space: React.FC<SpaceProps> = props => {
  const [hovered, setHover] = useState(false);

  const spaceClicked = () => {
    if (props.type === 'wall') {
      props.onSetEmpty();
    }
    if (props.type === 'empty') {
      props.onSetWall();
    }
  };

  return (
    <mesh
      position={props.position}
      onClick={e => spaceClicked()}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <GenericSpace
        type={props.type}
        visited={props.visited}
        path={props.path}
      />
      {hovered && (
        <mesh>
          <boxBufferGeometry
            attach="geometry"
            args={[1.0001, 1.0001, 1.0001]}
          />
          <meshPhongMaterial attach="material" wireframe={true} />
        </mesh>
      )}
    </mesh>
  );
};

export interface BoxProps {
  position?: number[];
  type?: string;
  visited?: Boolean;
  path?: Boolean;
}

export interface SpaceProps extends BoxProps {
  onSetWall: () => void;
  onSetEmpty: () => void;
}

export default Space;

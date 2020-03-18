import React, { useState } from 'react';
import GenericSpace from './GenericSpace';

import { SpaceTypes } from './types';

interface Props {
  type: SpaceTypes;
  position: number[];
  key: number;
  visited: Boolean;
  path: Boolean;
  onChangeStart: () => void;
}

const Space: React.FC<Props> = props => {
  const [hovered, setHover] = useState(false);

  return (
    <mesh
      position={props.position}
      onClick={e => props.onChangeStart()}
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

export default Space;

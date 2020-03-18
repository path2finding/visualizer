import React, { useRef, MutableRefObject, Suspense } from 'react';
import { useLoader } from 'react-three-fiber';
import { Mesh, TextureLoader } from 'three';

import { SpaceTypes } from '../../models/space/types';

interface GenericSpaceProps {
  type: string;
}

const GenericSpace: React.FC<GenericSpaceProps> = props => {
  const texture = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}${props.type}.png`
  );
  const mesh: MutableRefObject<Mesh | undefined> = useRef();

  if (props.type === SpaceTypes.empty) {
    return <mesh></mesh>;
  }

  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhongMaterial attach="material" map={texture} />
    </mesh>
  );
};

interface Props {
  type: SpaceTypes;
  position: number[];
  key: number;
  visited: Boolean;
  onChangeStart: () => void;
}

const Space: React.FC<Props> = props => {
  return (
    <mesh position={props.position} onClick={e => props.onChangeStart()}>
      <Suspense fallback="none">
        <GenericSpace type={props.type} />
      </Suspense>
    </mesh>
  );
};

export default Space;

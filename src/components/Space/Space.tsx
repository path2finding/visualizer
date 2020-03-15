import React, {
  useRef,
  useState,
  MutableRefObject,
  Suspense,
  useEffect
} from 'react';
import { useLoader } from 'react-three-fiber';
import { Mesh, TextureLoader } from 'three';

// Interfaces
import { SpaceState } from '../../models/space';
import { Coord } from '../../models/maze';

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

interface SpaceProps extends SpaceState {
  handleChangeStart: (newPos: Coord) => void;
}

const Space: React.FC<SpaceProps> = props => {
  // const [hovered, setHover] = useState(false);

  const spaceClicked = () => {
    console.log('Click', props.position);
  };

  return (
    <mesh position={props.position} onClick={e => spaceClicked()}>
      <Suspense fallback="none">
        <GenericSpace type={props.type} />
      </Suspense>
    </mesh>
  );
};

export default Space;

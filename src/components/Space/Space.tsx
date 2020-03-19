import React, { useState } from "react";
import GenericSpace from "./GenericSpace";

import { SpaceTypes } from "./types";

interface Props {
  type: SpaceTypes;
  position: number[];
  key: number;
  visited: Boolean;
  path: Boolean;
  onChangeStart: () => void;
  onSetWall: () => void;
  onSetEmpty: () => void;
}

const Space: React.FC<Props> = props => {
  const [hovered, setHover] = useState(false);

  const spaceClicked = () => {
    if (props.type === "wall") {
      props.onSetEmpty();
    }
    if (props.type === "empty") {
      props.onSetWall();
    }
  };

  // props.onChangeStart()

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

export default Space;

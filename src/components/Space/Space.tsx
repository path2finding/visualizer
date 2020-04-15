import React, { useState } from "react";
import GenericSpace from "./GenericSpace";

import { SpaceTypes } from "./types";

interface Props {
  type: SpaceTypes;
  position: { x: number; z: number; y: number };
  key: number;
  visited: Boolean;
  path: Boolean;
  canMoveStart: boolean;
  canMoveEnd: boolean;
  inOpenSet: boolean;
  inClosedSet: boolean;
  onChangeStart: () => void;
  onChangeEnd: () => void;
  onSetWall: () => void;
  onSetEmpty: () => void;
}

const Space: React.FC<Props> = (props) => {
  const [hovered, setHover] = useState(false);
  const {
    position,
    type,
    visited,
    path,
    inOpenSet,
    inClosedSet,
    onChangeStart,
    onChangeEnd,
    onSetEmpty,
    onSetWall,
    canMoveEnd,
    canMoveStart,
  } = props;

  const spaceClicked = () => {
    if (canMoveStart) {
      onChangeStart();
    } else if (canMoveEnd) {
      onChangeEnd();
    } else {
      if (type === SpaceTypes.wall) {
        onSetEmpty();
      }
      if (type === SpaceTypes.empty) {
        onSetWall();
      }
    }
  };

  return (
    <mesh
      position={[position.x, position.z, position.y]}
      onClick={(e) => spaceClicked()}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <GenericSpace
        type={type}
        visited={visited}
        path={path}
        inOpenSet={inOpenSet}
        inClosedSet={inClosedSet}
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

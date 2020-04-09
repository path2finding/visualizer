import React from "react";
import { Vector3 } from "three";

interface Empty {
  visited: Boolean;
  path: Boolean;
}

const Empty: React.FC<Empty> = (props) => {
  return (
    <mesh position={new Vector3(0, -0.5, 0)} rotation={[-(Math.PI / 2), 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 1, 1]} />
      <meshPhongMaterial
        attach="material"
        color={props.visited ? (props.path ? "red" : "yellow") : "blue"}
      />
    </mesh>
  );
};

export default Empty;

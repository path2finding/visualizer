import React from "react";
import { Vector3 } from "three";
import { useLoader, useFrame } from "react-three-fiber";
import * as THREE from "three";

interface Empty {
  visited: Boolean;
  path: Boolean;
}

const Empty: React.FC<Empty> = (props) => {
  const currentState = props.visited
    ? props.path
      ? "path"
      : "visted"
    : "empty";

  const texture = useLoader(
    THREE.TextureLoader,
    `${process.env.PUBLIC_URL}${currentState}.png`
  );
  if (currentState === "path") {
    texture.repeat.x = 1;
    texture.repeat.y = 1 / 16;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  }

  var frame = 0;
  var steps = 8;
  var speed = 10;
  useFrame(() => {
    if (currentState === "path") {
      frame++;
      if (frame % speed === 0) {
        texture.offset.y += 1 / steps;
        frame = 0;
      }
    }
  });

  return (
    <mesh position={new Vector3(0, -0.5, 0)} rotation={[-(Math.PI / 2), 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 1, 1]} />
      <meshPhongMaterial
        attach="material"
        map={texture}
        // color={props.visited ? (props.path ? 'red' : 'yellow') : 'blue'}
      />
    </mesh>
  );
};

export default Empty;

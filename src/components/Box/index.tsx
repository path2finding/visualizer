import React, { useRef, useState, MutableRefObject } from "react";
import { useFrame } from "react-three-fiber";
import { Mesh, DoubleSide } from "three";

export interface BoxProps {
  position?: number[];
  start?: boolean;
  end?: boolean;
  visited?: boolean;
}

const Box: React.FC<BoxProps> = props => {
  const { start, end, visited } = props;
  // This reference will give us direct access to the mesh
  const mesh: MutableRefObject<Mesh | undefined> = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {});

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[0.45, 0.45, 0.45]}
      onClick={e => {
        setActive(!active);
      }}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={start ? "green" : end ? "red" : visited ? "blue" : "grey"}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Box;

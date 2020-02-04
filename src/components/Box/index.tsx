import React, { useRef, useState, MutableRefObject } from "react";
import { useFrame } from "react-three-fiber";
import { Mesh } from "three";

export interface BoxProps {
  position?: number[];
}

const Box: React.FC<BoxProps> = props => {
  // This reference will give us direct access to the mesh
  const mesh: MutableRefObject<Mesh | undefined> = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh && mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
};

export default Box;

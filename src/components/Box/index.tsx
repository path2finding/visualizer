import * as THREE from "three"
import React, { useRef, useState, MutableRefObject, Suspense } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { Mesh, TextureLoader } from "three";

//wall, start point, end point, empty, 

const Wall: React.FC<BoxProps> = props => {

  const texture = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + "stone.png");
  const mesh: MutableRefObject<Mesh | undefined> = useRef();

  return(
    <mesh ref={mesh} >
       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshPhongMaterial
            attach="material"
            map={texture}
          />
    </mesh>
  );
}

const StartPoint: React.FC<BoxProps> = props => {
  const texture = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + "dirt.png");
  const mesh: MutableRefObject<Mesh | undefined> = useRef();

  return(
    <mesh
      ref={mesh}
    >
       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshPhongMaterial
            attach="material"
            map={texture}
          />
        </mesh>
    );
}

const EndPoint: React.FC<BoxProps> = props => {
  const texture = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + "diamond_ore.png");
  const mesh: MutableRefObject<Mesh | undefined> = useRef();

  return(
    <mesh ref={mesh}>
       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshPhongMaterial
            attach="material"
            map={texture}
          />
        </mesh>
  );
}

const Empty: React.FC<BoxProps> = props => {
  return(<mesh></mesh>);
}

const Space: React.FC<BoxProps> = props => {
  const typeComponent = () => {
    switch(props.type) {
      case "wall":   return <Wall />;
      case "startpoint":   return <StartPoint />;
      case "endpoint": return <EndPoint />;
      case "empty":  return <Empty />;
      default:      return <Empty />
    }
  }

  return(
    <mesh>
      <Suspense fallback='none'>
        {typeComponent()}
      </Suspense>
    </mesh> 
  )
};

export interface BoxProps {
  position?: number[];
  type?: string;
}

export default Space;

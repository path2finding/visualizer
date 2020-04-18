import React, { Suspense } from "react";
import Wall from "./Wall";
import Empty from "./Empty";
// import { Vector3 } from "three";
// import { SpaceTypes } from "./types";

interface GenericSpace {
  type: string;
  visited: Boolean;
  path: Boolean;
  inOpenSet: boolean;
  inClosedSet: boolean;
}

// Code for texturing spaces in the open and closed sets if we want to pursue that
// in the future
// const GenericSpace: React.FC<GenericSpace> = (props) => {
//   if (
//     props.inOpenSet &&
//     !props.path &&
//     props.type !== SpaceTypes.start &&
//     props.type !== SpaceTypes.end
//   ) {
//     return (
//       <mesh
//         position={new Vector3(0, -0.5, 0)}
//         rotation={[-(Math.PI / 2), 0, 0]}
//       >
//         <planeBufferGeometry attach="geometry" args={[1, 1, 1, 1]} />
//         <meshPhongMaterial attach="material" color="green" />
//       </mesh>
//     );
//   } else if (
//     props.inClosedSet &&
//     !props.path &&
//     props.type !== SpaceTypes.start &&
//     props.type !== SpaceTypes.end
//   ) {
//     return (
//       <mesh
//         position={new Vector3(0, -0.5, 0)}
//         rotation={[-(Math.PI / 2), 0, 0]}
//       >
//         <planeBufferGeometry attach="geometry" args={[1, 1, 1, 1]} />
//         <meshPhongMaterial attach="material" color="orange" />
//       </mesh>
//     );
//   } else if (props.type === "empty") {
//     return <Empty visited={props.visited} path={props.path} />;
//   } else {
//     return (
//       <Suspense fallback="none">
//         <Wall type={props.type} />
//       </Suspense>
//     );
//   }

const GenericSpace: React.FC<GenericSpace> = (props) => {
  const { type, path, visited } = props;

  return (
    <Suspense fallback="none">
      {type === "empty" ? (
        <Empty visited={visited} path={path} />
      ) : (
        <Wall type={type} />
      )}
    </Suspense>
  );
};

export default GenericSpace;

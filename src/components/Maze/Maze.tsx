import React from 'react';
import { Canvas } from 'react-three-fiber';

// Components
import Space from '../Space/Space';
// Interfaces
import { MazeState } from '../../models/maze';
import { SpaceState } from '../../models/space';

import './Maze.scss';

const populateMaze = (
  mazeSize: { x: number; y: number },
  mazeInfo: { [key: number]: SpaceState[] }
) => {
  let list = [];
  let key = 0;

  for (let j = 0; j < mazeSize.y; j++) {
    for (let i = 0; i < mazeSize.x; i++) {
      key++;
      list.push(
        <Space type={mazeInfo[j][i].type} position={[i, j, 0]} key={key} />
      );
    }
  }

  return list;
};

const Maze: React.FC<MazeState> = props => {
  const { mazeInfo } = props;
  const mazeSize = {
    x: mazeInfo[0].length,
    y: Object.keys(mazeInfo).length
  };

  return (
    <Canvas
      className="Maze"
      camera={{ fov: 100, position: [mazeSize.x / 2, mazeSize.y / 2, 10] }}
    >
      <ambientLight />
      {populateMaze(mazeSize, mazeInfo)}
    </Canvas>
  );
};

export default Maze;

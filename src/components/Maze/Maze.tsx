import React from 'react';
import { Canvas } from 'react-three-fiber';
// Components
import Space from '../../components/Space/Space';
// Interfaces
import { Maze as IMaze, MazeInfo } from '../../models/maze/index';
import { Coord } from '../../models/maze';

import './Maze.scss';

// Helper functions
const getMazeSize = (mazeInfo: MazeInfo) => {
  return {
    x: mazeInfo[0].length,
    y: Object.keys(mazeInfo).length
  };
};

const populateMaze = (
  mazeInfo: MazeInfo,
  handleChangeStart: (newPost: Coord) => void
) => {
  const mazeSize = getMazeSize(mazeInfo);
  let list = [];
  let key = 0;

  for (let j = 0; j < mazeSize.y; j++) {
    for (let i = 0; i < mazeSize.x; i++) {
      key++;
      list.push(
        <Space
          type={mazeInfo[j][i].type}
          position={[i, j, 0]}
          key={key}
          visited={false}
          onChangeStart={() => handleChangeStart({ x: i, y: j })}
        />
      );
    }
  }

  return list;
};

interface Props {
  maze: IMaze;
  handleChangeStart: (newPos: Coord) => void;
}

const Maze: React.FC<Props> = props => {
  const { mazeInfo } = props.maze;
  const mazeSize = getMazeSize(mazeInfo);

  return (
    <Canvas
      className="Maze"
      camera={{ fov: 100, position: [mazeSize.x / 2, mazeSize.y / 2, 10] }}
    >
      <ambientLight />
      {populateMaze(mazeInfo, props.handleChangeStart)}
    </Canvas>
  );
};

export default Maze;

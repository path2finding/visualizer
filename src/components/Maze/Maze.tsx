import React from 'react';
import { Canvas } from 'react-three-fiber';

// Components
import Space from '../../containers/SpaceContainer/SpaceContainer';
// Interfaces
import { MazeState, Coord } from '../../models/maze';

import './Maze.scss';

const populateMaze = (mazeProps: MazeState) => {
  let list = [];
  let key = 0;

  for (let j = 0; j < mazeProps.getSize().y; j++) {
    for (let i = 0; i < mazeProps.getSize().x; i++) {
      key++;
      list.push(
        <Space
          type={mazeProps.mazeInfo[j][i].type}
          position={[i, j, 0]}
          key={key}
          visited={false}
        />
      );
    }
  }

  return list;
};

export interface MazeProps extends MazeState {
  handleChangeStart: (newPos: Coord) => void;
}

const Maze: React.FC<MazeProps> = props => {
  const { getSize } = props;

  return (
    <Canvas
      className="Maze"
      camera={{ fov: 100, position: [getSize().x / 2, getSize().y / 2, 10] }}
    >
      <ambientLight />
      {populateMaze(props)}
    </Canvas>
  );
};

export default Maze;

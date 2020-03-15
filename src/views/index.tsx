import React from 'react';

// Components
import MenuBarContainer from '../containers/MenuContainer';
import MazeContainer from '../containers/MazeContainer/MazeContainer';

import './index.scss';

class App extends React.Component {
  render() {
    return (
      <div className="root">
        <MenuBarContainer />
        <MazeContainer />
      </div>
    );
  }
}

export default App;

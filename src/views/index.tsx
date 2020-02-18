import * as React from 'react';
import Grid from '../components/Grid/Grid';
import './index.scss';

class App extends React.Component {
  render() {
    return (
      <div className="root">
        <h1 className="title">Hello World</h1>
        <Grid gridSize={{ x: 10, y: 10 }} />
      </div>
    );
  }
}

export default App;

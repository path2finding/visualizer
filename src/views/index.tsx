import * as React from 'react';
import Grid from '../components/Grid/Grid';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="title">Hello World</h1>
        <div style={{ border: '1px solid orangered' }}>
          <Grid gridSize={{ x: 10, y: 10 }} />
        </div>
      </div>
    );
  }
}

export default App;

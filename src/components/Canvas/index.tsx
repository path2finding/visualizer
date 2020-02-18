import * as React from "react";
import { Canvas } from "react-three-fiber";
import Box from "../Box";

export type Pos = {
  x: number;
  y: number;
};
export interface AppState {
  locations: Pos[][];
}
class App extends React.Component<any, AppState> {
  state = {
    locations: []
  };

  renderSquares() {
    let positions: { x: number; y: number }[][] = [];
    for (let i = -3.5; i < 4; i += 0.5) {
      let row: { x: number; y: number }[] = [];
      for (let j = -5; j < 5; j += 0.5) {
        row.push({ x: j, y: i });
      }
      positions.push(row);
    }
    this.setState({ locations: positions }, () =>
      console.log(this.state.locations)
    );
  }

  componentDidMount() {
    this.renderSquares();
  }

  render() {
    return (
      <div className="container">
        <div style={{ border: "1px solid orangered", height: "100vh" }}>
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {this.state.locations.map((row: Pos[], rowIndex: number) => {
              return row.map((col: Pos, colIndex: number) => {
                return (
                  <Box
                    position={[col.x, col.y, 0]}
                    start={
                      rowIndex === this.state.locations.length - 1 &&
                      colIndex === 0
                    }
                    end={rowIndex === 0 && colIndex === row.length - 1}
                  />
                );
              });
            })}
          </Canvas>
        </div>
      </div>
    );
  }
}

export default App;

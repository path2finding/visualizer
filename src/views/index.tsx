import * as React from "react";
import { Canvas } from "react-three-fiber";
import Box from "../components/Box";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="title">Hello World</h1>
        <div style={{ border: "1px solid orangered" }}>
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
          </Canvas>
        </div>
      </div>
    );
  }
}

export default App;

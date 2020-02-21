import * as THREE from "three"
import React , {Suspense} from "react";

import { Canvas, useLoader } from "react-three-fiber";
import Space from "../components/Box";

class App extends React.Component {
  
  render() {
    return (
      <div className="container">
        <h1 className="title">Hello World</h1>
        <div style={{ border: "1px solid orangered" }}>
          <Canvas style={{height: '100vh'}} >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
              <Space type='endpoint' />
          </Canvas>
        </div>
      </div>
    );
  }
}

export default App;

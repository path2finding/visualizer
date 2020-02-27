import * as THREE from "three";
import React, { Suspense } from "react";

import { Canvas, useLoader } from "react-three-fiber";
import Space from "../components/Box";

// Components
import MenuBarContainer from "../containers/MenuContainer";
import Grid from "../components/Grid/Grid";

import "./index.scss";

class App extends React.Component {
  render() {
    return (
      <div className="root">
        <MenuBarContainer />
        <Grid gridSize={{ x: 10, y: 10 }} />
      </div>
    );
  }
}

export default App;

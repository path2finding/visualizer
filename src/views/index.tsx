import * as React from "react";
// import Canvas from "../components/Canvas";
import MenuBarContainer from "../containers/MenuContainer";

class Root extends React.Component {
  render() {
    return (
      <div>
        <MenuBarContainer />
        {/* <Canvas /> */}
      </div>
    );
  }
}

export default Root;

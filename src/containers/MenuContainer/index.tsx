import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
  handleDropdownChange,
  handleDropdownSpeed,
  handleStartVisualization,
  handleClearGrid,
  handlePauseVisualization,
  toggleMoveStart,
  toggleMoveEnd,
  saveMaze,
} from "../../actions/menuActions/menuActions";
import {
  loadMaze,
  handleStopVisualization,
  updateGridSize,
  randomizeWalls,
} from "../../actions/mazeActions/mazeActions";
import MenuBar from "../../components/Menu";

import { RootState } from "typesafe-actions";

const mapStateToProps = (state: RootState) => ({
  selectedAlgo: state.menu.selectedAlgo,
  algorithms: state.menu.algorithms,
  currentSpeed: state.menu.currentSpeed,
  speed: state.menu.speed,
  isPlaying: state.menu.isPlaying,
  canMoveStart: state.menu.canMoveStart,
  canMoveEnd: state.menu.canMoveEnd,
  maze: state.maze,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      handleDropdownChange,
      handleDropdownSpeed,
      randomizeWalls,
      onStart: handleStartVisualization,
      onPause: handlePauseVisualization,
      onStop: handleStopVisualization,
      onClear: handleClearGrid,
      toggleMoveStart,
      toggleMoveEnd,
      loadMaze,
      saveMaze,
      updateGridSize,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);

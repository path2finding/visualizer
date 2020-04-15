import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
  handleChangeAlgo,
  handleChangeSpeed,
  handleStartVisualization,
  handleStopVisualization,
  handleClearGrid,
  handlePauseVisualization,
  toggleMoveStart,
  toggleMoveEnd,
  saveMaze,
  loadMaze,
  randomizeWalls,
  handleChangeGridSize,
} from "../../actions/menuActions/menuActions";

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
  startTime: state.menu.startTime,
  endTime: state.menu.endTime,
  maze: state.maze,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      handleDropdownChange: handleChangeAlgo,
      handleDropdownSpeed: handleChangeSpeed,
      randomizeWalls,
      onStart: handleStartVisualization,
      onPause: handlePauseVisualization,
      onStop: handleStopVisualization,
      onClear: handleClearGrid,
      toggleMoveStart,
      toggleMoveEnd,
      loadMaze,
      saveMaze,
      updateGridSize: handleChangeGridSize,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);

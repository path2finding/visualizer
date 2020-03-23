import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
  handleDropdownChange,
  handleStartVisualization,
  handleStopVisualization,
  handleClearGrid,
  handlePauseVisualization,
  toggleMoveStart,
  toggleMoveEnd,
  saveMaze
} from "../../actions/menuActions/menuActions";
import { loadMaze } from "../../actions/mazeActions/mazeActions";
import MenuBar from "../../components/Menu";

import { RootState } from "typesafe-actions";

const mapStateToProps = (state: RootState) => ({
  selectedAlgo: state.menu.selectedAlgo,
  algorithms: state.menu.algorithms,
  isPlaying: state.menu.isPlaying,
  canMoveStart: state.menu.canMoveStart,
  canMoveEnd: state.menu.canMoveEnd,
  maze: state.maze
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      handleDropdownChange,
      onStart: handleStartVisualization,
      onPause: handlePauseVisualization,
      onStop: handleStopVisualization,
      onClear: handleClearGrid,
      toggleMoveStart,
      toggleMoveEnd,
      loadMaze,
      saveMaze
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);

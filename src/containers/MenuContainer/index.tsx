import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  handleDropdownChange,
  handleStartVisualization,
  handleStopVisualization,
  handleClearGrid,
  handlePauseVisualization,
  toggleMoveStart,
  toggleMoveEnd,
  loadMaze
} from "../../actions/menuActions/menuActions";
import MenuBar from "../../components/Menu";

import { RootState } from "typesafe-actions";
import { mazeReducer } from "../../reducers/mazeReducer/mazeReducer";
import Maze from "../../components/Maze/Maze";

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      handleDropdownChange,
      onStart: handleStartVisualization,
      onPause: handlePauseVisualization,
      onStop: handleStopVisualization,
      onClear: handleClearGrid,
      toggleMoveStart,
      toggleMoveEnd,
      loadMaze
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => ({
  selectedAlgo: state.menu.selectedAlgo,
  algorithms: state.menu.algorithms,
  isPlaying: state.menu.isPlaying,
  canMoveStart: state.menu.canMoveStart,
  canMoveEnd: state.menu.canMoveEnd,
  loadMaze: Maze
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar as any);

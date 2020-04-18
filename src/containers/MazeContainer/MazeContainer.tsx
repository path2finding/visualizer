import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Maze from "../../components/Maze/Maze";
import { RootState } from "typesafe-actions";

import {
  handleStopVisualization,
  handlePauseVisualization,
} from "../../actions/menuActions/menuActions";
import {
  handleChangeStart,
  handleChangeEnd,
  makeWall,
  makeEmpty,
  progressBFS,
  progressDFS,
  progressAstar,
} from "../../actions/mazeActions/mazeActions";

const mapStateToProps = (state: RootState) => ({
  maze: state.maze,
  canMoveStart: state.menu.canMoveStart,
  canMoveEnd: state.menu.canMoveEnd,
  isPlaying: state.menu.isPlaying,
  selectedAlgo: state.menu.selectedAlgo,
  currentSpeed: state.menu.currentSpeed,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      handleChangeStart,
      handleChangeEnd,
      makeWall,
      makeEmpty,
      progressBFS,
      progressDFS,
      progressAstar,
      handleStopVisualization,
      handlePauseVisualization,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);

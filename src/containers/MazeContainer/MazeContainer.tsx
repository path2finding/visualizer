import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Maze from "../../components/Maze/Maze";
import { RootState } from "typesafe-actions";

import {
  handleChangeStart,
  handleChangeEnd,
  makeWall,
  makeEmpty
} from "../../actions/mazeActions/mazeActions";

const mapStateToProps = (state: RootState) => ({
  maze: state.maze,
  canMoveStart: state.menu.canMoveStart,
  canMoveEnd: state.menu.canMoveEnd
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      handleChangeStart,
      handleChangeEnd,
      makeWall,
      makeEmpty
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);

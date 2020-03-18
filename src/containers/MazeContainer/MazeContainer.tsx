import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Maze from '../../components/Maze/Maze';
import { RootState } from 'typesafe-actions';

import { handleChangeStart } from '../../actions/mazeActions/mazeActions';

const mapStateToProps = (state: RootState) => ({
  maze: state.maze
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ handleChangeStart }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);

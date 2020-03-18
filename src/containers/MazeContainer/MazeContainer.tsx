import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeWall, makeEmpty } from '../../actions/mazeActions';
import { Dispatch } from 'redux';
import Maze from '../../components/Maze/Maze';

const mapStateToProps = (state: any) => ({
  maze: state.maze
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ makeWall, makeEmpty }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);

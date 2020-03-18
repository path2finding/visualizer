import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {makeWall, makeEmpty} from  '../../actions/mazeActions';
import {Dispatch} from 'redux';
import Grid from '../../components/Maze/Maze';

const mapStateToProps = (state: any) => ({
  mazeInfo: state.maze.mazeInfo
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ makeWall, makeEmpty }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps) (Grid); 
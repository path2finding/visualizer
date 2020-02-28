import { connect } from 'react-redux';
import Grid from '../../components/Maze/Maze';

const mapStateToProps = (state: any) => ({
  mazeInfo: state.maze.mazeInfo
});

export default connect(mapStateToProps, null)(Grid as any);

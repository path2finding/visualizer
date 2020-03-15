import { connect } from 'react-redux';
// import { bindActionCreators, Dispatch } from 'redux';
import Grid from '../../components/Maze/Maze';
// import { handleChangeStart } from '../../actions/mazeActions';
import { MazeState } from '../../models/maze';

const mapStateToProps = (state: MazeState) => ({
  mazeInfo: state.mazeInfo,
  getSize: state.getSize
});

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return bindActionCreators(
//     {
//       handleChangeStart
//     },
//     dispatch
//   );
// };

export default connect(mapStateToProps, null)(Grid);

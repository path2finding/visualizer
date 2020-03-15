import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Space from '../../components/Space/Space';
import { handleChangeStart } from '../../actions/mazeActions';
import { SpaceState } from '../../models/space';

const mapStateToProps = (state: SpaceState) => ({
  type: state.type,
  position: state.position,
  visited: state.visited
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      handleChangeStart
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Space);

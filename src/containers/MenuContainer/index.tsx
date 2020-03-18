import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  handleDropdownChange,
  handleStartVisualization,
  handleStopVisualization,
  handleClearGrid,
  handlePauseVisualization
} from '../../actions/menuActions/menuActions';
import MenuBar from '../../components/Menu';

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      handleDropdownChange,
      onStart: handleStartVisualization,
      onPause: handlePauseVisualization,
      onStop: handleStopVisualization,
      onClear: handleClearGrid
    },
    dispatch
  );
};

const mapStateToProps = (state: any) => ({
  selectedAlgo: state.menu.selectedAlgo,
  algorithms: state.menu.algorithms,
  isPlaying: state.menu.isPlaying
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar as any);

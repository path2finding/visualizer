import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  handleDropdownChange,
  handleStartVisualization,
  handleStopVisualization
} from "../../actions/navbarActions";
import MenuBar from "../../components/Menu";

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      handleDropdownChange,
      onStart: handleStartVisualization,
      onStop: handleStopVisualization
    },
    dispatch
  );
};

const mapStateToProps = (state: any) => ({
  selectedAlgo: state.menu.selectedAlgo,
  algorithms: state.menu.algorithms
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar as any);

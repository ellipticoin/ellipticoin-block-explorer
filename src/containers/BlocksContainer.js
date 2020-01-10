import Blocks from "../Blocks";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as blockActions from "../actions/actions";
import { createSelector } from "reselect";

const blocksSelector = state => state.blockReducer;

const byKeyDesc = key => (a, b) => {
  return a[key] === b[key] ? 0 : a[key] > b[key] ? -1 : 1;
};

const latestBlocks = createSelector(blocksSelector, blocks =>
  blocks.sort(byKeyDesc("number")).slice(0, 4)
);

function mapStateToProps(state) {
  return {
    latestBlocks: latestBlocks(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    blockActions: bindActionCreators(blockActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blocks);

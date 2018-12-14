import Blocks from "../Blocks";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as blockActions from "../actions/actions";
import { createSelector } from 'reselect';
import _ from "lodash";

const blocksSelector = state => state.blockReducer

const latestBlocks = createSelector(
  blocksSelector,
  (blocks) => _.take(_.reverse(_.sortBy(blocks, "number")), 3),
)


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

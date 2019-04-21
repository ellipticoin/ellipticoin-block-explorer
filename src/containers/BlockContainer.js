import Block from "../Block";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as blockActions from "../actions/actions";
import { find } from "lodash";
import { base64urlToBytes } from "../helpers.js";

function mapStateToProps(state, props) {
  let hash = base64urlToBytes(props.match.params.hash);
  return {
    block: find(state.blockReducer, ["hash", hash])
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
)(Block);

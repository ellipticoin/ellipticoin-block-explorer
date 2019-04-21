import Transaction from "../Transaction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as transactionActions from "../actions/actions";
import { find } from "lodash";
import { base64urlToBytes } from "../helpers.js";

function mapStateToProps(state, props) {
  let hash = base64urlToBytes(props.match.params.hash);
  return {
    transaction: find(state.transactionReducer, ["hash", hash])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    transactionActions: bindActionCreators(transactionActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transaction);

import Transaction from "../Transaction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as transactionActions from "../actions/actions";
import { find } from "lodash";
import { base64urlToBytes } from "../helpers.js";

function mapStateToProps(state, props) {
  let blockHash = base64urlToBytes(props.match.params.blockHash);
  let transaction = find(state.transactionReducer, {
    "block_hash": blockHash,
    "execution_order": parseInt(props.match.params.executionOrder)
  })

  return {transaction};
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

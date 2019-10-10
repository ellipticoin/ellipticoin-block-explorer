import Transaction from "../Transaction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as transactionActions from "../actions/actions";
import { find } from "lodash";
import { base64urlToBytes, transactionHash } from "../helpers.js";
import base64url from "base64url";

function mapStateToProps(state, props) {
  let hash = base64url.toBuffer(props.match.params.transactionHash);
  let transaction = find(state.transactionReducer, (transaction) =>
     transactionHash(transaction).toString() === hash.toString()
  )
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

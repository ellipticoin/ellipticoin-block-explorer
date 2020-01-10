import Transactions from "../Transactions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as transactionActions from "../actions/actions";
import { createSelector } from "reselect";

const transactionsSelector = state => state.transactionReducer;
const latestTransactions = createSelector(transactionsSelector, transactions =>
  transactions.slice(0, 4)
);

function mapStateToProps(state) {
  return {
    latestTransactions: latestTransactions(state)
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
)(Transactions);

import initialState from "./initialState";
import { RECEIVE_TRANSACTION, RECEIVE_BLOCK } from "../actions/actionTypes";

export default function transaction(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TRANSACTION:
      return [action.transaction, ...state];
    case RECEIVE_BLOCK:
      return [
        ...action.block.transactions.map(transaction => {
          transaction.block_hash = action.block.hash;
          return transaction;
        }),
        ...state
      ];
    default:
      return state;
  }
}

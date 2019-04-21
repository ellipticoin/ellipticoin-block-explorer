import initialState from './initialState';
import {RECEIVE_TRANSACTION, RECEIVE_BLOCK} from '../actions/actionTypes';

export default function transaction(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TRANSACTION:
      return [
        action.transaction,
        ...state,
      ];
    case RECEIVE_BLOCK:
      return [
        ...action.block.transactions,
        ...state,
      ];
    default:
      return state;
  }
}

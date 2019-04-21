import {RECEIVE_BALANCE} from '../actions/actionTypes';

export default function address(state = {}, action) {
  switch (action.type) {
    case RECEIVE_BALANCE:
      return {
        ...state,
        ...action.balance,
      };
    default:
      return state;
  }
}

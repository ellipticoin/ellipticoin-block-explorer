import initialState from './initialState';
import {FETCH_BLOCKS, RECEIVE_BLOCKS} from '../actions/actionTypes';

export default function block(state = initialState, action) {
  let newState;
  switch (action.type) {
    case FETCH_BLOCKS:
      return action;
    case RECEIVE_BLOCKS:
      return [
        action.block,
        ...state,
      ];
    default:
      return state;
  }
}

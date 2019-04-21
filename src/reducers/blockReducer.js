import initialState from './initialState';
import {FETCH_BLOCKS, RECEIVE_BLOCK} from '../actions/actionTypes';

export default function block(state = initialState, action) {
  switch (action.type) {
    case FETCH_BLOCKS:
      return action;
    case RECEIVE_BLOCK:
      return [
        action.block,
        ...state,
      ];
    default:
      return state;
  }
}

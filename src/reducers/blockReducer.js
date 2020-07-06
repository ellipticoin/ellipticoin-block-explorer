import initialState from "./initialState";
import { FETCH_BLOCKS, RECEIVE_BLOCK } from "../actions/actionTypes";

export default function block(state = initialState, action) {
  switch (action.type) {
    case FETCH_BLOCKS:
      return action;
    case RECEIVE_BLOCK:
      if (state.map((b) => b.number).includes(action.block.number)) {
        return state;
      }

      return [
        action.block,
        ...state.filter((_, i) => {
          return i !== state.length - 1 || state.length < 4;
        }),
      ];
    default:
      return state;
  }
}

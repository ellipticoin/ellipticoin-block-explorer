import initialState from "./initialState";
import { ERROR } from "../actions/actionTypes";

export default function block(state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return action.error;
    default:
      return null;
  }
}

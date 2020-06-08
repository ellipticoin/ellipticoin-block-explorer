import { combineReducers } from "redux";
import addressReducer from "./addressReducer";
import blockReducer from "./blockReducer";
import transactionReducer from "./transactionReducer";

const rootReducer = combineReducers({
  addressReducer,
  blockReducer,
  transactionReducer,
});

export default rootReducer;

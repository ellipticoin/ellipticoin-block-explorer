import { combineReducers } from "redux";
import addressReducer from "./addressReducer";
import blockReducer from "./blockReducer";
import transactionReducer from "./transactionReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  addressReducer,
  errorReducer,
  blockReducer,
  transactionReducer,
});

export default rootReducer;

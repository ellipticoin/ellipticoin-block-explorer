import {combineReducers} from 'redux';
import blockReducer from './blockReducer';

const rootReducer = combineReducers({
  blockReducer,
});

export default rootReducer;

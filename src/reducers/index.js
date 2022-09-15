import { combineReducers } from 'redux';
import userReducer from './userReducer';
// import locationReducer from './locationReducers';

export default combineReducers({
  user: userReducer,
  // gyms: locationReducer,
});

import { combineReducers } from 'redux';
import userReducer from './userReducer';
import locationReducer from './locationReducers';
import employeeReducers from './employeeReducers';
import gymTabPanelReducers from './gymTabPanelReducers';
import distributionReducers from './distribution';

export default combineReducers({
  user: userReducer,
  locations: locationReducer,
  employees: employeeReducers,
  gymTabPanel: gymTabPanelReducers,
  distribution: distributionReducers,
});

import { combineReducers } from 'redux';
import userReducer from './userReducer';
import locationReducer from './locationReducers';
import employeeReducers from './employeeReducers';
import gymTabPanelReducers from './gymTabPanelReducers';
import placardDistributionReducers from './placardDistribution';

export default combineReducers({
  user: userReducer,
  locations: locationReducer,
  employees: employeeReducers,
  gymTabPanel: gymTabPanelReducers,
  placardDistribution: placardDistributionReducers,
});

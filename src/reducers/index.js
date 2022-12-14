import { combineReducers } from 'redux';
import distributionReducers from './distribution/distributionReducers';
import employeeReducers from './employeeReducers';
import gymTabPanelReducers from './gymTabPanelReducers';
import locationReducers from './locationReducers';
import metricsReducers from './distribution/metricsReducers';
import snackbarReducers from './snackbarReducers';
import userReducers from './userReducer';

export default combineReducers({
  distribution: distributionReducers,
  employees: employeeReducers,
  gymTabPanel: gymTabPanelReducers,
  locations: locationReducers,
  metrics: metricsReducers,
  snackbarDetails: snackbarReducers,
  user: userReducers,
});

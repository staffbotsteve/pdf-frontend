import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import licenseReducer from './license.reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  license: licenseReducer,
});

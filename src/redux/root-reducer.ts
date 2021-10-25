import { combineReducers } from 'redux';

import AuthReducer from './auth/auth.reducer';

const rootReducer = combineReducers({
  user: AuthReducer
});

export default rootReducer;
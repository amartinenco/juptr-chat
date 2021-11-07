import { combineReducers } from 'redux';

import AuthReducer from './auth/auth.reducer';
import ChatReducer from './chat/chat.reducer';

const rootReducer = combineReducers({
  user: AuthReducer,
  chat: ChatReducer,
});

export default rootReducer;
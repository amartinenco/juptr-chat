import { combineReducers } from 'redux';

import AuthReducer from './auth/auth.reducer';
import CallReducer from './call/call.reducer';
import ChatReducer from './chat/chat.reducer';

const rootReducer = combineReducers({
  user: AuthReducer,
  chat: ChatReducer,
  call: CallReducer,
});

export default rootReducer;
import { createStore, applyMiddleware, Middleware } from 'redux';

import rootSaga from './root-saga';
import rootReducer from './root-reducer';
import createSagaMiddleware from '@redux-saga/core';

import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const middlewares : Middleware[] = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>
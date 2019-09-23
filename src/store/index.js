import { createStore, applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducer from './reducer'
import middleware from './middleware'
export const middlewares = [];
export const logicMiddlewares = createLogicMiddleware(middleware);

middlewares.push(logicMiddlewares);

export const store = createStore(
    appReducer
    ,composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;

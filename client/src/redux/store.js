import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { middleWare, apiReducer } from "redux-rails";
import { apiConfig } from "../config";

import sessionReducer from './reducers/sessionReducer'

const store = createStore(
    combineReducers({session: sessionReducer, api: apiReducer(apiConfig)}),
  {},
  compose(applyMiddleware(middleWare(apiConfig)))
);

export default store;

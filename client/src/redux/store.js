import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { middleWare, apiReducer } from "redux-rails";
import { connectRoutes } from 'redux-first-router'
import { createBrowserHistory } from 'history'
import { apiConfig } from "../config";

import sessionReducer from './reducers/sessionReducer'

const history = createBrowserHistory()
const routes = { home: '/', operators: '/operators', postes: '/postes', dashboard: '/dashboard/:id', login: '/login' }

const { reducer } = connectRoutes(history, routes)

const store = createStore(
    combineReducers({location: reducer, session: sessionReducer, api: apiReducer(apiConfig)}),
  {},
  compose(applyMiddleware(middleWare(apiConfig)))
);

export default store;

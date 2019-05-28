import { createStore, applyMiddleware, compose } from "redux";
import { middleWare, apiReducer } from "redux-rails";
import { apiConfig } from "../config";

const store = createStore(
  apiReducer(apiConfig),
  {},
  compose(applyMiddleware(middleWare(apiConfig)))
);

export default store;

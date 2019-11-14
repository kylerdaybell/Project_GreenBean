import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import * as Reducers from "./reducers";

const rootReducer = combineReducers({
  greenBeanAPI: Reducers.greenBeanAPIReducer
});

const enhancers = [];
const isDevelopment = process.env.NODE_ENV === "development";
if (
  isDevelopment &&
  typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default initialState => {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      ...enhancers
    )
  );
};

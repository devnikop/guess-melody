import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { compose } from "recompose";

import { configureAPI } from "../api";
import reducer from "./index";

const api = configureAPI((...args) => store.dispatch(...args));

export const store = createStore(
  reducer,
  compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

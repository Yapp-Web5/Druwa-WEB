import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import rootReducer from "modules/rootReducer";
import rootSaga from "sagas/rootSaga";

import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import "./index.css";

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const middlewares = [];

middlewares.push(sagaMiddleware);
middlewares.push(thunkMiddleware);
if (process.env.NODE_ENV !== "production") {
  middlewares.push(loggerMiddleware);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(rootReducer);
const theme = createMuiTheme({});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

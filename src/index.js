import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import rootReducer from "./modules/rootReducer";
import registerServiceWorker from "./registerServiceWorker";

import App from "./App";
import "./index.css";

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // Middleware for dispatch()
  loggerMiddleware // Middleware for loging
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

const theme = createMuiTheme({});

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

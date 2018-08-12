import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { MainView } from "./views";

const mapStateToProps = state => {
  return {};
};

class App extends Component {
  async componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={MainView} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));

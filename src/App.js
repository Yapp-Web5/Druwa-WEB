import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { GenerateRoomView, MainView, CreateRoom } from "./views";

const mapStateToProps = state => {
  return {};
};

class App extends Component {
  async componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainView} />
          <Route exact path="/room" component={GenerateRoomView} />
          <Route path="/create/:roomId" component={CreateRoom} />
          <Route path="/create" component={CreateRoom} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));

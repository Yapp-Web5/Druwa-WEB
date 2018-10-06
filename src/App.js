import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { GenerateRoomView, MainView, CreateRoomView, RoomView } from "./views";

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
          <Switch>
            <Route exact path="/room" component={CreateRoomView} />
            <Route exact path="/room/:roomId" component={RoomView} />
          </Switch>
          {/* <Route path="/create/:roomId" component={CreateRoomView} />
          <Route path="/create" component={CreateRoomView} /> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));

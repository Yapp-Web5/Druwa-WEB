import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { MainView, CreateRoomView, RoomView } from "./views";
import { loginRequest } from "./actions/userAction";

const mapStateToProps = state => {
  return {
    me: state.userReducer.me,
  };
};

const mapDispatchToProps = {
  loginRequest,
};

class App extends Component {
  componentDidMount() {
    this.props.loginRequest();
  }

  render() {
    const { me } = this.props;
    if (!me) {
      return null;
    }
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { GenerateRoomView, MainView, CreateRoomView, RoomView } from "./views";
import { createUser, getUser } from "./api/UserAPI";
import { loginRequest } from "./actions/userAction";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  loginRequest,
};

class App extends Component {
  async componentWillMount() {
    let token = localStorage.getItem("token");

    if (token) {
      this.props.loginRequest(token);
      const user = await getUser(token);
      console.log(user);
    }

    if (!token) {
      const user = await createUser();
      console.log(user);
      localStorage.setItem("token", user.token);
      token = user.token;
    }
  }

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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

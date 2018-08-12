// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import * as socketIO from "socket.io-client";
import { connect } from "react-redux";
import { ServerEndPoint } from "../../configs/server";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {};
};

class MainView extends Component {
  componentDidMount() {
    socketIO(ServerEndPoint);
  }
  render() {
    return <div>This is Default Redux Page</div>;
  }
}

MainView.defaultProps = defaultProps;
MainView.propTypes = propTypes;

export default connect(mapStateToProps)(MainView);

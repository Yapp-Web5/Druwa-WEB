// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import nprogress from "nprogress";

import * as DefaultActionCreator from "../../actionCreators/_DefaultActionCreator";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult,
  };
};

class DefaultReduxPage extends Component {
  componentWillMount() {
    nprogress.start();
  }
  componentDidMount() {
    nprogress.done();
    this.props.dispatch(DefaultActionCreator.action());
  }

  render() {
    return <div>This is Default Redux Page</div>;
  }
}

DefaultReduxPage.defaultProps = defaultProps;
DefaultReduxPage.propTypes = propTypes;

export default connect(mapStateToProps)(DefaultReduxPage);

// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {};
};

class GenerateRoomView extends Component {
  render() {
    return (
      <div>
        <input type="text" />
        <button>Create</button>
        This is Default Redux Page
      </div>
    );
  }
}

GenerateRoomView.defaultProps = defaultProps;
GenerateRoomView.propTypes = propTypes;

export default connect(mapStateToProps)(GenerateRoomView);

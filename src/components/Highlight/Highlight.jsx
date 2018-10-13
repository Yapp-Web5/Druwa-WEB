// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import cx from "classnames";
import * as styles from "./Highlight.scss";

const defaultProps = {
  strong: false,
  block: false,
};
const propTypes = {};

class Highlight extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, strong, block } = this.props;
    return (
      <span className={styles.highlight} style={{ width: block && "100%" }}>
        {children}
        <div
          className={cx(styles.highlight__line, {
            [styles.strong]: strong,
          })}
        >
          &nbsp;
        </div>
      </span>
    );
  }
}

Highlight.defaultProps = defaultProps;
Highlight.propTypes = propTypes;

export default Highlight;

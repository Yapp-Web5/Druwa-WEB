// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { PureComponent } from "react";
import cx from "classnames";
import * as styles from "./Button.scss";

const defaultProps = {};
const propTypes = {};

class Button extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, className, onClick } = this.props;
    return (
      <button className={cx(styles.button, className)} onClick={onClick}>
        {children}
      </button>
    );
  }
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;

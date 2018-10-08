// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { PureComponent } from "react";
import * as styles from "./Futura.scss";

const defaultProps = {};
const propTypes = {};

class Futura extends PureComponent {
  render() {
    const { children } = this.props;
    return <span className={styles.futura}>{children}</span>;
  }
}

Futura.defaultProps = defaultProps;
Futura.propTypes = propTypes;

export default Futura;

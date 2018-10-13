// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import cx from "classnames";

import { Futura } from "../";

import * as styles from "./NaviagationBar.scss";

const defaultProps = {};
const propTypes = {};

class NavigationBar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.navigationBar}>
        <div className={styles.content}>
          <div className={styles.left}>
            <Link to="/">
              <Futura>DRUWA</Futura>
            </Link>
          </div>
          <div className={styles.right}>
            <ul className={styles.right__menu}>
              <li className={cx(styles.right__menu__item, styles.highlight)}>
                <Link to="/room">start now</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

NavigationBar.defaultProps = defaultProps;
NavigationBar.propTypes = propTypes;

export default NavigationBar;

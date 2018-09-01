// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { PureComponent } from "react";
import cx from "classnames";

import { Link } from "react-scroll";

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
          <div className={styles.left}>Druwa</div>
          <div className={styles.right}>
            <ul className={styles.right__menu}>
              <li className={styles.right__menu__item}>
                <Link to="intro" smooth offset={-100}>
                  intro
                </Link>
              </li>
              <li className={styles.right__menu__item}>
                <Link to="why" smooth offset={-100}>
                  why druwa
                </Link>
              </li>
              <li className={styles.right__menu__item}>example</li>
              <li className={cx(styles.right__menu__item, styles.highlight)}>
                start now
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

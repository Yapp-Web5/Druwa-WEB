// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { PureComponent } from "react";
import cx from "classnames";
import * as styles from "./Card.scss";

const defaultProps = {
  admin: false,
};
const propTypes = {};

class Card extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { admin, className } = this.props;
    return (
      <div
        className={cx(className, styles.card, {
          [styles.admin]: admin,
        })}
      >
        <div className={styles.card__header}>
          <div className={styles.card__header__left}>Username</div>
          <div className={styles.card__header__right}>Username</div>
        </div>
        <div className={styles.card__body}>
          댓글내용이 입력됩니다. 이것은 신기합니다.
        </div>
        <div className={styles.card__bottom}>icon cion cion</div>
      </div>
    );
  }
}

Card.defaultProps = defaultProps;
Card.propTypes = propTypes;

export default Card;

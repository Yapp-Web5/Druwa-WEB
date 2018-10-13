// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import cx from "classnames";
import * as styles from "./Card.scss";

const defaultProps = {
  admin: false,
};
const propTypes = {};

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { admin, className, card } = this.props;
    return (
      <div
        className={cx(className, styles.card, {
          [styles.admin]: admin,
        })}
      >
        <div className={styles.card__header}>
          <div className={styles.card__header__left}>
            {card.author.username}
          </div>
          <div className={styles.card__header__right}>
            Page {card.refPageIdx}
          </div>
        </div>
        <div className={styles.card__body}>{card.content}</div>
        <div className={styles.card__bottom}>icon cion cion</div>
      </div>
    );
  }
}

Card.defaultProps = defaultProps;
Card.propTypes = propTypes;

export default Card;

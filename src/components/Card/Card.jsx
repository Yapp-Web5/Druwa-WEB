// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { PureComponent } from "react";
import cx from "classnames";
import * as styles from "./Card.scss";

const defaultProps = {
  admin: false,
};
const propTypes = {
  me: Object,
};

class Card extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { admin, className, card, me } = this.props;
    const isLike = card.likes.some(likeUser => likeUser._id === me._id);
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

        <ul className={styles.card__bottom}>
          <li>
            <i className={cx({ "xi-heart-o": !isLike, "xi-heart": isLike })} />
            {card.likes.length}
          </li>
          <li>item</li>
          <li>item</li>
        </ul>
      </div>
    );
  }
}

Card.defaultProps = defaultProps;
Card.propTypes = propTypes;

export default Card;

// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cx from "classnames";

import { likeCard, unlikeCard, removeCard } from "actions/roomAction";

import * as styles from "./Card.scss";

const mapDispatchToProps = {
  likeCard,
  unlikeCard,
  removeCard,
};

const defaultProps = {
  admin: false,
};

const propTypes = {
  me: PropTypes.object,
  likeCard: PropTypes.func,
  unlikeCard: PropTypes.func,
  removeCard: PropTypes.func,
};

class Card extends PureComponent {
  checkIsLike = () => {
    const { card, me } = this.props;
    return card.likes.some(likeUser => likeUser._id === me._id);
  };

  handleClickLikeButton = () => {
    const { card, me, likeCard, unlikeCard } = this.props;
    const isLike = card.likes.some(likeUser => likeUser._id === me._id);

    if (!isLike) {
      likeCard(card);
    } else {
      unlikeCard(card);
    }
  };

  handleClickRemoveButton = () => {
    const { removeCard, card } = this.props;
    removeCard(card);
  };

  renderLikeButton = () => {
    const { card } = this.props;
    const isLike = this.checkIsLike();
    return (
      <span onClick={this.handleClickLikeButton}>
        <i className={cx({ "xi-heart-o": !isLike, "xi-heart": isLike })} />
        {card.likes.length}
      </span>
    );
  };

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
        <ul className={styles.card__bottom}>
          <li>{this.renderLikeButton()}</li>
          <li onClick={this.handleClickRemoveButton}>
            <i className="xi-trash-o" />
          </li>
          <li>item</li>
        </ul>
      </div>
    );
  }
}

Card.defaultProps = defaultProps;
Card.propTypes = propTypes;

export default connect(
  null,
  mapDispatchToProps
)(Card);

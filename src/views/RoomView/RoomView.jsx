// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import { NavigationBar, Highlight, PdfViewer } from "../../components";

// import * as DefaultActionCreator from "../../actionCreators/_DefaultActionCreator";

import * as styles from "./RoomView.scss";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    // actionResult: state.reducer.actionResult,
  };
};

class RoomView extends Component {
  componentWillMount() {}
  componentDidMount() {
    // this.props.dispatch(DefaultActionCreator.action());
  }

  render() {
    return (
      <div className={styles.roomView}>
        <NavigationBar />
        <div className={styles.body}>
          <div className={styles.body__left}>
            <div className={styles.body__left__body}>
              <PdfViewer file="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf" />
            </div>
            <div className={styles.body__left__bottom}>
              <h1 className={styles.body__left__bottom__title}>
                <Highlight strong>Title</Highlight>
              </h1>
              <div>description</div>
              <div>date</div>
            </div>
          </div>
          <div className={styles.body__right}>
            <div className={styles.body__right__top}>
              <h1 className={styles.body__right__top__header}>
                <Highlight>참여자 {}명</Highlight>
              </h1>
            </div>
            <div className={styles.body__right__body} />
            <div className={styles.body__right__bottom}>
              <div className={styles.body__right__bottom__top}>
                <div>NAME</div>
                <div>Slide</div>
              </div>
              <textarea
                className={styles.body__right__bottom__textarea}
                placeholder="내용을 입력하세요"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RoomView.defaultProps = defaultProps;
RoomView.propTypes = propTypes;

export default connect(mapStateToProps)(RoomView);

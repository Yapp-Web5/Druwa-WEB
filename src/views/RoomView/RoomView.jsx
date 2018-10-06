// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import {
  NavigationBar,
  Highlight,
  PdfViewer,
  PdfElement,
} from "../../components";

import samplepdf from "../../static/sid_ppt.pdf";

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
  constructor(props) {
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1,
      isFullscreenEnabled: false,
      open: false,
    };
  }
  componentWillMount() {}
  componentDidMount() {
    // this.props.dispatch(DefaultActionCreator.action());
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    console.log(samplepdf);
    return (
      <div className={styles.roomView}>
        <NavigationBar />
        <div className={styles.body}>
          <div className={styles.body__left}>
            <div className={styles.body__left__body}>
              <PdfElement
                className="full-screenable-node"
                file={samplepdf}
                pageNumber={this.state.pageNumber}
                onDocumentLoad={this.onDocumentLoad}
              />
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

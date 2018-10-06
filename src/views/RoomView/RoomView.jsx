// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import Fullscreen from "react-fullscreen-crossbrowser";

import {
  NavigationBar,
  Highlight,
  PdfViewer,
  PdfElement,
  Card,
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
    this.handleFullScreen();
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  handleFullScreen = () => {
    const isFullScreen = this.state.isFullscreenEnabled;
    isFullScreen
      ? this.setState({ isFullscreenEnabled: false })
      : this.setState({ isFullscreenEnabled: true });
  };

  handleOnKeyup = event => {
    const keycode = event.keyCode;
    const isFullscreenEnabled = this.state.isFullscreenEnabled;

    if (isFullscreenEnabled) {
      if (keycode === 37) {
        //prev
        this.handlePrev();
      } else if (keycode === 39) {
        //next
        this.handleNext();
      }
    }
  };

  handlePrev = () => {
    if (this.state.pageNumber <= 1) return;

    this.setState({ pageNumber: this.state.pageNumber - 1 });
  };

  handleNext = () => {
    if (this.state.pageNumber >= this.state.numPages) return;
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  };

  render() {
    const { isFullscreenEnabled } = this.state;
    return (
      <div className={styles.roomView} onKeyUp={this.handleOnKeyup}>
        <NavigationBar />
        <div className={styles.body}>
          <div className={styles.body__left}>
            <PdfViewer
              file={samplepdf}
              title={"test"}
              writer={"who"}
              date={new Date().toString()}
              link={"?"}
            />
            {/* <div className={styles.body__left__body}>
              <Fullscreen
                enabled={isFullscreenEnabled}
                onChange={isFullscreenEnabled =>
                  this.setState({ isFullscreenEnabled })
                }
              >
                <PdfElement
                  className="full-screenable-node"
                  file={samplepdf}
                  pageNumber={this.state.pageNumber}
                  onDocumentLoad={this.onDocumentLoad}
                />
              </Fullscreen>
            </div>
            <div className={styles.body__left__bottom}>
              <h1 className={styles.body__left__bottom__title}>
                <Highlight strong>Title</Highlight>
              </h1>
              <div>description</div>
              <div>
                date
                <div onClick={this.handleFullScreen}>button</div>
              </div>
            </div> */}
          </div>
          <div className={styles.body__right}>
            <div className={styles.body__right__top}>
              <h1 className={styles.body__right__top__header}>
                <Highlight>참여자 {}명</Highlight>
              </h1>
            </div>
            <div className={styles.body__right__body}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card admin />
            </div>
            <div className={styles.body__right__bottom}>
              <div className={styles.body__right__bottom__top}>
                <div className={styles.body__right__bottom__top__left}>
                  NAME
                </div>
                <div className={styles.body__right__bottom__top__right}>
                  Slide
                </div>
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

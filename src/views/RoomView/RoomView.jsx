// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import Fullscreen from "react-fullscreen-crossbrowser";
import moment from "moment";

import {
  NavigationBar,
  Highlight,
  PdfViewer,
  PdfElement,
  Card,
} from "../../components";

import samplepdf from "../../static/ppt.pdf";

import * as socketIO from "socket.io-client";
import { SERVER_END_POINT } from "../../configs/server";

// import * as DefaultActionCreator from "../../actionCreators/_DefaultActionCreator";

import * as styles from "./RoomView.scss";
import { getRoom, enterRoom } from "../../modules/roomReducer";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    room: state.roomReducer.room,
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
      socket: null,
      commentInput: "",
    };
  }
  componentWillMount() {}
  componentWillUnmount() {
    const { socket } = this.state;
    socket.close();
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const roomUrl = match.params.roomId;
    dispatch(getRoom({ url: roomUrl }));

    const token = localStorage.getItem("token");
    const socket = socketIO.connect(
      SERVER_END_POINT,
      {
        query: {
          type: "enter",
          roomUrl,
          token,
        },
      }
    );
    this.setState({
      socket,
    });

    socket.on("newEnter", message => {
      console.log(message);
      dispatch(enterRoom({ room: message.room }));
    });
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

  handleChangeCommentInput = e => {
    const { value } = e.target;
    console.log(value);
    this.setState({
      commentInput: value,
    });
  };

  render() {
    const { room } = this.props;
    if (!room) {
      return null;
    }

    return (
      <div className={styles.roomView} onKeyUp={this.handleOnKeyup}>
        <NavigationBar />
        <div className={styles.body}>
          <div className={styles.body__left}>
            <PdfViewer
              file={samplepdf}
              title={room.title}
              writer={room.lecturer}
              date={moment(room.createdAt).format("YYYY-MM-DD")}
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
                <Highlight>참여자 {room.participants.length}명</Highlight>
              </h1>
            </div>
            <div className={styles.body__right__body}>
              <Card admin />
              <Card />
              <Card />
              <Card />
              <Card />
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
                onChange={this.handleChangeCommentInput}
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

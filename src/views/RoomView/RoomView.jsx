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
  Button,
} from "../../components";

import samplepdf from "../../static/ppt.pdf";

import * as styles from "./RoomView.scss";
import {
  getRoomRequest,
  enterRoom,
  leaveRoom,
  createCard,
} from "actions/roomAction";
// import { enterRoom } from "../../modules/roomReducer";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    me: state.userReducer.me,
    room: state.roomReducer.room,
    socket: state.roomReducer.socket,
    // actionResult: state.reducer.actionResult,
  };
};

const mapDispatchToProps = {
  getRoomRequest,
  enterRoom,
  leaveRoom,
  createCard,
};

class RoomView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1,
      isFullscreenEnabled: false,
      open: false,
      cardInput: "",
      file: "",
    };
  }
  componentWillMount() {}
  componentWillUnmount() {
    const { socket } = this.props;
    socket.close();
  }

  componentDidMount() {
    const { match } = this.props;
    const roomUrl = match.params.roomId;
    this.props.getRoomRequest(roomUrl);
    if (!this.state.file && this.props.room && this.props.room.pdfPath) {
      const { pdfPath: file } = this.props.room;
      this.setState({ file });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { room } = this.props;
    if (!room) {
      const { pdfPath: file } = nextProps.room;
      this.setState({ file });
    }
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

  handleChangeCardInput = e => {
    const { value } = e.target;
    this.setState({
      cardInput: value,
    });
  };

  handleClickCardSubmit = () => {
    const { room } = this.props;
    const { cardInput } = this.state;
    this.props.createCard(room.url, cardInput, 1);
  };

  isAdmin = () => {
    const { room } = this.props;
    let ret = false;

    if (room) {
      const { me } = this.props;
      const { admins } = room;
      for (var i in admins) {
        if (admins[i]._id === me._id) {
          ret = true;
          break;
        }
      }
    }
    return ret;
  };

  handleClickRoomUpdate = () => {
    const { history } = this.props;
    history.push("/room");
  };

  render() {
    const { room, me } = this.props;
    const { file } = this.state;
    if (!room || !me) {
      return null;
    }

    return (
      <div className={styles.roomView} onKeyUp={this.handleOnKeyup}>
        <NavigationBar />
        <div className={styles.body}>
          <div className={styles.body__left}>
            {this.isAdmin() && (
              <div className={styles.body__left__top}>
                <Button
                  className={styles.body__left__top__modify}
                  onClick={this.handleClickRoomUpdate}
                >
                  수정
                </Button>
              </div>
            )}
            <PdfViewer
              file={file}
              title={room.title}
              writer={room.lecturer}
              date={moment(room.createdAt).format("YYYY-MM-DD")}
              link={"?"}
            />
          </div>
          <div className={styles.body__right}>
            <div className={styles.body__right__top}>
              <h1 className={styles.body__right__top__header}>
                <Highlight>참여자 {room.participants.length}명</Highlight>
              </h1>
            </div>
            <div className={styles.body__right__body}>
              {room.cards.map(card => {
                return (
                  <Card
                    key={card._id}
                    admin={card.isAdmin}
                    card={card}
                    me={me}
                  />
                );
              })}
            </div>
            <div className={styles.body__right__bottom}>
              <div className={styles.body__right__bottom__top}>
                <div className={styles.body__right__bottom__top__left}>
                  {me.username}
                </div>
                <div className={styles.body__right__bottom__top__right}>
                  Slide
                </div>
              </div>
              <button onClick={this.handleClickCardSubmit}>TEST</button>
              <textarea
                className={styles.body__right__bottom__textarea}
                placeholder="내용을 입력하세요"
                onChange={this.handleChangeCardInput}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomView);

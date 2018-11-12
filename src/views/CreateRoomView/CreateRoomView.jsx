import React, { Component } from "react";

import { connect } from "react-redux";
import Dropzone from "react-dropzone";

import { Button, NavigationBar, Futura, Highlight } from "../../components";

import { createRoomRequest } from "actions/roomAction";

import * as styles from "./CreateRoomView.scss";
import { uploadPDF } from "../../api/UploadAPI";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    room: state.roomReducer.room,
    // status: state.createroom.status,
    // data: state.createroom.data,
  };
};

const mapDispatchToProps = {
  createRoomRequest,
};

class CreateRoomView extends Component {
  state = {
    files: [],
    title: "",
    lecturer: "",
    password: "",
    isDone: false,
    isUpdate: false,
  };

  componentDidMount() {
    console.log(this.props.room);
    const roomId = this.props.match.params.roomId;
    console.log("업데이트 인가?[" + roomId + "]");

    //Room 정보 Update할 경우
    if (roomId) {
      //1. User Token이 Master인지 조회
      this.props.getAdmin(roomId);

      if (this.props.data.admin) {
        //2. Room 정보 가져와서 셋팅
        this.props.getRoom(roomId).then(() => {
          this.setState({
            files: this.props.data.files,
            title: this.props.data.title,
            writer: this.props.data.writer,
            password: this.props.data.password,
            isUpdate: true,
          });
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps Event");
    const { room, history } = nextProps;
    if (nextProps.room !== null) {
      history.push(`room/${room.url}`);
    }
  }

  async onDrop(files) {
    console.log(files);

    this.setState({
      files,
    });
  }

  /**
   * 관리자가 생성/수정 버튼 클릭 시 발생하는 fn
   */
  handleUpload = event => {
    const { title, lecturer, password, files } = this.state;
    this.props.createRoomRequest({ title, lecturer, password });
    // const url = await uploadPDF({ file: files[0] });
    // console.log(url);
    // event.preventDefault();
    // const { files, title, writer, password, isUpdate } = this.state;
    // //파일 업로드->제목->작성자 순으로 focus 이동시켜 버리기
    // if (files.length < 1 || !title || !writer) {
    //   let strBuffer = "";
    //   strBuffer += files.length < 1 ? "파일 업로드 " : "";
    //   strBuffer += !title ? "제목 " : "";
    //   strBuffer += !writer ? "작성자 " : "";
    //   strBuffer += " 입력하세요.";
    //   alert(strBuffer);
    //   return false;
    // }
    // //FormData 형식으로 Data 가공
    // const formData = new FormData();
    // formData.append("file", files);
    // formData.append("title", title);
    // formData.append("writer", writer);
    // formData.append("password", password);
    // if (isUpdate) {
    //   this.props.updateRoom(formData).then(() => {
    //     if (this.props.status === "SUCCEED_UPDATE_ROOM")
    //       this.setState({ isDone: true });
    //   });
    // } else {
    //   this.props.setRoom(formData).then(() => {
    //     if (this.props.status === "SUCCEED_CREATE_ROOM")
    //       this.setState({ isDone: true });
    //   });
    // }
  };

  /**
   *관리자가 input element에 value 입력시(onChange Event) state에 저장하는 함수
   *name property에 따른 code 분기
   */
  handleOnChange = event => {
    event.preventDefault();

    var comp = event.target.name;
    switch (comp) {
      case "title":
        this.setState({ title: event.target.value });
        break;
      case "writer":
        this.setState({ lecturer: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      default:
        return;
    }
  };

  /**
   * 사용자가 취소 버튼 시 뒤로가기 동작 fn
   */
  cancelPage = e => {
    e.preventDefault();
    const { history } = this.props;
    history.push("/");
    console.log("취소동작");
  };

  /**
   * file upload form
   */
  uploadform = () => {
    return (
      <section className={styles.uploadForm}>
        <div className={styles.uploadForm__Rect}>
          <Dropzone
            className={styles.uploadForm__Rect__Dropzone}
            onDrop={this.onDrop.bind(this)}
            accept=".pdf"
            multiple={false}
            disabled={this.state.isUpdate}
          >
            <div className={styles.uploadForm__Rect__Content}>
              {this.state.files.length > 0 && this.state.files.map(f => f.name)}
              {this.state.files.length > 0 && <br />}
              <Button>
                <Futura>CLICK TO UPLOAD FILE</Futura>
              </Button>
              <br />
              <Futura>OR JUST DRAG AND DROP IT</Futura>
            </div>
          </Dropzone>
        </div>
      </section>
    );
  };

  /**
   * input form
   */
  inputform = () => {
    return (
      <div className={styles.inputForm} name="inputform">
        <h1 className={styles.inputForm__title}>
          <Highlight block>강연 생성하기</Highlight>
        </h1>
        <div className={styles.inputForm__body}>
          <label className={styles.inputForm__body__label}>
            <span>방 이름</span>
            <input
              className={styles.inputForm__input}
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleOnChange}
            />
          </label>
          <label className={styles.inputForm__body__label}>
            <span>강연자 이름</span>
            <input
              className={styles.inputForm__input}
              name="writer"
              type="text"
              value={this.state.lecturer}
              onChange={this.handleOnChange}
            />
          </label>
          <label className={styles.inputForm__body__label}>
            <span>비밀번호</span>
            <input
              className={styles.inputForm__input}
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleOnChange}
            />
          </label>
        </div>
      </div>
    );
  };

  /**
   * submit 하는 button form
   */
  submitform = () => {
    return (
      <div className={styles.submitForm} name="submitform">
        <Button
          className={styles.submitForm__button}
          name="btn_cancel"
          onClick={this.handleUpload}
        >
          <Futura>OK</Futura>
        </Button>
        <Button
          className={styles.submitForm__button}
          name="btn_ok"
          onClick={this.cancelPage}
        >
          <Futura>CANCEL</Futura>
        </Button>
      </div>
    );
  };

  render() {
    return (
      <div className={styles.createRoomView}>
        <NavigationBar />
        <div className={styles.body} name="body">
          <div className={styles.body__container} name="body_container">
            <div className={styles.body__container__left}>
              <div className={styles.uploadRect} name="upload_rect">
                {this.uploadform()}
              </div>
            </div>
            <div className={styles.body__container__right}>
              <div className={styles.inputRect} name="input_rect">
                {this.inputform()}
              </div>
              <div className={styles.submitRect} name="submit_rect">
                {this.submitform()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateRoomView.defaultProps = defaultProps;
CreateRoomView.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoomView);

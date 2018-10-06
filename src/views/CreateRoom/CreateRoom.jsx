import React, { Component } from "react";
import { connect } from "react-redux";
import { NavigationBar } from "../../components";
import * as styles from "./CreateRoom.scss";
import Dropzone from "react-dropzone";
import { Redirect } from "react-router-dom";
import * as createroomActions from "../../modules/createroom";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    status: state.createroom.status,
    data: state.createroom.data,
  };
};

const mapDispatchToProps = dispatch => ({
  getAdmin: roomId => dispatch(createroomActions.getAdmin(roomId)),
  getRoom: roomId => dispatch(createroomActions.getRoom(roomId)),
  setRoom: data => dispatch(createroomActions.setRoom(data)),
  updateRoom: data => dispatch(createroomActions.updateRoom(data)),
});

class CreateRoom extends Component {
  state = {
    files: [],
    title: "",
    writer: "",
    password: "",
    isDone: false,
    isUpdate: false,
  };

  componentDidMount() {
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
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }

  /**
   * 관리자가 생성/수정 버튼 클릭 시 발생하는 fn
   */
  handleUpload = event => {
    event.preventDefault();
    const { files, title, writer, password, isUpdate } = this.state;

    //파일 업로드->제목->작성자 순으로 focus 이동시켜 버리기
    if (files.length < 1 || !title || !writer) {
      let strBuffer = "";
      strBuffer += files.length < 1 ? "파일 업로드 " : "";
      strBuffer += !title ? "제목 " : "";
      strBuffer += !writer ? "작성자 " : "";
      strBuffer += " 입력하세요.";
      alert(strBuffer);
      return false;
    }

    //FormData 형식으로 Data 가공
    const formData = new FormData();
    formData.append("file", files);
    formData.append("title", title);
    formData.append("writer", writer);
    formData.append("password", password);

    if (isUpdate) {
      this.props.updateRoom(formData).then(() => {
        if (this.props.status === "SUCCEED_UPDATE_ROOM")
          this.setState({ isDone: true });
      });
    } else {
      this.props.setRoom(formData).then(() => {
        if (this.props.status === "SUCCEED_CREATE_ROOM")
          this.setState({ isDone: true });
      });
    }
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
        this.setState({ writer: event.target.value });
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
  cancelPage = event => {
    event.preventDefault();
    this.props.history.push("/");
    console.log("취소동작");
  };

  /**
   * submit 하는 button form
   */
  submitform = () => {
    return (
      <div className={styles.submitForm} name="submitform">
        <button
          className={styles.submitForm_cancel}
          name="btn_cancel"
          onClick={this.cancelPage}
        >
          취소
        </button>
        <button
          className={styles.submitForm_ok}
          name="btn_ok"
          onClick={this.handleUpload}
        >
          확인
        </button>
      </div>
    );
  };

  /**
   * input form
   */
  inputform = () => {
    return (
      <div className={styles.inputForm} name="inputform">
        <div className={styles.inputForm_titleRect}>
          <p className={styles.inputForm_titleRect_left}>방 이름 :</p>
          <input
            className={styles.inputForm_title}
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleOnChange}
            placeholder="방 이름"
          />
        </div>
        <div className={styles.inputForm_writerRect}>
          <p className={styles.inputForm_titleRect_left}>강연자 이름 :</p>
          <input
            className={styles.iputForm_writer}
            name="writer"
            type="text"
            value={this.state.writer}
            onChange={this.handleOnChange}
            placeholder="작성자"
          />
        </div>
        <div className={styles.inputForm_passwordRect}>
          <p className={styles.inputForm_titleRect_left}>비밀번호 :</p>
          <input
            className={styles.inputForm_password}
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleOnChange}
            placeholder="비밀번호"
          />
        </div>
      </div>
    );
  };

  /**
   * file upload form
   */
  uploadform = () => {
    return (
      <section className={styles.uploadForm}>
        <div className={styles.uploadForm_Rect}>
          <Dropzone
            className={styles.uploadForm_Rect_Dropzone}
            onDrop={this.onDrop.bind(this)}
            accept=".pdf"
            multiple={false}
            disabled={this.state.isUpdate}
          >
            <p className={styles.uploadForm_Rect_Content}>
              {this.state.files.length > 0 && this.state.files.map(f => f.name)}
              {this.state.files.length > 0 && <br />}
              파일을 첨부해주세요 !<br />
              Drag and Drop or Click !
            </p>
          </Dropzone>
        </div>
      </section>
    );
  };

  render() {
    const redirect = this.state.isDone ? (
      <Redirect to="/Room" />
    ) : (
      <NavigationBar />
    );

    return (
      <div className={styles.root}>
        <div name="head">{redirect}</div>
        <div className={styles.body} name="body">
          <div className={styles.body_container} name="body_container">
            <div className={styles.body_container_left}>
              <div className={styles.uploadRect} name="upload_rect">
                {this.uploadform()}
              </div>
            </div>
            <div className={styles.body_container_right}>
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

CreateRoom.defaultProps = defaultProps;
CreateRoom.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoom);

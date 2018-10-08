// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { PdfViewer } from "../../components";
import * as generateroomAction from "../../modules/GenerateRoom";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    status: state.GenerateRoom.status,
    room: state.GenerateRoom.room,
  };
};

const mapDispatchToProps = dispatch => ({
  getRoom: roomId => dispatch(generateroomAction.getRoom(roomId)),
});

class GenerateRoomView extends PureComponent {
  state = {
    isAdmin: false,
    room: {
      file:
        "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      title: "",
      writer: "",
      password: "",
      date: "",
      url: window.location.href,
    },
  };

  componentDidMount() {
    //URL에서 값 가져와야함
    const { roomId } = this.props;

    this.props.getRoom(roomId).then(() => {
      if (this.props.status === "SUCCEED_GET_ROOM")
        this.setState({ room: this.props.room });
    });
  }

  handleModify = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    console.log("수정" + params.get("id") + ",");
    //this.props.history.push("/create:update");
  };

  render() {
    const { isAdmin } = this.state.isAdmin;
    const { file, title, writer, date, url } = this.state.room;
    return (
      <div>
        <div name="pdf_rect">
          {isAdmin && <button onClick={this.handleModify}>수정</button>}
          <PdfViewer
            file={file}
            title={title}
            writer={writer}
            date={date}
            link={url}
          />
        </div>
      </div>
    );
  }
}

GenerateRoomView.defaultProps = defaultProps;
GenerateRoomView.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateRoomView);

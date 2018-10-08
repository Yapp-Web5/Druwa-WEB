import React, { PureComponent } from "react";
import Popup from "reactjs-popup";
import ReactResizeDetector from "react-resize-detector";
import Fullscreen from "react-fullscreen-crossbrowser";

import PdfElement from "./PdfElement";
import { Highlight } from "../";

import img_arrow_next from "../../static/imgs/arrow_next.png";
import img_arrow_prev from "../../static/imgs/arrow_prev.png";
import img_link from "../../static/imgs/link.png";
import img_fullscreen from "../../static/imgs/fullscreen.png";

import * as styles from "./PdfViewer.scss";

class PdfViewer extends PureComponent {
  state = {
    numPages: null,
    pageNumber: 1,
    file: "",
    isFullscreenEnabled: false,
    open: false,
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleOnKeyup);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleOnKeyup);
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  handlePrev = () => {
    if (this.state.pageNumber <= 1) return;

    this.setState({ pageNumber: this.state.pageNumber - 1 });
  };

  handleNext = () => {
    if (this.state.pageNumber >= this.state.numPages) return;
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  };

  handleOnSelect = event => {
    event.stopPropagation();
    const select_text = window.getSelection().toString();
    console.log("select된 text[" + select_text + "]");
  };

  handleFullScreen = () => {
    const isFullScreen = this.state.isFullscreenEnabled;
    isFullScreen
      ? this.setState({ isFullscreenEnabled: false })
      : this.setState({ isFullscreenEnabled: true });
  };
  handleonFocus = event => {
    const comp = event.target;
    comp.select();
    document.execCommand("copy");
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

  //Popup Event
  openModal = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false });
  };

  /**
   * Room 제목, 작성자, 날짜 정보 Form
   * props로 부모로 부터 값 받기
   */
  information_rect = () => {
    const { title, writer, date } = this.props;
    return (
      <div className={styles.info} name="information_rect">
        <h1 className={styles.info__title}>
          <Highlight>{title}</Highlight>
        </h1>
        <div type="text">By {writer}</div>
        <div type="text">Updated {date}</div>
      </div>
    );
  };

  /**
   * Pdf 좌/우 이동 버튼 Form
   */
  pdfmove_rect = () => {
    return (
      <div className={styles.pdfmove_rect} name="pdfmove_rect">
        <button className={styles.pdfmove_rect_prev} onClick={this.handlePrev}>
          <img src={img_arrow_prev} className={styles.arrow_prev} alt="prev" />
        </button>
        <div className={styles.pdfmove_rect_index}>
          {this.state.pageNumber}/{this.state.numPages}
        </div>
        <button className={styles.pdfmove_rect_next} onClick={this.handleNext}>
          <img src={img_arrow_next} className={styles.arrow_next} alt="next" />
        </button>
      </div>
    );
  };

  /**
   * 링크, 전체화면 버튼 Form
   * 링크 : 부모로부터 props 받음 없으면 현재 URL
   */
  util_rect = () => {
    //if null인 경우 현재 URL
    const { link } = this.props;
    const { open } = this.state;
    return (
      <div className={styles.util_rect} name="util_rect">
        <button className={styles.util_rect_link} onClick={this.openModal}>
          <img src={img_link} className={styles.link} alt="link" />
        </button>
        <button
          className={styles.util_rect_fullscreen}
          onClick={this.handleFullScreen}
        >
          <img
            src={img_fullscreen}
            className={styles.fullscreen}
            alt="fullscreen"
          />
        </button>
        <Popup open={open} closeOnDocumentClick onClose={this.closeModal}>
          <div className={styles.popup}>
            <div className={styles.popup_top}>
              강연 링크 복사가 완료 되었습니다!
            </div>
            <input
              className={styles.popup_middle}
              type="text"
              value={link}
              readOnly={true}
              autoFocus={true}
              onFocus={this.handleonFocus}
            />
            <br />
            <button className={styles.popup_bottom} onClick={this.closeModal}>
              ok
            </button>
          </div>
        </Popup>
      </div>
    );
  };

  render() {
    const { isFullscreenEnabled } = this.state;
    const { file } = this.props;
    const fullscreen_classname = !isFullscreenEnabled
      ? styles.pdf_view
      : styles.pdf_view_full;

    return (
      <div className={styles.pdfViewer} onKeyUp={this.handleOnKeyup}>
        <Fullscreen
          enabled={isFullscreenEnabled}
          onChange={isFullscreenEnabled =>
            this.setState({ isFullscreenEnabled })
          }
        >
          <div
            className={fullscreen_classname}
            name="pdf_view"
            onMouseUp={this.handleOnSelect}
          >
            <ReactResizeDetector handleWidth handleHeight>
              {(width, height) => (
                <PdfElement
                  className="full-screenable-node"
                  file={file}
                  pageNumber={this.state.pageNumber}
                  onDocumentLoad={this.onDocumentLoad}
                  width={width}
                />
              )}
            </ReactResizeDetector>
          </div>
        </Fullscreen>
        <div className={styles.pdf_bottom} name="pdf_bottom">
          {!isFullscreenEnabled && this.information_rect()}
          <div className={styles.util}>
            {!isFullscreenEnabled && this.pdfmove_rect()}
            {!isFullscreenEnabled && this.util_rect()}
          </div>
        </div>
      </div>
    );
  }
}

export default PdfViewer;

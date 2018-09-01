// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import * as socketIO from "socket.io-client";
import { connect } from "react-redux";

import { Element } from "react-scroll";

import Pic01 from "../../static/imgs/001.png";
import Pic02 from "../../static/imgs/002.png";

import { NavigationBar } from "../../components";
import { SERVER_END_POINT } from "../../configs/server";

import * as styles from "./MainView.scss";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {};
};

class MainView extends Component {
  componentDidMount() {
    socketIO(SERVER_END_POINT);
  }
  render() {
    return (
      <div className={styles.mainPage}>
        <NavigationBar />
        <Element name="intro">
          <section className={styles.header}>
            <div className={styles.title}>
              강연, 듣기만 하지말고
              <br />
              이제 실시간 소통하러
            </div>
            <h1 className={styles.logo}>DRUWA!</h1>
          </section>
        </Element>
        <Element name="why">
          <section className={styles.section__left}>
            <div className={styles.content}>
              <div className={styles.number}>01</div>
              <div className={styles.logo}>DRUWA</div>
              <h2 className={styles.title}>빠른 접근성</h2>
              <p className={styles.description}>
                로그인 없이 누구나 편리하게 접근할 수 있습니다. 간편링크를 통해
                접속하고,
                <br /> 부여받은 랜덤 닉네임으로 참여하여 강연자, 청취자 분들과
                소통할 수 있습니다.
              </p>
              <img src={Pic01} className={styles.pic01} alt="001" />
            </div>
          </section>
        </Element>
        <section className={styles.section__right}>
          <div className={styles.content}>
            <div className={styles.number}>02</div>
            <div className={styles.logo}>DRUWA</div>
            <h2 className={styles.title}>실시간 커뮤니케이션</h2>
            <p className={styles.description}>
              강연이 진행되는 동안, 궁금한 부분을 자유롭게 카드 형태로 소통할 수
              있습니다. <br />
              그리고 다른 사람의 글에 댓글을 달 수 있기 때문에 Active하게 강연을
              즐길 수 있습니다.
            </p>
          </div>
        </section>
        <section className={styles.section__left}>
          <div className={styles.content}>
            <div className={styles.number}>03</div>
            <div className={styles.logo}>DRUWA</div>
            <h2 className={styles.title}>
              PDF Reminding
              <br />
              그리고 Review 기능
            </h2>
            <p className={styles.description}>
              로그인 없이 누구나 편리하게 접근할 수 있습니다. 간편링크를 통해
              접속하고,
              <br /> 부여받은 랜덤 닉네임으로 참여하여 강연자, 청취자 분들과
              소통할 수 있습니다.
            </p>
            <img src={Pic02} className={styles.pic02} alt="002" />
          </div>
        </section>
      </div>
    );
  }
}

MainView.defaultProps = defaultProps;
MainView.propTypes = propTypes;

export default connect(mapStateToProps)(MainView);

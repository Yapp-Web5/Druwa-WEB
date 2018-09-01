// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { Fade } from "react-reveal";

import { connect } from "react-redux";
import { Element } from "react-scroll";
import ScrollTrigger from "react-scroll-trigger";

import * as socketIO from "socket.io-client";
import cx from "classnames";

import Pic01 from "../../static/imgs/001.png";
import Pic02 from "../../static/imgs/002.png";
import Pic03 from "../../static/imgs/003.png";

import { NavigationBar } from "../../components";
import { SERVER_END_POINT } from "../../configs/server";

import * as styles from "./MainView.scss";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {};
};

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIdx: 0,
      showImage: [false, false, false, false],
    };
  }

  componentDidMount() {
    socketIO(SERVER_END_POINT);
  }

  render() {
    const { showImage } = this.state;
    return (
      <div className={styles.mainPage}>
        <NavigationBar />
        <Element name="intro">
          <section className={styles.intro}>
            <div className={styles.title}>
              강연, 듣기만 하지말고
              <br />
              이제 실시간 소통하러
            </div>
            <h1 className={styles.logo}>DRUWA!</h1>
          </section>
        </Element>
        <ScrollTrigger onEnter={this.handleScrollTriger(0)}>
          <Element name="why">
            <section className={styles.section__left}>
              <div className={styles.content}>
                <div className={styles.number}>01</div>
                <div className={styles.logo}>DRUWA</div>
                <h2 className={styles.title}>빠른 접근성</h2>
                <p className={styles.description}>
                  로그인 없이 누구나 편리하게 접근할 수 있습니다. 간편링크를
                  통해 접속하고,
                  <br /> 부여받은 랜덤 닉네임으로 참여하여 강연자, 청취자 분들과
                  소통할 수 있습니다.
                </p>
                <Fade right when={showImage[0]}>
                  <img src={Pic02} className={styles.pic02} alt="002" />
                </Fade>
              </div>
            </section>
          </Element>
        </ScrollTrigger>
        <ScrollTrigger onEnter={this.handleScrollTriger(1)}>
          <section className={styles.section__right}>
            <div className={styles.content}>
              <div className={styles.number}>02</div>
              <div className={styles.logo}>DRUWA</div>
              <h2 className={styles.title}>실시간 커뮤니케이션</h2>
              <p className={styles.description}>
                강연이 진행되는 동안, 궁금한 부분을 자유롭게 카드 형태로 소통할
                수 있습니다. <br />
                그리고 다른 사람의 글에 댓글을 달 수 있기 때문에 Active하게
                강연을 즐길 수 있습니다.
              </p>
              <Fade left when={showImage[1]}>
                <img src={Pic01} className={styles.pic01} alt="001" />
              </Fade>
            </div>
          </section>
        </ScrollTrigger>
        {this.renderSelectSelection()}
        <ScrollTrigger onEnter={this.handleScrollTriger(2)}>
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
              <Fade right when={showImage[2]}>
                <img src={Pic02} className={styles.pic02} alt="002" />
              </Fade>
            </div>
          </section>
        </ScrollTrigger>
        <ScrollTrigger onEnter={this.handleScrollTriger(3)}>
          <section className={styles.section__right}>
            <div className={styles.content}>
              <div className={styles.number}>04</div>
              <div className={styles.logo}>DRUWA</div>
              <h2 className={styles.title}>
                잘 모르겠다구요?
                <br />
                우선 직접 체험해보세요!
              </h2>
              <div>
                <Fade bottom when={showImage[3]}>
                  <img src={Pic03} className={styles.pic03} alt="003" />
                </Fade>
              </div>
            </div>
          </section>
        </ScrollTrigger>
        <section className={styles.intro}>
          <div className={styles.title}>
            강연, 듣기만 하지말고
            <br />
            이제 실시간 소통하러
          </div>
          <h1 className={styles.logo}>DRUWA!</h1>
          <button className={styles.startBtn}>START NOW</button>
        </section>

        <footer />
      </div>
    );
  }

  renderSelectSelection = () => {
    const { selectedIdx } = this.state;
    const menus = ["글쓰기", "댓글 달기와 Like", "추천순, 최신순 보기"];
    return (
      <section className={styles.selectSelection}>
        <div className={styles.content}>
          <ul className={styles.menu}>
            {menus.map((menu, index) => {
              return (
                <li
                  key={`${menu}__${index}`}
                  className={cx(styles.menu__item, {
                    [styles.active]: index === selectedIdx,
                  })}
                  onClick={this.handleClickSelectMenu(index)}
                >
                  <div className={styles.circle__small} />
                  <p className={styles.description}>{menu}</p>
                </li>
              );
            })}
          </ul>
          <ul className={styles.bars}>
            {menus.map((menu, index) => {
              return (
                <li
                  className={cx(styles.bars__bar, {
                    [styles.active]: index === selectedIdx,
                  })}
                />
              );
            })}
          </ul>
        </div>
      </section>
    );
  };

  handleClickSelectMenu = idx => () => {
    this.setState({
      selectedIdx: idx,
    });
  };

  handleScrollTriger = idx => () => {
    const { showImage } = this.state;
    this.setState({
      showImage: [
        ...showImage.slice(0, idx),
        true,
        ...showImage.slice(idx + 1),
      ],
    });
  };
}

MainView.defaultProps = defaultProps;
MainView.propTypes = propTypes;

export default connect(mapStateToProps)(MainView);

// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { PureComponent } from "react";
import { Fade } from "react-reveal";

import { connect } from "react-redux";
import { Element } from "react-scroll";
import ScrollTrigger from "react-scroll-trigger";

import * as socketIO from "socket.io-client";
import cx from "classnames";

import Pic01 from "../../static/imgs/pic01.png";
import Pic02 from "../../static/imgs/002.png";
import Pic03 from "../../static/imgs/003.png";

import { Button, Futura, Highlight, NavigationBar } from "../../components";
import { SERVER_END_POINT } from "../../configs/server";

import * as styles from "./MainView.scss";
import { createUser, getUser } from "../../api/UserAPI";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {};
};

class MainView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedIdx: 0,
      showImage: [false, false, false, false],
    };
  }

  async componentDidMount() {
    // socketIO(SERVER_END_POINT);

    let token = localStorage.getItem("token");

    if (token) {
      const user = await getUser(token);
      console.log(user);
    }

    if (!token) {
      const user = await createUser();
      console.log(user);
      localStorage.setItem("token", user.token);
      token = user.token;
    }

    const socket = socketIO.connect(
      SERVER_END_POINT,
      {
        query: {
          token,
        },
      }
    );

    // socket.on("message", message => {
    //   console.log(message);
    //   if (message.token) {
    //     localStorage.setItem("token", message.token);
    //   }
    // });
  }

  render() {
    const { showImage } = this.state;
    return (
      <div className={styles.mainPage}>
        <NavigationBar />
        <Element name="intro">
          <section className={styles.intro}>
            <div className={styles.title}>
              <Highlight block>발표강연의</Highlight>
              <br /><Highlight block>패러다임을 바꾸다</Highlight>
              <br />
              <Highlight block>
                <Futura>DRUWA .</Futura>
              </Highlight>
            </div>
            <img src={Pic01} alt="pic01" />
          </section>
          <Button>START NOW</Button>
        </Element>
        <div className={styles.body}>
          <ScrollTrigger onEnter={this.handleScrollTriger(0)}>
            <Element name="why">
              <section className={cx(styles.section, styles.left)}>
                <div className={styles.content}>
                  <div className={styles.number}>01</div>
                  <div className={styles.logo}>
                    <Futura>DRUWA</Futura>가 특별한 이유 하나
                  </div>
                  <h2 className={styles.title}>
                    <Highlight>빠른 접근성</Highlight>
                  </h2>
                  <p className={styles.description}>
                    <Highlight strong>로그인 없이 누구나 편리하게</Highlight>{" "}
                    접근할 수 있습니다.
                    <br />
                    <Highlight strong>간편링크를 통해 접속</Highlight>
                    하고, 부여받은 랜덤 닉네임으로 참여하여
                    <br />
                    <Highlight strong>강연자, 청취자 분들과 소통</Highlight>할
                    수 있습니다.
                  </p>
                  <Fade right when={showImage[0]}>
                    <img src={Pic02} className={styles.pic02} alt="002" />
                  </Fade>
                </div>
              </section>
            </Element>
          </ScrollTrigger>
          <ScrollTrigger onEnter={this.handleScrollTriger(1)}>
            <section className={cx(styles.section, styles.right)}>
              <div className={styles.content}>
                <div className={styles.number}>02</div>
                <div className={styles.logo}>DRUWA</div>
                <h2 className={styles.title}>실시간 커뮤니케이션</h2>
                <p className={styles.description}>
                  강연이 진행되는 동안, 궁금한 부분을 자유롭게 카드 형태로
                  소통할 수 있습니다. <br />
                  그리고 다른 사람의 글에 댓글을 달 수 있기 때문에 Active하게
                  강연을 즐길 수 있습니다.
                </p>
                <Fade left when={showImage[1]}>
                  <img src={Pic01} className={styles.pic01} alt="001" />
                </Fade>
              </div>
            </section>
          </ScrollTrigger>
          {/* {this.renderSelectSelection()} */}
          <ScrollTrigger onEnter={this.handleScrollTriger(2)}>
            <section className={cx(styles.section, styles.left)}>
              <div className={styles.content}>
                <div className={styles.number}>03</div>
                <div className={styles.logo}>
                  <Futura>DRUWA</Futura>가 특별한 이유 셋
                </div>
                <h2 className={styles.title}>
                  <Highlight>PDF Reminding</Highlight>
                  <br />
                  <Highlight>그리고 Review 기능</Highlight>
                </h2>
                <p className={styles.description}>
                  <Highlight strong>강연이 끝나더라도, 링크만 있다면</Highlight>{" "}
                  언제든 다시
                  <br />
                  <Highlight strong>
                    강연 중 커뮤니케이션 했던 내용을 Reminding
                  </Highlight>{" "}
                  할 수 있습니다.
                </p>
                <Fade right when={showImage[2]}>
                  <img src={Pic02} className={styles.pic02} alt="002" />
                </Fade>
              </div>
            </section>
          </ScrollTrigger>
          <ScrollTrigger onEnter={this.handleScrollTriger(3)}>
            <Element name="example">
              <section className={cx(styles.section, styles.right)}>
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
            </Element>
          </ScrollTrigger>
        </div>
        <section className={styles.lastSection}>
          <div className={styles.description}>
            <Highlight block>강연, 듣기만 하지말고</Highlight>
            <br />
            <Highlight block>이제 실시간 소통하러</Highlight>
          </div>
          <div className={styles.logo}>
            <Futura>DRUWA!</Futura>
          </div>
          <div>
            <Button className={styles.button}>
              <Futura>START NOW</Futura>
            </Button>
          </div>
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

import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import _ from "lodash";

import UserAccount from "./Modal/UserAccount";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { imgHomeHeader } from "../HomePage/ImgList";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
    this.state = {
      isShowPopup: false,
      userLogin: {},
    };
  }
  escFunction(event) {
    if (event.key === "Escape") {
      this.setState({
        isOpenCreateBookingModal: false,
      });
    }
  }
  componentDidMount() {
    let userLogin = JSON.parse(window.localStorage.getItem("user"));
    if (userLogin && !_.isEmpty(userLogin)) {
      this.setState({
        userLogin: userLogin,
      });
    }
    // console.log('check login data: ', userLogin )
  }

  changeLanguage = (language) => {
    this.props.toggleLanguage(language);
  };
  handleUserPopup = () => {
    this.setState({
      isShowPopup: true,
    });
  };
  toggleLoginModal = () => {
    this.setState({
      isShowPopup: !this.state.isShowPopup,
    });
  };
  render() {
    let { language, isLoggedIn } = this.props;
    let userLogin = JSON.parse(window.localStorage.getItem("user"));
    let { isShowPopup } = this.state;
    // console.log('check login data after did mount: ', isLoggedIn )

    return (
      <React.Fragment>
        <header className="header">
          <div className="home-header-container text-light-white ">
            <div className="home-header-content container row ">
              <div className="left-content col-xl-2 col-lg-3 col-md-3 col-sm-3 col-2">
                <i className="fas fa-bars"></i>
                <div className="logo-both">
                  <div className="header-logo logo">
                    <img
                      className="header-logo-img"
                      src={imgHomeHeader.logo_logo}
                    ></img>
                  </div>
                  <div className="header-logo text">
                    <img
                      className="header-text-img"
                      src={imgHomeHeader.logo_text}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="center-content col-xl-8 col-lg-7 col-md-6 col-sm-5 col-2">
                <div className="child-content">
                  <div className="header-title">
                    <b>
                      <FormattedMessage id="homeheader.speciality" />
                    </b>
                  </div>
                  <div className="header-sub-title">
                    <FormattedMessage id="homeheader.speciality-sub" />
                  </div>
                </div>
                <div className="child-content">
                  <div className="header-title">
                    <b>
                      <FormattedMessage id="homeheader.medical-central" />
                    </b>
                  </div>
                  <div className="header-sub-title">
                    <FormattedMessage id="homeheader.medical-central-sub" />
                  </div>
                </div>
                <div className="child-content">
                  <div className="header-title">
                    <b>
                      <FormattedMessage id="homeheader.doctors" />
                    </b>
                  </div>
                  <div className="header-sub-title">
                    <FormattedMessage id="homeheader.doctors-sub" />
                  </div>
                </div>
                <div className="child-content">
                  <div className="header-title">
                    <b>
                      <FormattedMessage id="homeheader.package" />
                    </b>
                  </div>
                  <div className="header-sub-title">
                    <FormattedMessage id="homeheader.package-sub" />
                  </div>
                </div>
              </div>
              <div className="right-content col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6">
                <div className="dark-mode img-icon">
                  <button
                    className="btn"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Dark/Light Mode"
                  >
                    <i className="fas fa-adjust dark-mode-icon right-icon active"></i>
                  </button>
                </div>

                <div className="languages img-icon">
                  <div className="language">
                    <button
                      className={
                        language === LANGUAGES.VI
                          ? "btn lang-logo-vi active"
                          : "btn lang-logo-vi"
                      }
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Kích để chuyển sang Tiếng Việt"
                      onClick={() => this.changeLanguage(LANGUAGES.VI)}
                    ></button>
                  </div>
                  <div className="language">
                    <button
                      className={
                        language === LANGUAGES.EN
                          ? "btn lang-logo-en active"
                          : "btn lang-logo-en"
                      }
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Click here to switch English"
                      onClick={() => this.changeLanguage(LANGUAGES.EN)}
                    ></button>
                  </div>
                </div>
                <div className="user-account img-icon">
                  {isLoggedIn === false ? (
                    <UserAccount />
                  ) : (
                    <UserAccount userLogin={userLogin} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {this.props.isShowBanner === true && (
            <div className="home-header-banner text-light-white">
              <div className="banner-upper">
                <div className="banner-title">
                  <span>
                    <FormattedMessage id="homebanner.title1" />
                  </span>
                  <span>
                    <FormattedMessage id="homebanner.title2" />
                  </span>
                </div>
                <div className="banner-search">
                  <div className="search-wrap">
                    <svg
                      className="search-icon "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                    >
                      <path
                        className="search-icon-logo"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        d="M15.028 15.334l4.644 4.644m-2.889-8.88a5.99 5.99 0 01-5.991 5.991 5.99 5.99 0 110-11.983 5.99 5.99 0 015.991 5.992z"
                      ></path>
                    </svg>
                    <input
                      className="search-input"
                      type="text"
                      placeholder={
                        language === LANGUAGES.EN
                          ? "Search for Doctors, Specialities or Medical Centre"
                          : "Tìm kiếm bác sĩ, chuyên khoa, hoặc cơ sở y tế"
                      }
                    />
                  </div>
                </div>
                <div className="banner-download">
                  <a href="" className="app-mobile google-play">
                    <img className="img" src={imgHomeHeader.google_play} />
                  </a>
                  <a href="" className="app-mobile app-store">
                    <img className="img" src={imgHomeHeader.app_store} />
                  </a>
                </div>
              </div>
              <div className="banner-lower">
                <div className="container">
                  <ul className="banner-options row">
                    <li className="banner-option col col-1-8">
                      <a href="" className=" icon-option speciality">
                        <button className="btn wrap-img">
                          <img className="img" src={imgHomeHeader.speciality} />
                        </button>
                        <div className="text-option">
                          <FormattedMessage id="homebanner.speciality" />
                        </div>
                      </a>
                    </li>
                    <li className="banner-option col col-1-8">
                      <a href="" className=" icon-option remote">
                        <button className="btn wrap-img">
                          <img className="img" src={imgHomeHeader.remote} />
                        </button>
                        <div className="text-option">
                          <FormattedMessage id="homebanner.remote" />
                        </div>
                      </a>
                    </li>
                    <li className="banner-option col col-1-8">
                      <a href="" className=" icon-option general">
                        <button className="btn wrap-img">
                          <img className="img" src={imgHomeHeader.general} />
                        </button>
                        <div className="text-option">
                          <FormattedMessage id="homebanner.general" />
                        </div>
                      </a>
                    </li>
                    <li className="banner-option col col-1-8">
                      <a href="" className=" icon-option test">
                        <button className="btn wrap-img">
                          <img className="img" src={imgHomeHeader.test} />
                        </button>
                        <div className="text-option">
                          <FormattedMessage id="homebanner.test" />
                        </div>
                      </a>
                    </li>
                    <li className="banner-option col col-1-8">
                      <a href="" className=" icon-option mental">
                        <button className="btn wrap-img">
                          <img className="img" src={imgHomeHeader.mental} />
                        </button>
                        <div className="text-option">
                          <FormattedMessage id="homebanner.mental" />
                        </div>
                      </a>
                    </li>
                    <li className="banner-option col col-1-8">
                      <a href="" className=" icon-option dentist">
                        <button className="btn wrap-img">
                          <img className="img" src={imgHomeHeader.dentist} />
                        </button>
                        <div className="text-option">
                          <FormattedMessage id="homebanner.dentist" />
                        </div>
                      </a>
                    </li>
                    <li className="banner-option col col-1-8">
                      <a href="" className=" icon-option surgery">
                        <button className="btn wrap-img">
                          <img className="img" src={imgHomeHeader.surgery} />
                        </button>
                        <div className="text-option">
                          <FormattedMessage id="homebanner.surgery" />
                        </div>
                      </a>
                    </li>
                    <li className="banner-option col col-1-8">
                      <a href="" className=" icon-option product">
                        <button className="btn wrap-img">
                          <img className="img" src={imgHomeHeader.product} />
                        </button>
                        <div className="text-option">
                          <FormattedMessage id="homebanner.product" />
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLanguage: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);

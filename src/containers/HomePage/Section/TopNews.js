import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import { FormattedMessage } from "react-intl";
import { changeLanguageApp } from "../../../store/actions/appActions";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class TopNews extends Component {
  changeLanguage = (language) => {
    this.props.toggleLanguage(language);
  };

  render() {
    let language = this.props.language;
    let paternity = "../../../assets/images/3_section_topnews/paternity.jpg";
    let counseling = "../../../assets/images/3_section_topnews/counseling.jpg";
    let homedoctor = "../../../assets/images/3_section_topnews/homedoctor.jpg";
    let sp02 = "../../../assets/images/3_section_topnews/sp02.jpg";
    let testcovid = "../../../assets/images/3_section_topnews/testcovid.jpg";
    return (
      <React.Fragment>
        <section>
          <div className="section section-topnews section-sink container">
            <div className="carousel row">
              <Slider {...this.props.settings}>
                <div className="slide">
                  <a className="slider-link" href="">
                    <div className="slider">
                      <img className="img col" src={paternity} />
                    </div>
                    <span className="slider-title">
                      <b>
                        <FormattedMessage id="topnews.paternity" />
                      </b>
                    </span>
                    <ul>
                      <li>
                        <FormattedMessage id="topnews.paternity1" />
                      </li>
                      <li>
                        <FormattedMessage id="topnews.paternity2" />
                      </li>
                      <li>
                        <FormattedMessage id="topnews.paternity3" />
                      </li>
                    </ul>
                    <span className="expansion">
                      <b>
                        <FormattedMessage id="topnews.more" />
                        <i className="fas fa-greater-than"></i>
                      </b>
                    </span>
                  </a>
                </div>
                <div className="slide">
                  <a className="slider-link" href="">
                    <div className="slider">
                      <img className="img col" src={counseling} />
                    </div>
                    <span className="slider-title">
                      <b>
                        <FormattedMessage id="topnews.counseling" />
                      </b>
                    </span>
                    <ul>
                      <li>
                        <FormattedMessage id="topnews.counseling1" />
                      </li>
                      <li>
                        <FormattedMessage id="topnews.counseling2" />
                      </li>
                      <li>
                        <FormattedMessage id="topnews.counseling3" />
                      </li>
                    </ul>
                    <span className="expansion">
                      <b>
                        <FormattedMessage id="topnews.more" />
                        <i className="fas fa-greater-than"></i>
                      </b>
                    </span>
                  </a>
                </div>
                <div className="slide">
                  <a className="slider-link" href="">
                    <div className="slider">
                      <img className="img col" src={homedoctor} />
                    </div>
                    <span className="slider-title">
                      <b>
                        <FormattedMessage id="topnews.homedoctor" />
                      </b>
                    </span>
                    <ul>
                      <li>
                        <FormattedMessage id="topnews.homedoctor1" />
                      </li>
                      <li>
                        <FormattedMessage id="topnews.homedoctor2" />
                      </li>
                      <li>
                        <FormattedMessage id="topnews.homedoctor3" />
                      </li>
                    </ul>
                    <span className="expansion">
                      <b>
                        <FormattedMessage id="topnews.more" />
                        <i className="fas fa-greater-than"></i>
                      </b>
                    </span>
                  </a>
                </div>
                <div className="slide">
                  <a className="slider-link" href="">
                    <div className="slider">
                      <img className="img col" src={sp02} />
                    </div>
                    <span className="slider-title">
                      <b>
                        <FormattedMessage id="topnews.sp02" />
                      </b>
                    </span>
                    <ul>
                      <li>
                        <FormattedMessage id="topnews.sp021" />
                      </li>
                      <li>
                        <FormattedMessage id="topnews.sp022" />
                      </li>
                      <li>
                        <FormattedMessage id="topnews.sp023" />
                      </li>
                    </ul>
                    <span className="expansion">
                      <b>
                        <FormattedMessage id="topnews.more" />
                        <i className="fas fa-greater-than"></i>
                      </b>
                    </span>
                  </a>
                </div>
                <div className="slide">
                  <a className="slider-link" href="">
                    <div className="slider">
                      <img className="img col" src={testcovid} />
                    </div>
                    <span className="slider-title">
                      <b>
                        <FormattedMessage id="topnews.testcovid" />
                      </b>
                    </span>
                    <ul>
                      <li>
                        <FormattedMessage id="topnews.testcovid1" />
                      </li>
                      <li>
                        <FormattedMessage id="topnews.testcovid2" />
                      </li>
                      <li>
                        <FormattedMessage id="topnews.testcovid3" />
                      </li>
                    </ul>
                    <span className="expansion">
                      <b>
                        <FormattedMessage id="topnews.more" />
                        <i className="fas fa-greater-than"></i>
                      </b>
                    </span>
                  </a>
                </div>
              </Slider>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLanguage: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNews);

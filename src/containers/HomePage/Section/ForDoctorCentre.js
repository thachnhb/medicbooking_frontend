import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import { FormattedMessage } from "react-intl";
import { changeLanguageApp } from "../../../store/actions/appActions";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ForDoctorCentre extends Component {
  changeLanguage = (language) => {
    this.props.toggleLanguage(language);
  };

  render() {
    let language = this.props.language;
    let customerlifetimevalue =
      "../../../assets/images/8_section_for_doctor_centre/customerlifetimevalue.jpg";
    let improvecustomerservice =
      "../../../assets/images/8_section_for_doctor_centre/improvecustomerservice.jpg";
    let upcustomerexperienceinwaitingroom =
      "../../../assets/images/8_section_for_doctor_centre/upcustomerexperienceinwaitingroom.jpg";
    return (
      <React.Fragment>
        <section>
          <div className="section section-fordoctorcentre section-sink container">
            <div className="section-header">
              <span className="headline">
                <b>
                  <FormattedMessage id="fordoctorcentre.headline" />
                </b>
              </span>
              <div className="fordoctorcentre container row">
                <a href="" className="col explore">
                  <b>
                    <FormattedMessage id="fordoctorcentre.post" />
                  </b>
                </a>
                <a href="" className="col explore">
                  <b>
                    <FormattedMessage id="fordoctorcentre.contact" />
                  </b>
                </a>
                <a href="" className="col explore">
                  <b>
                    <FormattedMessage id="fordoctorcentre.cooperate" />
                  </b>
                </a>
              </div>
            </div>
            <div className="carousel row">
              <Slider {...this.props.settings}>
                <div className="slide">
                  <a className="slider-link" href="">
                    <div className="slider">
                      <img className="img col" src={customerlifetimevalue} />
                    </div>
                    <span className="fordoctorcentre-title">
                      <b>
                        <FormattedMessage id="fordoctorcentre.customerlifetimevalue" />
                      </b>
                    </span>
                  </a>
                </div>
                <div className="slide">
                  <a className="slider-link" href="">
                    <div className="slider">
                      <img className="img col" src={improvecustomerservice} />
                    </div>
                    <span className="fordoctorcentre-title">
                      <b>
                        <FormattedMessage id="fordoctorcentre.improvecustomerservice" />
                      </b>
                    </span>
                  </a>
                </div>
                <div className="slide">
                  <a className="slider-link" href="">
                    <div className="slider">
                      <img
                        className="img col"
                        src={upcustomerexperienceinwaitingroom}
                      />
                    </div>
                    <span className="fordoctorcentre-title">
                      <b>
                        <FormattedMessage id="fordoctorcentre.upcustomerexperienceinwaitingroom" />
                      </b>
                    </span>
                  </a>
                </div>
                <div className="slide">
                  <a className="slider-link" href="">
                    <div className="slider">
                      <img className="img col" src={customerlifetimevalue} />
                    </div>
                    <span className="fordoctorcentre-title">
                      <b>
                        <FormattedMessage id="fordoctorcentre.customerlifetimevalue" />
                      </b>
                    </span>
                  </a>
                </div>
                <div className="slide">
                  <a className="slider-link" href="">
                    <div className="slider">
                      <img className="img col" src={improvecustomerservice} />
                    </div>
                    <span className="fordoctorcentre-title">
                      <b>
                        <FormattedMessage id="fordoctorcentre.improvecustomerservice" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ForDoctorCentre);

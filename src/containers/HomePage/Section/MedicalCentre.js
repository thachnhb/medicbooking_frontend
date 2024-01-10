import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import { FormattedMessage } from "react-intl";
import { changeLanguageApp } from "../../../store/actions/appActions";
import * as action from "../../../store/actions";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class MedicalCentre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrClinics: [],
    };
  }
  changeLanguage = (language) => {
    this.props.toggleLanguage(language);
  };
  componentDidMount() {
    this.props.loadAllClinic();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.clinicRedux !== this.props.clinicRedux) {
      this.setState({
        arrClinics: this.props.clinicRedux,
      });
    }
  }
  handleDetailDoctor = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };
  render() {
    let language = this.props.language;
    let arrClinics = this.state.arrClinics;
    // console.log('view get all clinics: ', arrClinics);

    return (
      <React.Fragment>
        <section>
          <div className="section section-centre section-float container">
            <div className="section-header">
              <span className="col-xl-10 col-lg-10 col-md-9 col-sm-9 col-8 headline">
                <b>
                  <FormattedMessage id="centre.headline" />
                </b>
              </span>
              <a
                href=""
                className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-3 explore"
              >
                <b>
                  <FormattedMessage id="centre.explore" />
                </b>
              </a>
            </div>
            <div className="carousel row">
              <Slider {...this.props.settings}>
                {arrClinics &&
                  arrClinics.length > 0 &&
                  arrClinics.map((item, index) => {
                    let nameVi = `${item.nameVi}`;
                    let nameEn = `${item.nameEn}`;
                    return (
                      <div
                        className="slide"
                        key={index}
                        onClick={() => this.handleDetailDoctor(item)}
                      >
                        <div className="slider-link">
                          <div className="slider">
                            <img className="img col" src={item.image} />
                          </div>
                          <span className="clinic-title">
                            <b>{language === LANGUAGES.VI ? nameVi : nameEn}</b>
                          </span>
                        </div>
                      </div>
                    );
                  })}
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
    clinicRedux: state.admin.allClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLanguage: (language) => dispatch(changeLanguageApp(language)),
    loadAllClinic: () => dispatch(action.fetchAllClinic()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalCentre)
);

import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router";

import { getAllSpecialtyService } from "../../../services/userService";
import { changeLanguageApp } from "../../../store/actions/appActions";
import { LANGUAGES } from "../../../utils";

class Speciality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  changeLanguage = (language) => {
    this.props.toggleLanguage(language);
  };
  async componentDidMount() {
    let data = await getAllSpecialtyService();
    if (data && data.errCode === 0) {
      this.setState({
        dataSpecialty: data.data ? data.data : [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleDetailSpecialty = (specialty) => {
    // console.log('view info specialty: ', specialty);
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${specialty.id}`);
    }
  };
  render() {
    let language = this.props.language;
    let { dataSpecialty } = this.state;
    // console.log('data of specialty: ', dataSpecialty)
    return (
      <React.Fragment>
        <section>
          <div className="section section-speciality section-float container">
            <div className="section-header">
              <span className="col-xl-10 col-lg-10 col-md-9 col-sm-9 col-8 headline">
                <b>
                  <FormattedMessage id="specialities.headline" />
                </b>
              </span>
              <a
                href=""
                className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-3 explore"
              >
                <b>
                  <FormattedMessage id="specialities.explore" />
                </b>
              </a>
            </div>
            <div className="carousel row">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div className="slide" key={index}>
                        <a
                          className="slider-link"
                          href=""
                          onClick={() => this.handleDetailSpecialty(item)}
                        >
                          <div className="slider">
                            <img className="img col" src={item.image} />
                          </div>
                          <span className="specialty-title">
                            <b>
                              {language === LANGUAGES.VI
                                ? item.nameVi
                                : item.nameEn}
                            </b>
                          </span>
                        </a>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLanguage: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Speciality)
);

import React, { Component } from "react";
import { connect } from "react-redux";
import "../PatientSide/HeaderDetailPage.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { getInfoDoctorService } from "../../services/userService";

import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

class HeaderDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorInfoData: {},
      clinicInfoData: {},
      specialtyInfoData: {},
    };
  }
  changeLanguage = (language) => {
    this.props.toggleLanguage(language);
  };
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let doctorId = this.props.match.params.id;
      let DoctorInfo = await getInfoDoctorService(doctorId);
      if (DoctorInfo && DoctorInfo.errCode === 0) {
        this.setState({
          doctorInfoData: DoctorInfo.data,
        });
      }
    }
  }
  returnHomepage = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    let language = this.props.language;
    let logo_logo =
      "https://raw.githubusercontent.com/kanechan25/frontend-bookingcare.github.io/main/src/assets/images/1_header/logo.svg";
    let logo_text =
      "https://raw.githubusercontent.com/kanechan25/frontend-bookingcare.github.io/main/src/assets/images/1_header/logo_text.svg";
    let { doctorInfoData, clinicInfoData, specialtyInfoData } = this.state;

    let titleVi = "",
      titleEn = "",
      nameVi = "",
      nameEn = "";
    if (this.props.isDoctor === true) {
      if (doctorInfoData && doctorInfoData.titleData) {
        titleVi = `${doctorInfoData.titleData.valueVi}`;
        titleEn = `${doctorInfoData.titleData.valueEn}`;
        nameVi = `${doctorInfoData.lastName} ${doctorInfoData.firstName}`;
        nameEn = `${doctorInfoData.firstName} ${doctorInfoData.lastName}`;
      }
    }
    if (this.props.isClinic === true) {
      if (clinicInfoData && Object.keys(clinicInfoData).length > 0) {
        nameVi = `${clinicInfoData.nameVi}`;
        nameEn = `${clinicInfoData.nameEn}`;
      }
    }
    if (this.props.isSpecialty === true) {
      if (specialtyInfoData && Object.keys(specialtyInfoData).length > 0) {
        nameVi = `${specialtyInfoData.nameVi}`;
        nameEn = `${specialtyInfoData.nameEn}`;
      }
    }
    return (
      <React.Fragment>
        <header className="header">
          <div className="home-header-container text-light-white ">
            <div className="home-header-content container">
              <div className="left-header-page-content col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-1 col-1">
                <i className="fas fa-backward"></i>
                <a
                  className="logo-both"
                  href=""
                  onClick={() => this.returnHomepage()}
                >
                  <div className="header-logo logo">
                    <img className="header-logo-img" src={logo_logo}></img>
                  </div>
                  <div className="header-logo text">
                    <img className="header-text-img" src={logo_text}></img>
                  </div>
                </a>
              </div>
              <div className="center-header-page-content col-xxl-8 col-xl-8 col-lg-7 col-md-6 col-sm-8 col-8">
                <span className="headline headline-header-title">
                  {language === LANGUAGES.VI ? titleVi : titleEn}
                </span>
                <span className="headline headline-header-name">
                  {language === LANGUAGES.VI ? nameVi : nameEn}
                </span>
              </div>
              <div className="right-header-page-content col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-2 col-1">
                <div className="dark-mode">
                  <button
                    className="btn"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Dark/Light Mode"
                  >
                    <i className="fas fa-adjust dark-mode-icon active"></i>
                  </button>
                </div>

                <div className="languages">
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

                <i className="fas fa-bars"></i>
              </div>
            </div>
          </div>
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
  connect(mapStateToProps, mapDispatchToProps)(HeaderDetailPage)
);

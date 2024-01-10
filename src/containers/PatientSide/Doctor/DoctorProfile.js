import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Router from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { getDoctorProfileByIdService } from "../../../services/userService";
import * as actions from "../../../store/actions";
import { LANGUAGES, path } from "../../../utils";
import "./DoctorProfile.scss";
import _ from "lodash";
import moment from "moment";

// import { getExtraInfoByIdService } from '../../../services/userService'

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
    };
  }

  async componentDidMount() {
    let data = await this.getDoctorProfile(this.props.doctorId);
    this.setState({
      profileData: data,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let data = await this.getDoctorProfile(this.props.doctorId);
      this.setState({
        profileData: data,
      });
    }
  }

  getDoctorProfile = async (id) => {
    let result = {};
    if (id) {
      let res = await getDoctorProfileByIdService(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  renderDetailBooking = (bookingData) => {
    let { language } = this.props;
    if (bookingData && !_.isEmpty(bookingData)) {
      let scheduleTime =
        language === LANGUAGES.VI
          ? bookingData.timeTypeData.valueVi
          : bookingData.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+bookingData.date / 1000).format("ddd - DD/MM/YYYY")
          : moment
              .unix(+bookingData.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>{date}</div>
          <div>{scheduleTime}</div>
        </>
      );
    }
    return <></>;
  };

  render() {
    // console.log('props: ', this.props)
    let {
      language,
      doctorId,
      isShowDetailDoctor,
      isShowPrice,
      isShowLinkDetail,
      bookingData,
    } = this.props;
    let { profileData } = this.state;
    let titleNameVi = "",
      titleNameEn = "",
      doctorPrice = "";
    if (profileData && profileData.titleData) {
      titleNameVi = `${profileData.titleData.valueVi} ${profileData.lastName} ${profileData.firstName}`;
      titleNameEn = `${profileData.titleData.valueEn} ${profileData.firstName} ${profileData.lastName}`;
    }
    if (profileData && profileData.Doctor_Info) {
      doctorPrice =
        language === LANGUAGES.VI ? (
          <NumberFormat
            value={profileData.Doctor_Info.priceIdData.valueVi}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"VND"}
          />
        ) : (
          `$ ${profileData.Doctor_Info.priceIdData.valueEn}`
        );
    }
    return (
      <>
        <div className="doctor-profile container">
          <div className="intro-doctor-profile row">
            <div className="content-left col-md-3 col-12">
              <div
                className="img-avatar-doctor"
                style={{
                  backgroundImage: `url(${
                    profileData && profileData.image ? profileData.image : ""
                  })`,
                }}
              ></div>
            </div>
            <div className="content-right col-md-9 col-12">
              <div className="detail-doctor-info">
                <span className="doctor-title-name">
                  {language === LANGUAGES.VI ? titleNameVi : titleNameEn}
                </span>
                {isShowDetailDoctor === true ? (
                  <>
                    {profileData &&
                      profileData.Markdown &&
                      profileData.Markdown.description && (
                        <span className="doctor-detail-intro">
                          {profileData.Markdown.description}
                        </span>
                      )}
                  </>
                ) : (
                  <>{this.renderDetailBooking(bookingData)}</>
                )}
              </div>
            </div>
          </div>

          {isShowPrice === true && (
            <div className="fees-service">
              <FormattedMessage id="patientside.bookingdoctor.fee" />
              <div className="fees">{doctorPrice}</div>
            </div>
          )}
          <div className="fees-note">
            <FormattedMessage id="patientside.bookingdoctor.fee1" />
          </div>
          {isShowLinkDetail === true && (
            <div className="link-show-more">
              <Link
                className="hide-show-text"
                to={`/detail-doctor/${doctorId}`}
              >
                <FormattedMessage id="patientside.detailinfodoctor.show" />
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);

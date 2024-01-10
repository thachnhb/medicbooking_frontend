import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderDetailPage from "../HeaderDetailPage";
import "./DetailDoctor.scss";
import * as actions from "../../../store/actions";
import { getInfoDoctorService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import HomeFooter from "../../HomePage/HomeFooter";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorInfoData: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let doctorId = this.props.match.params.id;
      this.setState({
        currentDoctorId: doctorId,
      });

      let DoctorInfo = await getInfoDoctorService(doctorId);
      if (DoctorInfo && DoctorInfo.errCode === 0) {
        this.setState({
          doctorInfoData: DoctorInfo.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { doctorInfoData } = this.state;
    let { language } = this.props;
    let titleNameVi = "",
      titleNameEn = "";
    if (doctorInfoData && doctorInfoData.titleData) {
      titleNameVi = `${doctorInfoData.titleData.valueVi} ${doctorInfoData.lastName} ${doctorInfoData.firstName}`;
      titleNameEn = `${doctorInfoData.titleData.valueEn} ${doctorInfoData.firstName} ${doctorInfoData.lastName}`;
    }
    return (
      <>
        <HeaderDetailPage isDoctor={true} />
        <div className="doctor-container container">
          <div className="intro-doctor row">
            <div className="content-left col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-11 col-11">
              <div
                className="img-avatar-doctor"
                style={{
                  backgroundImage: `url(${
                    doctorInfoData && doctorInfoData.image
                      ? doctorInfoData.image
                      : ""
                  })`,
                }}
              ></div>
            </div>
            <div className="content-right col-xxl-10 col-xl-10 col-lg-10 col-md-9 col-sm-11 col-11">
              <div className="detail-doctor-info">
                <span className="doctor-title-name">
                  {language === LANGUAGES.VI ? titleNameVi : titleNameEn}
                </span>
                {doctorInfoData &&
                  doctorInfoData.Markdown &&
                  doctorInfoData.Markdown.description && (
                    <span className="doctor-detail-intro">
                      {doctorInfoData.Markdown.description}
                    </span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor row">
            <div className="schedule-left col-md-6 col-12">
              <DoctorSchedule doctorIdParent={this.state.currentDoctorId} />
            </div>
            <div className="schedule-right col-md-6 col-12">
              <DoctorExtraInfo doctorIdParent={this.state.currentDoctorId} />
            </div>
          </div>
          <div className="info-doctor">
            <div className="detail-doctor-info-main">
              {doctorInfoData &&
                doctorInfoData.Markdown &&
                doctorInfoData.Markdown.htmlContent && (
                  <span
                    className="doctor-detail-main"
                    dangerouslySetInnerHTML={{
                      __html: doctorInfoData.Markdown.htmlContent,
                    }}
                  ></span>
                )}
            </div>
          </div>
          <div className="comment-doctor"></div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    doctorDataInfo: state.admin.dataDoctorById,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

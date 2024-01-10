import React, { Component } from "react";
import { connect } from "react-redux";
import "./VerifyBooking.scss";
import BookingModal from "./Modal/BookingModal";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { postVerifyBookingAppointmentService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import HeaderDetailPage from "../HeaderDetailPage";

class VerifyBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyStatus: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookingAppointmentService({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          verifyStatus: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          verifyStatus: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { language } = this.props;
    let { verifyStatus, errCode } = this.state;

    return (
      <>
        <HeaderDetailPage />
        <div className="verify-booking container">
          {verifyStatus === false ? (
            <div className="notice-text">Loading data...</div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className="notice-text success">
                  Your booking has been verified!
                </div>
              ) : (
                <div className="notice-text fail">
                  Your booking has not existed or It was verified!
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allTime: state.admin.allTime,
    doctorDataInfo: state.admin.dataDoctorById,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);

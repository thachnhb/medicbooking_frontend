import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import * as actions from "../../../store/actions";
import BookingModal from "./Modal/BookingModal";
import { getScheduleDoctorService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
    this.state = {
      allDays: [],
      availableTime: [],
      isOpenCreateBookingModal: false,
      bookingData: {},
    };
  }

  escFunction(event) {
    if (event.key === "Escape") {
      this.setState({
        isOpenCreateBookingModal: false,
      });
    }
  }

  setArrayDate = () => {
    let { language } = this.props;
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (language === LANGUAGES.VI) {
        obj.label = moment(new Date()).add(i, "days").format("ddd - DD/MM");
      }
      if (language === LANGUAGES.EN) {
        obj.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(obj);
    }
    return allDays;
  };
  handleOnchangeSelectSchedule = async (e) => {
    let doctorId = this.props.doctorIdParent;
    if (doctorId && doctorId !== -1) {
      let date = e.target.value;
      let res = await getScheduleDoctorService(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          availableTime: res.schedule ? res.schedule : [],
        });
      }
    }
  };

  async componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);

    let allDays = this.setArrayDate();
    let doctorId = this.props.doctorIdParent;
    if (doctorId) {
      let res = await getScheduleDoctorService(doctorId, allDays[0].value);
      this.setState({
        allDays: allDays,
        availableTime: res.schedule ? res.schedule : [],
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let allDays = this.setArrayDate();
    let doctorId = this.props.doctorIdParent;
    if (this.props.language !== prevProps.language) {
      this.setState({
        allDays: allDays,
      });
    }
    if (doctorId !== prevProps.doctorIdParent) {
      let res = await getScheduleDoctorService(doctorId, allDays[0].value);
      this.setState({
        availableTime: res.schedule ? res.schedule : [],
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  handleClickBookingBtn = (item) => {
    this.setState({
      isOpenCreateBookingModal: true,
      bookingData: item,
    });
  };
  toggleBookingModal = () => {
    this.setState({
      isOpenCreateBookingModal: !this.state.isOpenCreateBookingModal,
    });
  };

  render() {
    let { allDays, availableTime } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule container">
          <div className="all-schedule">
            <select
              className="select-schedule-date"
              onChange={(e) => this.handleOnchangeSelectSchedule(e)}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="calender-headline">
              <span>
                <i className="fas fa-calendar-alt"></i>
                <FormattedMessage id="patientside.detaildoctor.schedule" />
              </span>
            </div>
            <div className="schedule-list">
              {availableTime && availableTime.length > 0 ? (
                availableTime.map((item, index) => {
                  let scheduleDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;
                  return (
                    <button
                      key={index}
                      className={"btn-time btn btn-light"}
                      onClick={() => this.handleClickBookingBtn(item)}
                    >
                      {scheduleDisplay}
                    </button>
                  );
                })
              ) : (
                <div className="no-schedule">
                  {" "}
                  <FormattedMessage id="patientside.detaildoctor.noschedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="booking-modal">
          <BookingModal
            isOpenCreateBookingModal={this.state.isOpenCreateBookingModal}
            toggleFromParent={this.toggleBookingModal}
            bookingData={this.state.bookingData}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

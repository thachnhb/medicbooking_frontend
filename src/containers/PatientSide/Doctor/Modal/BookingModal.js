import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import DoctorProfile from "../DoctorProfile";
import NumberFormat from "react-number-format";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";

import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import { postBookingAppointmentService } from "../../../../services/userService";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: "",
      firstName: "",
      lastName: "",
      telNum: "",
      gender: "",
      address: "",
      email: "",
      symptom: "",
      timeType: "",
      date: "",
      genderArr: [],
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.props.fetchGenderById();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (this.props.genderRedux !== prevProps.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (this.props.bookingData !== prevProps.bookingData) {
      if (this.props.bookingData && !_.isEmpty(this.props.bookingData)) {
        this.setState({
          doctorId: this.props.bookingData.doctorId,
          timeType: this.props.bookingData.timeType,
          date: this.props.bookingData.date,
        });
      }
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (e, inputId) => {
    let copyState = { ...this.state };
    copyState[inputId] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  renderBookingSchedule = (bookingData) => {
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
      return `${scheduleTime} - ${date}`;
    } else {
      return "";
    }
  };
  renderDoctorInfo = (bookingData) => {
    let { language } = this.props;
    if (bookingData && !_.isEmpty(bookingData)) {
      let doctorInfo =
        language === LANGUAGES.VI
          ? `${bookingData.doctorData.titleData.valueVi} ${bookingData.doctorData.lastName} ${bookingData.doctorData.firstName}`
          : `${bookingData.doctorData.titleData.valueEn} ${bookingData.doctorData.firstName} ${bookingData.doctorData.lastName}`;
      return doctorInfo;
    } else {
      return "";
    }
  };
  handleAddNewBooking = async () => {
    //validate
    let { firstName, lastName, telNum, email } = this.state;
    if (
      firstName &&
      lastName &&
      telNum &&
      email &&
      firstName !== "" &&
      lastName !== "" &&
      telNum !== "" &&
      email !== ""
    ) {
      //save booking appointment
      this.setState({
        isShowLoading: true,
      });
      // console.log('state finally before sending: ', this.state)
      let timeString = this.renderBookingSchedule(this.props.bookingData);
      let doctorInfo = this.renderDoctorInfo(this.props.bookingData);
      let res = await postBookingAppointmentService({
        doctorId: this.state.doctorId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        telNum: this.state.telNum,
        gender: this.state.gender,
        address: this.state.address,
        email: this.state.email,
        symptom: this.state.symptom,
        timeType: this.state.timeType,
        date: this.state.date,
        language: this.props.language,
        timeString: timeString,
        doctorInfo: doctorInfo,
      });
      if (res && res.errCode === 0) {
        this.setState({
          isShowLoading: false,
        });
        toast.success("You have booked successful! Please check your email!");
        this.toggle();
      } else {
        this.setState({
          isShowLoading: false,
        });
        toast.error("You have booked an appointment error!");
      }
    } else {
      alert(
        "Please enter fully mandatory inputs (full name *, telephone number * and email *"
      );
    }
  };

  render() {
    let { language } = this.props;
    let { isOpenCreateBookingModal, bookingData } = this.props;
    let doctorId =
      bookingData && !_.isEmpty(bookingData) ? bookingData.doctorId : "";
    let genderArr = this.state.genderArr;
    // console.log('booking data: ', bookingData)
    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner
        text="Loading..."
      >
        <div className="booking-modal container">
          <Modal
            isOpen={isOpenCreateBookingModal}
            className={"form-create-booking"}
            size="lg"
            toggle={this.toggle}
          >
            <ModalHeader toggle={this.toggle}>
              <FormattedMessage id="patientside.bookingdoctor.booking" />
            </ModalHeader>

            <ModalBody>
              <div className="create-booking container">
                <form className="mt-1" action="/booking" method="POST">
                  <div className="doctor-profile">
                    <DoctorProfile
                      doctorId={doctorId}
                      isShowDetailDoctor={false}
                      isShowLinkDetail={false}
                      isShowPrice={true}
                      bookingData={bookingData}
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-12 mt-4">
                      <FormattedMessage id="patientside.bookingdoctor.firstname" />
                      <input
                        type="text"
                        className="form-control "
                        name="firstName"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "firstName");
                        }}
                        value={this.state.firstName}
                      />
                    </div>
                    <div className="form-group col-md-6 col-12 mt-4">
                      <FormattedMessage id="patientside.bookingdoctor.lastname" />
                      <input
                        type="text"
                        className="form-control "
                        name="lastName"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "lastName");
                        }}
                        value={this.state.lastName}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-12 mt-4">
                      <FormattedMessage id="patientside.bookingdoctor.tel" />
                      <input
                        type="text"
                        className="form-control "
                        name="telNum"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "telNum");
                        }}
                        value={this.state.telNum}
                      />
                    </div>
                    <div className="form-group col-md-6 col-12 mt-4">
                      <FormattedMessage id="patientside.bookingdoctor.gender" />
                      <select
                        name="gender"
                        className="form-control "
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "gender");
                        }}
                        value={this.state.gender}
                      >
                        {genderArr &&
                          genderArr.length > 0 &&
                          genderArr.map((item, index) => {
                            return (
                              <option key={index} value={item.keyMap}>
                                {language === LANGUAGES.VI
                                  ? item.valueVi
                                  : item.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-12 mt-4">
                      <FormattedMessage id="patientside.bookingdoctor.address" />
                      <input
                        type="text"
                        className="form-control "
                        name="address"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "address");
                        }}
                        value={this.state.address}
                      />
                    </div>
                    <div className="form-group col-md-6 col-12 mt-4">
                      <FormattedMessage id="patientside.bookingdoctor.email" />
                      <input
                        type="email"
                        className="form-control "
                        name="email"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "email");
                        }}
                        value={this.state.email}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 mt-4">
                      <FormattedMessage id="patientside.bookingdoctor.symptom" />
                      <input
                        type="text"
                        className="form-control "
                        name="symptom"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "symptom");
                        }}
                        value={this.state.symptom}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                className={"px-3"}
                onClick={() => {
                  this.handleAddNewBooking();
                }}
              >
                <FormattedMessage id="patientside.bookingdoctor.ok" />
              </Button>

              <Button className={"mx-3 px-2"} onClick={this.toggle}>
                <FormattedMessage id="patientside.bookingdoctor.cancel" />
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)),
    fetchGenderById: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

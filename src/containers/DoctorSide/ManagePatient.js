import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import moment from "moment";
import PrescriptionModal from "./PrescriptionModal";
import { toast } from "react-toastify";
import _ from "lodash";

import { LANGUAGES, DATE } from "../../utils/constant";
import * as actions from "../../store/actions";
import DatePicker from "../../components/Input/DatePicker";
import "./ManagePatient.scss";
import {
  getAllPatientForDoctorService,
  sendPrescriptionService,
} from "../../services/userService";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      patientData: {},
      prescriptionData: [],
      isOpenPrescriptionModal: false,
      isShowLoading: false,
    };
  }

  escFunction(event) {
    if (event.key === "Escape") {
      this.setState({
        isOpenPrescriptionModal: false,
      });
    }
  }
  async componentDidMount() {
    this.getPatientData();
  }

  getPatientData = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let patientSchedule = await getAllPatientForDoctorService({
      doctorId: user.id,
      date: formattedDate,
    });
    if (patientSchedule && patientSchedule.errCode === 0) {
      this.setState({
        patientData: patientSchedule.data,
      });
    }
    // console.log('patient data in the day: ', this.state.patientData)
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
    }
    if (prevProps.allTime !== this.props.allTime) {
    }
    if (prevProps.language !== this.props.language) {
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getPatientData();
      }
    );
  };
  handleClickConfirm = (item) => {
    let { language } = this.props;

    let dataConfirm = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      firstName: item.patientData.firstName,
      lastName: item.patientData.lastName,
      timeType: item.timeType,
    };
    // console.log('data from prescriptionData ', dataConfirm)

    this.setState({
      isOpenPrescriptionModal: true,
      prescriptionData: dataConfirm,
    });
  };
  handleClickDelete = (item) => {
    alert("you will delete this booking appointment!");
  };
  togglePrescriptionModal = () => {
    this.setState({
      isOpenPrescriptionModal: !this.state.isOpenPrescriptionModal,
    });
  };
  sendPrescription = async (fromModal) => {
    let { prescriptionData } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await sendPrescriptionService({
      email: fromModal.email,
      imgBase64: fromModal.imgBase64,
      doctorId: prescriptionData.doctorId,
      patientId: prescriptionData.patientId,
      firstName: prescriptionData.firstName,
      lastName: prescriptionData.lastName,
      timeType: prescriptionData.timeType,
      language: this.props.language,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send email to patient successful!");
      await this.getPatientData();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Send email to patient failed!");
    }
  };
  render() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    let { patientData } = this.state;
    // console.log('patientData ', patientData)
    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner
        text="Loading..."
      >
        <div className="patient-container container">
          <div className="schedule-title row">
            <span className="title">
              <FormattedMessage id="doctorpatient.patient-headline" />
            </span>
          </div>
          <div className="form-group col-sm-5 col-12">
            <label className="mt-3">
              <FormattedMessage id="doctorpatient.label-date" />
            </label>
            <DatePicker
              className={"form-control date-picker mt-1"}
              onChange={this.handleOnChangeDatePicker}
              value={this.state.currentDate}
              minDate={date}
            />
          </div>
          <div className="user-schedule-table">
            <table className="table table-bordered mt-4 mx-1">
              <thead>
                <tr>
                  <th>Booking Id</th>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Tel</th>
                  <th>Address</th>
                  <th>Schedule</th>
                  <th>Sympton</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {patientData &&
                  patientData.length > 0 &&
                  patientData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>
                          {item.patientData.lastName}{" "}
                          {item.patientData.firstName}
                        </td>
                        <td>{item.patientData.genderData.valueEn}</td>
                        <td>{item.patientData.email}</td>
                        <td>{item.patientData.phoneNum}</td>
                        <td>{item.patientData.address}</td>
                        <td>{item.timeTypePatientData.valueEn}</td>
                        <td>{item.symptom}</td>
                        <td>
                          <button
                            className="btn btn-link px-2"
                            onClick={() => this.handleClickConfirm(item)}
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button
                            className="btn btn-link ms-2 px-2"
                            onClick={() => this.handleClickDelete(item)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="prescription-modal">
            <PrescriptionModal
              isOpenPrescriptionModal={this.state.isOpenPrescriptionModal}
              toggleFromParent={this.togglePrescriptionModal}
              prescriptionData={this.state.prescriptionData}
              sendPrescription={this.sendPrescription}
            />
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userInfo,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allTime: state.admin.allTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllCodeTimeDoctor: () => dispatch(actions.fetchAllCodeTimeDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

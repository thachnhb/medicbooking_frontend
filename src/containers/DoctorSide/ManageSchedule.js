import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../store/actions";
import { LANGUAGES, DATE } from "../../utils/constant";
import DatePicker from "../../components/Input/DatePicker";

import "./ManageSchedule.scss";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkCreateScheduleService } from "../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctors: [],
      isContainData: false,
      currentDate: "",
      rangeTime: [],
      selectedDoctor: {},
    };
  }

  async componentDidMount() {
    await this.props.fetchAllDoctor();
    await this.props.fetchAllCodeTimeDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelection = this.buildInputSelect(this.props.allDoctors);
      this.setState({
        allDoctors: dataSelection,
      });
    }
    if (prevProps.allTime !== this.props.allTime) {
      let data = this.props.allTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelection = this.buildInputSelect(this.props.allDoctors);
      this.setState({
        allDoctors: dataSelection,
      });
    }
  }
  buildInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        obj.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };

  handleChangeSelection = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickBtnTime = (timeItem) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === timeItem.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  validateInput = () => {
    let { selectedDoctor, rangeTime, currentDate } = this.state;
    if (!selectedDoctor || Object.keys(selectedDoctor).length === 0) {
      toast.error("Invalid Doctor Selection!");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid Date!");
      return;
    }
    let selectedTime = rangeTime.filter((item) => item.isSelected === true);
    if (selectedTime && selectedTime.length === 0) {
      toast.error("Please select at least a time to make an apointment!");
      return;
    }
  };

  handleClickSaveSchedule = async () => {
    this.validateInput();
    let { selectedDoctor, rangeTime, currentDate } = this.state;
    let timeSelection = [];

    let formatedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      selectedTime.map((schedule) => {
        let obj = {};
        obj.doctorId = selectedDoctor.value;
        obj.date = formatedDate;
        obj.timeType = schedule.keyMap;
        timeSelection.push(obj);
      });
    }
    let res = await saveBulkCreateScheduleService({
      schedule: timeSelection,
      doctorId: selectedDoctor.value,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Create an apointment with doctor successful!");
    } else {
      toast.error("Create an apointment with doctor failed!");
    }
  };

  render() {
    let { isContainData, rangeTime } = this.state;
    let { language } = this.props;
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return (
      <div className="schedule-container container">
        <div className="schedule-title row">
          <span className="title">
            <FormattedMessage id="doctorschedule.schedule-headline" />
          </span>
        </div>
        <div className="schedule-info row">
          <div className="form-group col-sm-6 col-12">
            <label className="mt-3">
              <FormattedMessage id="doctorschedule.label-doctor" />
            </label>
            <Select
              className={"mt-1"}
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelection}
              options={this.state.allDoctors}
            />
          </div>
          <div className="form-group col-sm-6 col-12">
            <label className="mt-3">
              <FormattedMessage id="doctorschedule.label-date" />
            </label>
            <DatePicker
              className={"form-control date-picker mt-1"}
              onChange={this.handleOnChangeDatePicker}
              value={this.state.currentDate}
              minDate={date}
            />
          </div>
          <div className="pick-time col-12 ">
            {rangeTime &&
              rangeTime.length > 0 &&
              rangeTime.map((item, index) => {
                return (
                  <button
                    className={
                      item.isSelected === true
                        ? "btn-time btn btn-light active"
                        : "btn-time btn btn-light"
                    }
                    key={index}
                    onClick={() => this.handleClickBtnTime(item)}
                  >
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </button>
                );
              })}
          </div>
          <button
            className={"save-schedule btn btn-primary col-lg-1 col-sm-2 col-3"}
            onClick={() => this.handleClickSaveSchedule()}
          >
            {isContainData === true ? (
              <FormattedMessage id="common.edit" />
            ) : (
              <FormattedMessage id="common.save" />
            )}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

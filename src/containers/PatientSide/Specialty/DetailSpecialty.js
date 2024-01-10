import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderDetailPage from "../HeaderDetailPage";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import DoctorProfile from "../Doctor/DoctorProfile";
import { FormattedMessage } from "react-intl";
import Select from "react-select";

import HomeFooter from "../../HomePage/HomeFooter";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import {
  getSpecialtyByIdService,
  getAllCodeService,
} from "../../../services/userService";
import "./DetailSpecialty.scss";
import _ from "lodash";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      arrProvince: [],
      dataProvince: [],
      specialtyData: {},
      selectedOption: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let specialtyId = this.props.match.params.id;

      let specialtyInfo = await getSpecialtyByIdService({
        id: specialtyId,
        provinceId: "ALL",
      });

      let arrProvince = await getAllCodeService("PROVINCE");
      let dataProvince = this.buildInputInfoSelect(
        arrProvince.data,
        "PROVINCE"
      );

      if (specialtyInfo && specialtyInfo.errCode === 0) {
        let arrDoctorId = [];
        let data = specialtyInfo.data;
        if (data && !_.isEmpty(data.doctorOfSpecialty)) {
          let doctorArr = data.doctorOfSpecialty;
          if (doctorArr && doctorArr.length > 0) {
            doctorArr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          specialtyData: specialtyInfo.data,
          arrDoctorId: arrDoctorId,
          arrProvince: arrProvince.data,
          dataProvince: dataProvince,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let dataProvince = this.buildInputInfoSelect(
        this.state.arrProvince,
        "PROVINCE"
      );
      this.setState({
        dataProvince: dataProvince,
      });
    }
  }
  buildInputInfoSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === "PROVINCE") {
        inputData.map((item, index) => {
          let obj = {};
          let labelVi = item.valueVi;
          let labelEn = item.valueEn;
          obj.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }
    }
    return result;
  };
  handleOnChangeProvince = async (selectedOption) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let specialtyId = this.props.match.params.id;
      this.setState({ selectedOption });
      let provinceId = selectedOption.value;
      console.log("check target.value Province: ", provinceId);

      let specialtyInfo = await getSpecialtyByIdService({
        id: specialtyId,
        provinceId: provinceId,
      });

      if (specialtyInfo && specialtyInfo.errCode === 0) {
        let data = specialtyInfo.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data.doctorOfSpecialty)) {
          let doctorArr = data.doctorOfSpecialty;
          if (doctorArr && doctorArr.length > 0) {
            doctorArr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
          this.setState({
            specialtyData: data,
            arrDoctorId: arrDoctorId,
          });
        }
      }
    }
  };
  render() {
    let { arrDoctorId, dataProvince, specialtyData } = this.state;
    let { language } = this.props;
    // console.log('check state sent to Detail Specialty: ', this.state)
    return (
      <>
        <HeaderDetailPage isSpecialty={true} />
        <div className="specialty-container container">
          <div className="detail-specialty-info">
            {specialtyData && !_.isEmpty(specialtyData) && (
              <div
                className="specialty-detail-info"
                dangerouslySetInnerHTML={{ __html: specialtyData.htmlDesc }}
              ></div>
            )}
          </div>
          <div className="specialty-doctor-list row">
            <div className="sort-by-province col-3">
              <Select
                value={this.state.selectedOption}
                onChange={this.handleOnChangeProvince}
                options={dataProvince}
              />
            </div>
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="a-doctor" key={index}>
                    <div className="a-doctor-content row">
                      <div className="left-doctor-list col-lg-7 col-12">
                        <DoctorProfile
                          doctorId={item}
                          isShowDetailDoctor={true}
                          isShowPrice={true}
                          isShowLinkDetail={true}
                        />
                      </div>
                      <div className="right-doctor-list col-lg-5 col-12">
                        <DoctorSchedule doctorIdParent={item} />
                        <DoctorExtraInfo doctorIdParent={item} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <HomeFooter />
      </>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);

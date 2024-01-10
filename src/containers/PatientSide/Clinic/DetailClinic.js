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
import { getClinicByIdService } from "../../../services/userService";
import "./DetailClinic.scss";
import _ from "lodash";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let clinicId = this.props.match.params.id;
      let clinicData = await getClinicByIdService({
        id: clinicId,
      });
      // console.log('check Clinic Data: ', clinicData)

      if (clinicData && clinicData.errCode === 0) {
        let arrDoctorId = [];
        let data = clinicData.data;
        if (data && !_.isEmpty(data.doctorOfClinic)) {
          let doctorArr = data.doctorOfClinic;
          if (doctorArr && doctorArr.length > 0) {
            doctorArr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          arrDoctorId: arrDoctorId,
          dataDetailClinic: data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
  }

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;
    console.log("check state RENDER for Detail Clinic: ", this.state);
    return (
      <>
        <HeaderDetailPage isSpecialty={true} />
        <div className="specialty-container container">
          <div className="detail-specialty-info">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <div
                className="specialty-detail-info"
                dangerouslySetInnerHTML={{
                  __html: dataDetailClinic.descHtmlVi,
                }}
              ></div>
            )}
          </div>
          <div className="specialty-doctor-list row">
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);

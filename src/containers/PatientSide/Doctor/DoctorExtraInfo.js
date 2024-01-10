import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import * as actions from "../../../store/actions";
import { getExtraInfoByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFeesInfo: false,
      isShowInsuranceInfo: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdParent) {
      let res = await getExtraInfoByIdService(this.props.doctorIdParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.infoData,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({});
    }
    if (this.props.doctorIdParent !== prevProps.doctorIdParent) {
      let res = await getExtraInfoByIdService(this.props.doctorIdParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.infoData,
        });
      }
    }
  }
  showHideFeesInfo = (statusFee) => {
    this.setState({
      isShowFeesInfo: statusFee,
    });
  };
  showHideInsInfo = (statusIns) => {
    this.setState({
      isShowInsuranceInfo: statusIns,
    });
  };

  render() {
    let { language } = this.props;
    let { isShowFeesInfo, isShowInsuranceInfo, extraInfo } = this.state;
    return (
      <>
        <div className="doctor-extra-info container">
          <div className="doctor-extra-content">
            <div className="address">
              <div className="headline">
                <FormattedMessage id="patientside.detailinfodoctor.address" />
              </div>
              <div className="address-name-clinic">
                {extraInfo &&
                  extraInfo.clinicIdData &&
                  language === LANGUAGES.VI &&
                  extraInfo.clinicIdData.nameVi}
                {extraInfo &&
                  extraInfo.clinicIdData &&
                  language === LANGUAGES.EN &&
                  extraInfo.clinicIdData.nameEn}
              </div>
              <div className="address-detail">
                {extraInfo && extraInfo.addressClinic
                  ? extraInfo.addressClinic
                  : ""}
              </div>
            </div>
            <div className="fees">
              {isShowFeesInfo === false && (
                <div className="headline">
                  <FormattedMessage id="patientside.detailinfodoctor.fee" />
                  <span
                    onClick={() => this.showHideFeesInfo(true)}
                    className="hide-show-text"
                  >
                    <FormattedMessage id="patientside.detailinfodoctor.show" />
                  </span>
                </div>
              )}
              {isShowFeesInfo === true && (
                <>
                  <div className="headline">
                    <FormattedMessage id="patientside.detailinfodoctor.fee" />
                  </div>
                  <div className="fees-content">
                    <div className="fees-service">
                      <div className="sub-headline">
                        <FormattedMessage id="patientside.detailinfodoctor.fee1" />
                      </div>
                      <div className="fees-amount">
                        {extraInfo &&
                          extraInfo.priceIdData &&
                          language === LANGUAGES.VI && (
                            <NumberFormat
                              value={extraInfo.priceIdData.valueVi}
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={"VND"}
                            />
                          )}
                        {extraInfo &&
                          extraInfo.priceIdData &&
                          language === LANGUAGES.EN && (
                            <NumberFormat
                              value={extraInfo.priceIdData.valueEn}
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={"$"}
                            />
                          )}
                      </div>
                    </div>
                    <div className="content-text">
                      <FormattedMessage id="patientside.detailinfodoctor.fee11" />
                    </div>
                    <div className="sub-headline payment">
                      <FormattedMessage id="patientside.detailinfodoctor.fee2" />
                      {extraInfo &&
                        extraInfo.paymentIdData &&
                        language === LANGUAGES.VI &&
                        extraInfo.paymentIdData.valueVi}
                      {extraInfo &&
                        extraInfo.paymentIdData &&
                        language === LANGUAGES.EN &&
                        extraInfo.paymentIdData.valueEn}
                    </div>
                    <div className="note">
                      <FormattedMessage id="patientside.detailinfodoctor.fee3" />
                    </div>
                    <span
                      onClick={() => this.showHideFeesInfo(false)}
                      className="hide-show-text"
                    >
                      <FormattedMessage id="patientside.detailinfodoctor.hide" />
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="insurance">
              {isShowInsuranceInfo === false && (
                <div className="headline">
                  <FormattedMessage id="patientside.detailinfodoctor.ins" />
                  <span
                    onClick={() => this.showHideInsInfo(true)}
                    className="hide-show-text"
                  >
                    <FormattedMessage id="patientside.detailinfodoctor.show" />
                  </span>
                </div>
              )}
              {isShowInsuranceInfo === true && (
                <>
                  <div className="headline">
                    <FormattedMessage id="patientside.detailinfodoctor.ins" />
                  </div>
                  <div className="ins-content">
                    <div className="sub-headline">
                      <FormattedMessage id="patientside.detailinfodoctor.ins1" />
                    </div>
                    <div className="content-text">
                      <FormattedMessage id="patientside.detailinfodoctor.ins2" />
                    </div>
                    <div className="sub-headline">
                      <FormattedMessage id="patientside.detailinfodoctor.ins3" />
                    </div>
                    <div className="content-text">
                      <FormattedMessage id="patientside.detailinfodoctor.ins4" />
                    </div>
                    <span
                      onClick={() => this.showHideInsInfo(false)}
                      className="hide-show-text"
                    >
                      <FormattedMessage id="patientside.detailinfodoctor.hide" />
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);

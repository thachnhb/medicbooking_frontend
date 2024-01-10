import React, { Component } from "react";
import { connect } from "react-redux";
import "./PrescriptionModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import moment from "moment";

import * as actions from "../../store/actions";
import { LANGUAGES, CommonUtils } from "../../utils";
import { postBookingAppointmentService } from "../../services/userService";

class PrescriptionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.prescriptionData) {
      this.setState({
        email: this.props.prescriptionData.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.prescriptionData !== prevProps.prescriptionData) {
      this.setState({
        email: this.props.prescriptionData.email,
        doctorId: this.props.prescriptionData.doctorId,
      });
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
  handleOnchangeImage = async (e) => {
    let files = e.target.files;
    let file = files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendPrescription = () => {
    this.props.sendPrescription(this.state);
    this.setState({
      doctorId: "",
      imgBase64: "",
    });
    this.toggle();
  };

  render() {
    let { language, isOpenPrescriptionModal } = this.props;
    // console.log('prescriptionData data: ', this.props)
    return (
      <>
        <div className="prescription-modal container">
          <Modal
            isOpen={isOpenPrescriptionModal}
            className={"form-create-prescription"}
            size="lg"
            toggle={this.toggle}
          >
            <ModalHeader toggle={this.toggle}>
              <span className="title">
                <FormattedMessage id="doctorpatient.prescription-headline" />
              </span>
            </ModalHeader>

            <ModalBody>
              <div className="body-prescription container row">
                <div className="form-group col-md-6 col-12 mt-4">
                  <FormattedMessage id="doctorpatient.email" />
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
                <div className="form-group col-md-6 col-12 mt-4">
                  <FormattedMessage id="doctorpatient.file" />
                  <input
                    type="file"
                    className="form-control "
                    name="prescription"
                    onChange={(e) => {
                      this.handleOnchangeImage(e);
                    }}
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                className={"px-3"}
                onClick={() => this.handleSendPrescription()}
              >
                <FormattedMessage id="doctorpatient.ok" />
              </Button>

              <Button className={"mx-3 px-2"} onClick={this.toggle}>
                <FormattedMessage id="doctorpatient.cancel" />
              </Button>
            </ModalFooter>
          </Modal>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionModal);

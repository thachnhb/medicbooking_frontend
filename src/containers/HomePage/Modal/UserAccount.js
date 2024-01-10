import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import moment from "moment";
import LoginModal from "./LoginModal";

import "./UserAccount.scss";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { handleLoginApi } from "../../../services/userService.js";

class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
    this.state = {
      isShowPopup: false,
    };
  }
  escFunction(event) {
    if (event.key === "Escape") {
      this.setState({
        isOpenCreateBookingModal: false,
      });
    }
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({});
    }
  }
  toggleLoginModal = () => {
    this.setState({
      isShowPopup: !this.state.isShowPopup,
    });
  };

  handleLogin = () => {
    this.setState({
      isShowPopup: true,
    });
  };

  render() {
    let { language, userLogin, isLoggedIn, processLogout } = this.props;
    let { isShowPopup } = this.state;
    let name = "",
      email = "",
      roleId = "",
      firstName = "",
      lastName = "";
    if (userLogin && userLogin.firstName) {
      if (userLogin.firstName !== null) {
        firstName = userLogin.firstName;
      }
    }
    if (userLogin && userLogin.lastName) {
      if (userLogin.lastName !== null) {
        lastName = userLogin.lastName;
      }
    }
    if (
      userLogin &&
      !_.isEmpty(userLogin) &&
      userLogin.email &&
      userLogin.roleId
    ) {
      name =
        language === LANGUAGES.VI
          ? `${firstName} ${lastName}`
          : `${lastName} ${firstName}`;
      email = userLogin.email;
      roleId = userLogin.roleId;
    }

    return (
      <>
        {isLoggedIn === false ? (
          <div className="dropdown no-login">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-target="#accountDropdown"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user-circle account-icon right-icon active"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => this.handleLogin()}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <FormattedMessage id="login.login" />
                </button>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user-plus"></i>
                  <FormattedMessage id="login.signup" />
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-question-circle"></i>
                  <FormattedMessage id="login.help" />
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown loggedin">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-target="#accountDropdown"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user-circle account-icon right-icon active"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <div className="dropdown-user-info">
                  <p className=" text fullname">{name}</p>
                  <p className=" text user-email">{email}</p>
                </div>
              </li>

              <li>
                <button className="dropdown-item">
                  <i className="fas fa-cog"></i>
                  <FormattedMessage id="login.setting" />
                </button>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-question-circle"></i>
                  <FormattedMessage id="login.help" />
                </a>
              </li>

              <li className="signout-item">
                <button
                  className="btn btn-info btn-signout"
                  onClick={processLogout}
                >
                  <FormattedMessage id="login.signout" />
                </button>
              </li>
            </ul>
          </div>
        )}
        <div className="login-modal">
          <LoginModal
            isShowPopup={isShowPopup}
            toggleFromParent={this.toggleLoginModal}
          />
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
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);

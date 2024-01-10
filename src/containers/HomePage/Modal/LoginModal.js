import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import moment from "moment";
import { withRouter } from "react-router";

import "./LoginModal.scss";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { handleLoginApi } from "../../../services/userService.js";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userInput: {},
      isShowPassword: false,
      errCode: "",
    };
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({});
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

  enterLogin = (e) => {
    if (e.keyCode === 13) {
      this.handleLogin();
    }
  };

  handleLogin = async () => {
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      // Log In Failed
      if (data && data.errCode !== 0) {
        this.setState({
          errCode: data.errCode,
        });
      }
      //Log In Successfull
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        this.setState({
          userInput: data.user,
        });
        localStorage.setItem("user", JSON.stringify(this.state.userInput));
        this.toggle();
      }
      if (this.props.history) {
        this.props.history.push(`/home`);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            message: error.response.data.message,
          });
        }
      }
      console.log(error.response);
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    let { language } = this.props;
    let { isShowPopup } = this.props;
    let userIcon =
      "https://raw.githubusercontent.com/kanechan25/frontend-bookingcare.github.io/main/src/assets/images/0_svg/user.svg";
    let passIcon =
      "https://raw.githubusercontent.com/kanechan25/frontend-bookingcare.github.io/main/src/assets/images/0_svg/pass.svg";
    // console.log('check state change: ', this.state)
    return (
      <div className="login-modal container">
        <Modal
          isOpen={isShowPopup}
          className={"form-login-signup"}
          toggle={this.toggle}
        >
          <div className="login-singup container">
            <div className="login-background row">
              <div className="login-container">
                <div className="login-content">
                  <div className="col-12 mt-3 text-center text-title">
                    <b>Login</b>
                  </div>
                  <div className="form-group mt-4 col-12">
                    <img className="icon" src={userIcon} alt="this" />
                    <label for="inputName">Username</label>

                    <input
                      type="text"
                      className="form-control "
                      name="userName"
                      placeholder="Enter your username"
                      onChange={(e) => {
                        this.handleOnChangeInput(e, "username");
                      }}
                      value={this.state.username}
                    />
                  </div>
                  <div className="form-group mt-4 col-12">
                    <img className="icon" src={passIcon} alt="this" />
                    <label for="inputPassword">Password</label>

                    <div className="input-password">
                      <input
                        type={this.state.isShowPassword ? "text" : "password"}
                        className="form-control "
                        placeholder="Enter your password"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "password");
                        }}
                        onKeyDown={(e) => this.enterLogin(e)}
                      />
                      <span
                        onClick={() => {
                          this.handleShowHidePassword();
                        }}
                      >
                        <i
                          className={
                            this.state.isShowPassword
                              ? "far fa-eye eye-password"
                              : "far fa-eye-slash eye-password"
                          }
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-12 mt-2" style={{ color: "red" }}>
                    {this.state.message}
                  </div>
                  <div className="mt-3 mb-3 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-login"
                      onClick={() => {
                        this.handleLogin();
                      }}
                    >
                      Login
                    </button>
                  </div>
                  <div className="col-12 forgot-password">
                    <a href="#">Forgot your Password?</a>
                  </div>
                  <div className="col-12 text-center mt-3">
                    <span>Or Login with</span>
                  </div>
                  <div className="col-12 social-login d-flex mt-3">
                    <i className="fab fa-google gg"></i>
                    <i className="fab fa-facebook-f fb"></i>
                  </div>
                  <div className="col-12 text-center create-account mt-3">
                    <span>
                      Have not an account?
                      <a href="" className="link-create">
                        <b> Create Here</b>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
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
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginModal)
);

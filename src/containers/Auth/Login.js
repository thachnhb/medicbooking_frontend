import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";

import { handleLoginApi } from "../../services/userService.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      message: "",
    };
  }
  //#region All Handling Functions
  handleOnChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  enterLogin = (e) => {
    if (e.keyCode === 13) {
      this.handleLogin();
    }
  };

  handleLogin = async () => {
    this.setState({
      message: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          message: data.message,
        });
      }
      if (data && data.errCode === 0) {
        //login successful => to go to sth...
        this.props.userLoginSuccess(data.user);
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

  //#endregion

  render() {
    let userIcon =
      "https://raw.githubusercontent.com/kanechan25/frontend-bookingcare.github.io/main/src/assets/images/0_svg/user.svg";
    let passIcon =
      "https://raw.githubusercontent.com/kanechan25/frontend-bookingcare.github.io/main/src/assets/images/0_svg/pass.svg";

    return (
      <div>
        <div className="login-bg">
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
                  value={this.state.username}
                  onChange={(e) => this.handleOnChangeUsername(e)}
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
                    onChange={(e) => this.handleOnChangePassword(e)}
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
              <div className="col-12">
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
                    {" "}
                    Create Here
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

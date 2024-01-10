import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTION } from "../../../utils/constant";
import { CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";

import "../ModalUser.scss";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableUserRedux from "./TableUserRedux";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      titleArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNum: "",
      gender: "",
      roleId: "",
      titleId: "",
      image: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    // try { Cách 1: Dùng state
    //     let res = await getAllCodeService('gender');
    //     if (res && res.errCode === 0) {
    //         this.setState({
    //             genderArr: res.data
    //         })
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
    await this.props.getGenderStart();
    await this.props.getTitleStart();
    await this.props.getRoleStart();
  }

  //#region Handling Functions
  componentDidUpdate(prevProps, prevState, snapshot) {
    let arrGenders = this.props.genderRedux;
    let arrTitle = this.props.titleRedux;
    let arrRole = this.props.roleRedux;
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }

    if (prevProps.titleRedux !== this.props.titleRedux) {
      this.setState({
        titleArr: arrTitle,
        title: arrTitle && arrTitle.length > 0 ? arrTitle[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }

    if (prevProps.allUser !== this.props.allUser) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNum: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        titleId: arrTitle && arrTitle.length > 0 ? arrTitle[0].keyMap : "",
        image: "",
        action: CRUD_ACTION.CREATE,
        previewImgURL: "",
      });
    }
  }
  handleOnchangeImage = async (e) => {
    let files = e.target.files;
    let file = files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        image: base64,
      });
    }
  };

  openPreviewImg = () => {
    if (this.state.previewImgURL === "") return;
    console.log("image open???? in: ", this.state.previewImgURL);
    this.setState({
      isOpen: true,
    });
  };
  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    breakme: {
      if (isValid === false) {
        break breakme;
      } else {
        let { action } = this.state;
        if (action === CRUD_ACTION.CREATE) {
          this.props.createUserStart({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNum: this.state.phoneNum,
            gender: this.state.gender,
            roleId: this.state.roleId,
            titleId: this.state.titleId,
            image: this.state.image,
          });
        }
        if (action === CRUD_ACTION.EDIT) {
          this.props.editUser({
            id: this.state.userEditId,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNum: this.state.phoneNum,
            gender: this.state.gender,
            roleId: this.state.roleId,
            titleId: this.state.titleId,
            image: this.state.image,
          });
        }
        this.props.fetchAllUserRedux();
      }
    }
    this.clearInputData();
  };

  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNum",
      "gender",
      "roleId",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Please enter adequately input in " + arrCheck[i]);
        break;
      }
    }
    return {
      isValid,
    };
  };

  clearInputData = () => {
    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNum: "",
      gender: "",
      roleId: "",
      titleId: "",
      image: "",
    });
  };
  handleEditUserFromParent = (user) => {
    let imgBase64 = "";
    if (user.image) {
      imgBase64 = Buffer.from(user.image, "base64").toString("binary");
    }

    this.setState({
      email: user.email,
      password: "khoatran",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNum: user.phoneNum,
      gender: user.gender,
      roleId: user.roleId,
      titleId: user.titleId,
      previewImgURL: imgBase64,
      action: CRUD_ACTION.EDIT,
      userEditId: user.id,
    });
    // console.log('Image base64: ', this.state.previewImgURL)
  };

  //#endregion

  render() {
    let genderArr = this.state.genderArr;
    let titleArr = this.state.titleArr;
    let roleArr = this.state.roleArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender; //check loading -> waiting)
    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNum,
      gender,
      roleId,
      titleId,
      image,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title"> CRUD Users by Redux</div>
        <div className="user-redux-body">
          <div className="container">
            {/* <div className='mt-1 ms-2 row'>{isLoadingGender === true ? 'Loading data' : ''}</div> */}
            <form className="mt-1 row text-info">
              <div className="form-group mt-3 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <input
                  type="email"
                  className="form-control "
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    this.onChangeInput(e, "email");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTION.EDIT ? true : false
                  }
                />
              </div>
              <div className="form-group mt-3 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <input
                  type="password"
                  className="form-control "
                  name="password"
                  placeholder="Enter you password"
                  value={password}
                  onChange={(e) => {
                    this.onChangeInput(e, "password");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTION.EDIT ? true : false
                  }
                />
              </div>
              <div className="form-group mt-3 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <input
                  type="text"
                  className="form-control "
                  name="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => {
                    this.onChangeInput(e, "firstName");
                  }}
                />
              </div>
              <div className="form-group mt-3 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <input
                  type="text"
                  className="form-control "
                  name="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => {
                    this.onChangeInput(e, "lastName");
                  }}
                />
              </div>
              <div className="form-group mt-3 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <input
                  type="text"
                  className="form-control "
                  name="address"
                  placeholder="Enter address: etc. 2425, Vo Nguyen Giap St, HCMC"
                  value={address}
                  onChange={(e) => {
                    this.onChangeInput(e, "address");
                  }}
                />
              </div>
              <div className="form-group mt-3 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <input
                  type="text"
                  className="form-control "
                  name="phoneNum"
                  placeholder="Enter phone number: etc. +84368889999"
                  value={phoneNum}
                  onChange={(e) => {
                    this.onChangeInput(e, "phoneNum");
                  }}
                />
              </div>
              <div className="form-group mt-3 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <select
                  name="gender"
                  className="form-control "
                  onChange={(e) => {
                    this.onChangeInput(e, "gender");
                  }}
                  value={gender}
                >
                  {/* <option value='' selected>-- Choose gender --</option> */}
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
              <div className="form-group mt-3 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <select
                  name="roleId"
                  className="form-control "
                  onChange={(e) => {
                    this.onChangeInput(e, "roleId");
                  }}
                  value={roleId}
                >
                  {/* <option value='' selected>-- Choose role --</option> */}
                  {roleArr &&
                    roleArr.length > 0 &&
                    roleArr.map((item, index) => {
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
              <div className="form-group mt-3 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <select
                  name="title"
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "titleId");
                  }}
                  value={titleId}
                >
                  {/* <option value='' selected>-- Choose title --</option> */}
                  {titleArr &&
                    titleArr.length > 0 &&
                    titleArr.map((item, index) => {
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
              <div className="form-group mt-3 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <div className="preview-container">
                  <input
                    type="file"
                    className="form-control "
                    name="image"
                    id="formFile"
                    onChange={(e) => this.handleOnchangeImage(e)}
                  />
                  <div
                    className="preview-img"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImg()}
                  ></div>
                </div>
              </div>
            </form>
            <div className="admin-footer row">
              <button
                className={
                  this.state.action === CRUD_ACTION.EDIT
                    ? "create btn btn-warning col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-8"
                    : "create btn btn-primary col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-8"
                }
                onClick={() => {
                  this.handleAddNewUser();
                }}
              >
                {this.state.action === CRUD_ACTION.EDIT ? (
                  <FormattedMessage id="system.user-redux.edit-btn" />
                ) : (
                  <FormattedMessage id="system.user-redux.create-btn" />
                )}
              </button>
              <button
                className="cancel btn btn-info col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-8"
                // onClick={this.toggle}
              >
                <FormattedMessage id="system.user-redux.cancel-btn" />
              </button>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
        <TableUserRedux
          handleEditUserFromParent={this.handleEditUserFromParent}
          clearInputData={this.clearInputData}
          action={this.state.action}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    titleRedux: state.admin.title,
    roleRedux: state.admin.role,
    isLoadingGender: state.admin.isLoadingGender,
    allUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getTitleStart: () => dispatch(actions.fetchTitleStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createUserStart: (data) => dispatch(actions.createNewUser(data)),
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUser: (data) => dispatch(actions.editUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

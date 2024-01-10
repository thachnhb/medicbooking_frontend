import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { addSyntheticLeadingComment } from "typescript";

import {
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalPopupConfirm from "./ModalPopupConfirm";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
import "./UserManage.scss";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenCreateModal: false,
      isOpenDeleteConfirm: false,
      isOpenEditModal: false,
      userData: {},
    };
    this.escFunction = this.escFunction.bind(this);
  }

  //#region Function Handling
  async componentDidMount() {
    await this.getAllUserForReact();
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  escFunction(event) {
    if (event.key === "Escape") {
      this.setState({
        isOpenCreateModal: false,
        isOpenDeleteConfirm: false,
      });
    }
  }
  getAllUserForReact = async () => {
    let response = await getAllUser("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleClickAddNewUser = () => {
    this.setState({
      isOpenCreateModal: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenCreateModal: !this.state.isOpenCreateModal,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserForReact();
        this.setState({
          isOpenCreateModal: false,
        });
      }
      emitter.emit("EVENT_CLEAR_MODAL_DATA", data);
    } catch (error) {
      console.log("It have a tiny error: ", error);
    }
  };

  toggleConfirmDelete = () => {
    this.setState({
      isOpenDeleteConfirm: !this.state.isOpenDeleteConfirm,
    });
  };

  handleClickDeleteUser = (userData) => {
    this.setState({
      isOpenDeleteConfirm: true,
      userData: userData,
    });
  };

  handleDeleteUser = async (userData) => {
    try {
      let response = await deleteUserService(userData.id);
      if (response && response.errCode === 0) {
        await this.getAllUserForReact();
        this.setState({
          isOpenDeleteConfirm: false,
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log("It have a tiny error: ", error);
    }
  };

  handleClickEditUser = (userData) => {
    this.setState({
      isOpenEditModal: true,
      userData: userData,
    });
  };

  handleSaveChangesUser = async (userData) => {
    try {
      let res = await editUserService(userData);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenEditModal: false,
        });
        await this.getAllUserForReact();
      } else {
        alert(res.errCode);
      }
    } catch (error) {
      console.log("It have a tiny error: ", error);
    }
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  };

  //#endregion

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container ">
        <ModalUser
          isOpenCreateModal={this.state.isOpenCreateModal}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        <ModalPopupConfirm
          isOpenDeleteConfirm={this.state.isOpenDeleteConfirm}
          userData={this.state.userData}
          toggleFromParent={this.toggleConfirmDelete}
          handleDeleteUser={this.handleDeleteUser}
        />
        {this.state.isOpenEditModal && (
          <ModalEditUser
            isOpenCreateModal={this.state.isOpenEditModal}
            toggleFromParent={this.toggleEditUserModal}
            editUserData={this.state.userData}
            saveEditUser={this.handleSaveChangesUser}
          />
        )}

        <div className="title text-center">Manage users from API</div>

        <div className="mx-2">
          <button
            className=" btn btn-info px-3"
            onClick={() => this.handleClickAddNewUser()}
          >
            <i className="fas fa-plus pe-3"></i>
            Add a new user
          </button>
        </div>
        <div className="user-table">
          <table className="table table-bordered mt-4 mx-1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.lastName}</td>
                        <td>{item.firstName}</td>
                        <td>{item.address}</td>
                        <td>{item.phoneNum}</td>
                        <td>{item.gender}</td>
                        <td>{item.roleId}</td>
                        <td>
                          <button
                            className="btn btn-link px-2"
                            onClick={() => this.handleClickEditUser(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn btn-link ms-2 px-2"
                            onClick={() => this.handleClickDeleteUser(item)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

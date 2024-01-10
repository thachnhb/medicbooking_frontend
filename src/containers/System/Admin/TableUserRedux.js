import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class TableUserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allUsers !== this.props.allUsers) {
      this.setState({
        userRedux: this.props.allUsers,
      });
    }
  }

  handleClickDeleteUserRedux = (user) => {
    this.props.deleteUserRedux(user.id);
  };

  handleClickEditUserRedux = (user) => {
    // console.log('You have clicked to Edit: ', user);
    this.props.clearInputData();
    this.props.handleEditUserFromParent(user);
  };

  render() {
    let allUsers = this.state.userRedux;
    return (
      <div className="container user-table">
        <table className="table table-bordered my-5 px-1">
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
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allUsers &&
              allUsers.length > 0 &&
              allUsers.map((item, index) => {
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
                      <td>{item.titleId}</td>
                      <td>
                        <button
                          className="btn btn-link px-2"
                          onClick={() => this.handleClickEditUserRedux(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn btn-link ms-2 px-2"
                          onClick={() => this.handleClickDeleteUserRedux(item)}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (userId) => dispatch(actions.deleteNewUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserRedux);

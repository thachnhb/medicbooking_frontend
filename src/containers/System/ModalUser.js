import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalUser.scss";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      lastName: "",
      firstName: "",
      address: "",
      phoneNum: "",
      gender: "",
      roleId: "",
    };
    this.listenToEmitter();
  }

  componentDidMount() {}

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", (data) => {
      this.setState({
        email: "",
        password: "",
        lastName: "",
        firstName: "",
        address: "",
        phoneNum: "",
        gender: "",
        roleId: "",
      });
    });
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (e, inputId) => {
    //bad code (should not use)
    // this.state[inputId] = e.target.value;
    // this.setState({
    //     ...this.state
    // }, () => {
    //     console.log('check bad state: ', this.state)
    // })

    //good code
    let copyState = { ...this.state };
    copyState[inputId] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "lastName",
      "firstName",
      "address",
      "phoneNum",
      "gender",
      "roleId",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();

    if (isValid === true) {
      //call api
      this.props.createNewUser(this.state);
    } else {
      alert("Please enter the information completely!");
    }
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpenCreateModal}
          className={"form-create-new-user"}
          size="md"
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>

          <ModalBody>
            <div className="container">
              <div className="row text-info">
                <form className="mt-1" action="/post-crud" method="POST">
                  <div className="form-row text-light">
                    <div className="form-group mt-3">
                      <input
                        type="email"
                        className="form-control "
                        name="email"
                        placeholder="Enter email: youremail@gmail.com"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "email");
                        }}
                        value={this.state.email}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="password"
                        className="form-control "
                        name="password"
                        placeholder="Enter you password"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "password");
                        }}
                        value={this.state.password}
                      />
                    </div>
                  </div>
                  <div className="form-row text-light">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control "
                        name="firstName"
                        placeholder="Enter your first name"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "firstName");
                        }}
                        value={this.state.firstName}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control "
                        name="lastName"
                        placeholder="Enter your last name"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "lastName");
                        }}
                        value={this.state.lastName}
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control "
                      name="address"
                      placeholder="Enter address: etc. 2425, Vo Nguyen Giap St, HCMC"
                      onChange={(e) => {
                        this.handleOnChangeInput(e, "address");
                      }}
                      value={this.state.address}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control "
                        name="phoneNum"
                        placeholder="Enter phone number: etc. +84368889999 or 0986969696"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "phoneNum");
                        }}
                        value={this.state.phoneNum}
                      />
                    </div>
                    <div className="form-group mt-3 ">
                      <select
                        name="gender"
                        className="form-control "
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "gender");
                        }}
                        value={this.state.gender}
                      >
                        <option value="" selected>
                          -- Choose sex --
                        </option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Others</option>
                      </select>
                    </div>
                    <div className="form-group mt-3 ">
                      <select
                        name="roleId"
                        className="form-control "
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "roleId");
                        }}
                        value={this.state.roleId}
                      >
                        <option value="" selected>
                          -- Choose role --
                        </option>
                        <option value="R1">Admin</option>
                        <option value="R2">Doctor</option>
                        <option value="R3">Patient</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              className={"px-3"}
              onClick={() => {
                this.handleAddNewUser();
              }}
            >
              Create
            </Button>

            <Button className={"mx-3 px-2"} onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

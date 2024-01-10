import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalUser.scss";

class ModalPopupConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleDeleteUser = () => {
    let userData = this.props.userData;
    this.props.handleDeleteUser(userData);
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpenDeleteConfirm}
          className={"modal-delete-user"}
          size="md"
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Delete this user</ModalHeader>

          <ModalBody>
            <div className="container">
              User {this.props.userData.id} ID, email is{" "}
              {this.props.userData.email}, named is{" "}
              {this.props.userData.firstName} will be delete completely!
              <br />
              Sure about deleting?
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="danger"
              className={"px-3"}
              onClick={() => {
                this.handleDeleteUser();
              }}
            >
              Delete
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalPopupConfirm);

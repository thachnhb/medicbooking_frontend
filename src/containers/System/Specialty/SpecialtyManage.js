import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { FormattedMessage } from "react-intl";
import { CommonUtils } from "../../../utils";
import "./SpecialtyManage.scss";
import { createNewSpecialtyService } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class SpecialtyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownContent: "",
      htmlContent: "",
      nameVi: "",
      nameEn: "",
      image: "",
      isContainData: false,
    };
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      markdownContent: text,
      htmlContent: html,
    });
  };
  handleOnChangeTextInput = (e, inputId) => {
    let state = { ...this.state };
    state[inputId] = e.target.value;
    this.setState({
      ...state,
    });
  };
  handleOnchangeImage = async (e) => {
    let link = e.target.value;
    this.setState({
      image: link,
    });
  };
  handleSaveNewSpecialty = async () => {
    // console.log('check state saving?: ', this.state)
    let res = await createNewSpecialtyService(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add a new specialty successful!");
      this.setState({
        markdownContent: "",
        htmlContent: "",
        nameVi: "",
        nameEn: "",
        image: "",
      });
    } else {
      toast.error("Add a new specialty failed!");
      console.log("Having a tiny error somewhere, response is: ", res);
    }
  };
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { isContainData, image, markdownContent, nameVi, nameEn } = this.state;
    return (
      <>
        <div className="manage-specialty-container">
          <div className="specialty-management">
            <div className="title">
              {" "}
              <FormattedMessage id="system.managespecialty.headline" />
            </div>
            <div className="container">
              <div className="specialty-info mb-4 row">
                <div className="info-input col-md-7 col-12">
                  <div className="contain-left container">
                    <div className="namevi-specialty col-12">
                      <label className="mt-3 mb-1">
                        <FormattedMessage id="system.managespecialty.namevi" />
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) =>
                          this.handleOnChangeTextInput(e, "nameVi")
                        }
                        value={nameVi}
                      />
                    </div>
                    <div className="nameen-specialty col-12">
                      <label className="mt-3 mb-1">
                        <FormattedMessage id="system.managespecialty.nameen" />
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) =>
                          this.handleOnChangeTextInput(e, "nameEn")
                        }
                        value={nameEn}
                      />
                    </div>
                    <div className="img-specialty col-12">
                      <label className="mt-3 mb-1">
                        <FormattedMessage id="system.managespecialty.img" />
                      </label>
                      <input
                        className="form-control"
                        value={image}
                        onChange={(e) => this.handleOnchangeImage(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="img-input col-md-5 col-12 mt-4">
                  <div className="img-render">
                    <img src={image} className="img-link"></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-specialty container">
              <label className="mt-3 mb-1">
                <FormattedMessage id="system.managespecialty.description" />
              </label>
              <MdEditor
                className={"markdown-specialty"}
                style={{ height: "450px", marginBottom: "20px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={markdownContent}
              />
            </div>
            <div className="container">
              <button
                className={
                  isContainData === true
                    ? "save mt-3 mb-5 btn btn-warning col-lg-1 col-sm-2 col-3"
                    : "save mt-3 mb-5 btn btn-info col-lg-1 col-sm-2 col-3"
                }
                onClick={() => this.handleSaveNewSpecialty()}
              >
                {isContainData === true ? (
                  <FormattedMessage id="common.edit" />
                ) : (
                  <FormattedMessage id="common.save" />
                )}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);

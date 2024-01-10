import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTION } from '../../../utils/constant';
import { CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import Markdown from 'markdown-to-jsx';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getInfoDoctorService } from '../../../services/userService';

import '../ModalUser.scss'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableUserRedux from './TableUserRedux';
import Select from 'react-select';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //markdown table
            arrOriginalDoctors: [],
            allDoctors: [],
            markdownContent: '',
            htmlContent: '',
            selectedOption: '',
            description: '',
            isContainData: false,
            //doctor_info table
            listPrice: [],
            listPayment: [],
            listCity: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedCity: '',
            selectedSpecialty: '',
            selectedClinic: '',
            addressClinic: '',
            note: '',
        }
    }

    handleChangeSelection = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPrice, listPayment, listCity, listClinic, listSpecialty } = this.state;
        let doctorInfoData = await getInfoDoctorService(selectedOption.value)
        // console.log('Option selected change Doctors: ', doctorInfoData.data.Doctor_Info);
        if (doctorInfoData && doctorInfoData.data && doctorInfoData.data.Markdown) {
            let markdown = doctorInfoData.data.Markdown
            let selectedPrice = '', selectedPayment = '', selectedCity = '',
                selectedClinic = '', selectedSpecialty = '', addressClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '', clinicId = '', specialtyId = '';

            if (doctorInfoData.data.Doctor_Info) {
                addressClinic = doctorInfoData.data.Doctor_Info.addressClinic;
                note = doctorInfoData.data.Doctor_Info.note;
                paymentId = doctorInfoData.data.Doctor_Info.paymentId;
                priceId = doctorInfoData.data.Doctor_Info.priceId;
                provinceId = doctorInfoData.data.Doctor_Info.provinceId;
                clinicId = doctorInfoData.data.Doctor_Info.clinicId;
                specialtyId = doctorInfoData.data.Doctor_Info.specialtyId;
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId;
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId;
                })
                selectedCity = listCity.find(item => {
                    return item && item.value === provinceId;
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId;
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId;
                })
            }
            this.setState({
                htmlContent: markdown.htmlContent,
                markdownContent: markdown.markdownContent,
                description: markdown.description,
                isContainData: true,

                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedCity: selectedCity,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
                addressClinic: addressClinic,
                note: note ? note : 'Được ưu tiên khám trước khi đật khám qua BookingCare',
            })
        } else {
            this.setState({
                htmlContent: '',
                markdownContent: '',
                description: '',
                isContainData: false,
                selectedPrice: '',
                selectedPayment: '',
                selectedCity: '',
                selectedSpecialty: '',
                selectedClinic: '',
                addressClinic: '',
                note: '',
            })
        }
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            markdownContent: text,
            htmlContent: html,
        })
    };

    buildInputInfoSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let obj = {}
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    obj.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.id;
                    result.push(obj);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let obj = {}
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    obj.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let obj = {}
                    let labelVi = item.valueVi;
                    let labelEn = item.valueEn;
                    obj.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let obj = {}
                    obj.label = this.props.language === LANGUAGES.VI ? item.nameVi : item.nameEn;
                    obj.address = item.address;
                    obj.value = item.id;
                    result.push(obj);
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let obj = {}
                    obj.label = this.props.language === LANGUAGES.VI ? item.nameVi : item.nameEn;
                    obj.value = item.id;
                    result.push(obj);
                })
            }
        }
        return result;
    }
    buildInputSelect = (inputData, type) => {
        let result = [];
        let address = '';
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {}
                if (type === 'name') {
                    obj.label = this.props.language === LANGUAGES.VI ? item.nameVi : item.nameEn;
                    obj.address = item.address;
                    obj.value = item.id;
                } else {
                    obj.label = item[`${type}`];
                    obj.value = item.id;
                }
                result.push(obj);
            })
        }
        return result;
    }

    handleSaveContentMarkdown = () => {
        let { isContainData } = this.state;
        this.props.saveInfoDoctor({
            htmlContent: this.state.htmlContent,
            markdownContent: this.state.markdownContent,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: isContainData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedCity: this.state.selectedCity.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            selectedClinic: this.state.selectedClinic.value,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        });
        this.setState({
            selectedOption: '',
            htmlContent: '',
            markdownContent: '',
            description: '',
            isContainData: false,
            selectedPrice: '',
            selectedPayment: '',
            selectedCity: '',
            selectedSpecialty: '',
            selectedClinic: '',
            addressClinic: '',
            note: '',
        })
    }

    handleOnChangeTextInput = (e, inputId) => {
        let state = { ...this.state };
        state[inputId] = e.target.value
        this.setState({
            ...state
        })
    }

    async componentDidMount() {
        await this.props.fetchAllDoctor();
        await this.props.getAllRequiredDoctorInfo();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { resPayment, resPrice, resProvince, resClinic, resSpecialty } = this.props.allRequiredDoctorInfo;
        let dataPayment = this.buildInputInfoSelect(resPayment, 'PAYMENT');
        let dataPrice = this.buildInputInfoSelect(resPrice, 'PRICE');
        let dataProvince = this.buildInputInfoSelect(resProvince, 'PROVINCE');
        let dataSelection = this.buildInputInfoSelect(this.props.allDoctors, 'USERS')
        let dataClinic = this.buildInputInfoSelect(resClinic, 'CLINIC');
        let dataSpecialty = this.buildInputInfoSelect(resSpecialty, 'SPECIALTY');
        // console.log('dataSpecialty contain: ', dataSpecialty)

        if (prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                allDoctors: dataSelection,
                arrOriginalDoctors: this.props.allDoctors,
            })
        }
        if (prevProps.language !== this.props.language) {
            this.setState({
                allDoctors: dataSelection,
                listPrice: dataPrice,
                listPayment: dataPayment,
                listCity: dataProvince,
                listClinic: dataClinic,
                listSpecialty: dataSpecialty,
            })
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            this.setState({
                listPrice: dataPrice,
                listPayment: dataPayment,
                listCity: dataProvince,
                listClinic: dataClinic,
                listSpecialty: dataSpecialty,

            })
        }

    }

    handleChangeDoctorInfoSelection = async (selectedOption, name) => {
        let stateName = name.name;
        let state = { ...this.state };
        state[stateName] = selectedOption;
        this.setState({ ...state })

    }

    handleChangeClinicSelection = async (selectedOption, name) => {
        let stateName = name.name;
        let state = { ...this.state };
        state[stateName] = selectedOption;
        this.setState({
            ...state,
            addressClinic: selectedOption.address
        })
    }

    render() {
        let arrOriginalDoctors = this.state.arrOriginalDoctors;
        let { isContainData } = this.state;
        // console.log('check state here in RENDER: ', this.state)
        return (
            <div className='doctor-management'>
                <div className="title" > <FormattedMessage id="system.managedoctor.headlinemanage" /></div>
                <div className='container user-table'>
                    <div className='more-info row'>
                        <div className='content-left form-group col-lg-3 col-md-5 col-6'>
                            <div className='select-doctor'>
                                <label className='mt-3 mb-1'><FormattedMessage id="system.managedoctor.choosedoctor" /></label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChangeSelection}
                                    options={this.state.allDoctors}
                                />
                            </div>

                            <div className='select-payment'>
                                <label className='mt-3 mb-1'><FormattedMessage id="system.managedoctor.choosepayment" /></label>
                                <Select
                                    value={this.state.selectedPayment}
                                    onChange={this.handleChangeDoctorInfoSelection}
                                    options={this.state.listPayment}
                                    name="selectedPayment"
                                />
                            </div>
                        </div>
                        <div className='content-right form-group col-lg-9 col-md-7 col-6'>
                            <label className='mt-3 mb-1'><FormattedMessage id="system.managedoctor.intro" /></label>
                            <textarea className='form-control mb-3' rows='6'
                                onChange={(e) => this.handleOnChangeTextInput(e, 'description')}
                                value={this.state.description}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className='detail-info mb-4 row'>
                        <div className='select-price col-lg-4 col-6'>
                            <label className='mt-3 mb-1'><FormattedMessage id="system.managedoctor.chooseprice" /></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeDoctorInfoSelection}
                                options={this.state.listPrice}
                                name="selectedPrice"
                            />
                        </div>
                        <div className='select-city col-lg-4 col-6'>
                            <label className='mt-3 mb-1'><FormattedMessage id="system.managedoctor.choosecity" /></label>
                            <Select
                                value={this.state.selectedCity}
                                onChange={this.handleChangeDoctorInfoSelection}
                                options={this.state.listCity}
                                name="selectedCity"
                            />
                        </div>
                        <div className='select-specialty col-lg-4 col-6'>
                            <label className='mt-3 mb-1'><FormattedMessage id="system.managedoctor.choosespecialty" /></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeDoctorInfoSelection}
                                options={this.state.listSpecialty}
                                name="selectedSpecialty"
                            />
                        </div>
                        <div className='select-clinic col-lg-4 col-6'>
                            <label className='mt-3 mb-1'><FormattedMessage id="system.managedoctor.chooseclinic" /></label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeClinicSelection}
                                options={this.state.listClinic}
                                name="selectedClinic"
                            />
                        </div>
                        <div className='select-address-clinic col-lg-4 col-6'>
                            <label className='mt-3 mb-1'><FormattedMessage id="system.managedoctor.chooseaddress" /></label>
                            <input
                                onChange={(e) => this.handleOnChangeTextInput(e, 'addressClinic')}
                                value={this.state.addressClinic}
                                className='form-control'
                                disabled
                            />
                        </div>
                        <div className='note col-lg-4 col-6'>
                            <label className='mt-3 mb-1'><FormattedMessage id="system.managedoctor.note" /></label>
                            <input
                                onChange={(e) => this.handleOnChangeTextInput(e, 'note')}
                                value={this.state.note}
                                className='form-control'
                            />
                        </div>
                    </div>
                </div>
                <div className='detail-doctor container'>
                    <MdEditor
                        className={'detail-doctor-vi'}
                        style={{ height: '540px', marginBottom: '50px' }}
                        renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange}
                        value={this.state.markdownContent}
                    />
                </div>
                <div className='container'>
                    <button
                        className={isContainData === true ? 'save btn btn-warning col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 col-3' :
                            'save btn btn-info col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 col-3'}
                        style={{ marginBottom: '50px' }}
                        onClick={() => this.handleSaveContentMarkdown()}
                    >{isContainData === true ? <FormattedMessage id="common.edit" /> : <FormattedMessage id="common.save" />}
                    </button>
                </div>

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
                        </tr>
                    </thead>

                    <tbody>
                        {
                            arrOriginalDoctors && arrOriginalDoctors.length > 0 && arrOriginalDoctors.map((item, index) => {
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
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getAllRequiredDoctorInfo: () => dispatch(actions.fetchRequiredDoctorInfoStart()),
        saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

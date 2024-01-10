import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  role: [],
  title: [],
  users: [],
  doctors: [],
  allDoctors: [],
  dataDoctorById: [],
  allTime: [],
  allRequiredDoctorInfo: [],
  allClinic: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // #region Action Types Gender + Title + Role
    case actionTypes.FETCH_GENDER_START:
      let startGenderState = { ...state };
      startGenderState.isLoadingGender = true;
      return {
        ...startGenderState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let successGenderState = { ...state };
      successGenderState.genders = action.data;
      successGenderState.isLoadingGender = false;
      return {
        ...successGenderState,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_TITLE_START:
      let startTitleState = { ...state };
      startTitleState.isLoadingGender = true;
      return {
        ...startTitleState,
      };
    case actionTypes.FETCH_TITLE_SUCCESS:
      let successTitleState = { ...state };
      successTitleState.title = action.data;
      successTitleState.isLoadingGender = false;
      return {
        ...successTitleState,
      };
    case actionTypes.FETCH_TITLE_FAILED:
      state.isLoadingGender = false;
      state.title = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_START:
      let startRoleState = { ...state };
      startRoleState.isLoadingGender = true;
      return {
        ...startRoleState,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      let successRoleState = { ...state };
      successRoleState.role = action.data;
      successRoleState.isLoadingGender = false;
      return {
        ...successRoleState,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.isLoadingGender = false;
      state.role = [];
      return {
        ...state,
      };
    // #endregion

    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_SUCCESS:
      state.doctors = action.doctorData;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_FAILED:
      state.doctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.allDoctorData;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };
    case actionTypes.GET_INFO_DOCTOR_SUCCESS:
      state.dataDoctorById = action.dataInfo;
      // console.log('Reducer: ', state.dataDoctorById)
      return {
        ...state,
      };
    case actionTypes.GET_INFO_DOCTOR_FAILED:
      state.dataDoctorById = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_TIME_SUCCESS:
      state.allTime = action.allTimeData;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_TIME_FAILED:
      state.allTime = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
      state.allRequiredDoctorInfo = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
      state.allRequiredDoctorInfo = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
      state.allClinic = action.allClinicData;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CLINIC_FAILED:
      state.allClinic = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;

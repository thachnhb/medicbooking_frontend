import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUser,
  deleteUserService,
  editUserService,
  getDoctorHomeService,
  getAllDoctorService,
  saveInfoDoctorService,
  getInfoDoctorService,
  getAllClinicService,
  getAllSpecialtyService,
} from "../../services/userService";
import { toast } from "react-toastify";

//#region fetchGender/Role/Title
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log("fetch Gender Failed: ", error);
    }
  };
};

const fetchGenderSuccess = (data) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: data,
});
const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchTitleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_TITLE_START });

      let res = await getAllCodeService("title");
      if (res && res.errCode === 0) {
        dispatch(fetchTitleSuccess(res.data));
      } else {
        dispatch(fetchTitleFailed());
      }
    } catch (error) {
      dispatch(fetchTitleFailed());
      console.log("fetch Title Failed: ", error);
    }
  };
};

const fetchTitleSuccess = (data) => ({
  type: actionTypes.FETCH_TITLE_SUCCESS,
  data: data,
});
const fetchTitleFailed = () => ({
  type: actionTypes.FETCH_TITLE_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });

      let res = await getAllCodeService("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log("fetch Role Failed: ", error);
    }
  };
};

const fetchRoleSuccess = (data) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: data,
});
const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});
//#endregion

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        dispatch(createUserSuccess());
        dispatch(fetchAllUserStart());
        toast.success("Add a new user successful!");
      } else {
        dispatch(createUserFailed());
      }
    } catch (error) {
      dispatch(createUserFailed());
      console.log("create User Failed: ", error);
    }
  };
};

const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUser("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.sort()));
      } else {
        dispatch(fetchAllUserFailed());
        toast.error("Get all users from database failed!");
      }
    } catch (error) {
      dispatch(fetchAllUserFailed());
      toast.error("Get all users from database failed!");
      console.log("fetch All User Failed: ", error);
    }
  };
};

const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteNewUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(deleteUserFailed());
        toast.error("Delete a user failed!");
      }
    } catch (error) {
      dispatch(deleteUserFailed());
      toast.error("Delete a user failed!");
      console.log("delete User Failed: ", error);
    }
  };
};

const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(editUserFailed());
        toast.error("Edit a user failed!");
      }
    } catch (error) {
      dispatch(editUserFailed());
      toast.error("Edit a user failed!");
      console.log("edit User Failed: ", error);
    }
  };
};

const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let resDoctor = await getDoctorHomeService(12);
      if (resDoctor && resDoctor.errCode === 0) {
        dispatch(fetchDoctorSuccess(resDoctor));
      } else {
        dispatch(fetchDoctorFailed());
        toast.error("fetch Doctors failed!");
      }
    } catch (error) {
      toast.error("fetch Doctors failed!");
      console.log("fetch Doctors Failed: ", error);
    }
  };
};
const fetchDoctorSuccess = (resDoctor) => ({
  type: actionTypes.FETCH_DOCTOR_SUCCESS,
  doctorData: resDoctor.data,
});
const fetchDoctorFailed = () => ({
  type: actionTypes.FETCH_DOCTOR_FAILED,
});

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let resDoctor = await getAllDoctorService();
      if (resDoctor && resDoctor.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(resDoctor));
      } else {
        dispatch(fetchAllDoctorFailed());
        toast.error("fetch all Doctors failed!");
      }
    } catch (error) {
      toast.error("fetch all Doctors failed!");
      console.log("fetch all Doctors Failed: ", error);
    }
  };
};
const fetchAllDoctorSuccess = (resDoctor) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
  allDoctorData: resDoctor.data,
});
const fetchAllDoctorFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
});

export const saveInfoDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let resInfo = await saveInfoDoctorService(data);
      if (resInfo && resInfo.errCode === 0) {
        dispatch(saveInfoDoctorSuccess());
        toast.success("Save doctor Info successful!");
      } else {
        dispatch(saveInfoDoctorFailed());
        toast.error("save info Doctors failed!");
      }
    } catch (error) {
      toast.error("save info Doctors failed!");
      console.log("save info Doctors Failed: ", error);
    }
  };
};
const saveInfoDoctorSuccess = () => ({
  type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
});
const saveInfoDoctorFailed = () => ({
  type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
});

export const getInfoDoctor = (id) => {
  return async (dispatch, getState) => {
    try {
      let resInfo = await getInfoDoctorService(id);
      if (resInfo && resInfo.errCode === 0) {
        // console.log('check data info by id in admin Actions: ', resInfo)
        dispatch(getInfoDoctorSuccess(resInfo));
      } else {
        dispatch(getInfoDoctorFailed());
        toast.error("get info Doctors failed!");
      }
    } catch (error) {
      toast.error("get info Doctors failed!");
      console.log("get info Doctors Failed: ", error);
    }
  };
};
const getInfoDoctorSuccess = (resInfo) => ({
  type: actionTypes.GET_INFO_DOCTOR_SUCCESS,
  dataInfo: resInfo.data,
});
const getInfoDoctorFailed = () => ({
  type: actionTypes.GET_INFO_DOCTOR_FAILED,
});

export const fetchAllCodeTimeDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let resTime = await getAllCodeService("TIME");
      if (resTime && resTime.errCode === 0) {
        dispatch(fetchAllCodeTimeSuccess(resTime));
      } else {
        dispatch(fetchAllCodeTimeFailed());
        toast.error("fetch allcode time failed!");
      }
    } catch (error) {
      toast.error("fetch allcode time failed!");
      console.log("fetch allcode time Failed: ", error);
    }
  };
};
const fetchAllCodeTimeSuccess = (resTime) => ({
  type: actionTypes.FETCH_ALLCODE_TIME_SUCCESS,
  allTimeData: resTime.data,
});
const fetchAllCodeTimeFailed = () => ({
  type: actionTypes.FETCH_ALLCODE_TIME_FAILED,
});

export const fetchRequiredDoctorInfoStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });

      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resClinic = await getAllClinicService();
      let resSpecialty = await getAllSpecialtyService();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resClinic: resClinic.data,
          resSpecialty: resSpecialty.data,
        };
        dispatch(fetchRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInfoFailed());
      }
    } catch (error) {
      dispatch(fetchRequiredDoctorInfoFailed());
      console.log("fetch Required Doctor Info Failed: ", error);
    }
  };
};

const fetchRequiredDoctorInfoSuccess = (AllRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: AllRequiredData,
});
const fetchRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});

export const fetchAllClinic = () => {
  return async (dispatch, getState) => {
    try {
      let resClinic = await getAllClinicService();
      // console.log('resClinic: ', resClinic)
      if (resClinic && resClinic.errCode === 0) {
        dispatch(fetchAllClinicSuccess(resClinic));
      } else {
        dispatch(fetchAllClinicFailed());
        toast.error("fetch all Clinics failed!");
      }
    } catch (error) {
      toast.error("fetch all Clinics failed!");
      console.log("fetch all Clinics Failed: ", error);
    }
  };
};
const fetchAllClinicSuccess = (resClinic) => ({
  type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
  allClinicData: resClinic.data,
});
const fetchAllClinicFailed = () => ({
  type: actionTypes.FETCH_ALL_CLINIC_FAILED,
});

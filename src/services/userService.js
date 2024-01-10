import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  console.log("data in axios.post will be: ", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: { id: userId },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

// DOCTORS
const getDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor?limit=${limit}`);
};

const getAllDoctorService = () => {
  return axios.get(`/api/all-doctor`);
};

const saveInfoDoctorService = (data) => {
  return axios.post(`/api/save-info-doctor`, data);
};

const getInfoDoctorService = (inputId) => {
  return axios.get(`/api/get-info-doctor-by-id?id=${inputId}`);
};

const saveBulkCreateScheduleService = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const sendPrescriptionService = (data) => {
  return axios.post(`/api/send-prescription`, data);
};

const getScheduleDoctorService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getAllPatientForDoctorService = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

// CLINICS
const createClinicService = (data) => {
  return axios.post(`/api/create-clinics`, data);
};
const getAllClinicService = () => {
  return axios.get(`/api/get-all-clinics`);
};
const getClinicByIdService = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
const saveInfoClinicService = (data) => {
  return axios.post(`/api/save-info-clinic`, data);
};

// DETAIL DOCTORS
const getExtraInfoByIdService = (doctorId) => {
  return axios.get(`/api/get-extra-info-by-id?doctorId=${doctorId}`);
};

const getDoctorProfileByIdService = (doctorId) => {
  return axios.get(`/api/get-doctor-profile-by-id?doctorId=${doctorId}`);
};

const postBookingAppointmentService = (data) => {
  return axios.post(`/api/patient-booking-appointment`, data);
};
const postVerifyBookingAppointmentService = (data) => {
  return axios.post(`/api/patient-verify-booking-appointment`, data);
};

// SPECIALTIES
const createNewSpecialtyService = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
const getAllSpecialtyService = () => {
  return axios.get(`/api/get-all-specialty`);
};
const getSpecialtyByIdService = (data) => {
  return axios.get(
    `/api/get-specialty-by-id?id=${data.id}&provinceId=${data.provinceId}`
  );
};

export {
  handleLoginApi,
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getDoctorHomeService,
  getAllDoctorService,
  saveInfoDoctorService,
  getInfoDoctorService,
  saveBulkCreateScheduleService,
  getScheduleDoctorService,
  getAllClinicService,
  getExtraInfoByIdService,
  getDoctorProfileByIdService,
  postBookingAppointmentService,
  postVerifyBookingAppointmentService,
  createNewSpecialtyService,
  getAllSpecialtyService,
  getSpecialtyByIdService,
  createClinicService,
  getClinicByIdService,
  saveInfoClinicService,
  getAllPatientForDoctorService,
  sendPrescriptionService,
};

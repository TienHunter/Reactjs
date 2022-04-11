import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
   return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputID) => {
   return axios.get(`/api/get-all-users?id=${inputID}`);
};

const createNewUserService = (data) => {
   return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
   return axios.delete("/api/delete-user", {
      data: { id: userId },
   });
};

const editUserService = (user) => {
   return axios.put("/api/edit-user", user);
};
const getAllcodeService = (inputType) => {
   return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
   return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctorsService = () => {
   return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) => {
   return axios.post(`/api/create-infor-doctor`, data)
}
const getDetailInforDoctorById = (id) => {
   return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}
const postBulkScheduleDoctor = (data) => {
   return axios.post("/api/bulk-schedule-doctor", data);
}
const getScheduleDoctorbyId = (doctorId, date) => {
   return axios.get(`/api/get-schedule-doctor-by-id?doctorId=${doctorId}&date=${date}`)
}
const getMedicalAddressByDoctorId = (doctorId) => {
   return axios.get(`/api/medical-address-by-doctorId?doctorId=${doctorId}`)
}
const getProfileDoctorByDoctorId = (doctorId) => {
   return axios.get(`/api/get-profile-doctor-by-doctorId?doctorId=${doctorId}`)
}
const postBookingAppointment = (data) => {
   return axios.post("/api/post-booking-appointment", data);
}
const postVerifyBookingAppointment = (data) => {
   return axios.post("/api/post-verify-booking-appointment", data);
}
const createNewSpecialty = (data) => {
   return axios.post("/api/create-new-specialty", data);
}
const getAllSpecialties = () => {
   return axios.get("/api/get-all-specialties");
}
const getDetailSpecialty = (specialtyId) => {
   return axios.get(`/api/get-detail-specialty?specialtyId=${specialtyId}`);
}
const getIntroSpecialty = (specialtyId) => {
   return axios.get(`/api/get-intro-specialty?specialtyId=${specialtyId}`);
}
const createNewClinic = (data) => {
   return axios.post("/api/create-new-clinic", data);
}
const getAllClinics = () => {
   return axios.get("/api/get-all-clinics");
}
const getDetailClinic = (clinicId) => {
   return axios.get(`/api/get-detail-clinic?clinicId=${clinicId}`);
}
const getAllPatientsForDoctor = (doctorId, date) => {
   return axios.get(`/api/get-list-patients-of-doctor?doctorId=${doctorId}&date=${date}`);
}
const sendRemedy = (data) => {
   return axios.post(`/api/send-remedy`, data);
}
export {
   handleLoginApi,
   getAllUsers,
   createNewUserService,
   deleteUserService,
   editUserService,
   getAllcodeService,
   getTopDoctorHomeService,
   getAllDoctorsService,
   saveDetailDoctorService,
   getDetailInforDoctorById,
   postBulkScheduleDoctor,
   getScheduleDoctorbyId,
   getMedicalAddressByDoctorId,
   getProfileDoctorByDoctorId,
   postBookingAppointment,
   postVerifyBookingAppointment,
   createNewSpecialty,
   getAllSpecialties,
   getDetailSpecialty,
   getIntroSpecialty,
   createNewClinic,
   getAllClinics,
   getDetailClinic,
   getAllPatientsForDoctor,
   sendRemedy
}

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
}
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
   getDetailInforDoctorById
};

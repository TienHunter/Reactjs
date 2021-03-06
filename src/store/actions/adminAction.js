import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import actionTypes from "./actionTypes";
import {
   getAllcodeService,
   createNewUserService,
   getAllUsers,
   deleteUserService,
   editUserService,
   getTopDoctorHomeService,
   getAllDoctorsService,
   saveDetailDoctorService,
   getAllSpecialties
} from '../../services/userService';
export const fetchGenderStart = () => {
   return async (dispatch, getState) => {
      try {
         dispatch({
            type: actionTypes.FETCH_GENDER_START
         })
         let res = await getAllcodeService('GENDER');
         if (res && res.errCode === 0) {
            dispatch(fetchGenderSuccess(res.data))
         } else {
            dispatch(fetchGenderFailed())
         }
      } catch (e) {
         dispatch(fetchGenderFailed())
      }
   }
};
export const fetchGenderSuccess = (gendersData) => ({
   type: actionTypes.FETCH_GENDER_SUCCESS,
   data: gendersData
});
export const fetchGenderFailed = () => ({
   type: actionTypes.FETCH_GENDER_FAILED
});

export const fetchPositionStart = () => {
   return async (dispatch, getState) => {
      try {
         dispatch({
            type: actionTypes.FETCH_POSITION_START
         })
         let res = await getAllcodeService('POSITION');
         if (res && res.errCode === 0) {
            dispatch(fetchPositionSuccess(res.data))
         } else {
            dispatch(fetchPositionFailed())
         }
      } catch (e) {
         dispatch(fetchPositionFailed())
      }
   }
};
export const fetchPositionSuccess = (positionsData) => ({
   type: actionTypes.FETCH_POSITION_SUCCESS,
   data: positionsData
});
export const fetchPositionFailed = () => ({
   type: actionTypes.FETCH_POSITION_FAILED
});

export const fetchRoleStart = () => {
   return async (dispatch, getState) => {
      try {
         dispatch({
            type: actionTypes.FETCH_ROLE_START
         })
         let res = await getAllcodeService('ROLE');
         if (res && res.errCode === 0) {
            dispatch(fetchRoleSuccess(res.data))
         } else {
            dispatch(fetchRoleFailed())
         }
      } catch (e) {
         dispatch(fetchRoleFailed())
      }
   }
};
export const fetchRoleSuccess = (rolesData) => ({
   type: actionTypes.FETCH_ROLE_SUCCESS,
   data: rolesData
});
export const fetchRoleFailed = () => ({
   type: actionTypes.FETCH_ROLE_FAILED
});

export const createNewUser = (data) => {
   return async (dispatch, getState) => {
      try {

         let res = await createNewUserService(data);
         if (res && res.errCode === 0) {
            toast.success('Create new user success')
            dispatch(createNewuserSuccess())
            dispatch(fetchAllUsersStart())
         } else {
            toast.error('create new user failed')
            dispatch(createNewUserFailed())
         }
      } catch (e) {
         toast.error('create new user failed')
         dispatch(createNewUserFailed())
      }
   }
};
export const createNewuserSuccess = () => ({
   type: actionTypes.CREATE_USER_SUCCESS,
});
export const createNewUserFailed = () => ({
   type: actionTypes.CREATE_USER_FAILED
});

export const fetchAllUsersStart = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getAllUsers('ALL');
         if (res && res.errCode === 0) {
            dispatch(fetchAllUsersSuccess(res.users.reverse()))
         } else {
            toast.error('Fetch all user failed')
            dispatch(fetchGenderFailed())
         }
      } catch (e) {
         toast.error('Fetch all user failed')
         dispatch(fetchGenderFailed())
      }
   }
};
export const fetchAllUsersSuccess = (data) => ({
   type: actionTypes.FETCH_ALL_USERS_SUCCESS,
   users: data
});
export const fetchAllUsersFailed = () => ({
   type: actionTypes.FETCH_ALL_USERS_FAILED
});

export const deleteUser = (userID) => {
   return async (dispatch, getState) => {
      try {

         let res = await deleteUserService(userID);
         if (res && res.errCode === 0) {
            toast.success('delete user success')
            dispatch(deleteUserSuccess())
            dispatch(fetchAllUsersStart())
         } else {
            toast.error('delete user failed')
            dispatch(deleteUserFailed())

         }
      } catch (e) {
         toast.error('delete user failed')
         dispatch(deleteUserFailed())
      }
   }
};
export const deleteUserSuccess = () => ({
   type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
   type: actionTypes.DELETE_USER_FAILED,
});

export const updateUser = (user) => {
   return async (dispatch, getState) => {
      try {

         let res = await editUserService(user);
         if (res && res.errCode === 0) {
            toast.success('update user success')
            dispatch(updateUserSuccess())
            dispatch(fetchAllUsersStart())

         } else {
            toast.error('update user failed')
            dispatch(updateUserFailed())

         }
      } catch (e) {
         toast.error('update user failed')
         dispatch(updateUserFailed())
      }
   }
};
export const updateUserSuccess = () => ({
   type: actionTypes.UPDATE_USER_SUCCESS,
});
export const updateUserFailed = () => ({
   type: actionTypes.UPDATE_USER_FAILED,
});
// top doctor
export const fetchTopDoctor = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getTopDoctorHomeService('');
         if (res && res.errCode === 0) {
            dispatch(fetchTopDoctorSuccess(res.data))
         } else {
            dispatch(fetchTopDoctorFailed())
         }
      } catch (e) {
         dispatch(fetchTopDoctorFailed())
      }
   }
};
export const fetchTopDoctorSuccess = (data) => ({
   type: actionTypes.FETCH_TOP_DOCCTOR_SUCCESS,
   doctors: data
});
export const fetchTopDoctorFailed = () => ({
   type: actionTypes.FETCH_TOP_DOCCTOR_FAILED
});

export const fetchAllDoctors = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getAllDoctorsService();
         if (res && res.errCode === 0) {
            dispatch(fetchAllDoctorsSuccess(res.data))
         } else {
            toast.error('fetch all doctors failed')
            dispatch(fetchAllDoctorsFailed())
         }
      } catch (e) {
         toast.error('fetch all doctors failed')
         dispatch(fetchAllDoctorsFailed())
      }
   }
};
export const fetchAllDoctorsSuccess = (data) => ({
   type: actionTypes.FETCH_ALL_DOCCTOS_SUCCESS,
   doctors: data
});
export const fetchAllDoctorsFailed = () => ({
   type: actionTypes.FETCH_ALL_DOCCTOS_FAILED
});

// l??m r??t g???n

export const createDetailDoctor = (data) => {
   return async (dispatch, getState) => {
      try {
         let res = await saveDetailDoctorService(data);
         if (res && res.errCode === 0) {
            toast.success('create or update infor doctor success')
            dispatch({
               type: actionTypes.CREATE_DETAIL_DOCTOR_SUCCESS
            })
         } else {
            toast.error('create detail doctors failed')
            dispatch({
               type: actionTypes.CREATE_DETAIL_DOCTOR_FAILED
            })
         }
      } catch (e) {
         toast.error('create detail doctors failed catch')
         dispatch({
            type: actionTypes.CREATE_DETAIL_DOCTOR_FAILED
         })
      }
   }
};


export const fetchAllScheduleTime = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getAllcodeService('TIME');
         if (res && res.errCode === 0) {
            dispatch(fetchAllScheduleTimeSuccess(res.data))
         } else {
            toast.error('fetch all schedule time failed')
            dispatch(fetchAllScheduleTimeFailed())
         }
      } catch (e) {
         toast.error('fetch all schedule time failed')
         dispatch(fetchAllScheduleTimeFailed())
      }
   }
};
export const fetchAllScheduleTimeSuccess = (data) => ({
   type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
   dataTime: data
});
export const fetchAllScheduleTimeFailed = () => ({
   type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED
});


export const fetchRequiredDoctorInfor = () => {
   return async (dispatch, getState) => {
      try {
         let resPRICE = await getAllcodeService('PRICE');
         let resPAYMENT = await getAllcodeService('PAYMENT');
         let resPROVINCE = await getAllcodeService('PROVINCE');
         let resSPECIALTY = await getAllcodeService('SPECIALTY');
         if (
            resPRICE && resPRICE.errCode === 0 &&
            resPAYMENT && resPAYMENT.errCode === 0 &&
            resPROVINCE && resPROVINCE.errCode === 0 &&
            resSPECIALTY && resSPECIALTY.errCode === 0
         ) {
            let resData = {
               prices: resPRICE.data,
               payments: resPAYMENT.data,
               provinces: resPROVINCE.data,
               specialties: resSPECIALTY.data
            }
            dispatch(fetchRequiredDoctorInforSuccess(resData))
         } else {
            toast.error('fetch required doctor infor failed')
            dispatch(fetchRequiredDoctorInforFailed())
         }
      } catch (e) {
         console.log('error required doctor infor from adminAction:', e);
         toast.error('fetch required dotor infor failed')
         dispatch(fetchRequiredDoctorInforFailed())
      }
   }
};
export const fetchRequiredDoctorInforSuccess = (resData) => ({
   type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
   data: resData
});
export const fetchRequiredDoctorInforFailed = () => ({
   type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
});

// get all specialties

export const fetchAllSpecialties = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getAllSpecialties();
         if (res && res.errCode === 0) {
            dispatch({
               type: actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS,
               data: res.data
            })
         } else {
            dispatch({
               type: actionTypes.FETCH_ALL_SPECIALTIES_FAILED
            })
         }
      } catch (e) {
         dispatch({
            type: actionTypes.FETCH_ALL_SPECIALTIES_FAILED
         })
      }
   }
};
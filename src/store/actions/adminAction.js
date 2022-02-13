import actionTypes from "./actionTypes";
import { getAllcodeService, createNewUserService } from '../../services/userService';
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
         console.log('check create new user from admin action: ', res);
         if (res && res.errCode === 0) {
            dispatch(createNewuserSuccess())
         } else {
            dispatch(createNewUserFailed())
         }
      } catch (e) {
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
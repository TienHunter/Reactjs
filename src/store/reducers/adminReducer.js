import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    createInforDoctor: false,
    allScheduleTime: [],
    requiredDoctorInfor: [],
    allSpecialties: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            state.genders = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_START:
            state.isLoadingPosition = true;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.isLoadingPosition = false;
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoadingPosition = false;
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.isLoadingRole = false;
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoadingRole = false;
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCCTOR_SUCCESS:
            state.topDoctors = action.doctors;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCCTOR_FAILED:
            state.topDoctors = [];
            return { ...state }
        case actionTypes.FETCH_ALL_DOCCTOS_SUCCESS:
            state.allDoctors = action.doctors;
            return { ...state }
        case actionTypes.FETCH_ALL_DOCCTOS_FAILED:
            state.allDoctors = [];
            return { ...state }
        case actionTypes.CREATE_DETAIL_DOCTOR_SUCCESS:
            state.createInforDoctor = true;
            return { ...state }
        case actionTypes.CREATE_DETAIL_DOCTOR_FAILED:
            state.createInforDoctor = false;
            return { ...state }

        case actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return { ...state }
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return { ...state }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.requiredDoctorInfor = action.data;
            return { ...state }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.requiredDoctorInfor = [];
            return { ...state }

        case actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS:
            state.allSpecialties = action.data;
            return { ...state }
        case actionTypes.FETCH_ALL_SPECIALTIES_FAILED:
            state.allSpecialties = [];
            return { ...state }
        default:
            return state;
    }
}

export default appReducer;
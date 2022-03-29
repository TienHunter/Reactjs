import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils'
import {
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Input,
   Label,
   Form,
   FormGroup,
} from "reactstrap";
import Select from 'react-select';
import DatePicker from '../../../../components/Input/DatePicker'
import _, { first } from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import moment, { lang } from "moment";
import * as actions from '../../../../store/actions'
import ProfileDoctor from "../ProfileDoctor";
import LoadingData from "./LoadingData";
import { postBookingAppointment } from '../../../../services/userService'
import './BookingModal.scss'
class BookingModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',//
         firstName: '',//
         lastName: '',///
         address: '',//
         phoneNumber: '',//
         genderSelected: '',
         genders: [],
         doctorId: '',
         date: '',
         timeType: '',
         dateOfBirth: '',
         reason: '',
         isLoadingData: false
      }
   }

   async componentDidMount() {
      this.props.getGenderStart();
      this.setStateOfDoctor()
   }
   buildDataSelect = (data) => {
      let results = [];
      let { language } = this.props;
      if (data && data.length > 0) {
         data.map((item, index) => {
            let object = {};

            object.label = (language === LANGUAGES.VI) ? item.valueVi : item.valueEn;
            object.value = item.keyMap

            results.push(object)
         })
      }
      return results;
   }
   setStateOfDoctor = () => {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
         let { doctorId, date, timeType } = this.props.dataTime;
         this.setState({
            doctorId, timeType, date
         })
      }
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
         let gendersArr = this.buildDataSelect(this.props.genders)
         this.setState({
            genders: gendersArr
         })
      }
      if (prevProps.genders !== this.props.genders) {
         let gendersArr = this.buildDataSelect(this.props.genders)
         this.setState({
            genders: gendersArr
         })
      }
      // if (prevProps.dataTime !== this.props.dataTime) {
      //    console.log(this.props.dataTime);
      //    if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
      //       let { doctorId, date, timeType } = this.props.dataTime;
      //       this.setState({
      //          doctorId, timeType, date
      //       })
      //    }
      // }
   }
   handleChangeSelect = async (selectedOption) => {
      this.setState({ genderSelected: selectedOption });
   };
   handleOnChangeInput = (event, type) => {
      let copyState = { ...this.state };
      copyState[type] = event.target.value;
      this.setState({ ...copyState })
   }
   handleOnchangeDatePicker = (date) => {
      this.setState({
         dateOfBirth: date[0]
      })
   }
   buildBookingTime = () => {
      let { language, dataTime } = this.props;
      if (dataTime && !_.isEmpty(dataTime)) {
         let date = '', time = '';
         if (language === LANGUAGES.VI) {
            date = moment.unix(dataTime.date / 1000).format('dddd - DD/MM/YYYY');
            time = dataTime.timeData.valueVi;
         } else {
            date = moment.unix(dataTime.date / 1000).locale('en').format('ddd - MM/DD/yyy');
            time = dataTime.timeData.valueEn;
         }
         return (
            `${time} - ${date}`
         )
      }
      return (
         ''
      )
   }
   buildDoctorName = () => {
      let { language, dataTime } = this.props;
      let doctorName = '';
      if (dataTime && dataTime.doctorData) {
         let { doctorData } = dataTime;
         doctorName = language === LANGUAGES.VI ?
            `${doctorData.lastName} ${doctorData.lastName}`
            :
            `${doctorData.firstName} ${doctorData.lastName}`
      }
      return doctorName;
   }
   saveBookingAppointment = async () => {
      console.log('check state booking:', this.state);
      this.setState({
         isLoadingData: true
      })
      let { email, firstName, lastName, phoneNumber, address, genderSelected
         , date, doctorId, timeType,
         dateOfBirth, reason }
         = this.state;
      let dateToString = '';
      if (date) {
         dateToString = date.toString()
      }
      let doctorName = this.buildDoctorName();
      let bookingTime = this.buildBookingTime();
      let patientName = '';
      let { language } = this.props;
      patientName = language === LANGUAGES.VI ? `${lastName} ${firstName}` : `${firstName} ${lastName}`
      let res = await postBookingAppointment({
         email,
         firstName,
         lastName,
         address,
         phoneNumber,
         gender: genderSelected.value,
         doctorId,
         date: dateToString,
         timeType,
         doctorName,
         bookingTime,
         patientName,
         language
         // dateOfBirth: '',
         // reason: ''
      })
      this.setState({
         isLoadingData: false
      })
      if (res && res.errCode === 0) {
         toast.success('save booking appointment success');
         this.props.closeBookingModal()
      } else {
         toast.error('save booking appointment failed')
      }
   }
   render() {
      let { isOpeningModal, closeBookingModal, dataTime } = this.props;
      let { genders, isLoadingData } = this.state;
      let { email, firstName, lastName, phoneNumber, address, genderSelected, dateOfBirth, reason } = this.state;
      return (
         <div>
            <Modal
               isOpen={isOpeningModal}
               className='booking-modal-container'
               centered
            >
               <div className="header">
                  <span className="title">Thông tin đặt lịch khám bệnh</span>
                  <i
                     className="fas fa-times"
                     onClick={closeBookingModal}
                  ></i>
               </div>
               <div className="body">
                  <div className="doctor-intro">
                     <ProfileDoctor
                        doctorId={dataTime && dataTime.doctorId ? dataTime.doctorId : -1}
                        dataTime={dataTime}
                     />
                  </div>
                  <div className="row">
                     <div className="col-6 form-group">
                        <label>First Name</label>
                        <input
                           type='text'
                           className="form-control"
                           placeholder='first name'
                           value={firstName}
                           onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                        />
                     </div>
                     <div className="col-6 form-group">
                        <label>Last Name</label>
                        <input
                           type='text'
                           className="form-control"
                           placeholder='last name'
                           value={lastName}
                           onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                        />
                     </div>
                     <div className="col-6 form-group">
                        <label>Phone number</label>
                        <input
                           type='text'
                           className="form-control"
                           placeholder='phoneNumber'
                           value={phoneNumber}
                           onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                        />
                     </div>
                     <div className="col-6 form-group">
                        <label>Email</label>
                        <input
                           type='text'
                           className="form-control"
                           placeholder='email'
                           value={email}
                           onChange={(event) => this.handleOnChangeInput(event, 'email')}
                        />
                     </div>
                     <div className="col-12 form-group">
                        <label>Address</label>
                        <input
                           type='text'
                           className="form-control"
                           placeholder='address'
                           value={address}
                           onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        />
                     </div>
                     <div className="col-6 form-group">
                        <label>Date of birth</label>
                        <DatePicker
                           className="form-control"
                           onChange={this.handleOnchangeDatePicker}
                           value={dateOfBirth}
                        />
                     </div>
                     <div className="col-6 form-group">
                        <label>Gender</label>
                        <Select
                           value={genderSelected}
                           onChange={this.handleChangeSelect}
                           options={genders}
                        />
                     </div>
                     <div className="col-12 form-group">
                        <label>Reason</label>
                        <input
                           type='text'
                           className="form-control"
                           placeholder='reason'
                           value={reason}
                           onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                        />
                     </div>
                  </div>
               </div>
               <div className="footer">
                  <button
                     className="btn-booking-modal btn-confirm"
                     onClick={() => this.saveBookingAppointment()}
                  >
                     Confirm
                  </button>
                  <button
                     className="btn-booking-modal btn-cancel"
                     onClick={closeBookingModal}
                  >Cancel</button>
               </div>
            </Modal>
            {isLoadingData && <LoadingData />}
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      genders: state.admin.genders,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getGenderStart: () => dispatch(actions.fetchGenderStart()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

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
import ProfileDoctor from "../ProfileDoctor";
import './BookingModal.scss'
class BookingModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   async componentDidMount() {
   }
   componentDidUpdate(prevProps, prevState, snapshot) { }
   render() {
      let { isOpeningModal, closeBookingModal, dataTime } = this.props;
      console.log('check props booking modal:', dataTime);
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
                     />
                  </div>
                  <div className="row">
                     <div className="col-6 form-group">
                        <label>Name</label>
                        <input
                           type='text'
                           className="form-control"
                           placeholder='name'
                        />
                     </div>
                     <div className="col-6 form-group">
                        <label>Phone number</label>
                        <input
                           type='text'
                           className="form-control"
                           placeholder='phoneNumber'
                        />
                     </div>
                     <div className="col-6 form-group">
                        <label>Email</label>
                        <input
                           type='text'
                           className="form-control"
                           placeholder='email'
                        />
                     </div>
                     <div className="col-6 form-group">
                        <label>Age</label>
                        <input
                           type='text'
                           className="form-control"
                           placeholder='age'
                        />
                     </div>
                  </div>
               </div>
               <div className="footer">
                  <button className="btn-booking-modal btn-confirm">Confirm</button>
                  <button
                     className="btn-booking-modal btn-cancel"
                     onClick={closeBookingModal}
                  >Cancel</button>
               </div>
            </Modal>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

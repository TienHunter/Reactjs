import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment'
import { getAllPatientsForDoctor } from "../../../services/userService"
import { toast } from 'react-toastify';
import './ManagePatient.scss'
import RemedyModal from "./RemedyModal";
import { sendRemedy } from "../../../services/userService"
import { LANGUAGES } from '../../../utils'
import LoadingData from "../../Patient/Doctor/Modal/LoadingData";
class ManagePatient extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currentDate: moment(new Date()).startOf("day").valueOf(),
         patients: [],
         isOpenRemedyModal: false,
         emailPatient: "",
         patient: {},
         isLoadingData: false
      }
   }

   async componentDidMount() {
      let patients = await this.getAllPatients();
      this.setState({ patients })
   }
   getAllPatients = async () => {
      let { user } = this.props;
      let { currentDate } = this.state;
      let res = await getAllPatientsForDoctor(user.id, currentDate);
      if (res && res.errCode === 0) {
         return res.data;
      } else return []
   }
   async componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevState.currentDate !== this.state.currentDate) {
         let patients = await this.getAllPatients();
         this.setState({ patients })
      }
   }
   handleOnchangeDatePicker = (date) => {
      this.setState({
         currentDate: moment(new Date(date[0])).startOf("day").valueOf()
      })
   }
   onShowRemedyModal = (item) => {
      let { language } = this.props;
      let { patientData, patientTimeData } = item;
      let namePatient = '', timeData = '';
      if (language === LANGUAGES.VI) {
         namePatient = `${patientData.lastName} ${patientData.firstName}`;
         timeData = patientTimeData.valueVi;
      }
      else {
         namePatient = `${patientData.firstName} ${patientData.lastName}`;
         timeData = patientTimeData.valueEn;
      }
      let data = {
         doctorId: item.doctorId,
         patientId: item.patientId,
         email: patientData.email,
         timeData,
         namePatient
      }
      this.setState({
         isOpenRemedyModal: true,
         patient: data,
         emailPatient: patientData.email
      })
   }
   closeRemedyModal = () => {
      this.setState({
         isOpenRemedyModal: false,
         emailPatient: ""
      })
   }
   sendRemedy = async (dataFromChild) => {
      let { patient } = this.state;
      this.setState({ isLoadingData: true });
      let res = await sendRemedy({
         doctorId: patient.doctorId,
         patientId: patient.patientId,
         timeData: patient.timeData,
         namePatient: patient.namePatient,
         email: dataFromChild.email,
         image: dataFromChild.image,
         language: this.props.language
      })
      await this.setState({
         isLoadingData: false
      })
      if (res && res.errCode === 0) {
         toast.success('send remedy success');
         this.closeRemedyModal();
         let patients = await this.getAllPatients();
         this.setState({ patients })
      } else {
         toast.error('send remedy failed');
         console.log('res error: ', res);
      }
   }
   render() {
      let { currentDate, patients, isLoadingData } = this.state;
      let { isOpenRemedyModal, emailPatient } = this.state;
      return (
         <>
            <div className="manage-patients-container container">
               <div className="manage-patients__title"><FormattedMessage id="manage-patient.title" /></div>
               <div className="row">
                  <div className="col-6 form-group manage-patients__data">
                     <label className="select-name"><FormattedMessage id="manage-patient.choose-date" /></label>
                     <DatePicker
                        className="form-control"
                        onChange={this.handleOnchangeDatePicker}
                        value={currentDate}
                     // minDate={yesterday}
                     />
                  </div>
                  <div className="users-table">
                     <table id="customers">
                        <tbody>
                           <tr>
                              <th><FormattedMessage id="manage-patient.id" /></th>
                              <th><FormattedMessage id="manage-patient.name" /></th>
                              <th><FormattedMessage id="manage-patient.time" /></th>
                              <th><FormattedMessage id="manage-patient.address" /></th>
                              <th><FormattedMessage id="manage-patient.email" /></th>
                              <th><FormattedMessage id="manage-patient.gender" /></th>
                              <th><FormattedMessage id="manage-patient.action" /></th>
                           </tr>
                           {patients && patients.length > 0 ?
                              patients.map((item, index) => {
                                 let { patientTimeData, patientData } = item;
                                 return (
                                    <tr key={index}>
                                       <td>{index + 1}</td>
                                       <td>{patientData.firstName}</td>
                                       <td>{patientTimeData.valueEn}</td>
                                       <td>{patientData.address}</td>
                                       <td>{patientData.email}</td>
                                       <td>{patientData.genderData.valueEn}</td>
                                       <td>
                                          <button
                                             className="manage-patient__btn-confirm"
                                             onClick={() => {
                                                this.onShowRemedyModal(item);
                                             }}
                                          >
                                             <FormattedMessage id="manage-patient.confirm" />
                                          </button>

                                       </td>
                                    </tr>
                                 );
                              })

                              :
                              <tr>
                                 <td colSpan="7" className="no-data" ><FormattedMessage id="manage-patient.no-data" /></td>
                              </tr>
                           }

                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
            {isOpenRemedyModal &&
               <RemedyModal
                  isOpenRemedyModal={isOpenRemedyModal}
                  emailPatient={emailPatient}
                  closeRemedyModal={this.closeRemedyModal}
                  sendRemedy={this.sendRemedy}
               />
            }
            {isLoadingData && <LoadingData />}
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      user: state.user.userInfo
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

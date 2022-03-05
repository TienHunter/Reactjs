import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

import { LANGUAGES, dateFormat } from "../../../utils"
import DatePicker from '../../../components/Input/DatePicker'
import * as actions from '../../../store/actions'
import { postBulkScheduleDoctor } from '../../../services/userService'
import './ManageSchedule.scss'
import 'react-toastify/dist/ReactToastify.css';
class ManageSchedule extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedOption: null,
         arrDoctors: [],
         currentDate: '',
         rangeTime: []
      }
   }
   componentDidMount() {
      this.props.fetchAllDoctors();
      this.props.fetchAllScheduleTime()
   }
   buildDataSelect = (data) => {
      let results = [];
      let { language } = this.props;
      if (data && data.length > 0) {
         data.map((item, index) => {
            let object = {};
            let labelVi = `${item.lastName} ${item.firstName}`;
            let labelEn = `${item.firstName} ${item.lastName}`;

            object.label = (language === LANGUAGES.VI) ? labelVi : labelEn;
            object.value = item.id

            results.push(object)
         })
      }
      return results;
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.allDoctors !== this.props.allDoctors) {
         let dataSelect = this.buildDataSelect(this.props.allDoctors)
         this.setState({
            arrDoctors: dataSelect
         })
      }
      if (prevProps.language !== this.props.language) {
         let dataSelect = this.buildDataSelect(this.props.allDoctors)
         this.setState({
            arrDoctors: dataSelect,
         })
      }
      if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
         let data = this.props.allScheduleTime;
         if (data && data.length > 0) {
            data = data.map(item => ({
               ...item,
               isSelected: false
            }))
         }
         this.setState({
            rangeTime: data
         })
      }
      if (prevState.arrDoctors !== this.state.arrDoctors) {
         this.setState({
            selectedOption: this.fixShowDoctor(this.state.selectedOption)
         })
      }
   }
   handleChangeSelect = async (selectedOption) => {
      this.setState({ selectedOption });
   };
   fixShowDoctor = (selectedOption) => {
      const { arrDoctors } = this.state;
      if (selectedOption) {
         for (let i = 0; i < arrDoctors.length; i++) {
            if (arrDoctors[i].value === selectedOption.value) {
               return arrDoctors[i];
            }
         }
      }

      return null;
   }
   handleOnchangeDatePicker = (date) => {
      this.setState({
         currentDate: date[0]
      })
   }
   handleClickBtn = (time) => {
      let { rangeTime } = this.state;
      let data = {};
      if (rangeTime && rangeTime.length > 0) {
         data = rangeTime.map(item => {
            if (item.id === time.id) item.isSelected = !item.isSelected
            return item;
         })
      }
      this.setState({
         rangeTime: data
      })
   }
   handleSaveSchedule = async () => {
      let { selectedOption, arrDoctors, currentDate, rangeTime } = this.state;
      let results = [];
      if (!selectedOption) {
         toast.error('Invalid select doctor');
         return;
      }
      if (!currentDate) {
         toast.error('Invalid select date');
         return;
      }
      let formateDate = new Date(currentDate).getTime()
      if (rangeTime && rangeTime.length > 0) {
         let selectSchedule = rangeTime.filter(item => item.isSelected);
         if (selectSchedule && selectSchedule.length > 0) {
            selectSchedule.map(item => {
               let object = {};
               object.doctorId = selectedOption.value;
               object.date = formateDate;
               object.timeType = item.keyMap;

               results.push(object)
            })
         } else {
            toast.warning('Invalid selected schedule')
         }
      }
      let res = await postBulkScheduleDoctor({
         arrSchedule: results,
         doctorId: selectedOption.value,
         formateDate: formateDate
      })
      console.log('check res postBulkScheduleDoctor: ', res);
      toast.success('post schedule doctor success')
   }
   render() {
      let { selectedOption, arrDoctors, rangeTime, currentDate } = this.state;
      let { language } = this.props;
      return (
         <div className="manage-schedule-contanier">
            <div className="title"><FormattedMessage id="manage-schedule.title" /></div>
            <div className="container body">
               <div className="row">
                  <div className="col-6 form-group">
                     <label className="select-title"><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                     <Select
                        value={selectedOption}
                        onChange={this.handleChangeSelect}
                        options={arrDoctors}
                     />
                  </div>
                  <div className="col-6 form-group">
                     <label className="select-title"><FormattedMessage id="manage-schedule.choose-date" /></label>
                     <DatePicker
                        className="form-control"
                        onChange={this.handleOnchangeDatePicker}
                        value={currentDate}
                        minDate={new Date()}
                     />
                  </div>
                  <div className="col-12 infor-time">
                     {rangeTime && rangeTime.length > 0 &&
                        rangeTime.map((item, index) => {
                           return (
                              <button
                                 className={`btn btn-manage-schedule ${item.isSelected ? 'active' : ''}`}
                                 key={index}
                                 onClick={() => this.handleClickBtn(item)}
                              >
                                 {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                              </button>
                           )
                        })
                     }
                  </div>
                  <div className="col-12">
                     <button
                        className="btn btn-add"
                        onClick={() => this.handleSaveSchedule()}
                     >
                        <FormattedMessage id="manage-schedule.save" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
      allDoctors: state.admin.allDoctors,
      allScheduleTime: state.admin.allScheduleTime

   };
};

const mapDispatchToProps = dispatch => {
   return {
      fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
      fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment"
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../../utils'
import { getScheduleDoctorbyId } from '../../../services/userService'
import './DoctorSchedule.scss'
class DoctorSchedule extends Component {
   constructor(props) {
      super(props);
      this.state = {
         allDays: [],
         allAvalableTime: []
      }
   }

   async componentDidMount() {
      let { language } = this.props;
      let allDays = this.getArrDays(language)
      this.setState({
         allDays
      })
   }
   getArrDays = (language) => {
      let allDays = [];
      //set time cho 7 ngày liên tiếp
      for (let i = 0; i < 7; i++) {
         let object = {};
         if (language === LANGUAGES.VI) {
            let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            object.label = this.capitalizeFirstLetter(labelVi)
         } else {
            object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
         }
         object.value = moment(new Date()).add(i, 'days').startOf("day").valueOf();
         allDays.push(object);
      }
      return allDays;
   }
   capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }
   async componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
         let allDays = this.getArrDays(this.props.language)
         this.setState({
            allDays
         })
      }
      if (prevProps.doctorId !== this.props.doctorId) {
         let { allDays } = this.state;
         let res = await getScheduleDoctorbyId(this.props.doctorId, allDays[0].value)
         if (res && res.errCode === 0) {
            this.setState({
               allAvalableTime: res.data ? res.data : []
            })
         }
      }
   }
   hanleOnchangeSelect = async (event) => {
      let { doctorId } = this.props;
      if (doctorId && doctorId !== -1) {
         let date = event.target.value;
         let res = await getScheduleDoctorbyId(doctorId, date)
         if (res && res.errCode === 0) {
            this.setState({
               allAvalableTime: res.data ? res.data : []
            })
         }
      }
   }
   render() {
      const { allDays, allAvalableTime } = this.state;
      let { language } = this.props;
      return (
         <div className='doctor-schedule-contanier'>
            <div>
               <select
                  className="select-tag"
                  onChange={(event) => this.hanleOnchangeSelect(event)}
               >
                  {allDays && allDays.length > 0 && allDays.map((item, index) => {
                     return (
                        <option
                           key={index}
                           value={item.value}
                        >
                           {item.label}
                        </option>
                     )
                  })}
               </select>
            </div>
            <div className="all-avalable-time">
               <div className="text-calendar">
                  <i className="fas fa-calendar-alt">
                     <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                  </i>
               </div>
               <div className="schedule-time">
                  {allAvalableTime && allAvalableTime.length > 0 ?
                     <>
                        <div className="schedule-time__select">
                           {allAvalableTime.map((item, index) => {
                              let timeDisplay = language === LANGUAGES.VI ? item.timeData.valueVi : item.timeData.valueEn;
                              return (
                                 <button className={`btn-schedule ${language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}`} key={index}>{timeDisplay}</button>
                              )
                           })}
                        </div>
                        <div className="booking">
                           <FormattedMessage id="patient.detail-doctor.choose" />
                           <i className="fas fa-hand-point-up"></i>
                           <FormattedMessage id="patient.detail-doctor.book-free" />
                        </div>
                     </>
                     :
                     <div className="no-schedule"><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                  }
               </div></div>
         </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

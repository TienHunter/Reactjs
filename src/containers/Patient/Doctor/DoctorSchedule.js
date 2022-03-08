import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment"
import localization from 'moment/locale/vi'
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
      this.setArrDays(language)
   }
   setArrDays = (language) => {
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
      this.setState({
         allDays
      })
   }
   capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
         this.setArrDays(this.props.language)
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
      console.log(allAvalableTime);
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
            <div className="schedule-time">
               {allAvalableTime && allAvalableTime.length > 0 ?
                  allAvalableTime.map((item, index) => {
                     let timeDisplay = language === LANGUAGES.VI ? item.timeData.valueVi : item.timeData.valueEn;
                     return (
                        <button className="btn-schedule" key={index}>{timeDisplay}</button>
                     )
                  })
                  :
                  <div>No data to display</div>
               }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

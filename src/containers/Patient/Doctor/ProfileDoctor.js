import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils'
import NumberFormat from 'react-number-format';
import _ from "lodash";
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getProfileDoctorByDoctorId } from '../../../services/userService'

import './ProfileDoctor.scss'
class ProfileDoctor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dataProfile: {},
         isShowDescription: false
      }
   }

   async componentDidMount() {
      let data = await this.fetchDataToProps(this.props.doctorId)
      this.setState({
         dataProfile: data
      })
   }
   async componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {

      }
      if (prevProps.doctorId !== this.props.doctorId) {
         let data = await this.fetchDataToProps(this.props.doctorId);
         this.setState({
            dataProfile: data
         })
      }
   }
   fetchDataToProps = async (doctorId) => {
      let result = {};
      if (doctorId) {
         let res = await getProfileDoctorByDoctorId(doctorId);
         if (res && res.errCode === 0) {
            result = res.data;
         }
      }
      return result
   }
   renderBookingTime = (dataTime) => {
      let { language } = this.props;
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
            <>
               <div>{time} ----- {date}</div>
            </>
         )
      }
      return (
         <></>
      )
   }
   render() {
      let { dataProfile, isShowDescription } = this.state;
      // console.log('check dataTime:', this.props.dataTime);
      let { language, dataTime } = this.props;
      let nameVi = '', nameEn = '';
      if (dataProfile && dataProfile.positionData) {
         nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
         nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
      }
      return (
         <div className="profile-doctor-container">
            <div className="intro-doctor">
               <div
                  className="content-left"
                  style={{ backgroundImage: `url(${dataProfile.image})` }}
               >
               </div>
               <div className="content-right">
                  <div className="name-doctor">
                     {
                        language === LANGUAGES.VI ? nameVi : nameEn
                     }
                  </div>
                  <div className="description">
                     {isShowDescription && dataProfile.Markdown && dataProfile.Markdown.description &&
                        <span>
                           {dataProfile.Markdown.description}
                        </span>
                     }
                     {!isShowDescription && this.renderBookingTime(dataTime)}
                  </div>
               </div>
            </div>
            <div className="fee-examination">
               <span className="fee-title">
                  Fee examination :
               </span>
               <span className="fee">
                  {
                     dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceData && language === LANGUAGES.VI &&
                     <NumberFormat
                        value={dataProfile.Doctor_Infor.priceData.valueVi}
                        className="foo"
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'VND'}
                     />
                  }
                  {
                     dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceData && language === LANGUAGES.EN &&
                     <NumberFormat
                        value={dataProfile.Doctor_Infor.priceData.valueEn}
                        className="foo"
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'$'}
                     />
                  }
               </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);

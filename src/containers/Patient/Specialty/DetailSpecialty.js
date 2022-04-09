import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getDetailSpecialty } from '../../../services/userService'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import { getAllcodeService } from "../../../services/userService"
import './DetailSpecialty.scss'
import { LANGUAGES } from '../../../utils'
import HomeHeader from "../../HomePage/HomeHeader";
import _ from "lodash";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorAddress from "../Doctor/DoctorAddress";
import DoctorSchedule from "../Doctor/DoctorSchedule";
class DetailSpecialty extends Component {
   constructor(props) {
      super(props);
      this.state = {
         specialty: {},
         doctors: [],
         selectedProvince: null,
         arrProvinces: [],
         doctorsProvince: []
      }
   }

   async componentDidMount() {
      if (this.props.match && this.props.match.params && this.props.match.params.specialtyId) {
         let specialtyId = this.props.match.params.specialtyId
         let res = await getDetailSpecialty(specialtyId)
         if (res && res.errCode === 0) {
            let data = res.data;
            if (!_.isEmpty(data)) { // check specialty && doctors
               let provinces = await getAllcodeService('PROVINCE');
               if (provinces && provinces.errCode === 0) { // check provinces
                  let arrProvinces = this.buildDataSelect(provinces.data);
                  let selectedProvince = arrProvinces ? arrProvinces[0] : null
                  this.setState({
                     specialty: data.specialty,
                     doctors: data.doctors,
                     arrProvinces,
                     selectedProvince,
                     doctorsProvince: data.doctors
                  })
               }

            }

         }
      }

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
         let nationwide = {};
         nationwide.label = (language === LANGUAGES.VI) ? 'Toàn quốc' : 'Nationwide';
         nationwide.value = 'ALL'

         results.unshift(nationwide)
      }
      return results;
   }
   async componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
         let provinces = await getAllcodeService('PROVINCE');
         if (provinces && provinces.errCode === 0) { // check provinces
            this.setState({
               arrProvinces: this.buildDataSelect(provinces.data)
            })
         }
      }
      // if (prevProps.arrProvinces !== this.props.arrProvinces) {
      //    let provinces = await getAllcodeService('PROVINCE');
      //    if (provinces && provinces.errCode === 0) { // check provinces
      //       this.setState({
      //          arrProvinces: this.buildDataSelect(provinces.data)
      //       })
      //    }
      // }

      if (prevState.arrProvinces !== this.state.arrProvinces) {
         let { arrProvinces, selectedProvince } = this.state;
         if (selectedProvince) {
            this.setState({
               selectedProvince: this.fixShowLabel(arrProvinces, selectedProvince)
            })
         }

      }
   }
   handleChangeSelect = async (selectedOption) => {
      await this.setState({ selectedProvince: selectedOption });
      let { doctors, selectedProvince } = this.state;
      if (selectedProvince.value === 'ALL') {
         this.setState({
            doctorsProvince: doctors
         })
      } else {

         let arrDoctors = doctors.filter(item => item.provinceId === selectedProvince.value);
         this.setState({
            doctorsProvince: arrDoctors
         })
      }
   };
   fixShowLabel = (arr, selectedOption) => {
      return arr.find(currentValue => {
         return currentValue.value === selectedOption.value
      })
   }
   render() {
      let { specialty, arrProvinces, selectedProvince, doctorsProvince } = this.state;
      let { image } = specialty;
      return (
         <>
            <HomeHeader />
            <div className="detail-specialty-container">
               <div
                  className="specialty__intro"
                  style={{ backgroundImage: `url(${image ? image : ''})` }}
               >
                  <div className="background-rgba">
                     <div className="container">
                        {specialty && specialty.descriptionHTML
                           && <div dangerouslySetInnerHTML={{ __html: specialty.descriptionHTML }} />
                        }
                     </div>
                  </div>
               </div>

               <div className="specialty__body">
                  <div className="container">
                     <div className="specialty__select-location">
                        <Select
                           value={selectedProvince}
                           onChange={this.handleChangeSelect}
                           options={arrProvinces}
                        // placeholder={intl.formatMessage({ id: "patient.booking-appointment.gender" })}
                        />
                     </div>
                     {doctorsProvince && doctorsProvince.map((item, index) => {
                        return (
                           <div className="speccialty__doctor" key={index}>
                              <div className="speccialty__doctor--content-left">
                                 <ProfileDoctor
                                    doctorId={item.doctorId}
                                    isShowDescription={true}
                                    isShowFee={false}
                                 />
                                 <Link to={`/detail-doctor/${item.doctorId}`} className="" >
                                    <FormattedMessage id="patient.detail-specialty.more-infor" />
                                 </Link>

                              </div>
                              <div className="border-vertical" />
                              <div className="speccialty__doctor--content-right">
                                 <DoctorSchedule
                                    doctorId={item.doctorId}
                                 />
                                 <div className="border-horizontal"></div>
                                 <DoctorAddress
                                    doctorId={item.doctorId}
                                 />
                              </div>
                           </div>
                        )
                     })}
                  </div>
               </div>
            </div>
         </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);

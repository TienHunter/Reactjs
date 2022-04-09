import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import './DetailClinic.scss'
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailClinic } from "../../../services/userService";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorAddress from "../Doctor/DoctorAddress";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import { Link } from 'react-router-dom'
import { LANGUAGES } from '../../../utils'
class DetailClinic extends Component {
   constructor(props) {
      super(props);
      this.state = {
         clinic: {},
         doctors: [],
      }
   }

   async componentDidMount() {
      if (this.props.match && this.props.match.params && this.props.match.params.clinicId) {
         let clinicId = this.props.match.params.clinicId
         let res = await getDetailClinic(clinicId)
         if (res && res.errCode === 0) {
            let data = res.data;
            if (!_.isEmpty(data)) { // check specialty && doctors
               console.log('check data :', data);
               this.setState({
                  clinic: data.clinic,
                  doctors: data.doctors,
               })
            }

         }

      }
   }

   componentDidUpdate(prevProps, prevState, snapshot) { }
   render() {
      let { clinic, doctors } = this.state;
      console.log('check clinic: ', clinic, doctors);
      return (
         <>
            <HomeHeader />
            <div className="detail-clinic-container">
               <div className="detail-clinic__header">
                  <div className="container">
                     <div
                        className="detail-clinic__avatar"
                        style={{ backgroundImage: `url(${clinic && clinic.image ? clinic.image : ""})` }}
                     />
                     <div className="detail-clinic__infor">
                        <div className="detail-clinic__name">
                           {clinic && clinic.name ? clinic.name : ""}
                        </div>
                        <div className="detail-clinic__location">
                           <i class="fas fa-map-marker-alt"></i>
                           {clinic && clinic.address ? clinic.address : ""}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="detail-clinic__doctors">
                  <div className="container">
                     {doctors && doctors.map((item, index) => {
                        return (
                           <div className="detail-clinic__doctor" key={index}>
                              <div className="detail-clinic__doctor--content-left">
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
                              <div className="detail-clinic__doctor--content-right">
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
               <div className="detail-clinic__description">
                  <div className="container">
                     {clinic && clinic.descriptionHTML
                        && <div dangerouslySetInnerHTML={{ __html: clinic.descriptionHTML }} />
                     }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);

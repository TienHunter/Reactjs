import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'
import _ from "lodash"
class OutstandingDoctor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrDoctors: []
      }
   }

   async componentDidMount() {
      this.props.loadTopDoctor()
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.topDoctors !== this.props.topDoctors) {
         this.setState({
            arrDoctors: this.props.topDoctors
         })
      }
   }
   handleViewDetailDoctor = (doctor) => {
      this.props.history.push(`/detail-doctor/${doctor.id}`)
   }
   render() {
      let { arrDoctors } = this.state;
      let { language } = this.props;
      return (
         <div className="section-share section-outstanding-doctor">
            <div className="section-container">
               <div className="section-header">
                  <span className="title-section">
                     <FormattedMessage id="homepage.outstanding-doctor" />
                  </span>
                  <button className="btn-section">
                     <FormattedMessage id="homepage.more-infor" />
                  </button>
               </div>
               <div className="section-body">
                  <Slider {...this.props.settings}>
                     {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                        let specialty = "";
                        let nameSpecialty = "";
                        if (item.Doctor_Infors && item.Doctor_Infors.specialtyData) {
                           specialty = item.Doctor_Infors.specialtyData
                           console.log(specialty);
                           nameSpecialty = language === LANGUAGES.VI ? (specialty.valueVi ? specialty.valueVi : "no data") : (specialty.valueEn ? specialty.valueEn : "no data")
                        }
                        let imageBase64 = '';
                        if (item.image) {
                           imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                        }
                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`

                        return (
                           <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                              <div className="section-item-custom customize-border">
                                 <div className="bg-image section-outstanding-doctor"
                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                 />
                                 <h5 className="doctor-name">{language === LANGUAGES.VI ? nameVi : nameEn}</h5>
                                 <p className="specialty-doctor">{nameSpecialty}</p>
                              </div>
                           </div>
                        )
                     })}
                  </Slider>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
      topDoctors: state.admin.topDoctors
   };
};
// fire redux action
const mapDispatchToProps = dispatch => {
   return {
      loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
   };
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)); // cho redux hiểu để kết nối react với redux ??

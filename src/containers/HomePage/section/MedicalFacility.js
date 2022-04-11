import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { withRouter } from 'react-router'
import { FormattedMessage } from "react-intl"
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'
import { getAllClinics } from "../../../services/userService"

class MedicalFacility extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrClinics: []
      }
   }
   async componentDidMount() {
      let res = await getAllClinics();
      if (res && res.errCode === 0) {
         this.setState({
            arrClinics: res.data
         })
      }
   }
   async componentDidUpdate(prevProps, prevState, snapshot) { }
   handleViewDetailCllinic = (item) => {
      this.props.history.push(`/detail-clinic/${item.id}`)
   }
   render() {
      let { arrClinics } = this.state;
      console.log('check arrClinics: ', this.state);
      return (
         <div className="section-share section-medical-facility">
            <div className="section-container">
               <div className="section-header">
                  <span className="title-section"><FormattedMessage id="homepage.medical-facility" /></span>
                  <button className="btn-section"><FormattedMessage id="homepage.more-infor" /></button>
               </div>
               <div className="section-body">
                  <Slider {...this.props.settings}>
                     {arrClinics && arrClinics.length &&
                        arrClinics.map((item, index) => {
                           return (
                              <div
                                 className='section-customize'
                                 key={index}
                                 onClick={() => this.handleViewDetailCllinic(item)}
                              >
                                 <div className="section-item-custom">
                                    <div
                                       className="bg-image section-medical-facility"
                                       style={{ backgroundImage: `url(${item.image})` }}
                                    />
                                    <div className="section-name-detail">{item.name}</div>
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
   };
};



export default withRouter(connect(mapStateToProps)(MedicalFacility)); // cho redux hiểu để kết nối react với redux ??

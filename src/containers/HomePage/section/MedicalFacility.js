import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";


class MedicalFacility extends Component {

   render() {

      return (
         <div className="section-share section-medical-facility">
            <div className="section-container">
               <div className="section-header">
                  <span className="title-section">Cơ sở y tế nổi bật</span>
                  <button className="btn-section">Xem thêm</button>
               </div>
               <div className="section-body">
                  <Slider {...this.props.settings}>
                     <div className='section-customize'>
                        <div className="bg-image section-medical-facility" />
                        <div className="section-name-detail">Bệnh viện chợ rẫy </div>
                     </div><div className='section-customize'>
                        <div className="bg-image section-medical-facility" />
                        <div className="section-name-detail">Bệnh viện chợ rẫy </div>
                     </div><div className='section-customize'>
                        <div className="bg-image section-medical-facility" />
                        <div className="section-name-detail">Bệnh viện chợ rẫy </div>
                     </div><div className='section-customize'>
                        <div className="bg-image section-medical-facility" />
                        <div className="section-name-detail">Bệnh viện chợ rẫy </div>
                     </div><div className='section-customize'>
                        <div className="bg-image section-medical-facility" />
                        <div className="section-name-detail">Bệnh viện chợ rẫy </div>
                     </div><div className='section-customize'>
                        <div className="bg-image section-medical-facility" />
                        <div className="section-name-detail">Bệnh viện chợ rẫy </div>
                     </div><div className='section-customize'>
                        <div className="bg-image section-medical-facility" />
                        <div className="section-name-detail">Bệnh viện chợ rẫy </div>
                     </div>

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



export default connect(mapStateToProps)(MedicalFacility); // cho redux hiểu để kết nối react với redux ??

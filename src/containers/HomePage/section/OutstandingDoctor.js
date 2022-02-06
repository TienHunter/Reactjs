import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";


class OutstandingDoctor extends Component {

   render() {

      return (
         <div className="section-share section-outstanding-doctor">
            <div className="section-container">
               <div className="section-header">
                  <span className="title-section">Chuyên khoa phổ biến</span>
                  <button className="btn-section">Xem thêm</button>
               </div>
               <div className="section-body">
                  <Slider {...this.props.settings}>
                     <div className='section-customize'>
                        <div className="customize-border">
                           <div className="bg-image section-outstanding-doctor" />
                           <h3>Bác sỹ Hunter Fe</h3>
                           <h4> Thàn kinh</h4>
                        </div>
                     </div>
                     <div className='section-customize'>
                        <div className="customize-border">
                           <div className="bg-image section-outstanding-doctor" />
                           <h3>Bác sỹ Hunter Fe</h3>
                           <h4> Thàn kinh</h4>
                        </div>
                     </div>
                     <div className='section-customize'>
                        <div className="customize-border">
                           <div className="bg-image section-outstanding-doctor" />
                           <h3>Bác sỹ Hunter Fe</h3>
                           <h4> Thàn kinh</h4>
                        </div>
                     </div>
                     <div className='section-customize'>
                        <div className="customize-border">
                           <div className="bg-image section-outstanding-doctor" />
                           <h3>Bác sỹ Hunter Fe</h3>
                           <h4> Thàn kinh</h4>
                        </div>
                     </div>
                     <div className='section-customize'>
                        <div className="customize-border">
                           <div className="bg-image section-outstanding-doctor" />
                           <h3>Bác sỹ Hunter Fe</h3>
                           <h4> Thàn kinh</h4>
                        </div>
                     </div>
                     <div className='section-customize'>
                        <div className="customize-border">
                           <div className="bg-image section-outstanding-doctor" />
                           <h3>Bác sỹ Hunter Fe</h3>
                           <h4> Thàn kinh</h4>
                        </div>
                     </div>
                     <div className='section-customize'>
                        <div className="customize-border">
                           <div className="bg-image section-outstanding-doctor" />
                           <h3>Bác sỹ Hunter Fe</h3>
                           <h4> Thàn kinh</h4>
                        </div>
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



export default connect(mapStateToProps)(OutstandingDoctor); // cho redux hiểu để kết nối react với redux ??

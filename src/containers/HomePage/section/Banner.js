import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Banner.scss";

class Banner extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return (

         <div className="home-header-banner">
            <div className="content-up">
               <div className="title-1">
                  <FormattedMessage id="banner.title-1" />
               </div>
               <div className="title-2">
                  <FormattedMessage id="banner.title-2" />
               </div>
               <div className="search">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="search something" />
               </div>
            </div>
            <div className="content-down">
               <div className="option">
                  <div className="option-child">
                     <div className="icon-child">
                        <i className="far fa-hospital"></i>
                     </div>
                     <div className="text-child">
                        <FormattedMessage id="banner.child-1" />
                     </div>
                  </div>

                  <div className="option-child">
                     <div className="icon-child">
                        <i className="fas fa-mobile-alt"></i>
                     </div>
                     <div className="text-child">
                        {" "}
                        <FormattedMessage id="banner.child-2" />
                     </div>
                  </div>

                  <div className="option-child">
                     <div className="icon-child">
                        <i className="fas fa-file-medical"></i>
                     </div>
                     <div className="text-child">
                        <FormattedMessage id="banner.child-3" />
                     </div>
                  </div>

                  <div className="option-child">
                     <div className="icon-child">
                        <i className="fas fa-flask"></i>
                     </div>
                     <div className="text-child">
                        <FormattedMessage id="banner.child-4" />
                     </div>
                  </div>


                  <div className="option-child">
                     <div className="icon-child">
                        <i className="far fa-user"></i>
                     </div>
                     <div className="text-child">
                        <FormattedMessage id="banner.child-5" />
                     </div>
                  </div>

                  <div className="option-child">
                     <div className="icon-child">
                        <i className="fas fa-briefcase-medical"></i>
                     </div>
                     <div className="text-child">
                        <FormattedMessage id="banner.child-6" />
                     </div>
                  </div>

               </div>
            </div>
         </div>

      );
   }
}

const mapStateToProps = (state) => {
   return {
   };
};

const mapDispatchToProps = (dispatch) => {
   //tác dụng của mapDispatchToProps là truy cập hàm changeLanguageAppRedux thông qua this.props
   return {
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner); // cho redux hiểu để kết nối react với redux ??

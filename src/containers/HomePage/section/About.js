import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";


class About extends Component {

   render() {

      return (
         <div className="section-share section-about">
            <div className="section-header">
               Truyền thông nói gì về Vũ Đình Tiến
            </div>
            <div className="section-body">
               <div className="content-left">
                  <iframe
                     width="100%"
                     height="320px"
                     src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                     title="YouTube video player"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen>
                  </iframe>
               </div>
               <div className="content-right">
                  link gg meet đây nhé:
                  https://meet.google.com/bsx-jwmc-boc
                  8h30 bắt đầu nha, vào sớm nói chuyện tí cho xôm
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



export default connect(mapStateToProps)(About); // cho redux hiểu để kết nối react với redux ??

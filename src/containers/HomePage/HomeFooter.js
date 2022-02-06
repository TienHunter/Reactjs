import React, { Component } from "react";
import { connect } from "react-redux";
import './HomeFooter.scss'

class HomeFooter extends Component {

   render() {

      return (
         <div className="home-footer-container">
            <p>&#169; 2022 Vũ Đình Tiến học web. More information, please visit my facebook.
               <a target="_blank" href="https://www.facebook.com/profile.php?id=100011725697096">
                  &#8594;Click me&#8592;
               </a>
            </p>
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



export default connect(mapStateToProps)(HomeFooter); // cho redux hiểu để kết nối react với redux ??

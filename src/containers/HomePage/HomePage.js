import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import * as Sections from "./section";
import HomeFooter from "./HomeFooter";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.scss";


class HomePage extends Component {

   render() {
      const settings = {
         // dots: false,
         infinite: false,
         speed: 500,
         slidesToShow: 4,
         slidesToScroll: 2
      };
      return (
         <div>
            <HomeHeader />
            <Sections.Specialty settings={settings} />
            <Sections.MedicalFacility settings={settings} />
            <Sections.OutstandingDoctor settings={settings} />
            <Sections.Handbook settings={settings} />
            <Sections.About />
            <HomeFooter />
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

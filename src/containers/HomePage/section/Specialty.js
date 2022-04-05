import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { withRouter } from 'react-router'
import { FormattedMessage } from "react-intl"
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'

class Specialty extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrSpecialties: []
      }
   };
   componentDidMount() {
      this.props.loadSpecialties()
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.arrSpecialties !== this.props.arrSpecialties) {
         this.setState({
            arrSpecialties: this.props.arrSpecialties
         })
      }
   }
   handleViewDetailSpecialty = (item) => {
      this.props.history.push(`/detail-specialty/${item.specialtyId}`)
   }
   render() {
      let { arrSpecialties } = this.state;
      let { language } = this.props;
      return (
         <div className="section-share section-specialty">
            <div className="section-container">
               <div className="section-header">
                  <span className="title-section">
                     <FormattedMessage id="homepage.popular-specialty" />
                  </span>
                  <button className="btn-section">
                     <FormattedMessage id="homepage.more-infor" />
                  </button>
               </div>
               <div className="section-body">
                  <Slider {...this.props.settings}>
                     {arrSpecialties && arrSpecialties.length &&
                        arrSpecialties.map((item, index) => {
                           return (
                              <div
                                 className='section-customize'
                                 key={index}
                                 onClick={() => this.handleViewDetailSpecialty(item)}
                              >
                                 <div className="section-item-custom">
                                    <div
                                       className="bg-image section-specialty"
                                       style={{ backgroundImage: `url(${item.image})` }}
                                    />
                                    <div className="section-name-detail">{language === LANGUAGES.VI ? item.specialtyData.valueVi : item.specialtyData.valueEn}</div>
                                 </div>
                              </div>

                           )
                        })
                     }

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
      arrSpecialties: state.admin.allSpecialties
   };
};
// fire redux action
const mapDispatchToProps = dispatch => {
   return {
      loadSpecialties: () => dispatch(actions.fetchAllSpecialties())

   };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty)); // cho redux hiểu để kết nối react với redux ??

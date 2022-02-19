import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'

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
                        let imageBase64 = '';
                        if (item.image) {
                           imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                        }
                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`

                        return (
                           <div className='section-customize' key={index}>
                              <div className="customize-border">
                                 <div className="bg-image section-outstanding-doctor"
                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                 />
                                 <h5 className="doctor-name">{language === LANGUAGES.VI ? nameVi : nameEn}</h5>
                                 <p className="specialty-doctor"> Thàn kinh</p>
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



export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor); // cho redux hiểu để kết nối react với redux ??

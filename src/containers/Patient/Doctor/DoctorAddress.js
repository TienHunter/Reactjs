import React, { Component } from "react";
import { connect } from "react-redux";
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl'
import { getMedicalAddressByDoctorId } from '../../../services/userService'
import './DoctorAddress.scss';
class DoctorSchedule extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isShowDetail: false,
         medicalAddress: []
      }
   }

   async componentDidMount() {
      let { language } = this.props;
   }
   async componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
      }
      if (prevProps.doctorId !== this.props.doctorId) {
         let res = await getMedicalAddressByDoctorId(this.props.doctorId);
         if (res && res.errCode === 0) {
            this.setState({ medicalAddress: res.data })
         }
      }
   }
   handleShowHideDetail = () => {
      this.setState({
         isShowDetail: !this.state.isShowDetail,
      })
   }
   render() {
      let { language } = this.props;
      let { isShowDetail } = this.state;
      let { addressClinic, nameClinic, note, paymentData, priceData, provinceData } = this.state.medicalAddress;
      console.log('check property of medicalAddress: ', this.state.medicalAddress);
      return (
         <div className='doctor-address-contanier'>
            <div className="doctor-address-examination">
               <h3><FormattedMessage id="patient.medical-address.address" /></h3>
               <div className="name-clinic">
                  {nameClinic}
               </div>
               <div className="address-clinic">
                  {addressClinic}
               </div>
            </div>
            <div className="doctor-examnimation-price">
               {!isShowDetail ?
                  <div className="brief-infor">
                     <h3><FormattedMessage id="patient.medical-address.price" />:</h3>
                     <span className="brief-infor__price">
                        {priceData && language === LANGUAGES.VI &&
                           <NumberFormat
                              value={priceData.valueVi}
                              className="foo"
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={'VND'}
                           />
                        }
                        {
                           priceData && language === LANGUAGES.EN &&
                           <NumberFormat
                              value={priceData.valueEn}
                              className="foo"
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={'$'}
                           />
                        }
                     </span>
                     <a
                        className="brief-infor__show-detail"
                        onClick={() => { this.handleShowHideDetail() }}
                     >
                        <FormattedMessage id="patient.medical-address.detail" />
                     </a>
                  </div>
                  :
                  <div className="detail-infor">
                     <div className="detail-infor__price">
                        <div className="price-content">
                           <h3><FormattedMessage id="patient.medical-address.price" /></h3>
                           <p className="content-detail">
                              {note}
                           </p>
                        </div>
                        <div className="price">
                           {priceData && language === LANGUAGES.VI &&
                              <NumberFormat
                                 value={priceData.valueVi}
                                 className="foo"
                                 displayType={'text'}
                                 thousandSeparator={true}
                                 suffix={'VND'}
                              />
                           }
                           {
                              priceData && language === LANGUAGES.EN &&
                              <NumberFormat
                                 value={priceData.valueEn}
                                 className="foo"
                                 displayType={'text'}
                                 thousandSeparator={true}
                                 suffix={'$'}
                              />
                           }
                        </div>
                     </div>
                     <p className="detail-infor__payment">
                        <FormattedMessage id="patient.medical-address.payment" />
                        {`:  ${paymentData ? (language === LANGUAGES.VI ? paymentData.valueVi : paymentData.valueEn) : ""}`}
                     </p>
                     <a
                        className="detail-infor__hide-detail"
                        onClick={() => { this.handleShowHideDetail() }}
                     >
                        <FormattedMessage id="patient.medical-address.hide" />
                     </a>
                  </div>
               }
            </div>
         </div >
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

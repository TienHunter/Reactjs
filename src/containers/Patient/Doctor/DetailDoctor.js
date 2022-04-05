import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils'
import HomeHeader from "../../HomePage/HomeHeader"
import { getDetailInforDoctorById } from '../../../services/userService'
import DoctorSchedule from './DoctorSchedule'
import DoctorAddress from './DoctorAddress'
import './DetailDoctor.scss'
class DetailDoctor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         detailDoctor: {}
      }
   }

   async componentDidMount() {
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
         let id = this.props.match.params.id
         let res = await getDetailInforDoctorById(id)
         if (res && res.errCode === 0) {
            this.setState({
               detailDoctor: res.data
            })
         }
      }
   }
   componentDidUpdate(prevProps, prevState, snapshot) { }
   render() {
      let { detailDoctor } = this.state;
      let { language } = this.props;
      let nameVi = '', nameEn = '';
      if (detailDoctor && detailDoctor.positionData) {
         nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
         nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
      }
      return (
         <>
            <HomeHeader />
            <div className="doctor-detail-container">
               <div className="intro-doctor line-bottom">
                  <div className="container">
                     <div
                        className="content-left"
                        style={{ backgroundImage: `url(${detailDoctor.image})` }}
                     >
                     </div>
                     <div className="content-right">
                        <div className="header">
                           {
                              language === LANGUAGES.VI ? nameVi : nameEn
                           }
                        </div>
                        <div className="description">
                           {detailDoctor.Markdown && detailDoctor.Markdown.description &&
                              <span>
                                 {detailDoctor.Markdown.description}
                              </span>
                           }
                        </div>
                     </div>
                  </div>
               </div>
               <div className="schedule-doctor">
                  <div className="container">
                     <div className="content-left">
                        <DoctorSchedule
                           doctorId={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                        />
                     </div>
                     <div className="border-vertical" />
                     <div className="content-right">
                        <DoctorAddress
                           doctorId={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                        />
                     </div>
                  </div>
               </div>
               <div className="detail-infor-doctor line-bottom">
                  <div className="container">
                     {detailDoctor &&
                        detailDoctor.Markdown &&
                        detailDoctor.Markdown.contentHTML &&
                        <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }} />
                     }
                  </div>
               </div>
               <div className="comment-doctor">

               </div>
            </div>
         </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

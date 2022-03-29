import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../HomePage/HomeHeader";
import { postVerifyBookingAppointment } from "../../services/userService";
import './VerifyEmail.scss'
class VerifyEmail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         statuVerify: false,
         errCode: -1
      }
   }

   async componentDidMount() {
      if (this.props.location && this.props.location.search) {
         const urlParams = new URLSearchParams(this.props.location.search);
         const token = urlParams.get('token');
         const doctorId = urlParams.get('doctorId');

         let res = await postVerifyBookingAppointment({ token, doctorId })
         if (res && res.errCode !== -1) {
            this.setState({
               statuVerify: true,
               errCode: res.errCode
            })
         } else {
            this.setState({
               statuVerify: false,
               errCode: -1
            })
         }
      }
   }
   componentDidUpdate(prevProps, prevState, snapshot) { }
   render() {
      let { statuVerify, errCode } = this.state;
      return (
         <>
            <HomeHeader />
            {statuVerify ?

               <>
                  {errCode === 0 ?
                     <div className="verify-email">Xac nhan lich hen thanh cong</div>
                     :
                     <div className="verify-email">Lich hen da duoc xac nhan roi hoac khong ton tai</div>
                  }</>

               :
               <div className="verify-email">Error from server please try another time</div>
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES, CommonUtils } from '../../../utils'
import './RemedyModal.scss'
class RemedyModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         image: ''
      }
   }

   async componentDidMount() {
      let { emailPatient } = this.props;
      console.log(emailPatient);
      if (emailPatient) {
         this.setState({
            email: emailPatient,
         })
      }
   }
   componentDidUpdate(prevProps, prevState, snapshot) { }
   handleOnchangeImage = async (event) => {
      let file = event.target.files[0];
      if (file) {
         let base64 = await CommonUtils.toBase64(file)
         this.setState({
            image: base64
         })
      }
   }
   handleOnchangeText = (event, type) => {
      let copyState = { ...this.state };
      copyState[type] = event.target.value;
      this.setState({
         ...copyState
      })
   }
   hanldeSendRemedy = () => {
      let { email, image } = this.state;
      let { sendRemedy } = this.props;
      sendRemedy({
         email, image
      })

   }
   render() {
      let { isOpenRemedyModal, closeRemedyModal } = this.props;
      let { email } = this.state
      return (
         <div>
            <Modal
               isOpen={isOpenRemedyModal}
               toggle={this.closeRemedyModal}
               className={this.props.className}
               centered
            >
               <ModalHeader toggle={closeRemedyModal}>Modal title</ModalHeader>
               <ModalBody>
                  <div className="confirm-patient__body">
                     <div className='row'>
                        <div className="col-6 form-group" >
                           <label className="name-input">Email</label>
                           <input
                              value={email}
                              type="text"
                              className="form-control"
                              onChange={(event) => this.handleOnchangeText(event, 'email')}
                           />
                        </div>
                        <div className="col-6 form-group" >
                           <label className="name-input">Semedy</label>
                           <input
                              type="file"
                              className="form-control"
                              onChange={(event) => this.handleOnchangeImage(event)}
                           />
                        </div>
                     </div>
                  </div>
               </ModalBody>
               <ModalFooter>
                  <Button color="primary" onClick={() => this.hanldeSendRemedy()}>Do Something</Button>{' '}
                  <Button color="secondary" onClick={closeRemedyModal}>Cancel</Button>
               </ModalFooter>
            </Modal>
         </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);

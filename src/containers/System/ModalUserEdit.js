import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
 Button,
 Modal,
 ModalHeader,
 ModalBody,
 ModalFooter,
 Input,
 Label,
 Form,
 FormGroup,
} from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalUserEdit extends Component {
 constructor(props) {
  super(props);
  this.state = {
   id: "",
   email: "",
   //password: "",
   firstName: "",
   lastName: "",
   address: "",
  };
 }

 componentDidMount() {
  let user = this.props.currentUser;
  if (user && !_.isEmpty(user)) {
   this.setState({
    id: user.id,
    email: user.email,
    //password: "",
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
   });
  }
 }

 toggle = () => {
  this.props.toggleFromParent();
 };

 handleOnChangeInput = (event, id) => {
  //good code
  let copyState = { ...this.state };
  copyState[id] = event.target.value;

  this.setState({ ...copyState });
 };
 checkValideInput = () => {
  let isValid = true;
  let arrInput = ["email", "firstName", "lastName", "address"];

  for (let i = 0; i < arrInput.length; i++) {
   if (!this.state[arrInput[i]]) {
    isValid = false;
    alert(`Missing parameter ${arrInput[i]}`);
    break;
   }
  }
  return isValid;
 };
 handleSaveUser = () => {
  let isValid = this.checkValideInput();
  if (isValid === true) {
   //call api edit user
   this.props.editUser(this.state);
  }
 };
 render() {
  return (
   <div>
    <Modal
     isOpen={this.props.isOpen}
     toggle={() => {
      this.toggle();
     }}
     className={"modal-user-container"}
    >
     <ModalHeader
      toggle={() => {
       this.toggle();
      }}
     >
      Modal title
     </ModalHeader>
     <ModalBody>
      <div className="modal-user-body">
       <div className="input-container">
        <label>Email</label>
        <input
         type="email"
         placeholder="Email"
         onChange={(event) => {
          this.handleOnChangeInput(event, "email");
         }}
         value={this.state.email}
         disabled
        />
       </div>
       {/* <div className="input-container">
        <label>Password</label>
        <input
         type="password"
         placeholder="password"
         onChange={(event) => {
          this.handleOnChangeInput(event, "password");
         }}
         value={this.state.password}
        />
       </div> */}
       <div className="input-container">
        <label>First Name</label>
        <input
         type="text"
         placeholder="first name"
         onChange={(event) => {
          this.handleOnChangeInput(event, "firstName");
         }}
         value={this.state.firstName}
        />
       </div>
       <div className="input-container">
        <label>Last Name</label>
        <input
         type="text"
         placeholder="last name"
         onChange={(event) => {
          this.handleOnChangeInput(event, "lastName");
         }}
         value={this.state.lastName}
        />
       </div>
       <div className="input-container">
        <label>Address</label>
        <input
         type="text"
         placeholder="address"
         onChange={(event) => {
          this.handleOnChangeInput(event, "address");
         }}
         value={this.state.address}
        />
       </div>
      </div>
     </ModalBody>
     <ModalFooter>
      <Button
       color="primary"
       onClick={() => {
        this.handleSaveUser();
       }}
      >
       Save changes
      </Button>{" "}
      <Button
       color="secondary"
       onClick={() => {
        this.toggle();
       }}
      >
       Close
      </Button>
     </ModalFooter>
    </Modal>
   </div>
  );
 }
}

const mapStateToProps = (state) => {
 return {};
};

const mapDispatchToProps = (dispatch) => {
 return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserEdit);

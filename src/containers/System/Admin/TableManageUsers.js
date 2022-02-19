import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../../store/actions'

import './TableManageUsers.scss'

class TableManageUsers extends Component {
   constructor(props) {
      super(props);
      this.state = {
         usersRedux: []
      };
   }

   async componentDidMount() {
      this.props.fetchAllUsers()
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.listUsers !== this.props.listUsers) {
         this.setState({
            usersRedux: this.props.listUsers
         })
      }
   }
   handleDeleteUser = (user) => {
      this.props.deleteUser(user.id)
   }
   hanldeEditUser = (user) => {
      this.props.hanldeEditUserFromParent(user)
   }

   render() {
      let { usersRedux } = this.state;
      return (
         <table id="TableManageUser">
            <tbody>
               <tr>
                  <th>Email</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Address</th>
                  <th>Action</th>
               </tr>
               {usersRedux &&
                  usersRedux.map((userRedux, index) => {
                     return (
                        <tr key={index}>
                           <td>{userRedux.email}</td>
                           <td>{userRedux.firstName}</td>
                           <td>{userRedux.lastName}</td>
                           <td>{userRedux.address}</td>
                           <td>
                              <button
                                 className="btn-edit"
                                 onClick={() => { this.hanldeEditUser(userRedux) }}
                              >
                                 {" "}
                                 <i className="far fa-edit"></i>
                              </button>
                              <button
                                 className="btn-delete"
                                 onClick={() => { this.handleDeleteUser(userRedux) }}
                              >
                                 <i className="far fa-trash-alt"></i>
                              </button>
                           </td>
                        </tr>
                     );
                  })}
            </tbody>
         </table>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      listUsers: state.admin.users
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchAllUsers: () => dispatch(actions.fetchAllUsersStart()),
      deleteUser: (userID) => dispatch(actions.deleteUser(userID))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUsers);

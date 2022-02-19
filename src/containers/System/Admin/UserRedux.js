import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import TableManageUsers from './TableManageUsers';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import './UserRedux.scss'
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImage: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            roleId: '',
            position: '',
            avatar: '',

            action: ''
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''

            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.users !== this.props.users) {
            const { genderRedux, positionRedux, roleRedux } = this.props;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: genderRedux && genderRedux.length > 0 ? genderRedux[0].keyMap : '',
                position: positionRedux && positionRedux.length > 0 ? positionRedux[0].keyMap : '',
                roleId: roleRedux && roleRedux.length > 0 ? roleRedux[0].keyMap : '',
                avatar: '',

                action: CRUD_ACTIONS.CREATE,
                userID: '',
                previewImage: ''
            })
        }
    }
    handleOnchangeImage = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.toBase64(file)
            let objectURL = URL.createObjectURL(file)
            this.setState({
                previewImage: objectURL,
                avatar: base64
            })
        }
    }
    openPreviewImg = (previewImage) => {
        if (!previewImage) return;
        this.setState({
            isOpen: true,
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValideInput = () => {
        const arrInputs = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        let isValid = true;
        for (let i = 0; i < arrInputs.length; i++) {
            if (!this.state[arrInputs[i]]) {
                isValid = false;
                alert('Missing required filed :' + arrInputs[i])
                break;
            }
        }
        return isValid;
    }
    handleSubmitUser = () => {
        let isValid = this.checkValideInput();
        if (!isValid) return;

        //fire redux
        let { userID, email, password, firstName, lastName, phoneNumber, address, gender, roleId, position, avatar } = this.state;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                address: address,
                gender: gender,
                roleId: roleId,
                phoneNumber: phoneNumber,
                positionId: position,
                avatar: avatar
            })
        }
        if (action === CRUD_ACTIONS.UPDATE) {
            this.props.updateUser({
                id: userID,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phoneNumber: phoneNumber,
                gender: gender,
                positionId: position,
                roleId: roleId,
                avatar: avatar
            })
        }

    }
    hanldeEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HASDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            roleId: user.roleId,
            position: user.position,
            avatar: '',
            previewImage: imageBase64,
            action: CRUD_ACTIONS.UPDATE,
            userID: user.id
        })
    }
    render() {
        let { genderArr, positionArr, roleArr, previewImage, isOpen } = this.state;
        let { email, password, firstName, lastName, phoneNumber, address, gender, roleId, position, avatar, action } = this.state;
        let { language, isLoadingGender, isLoadingPosition, isLoadingRole } = this.props;
        return (
            <div className="user-redux-container" >
                <div className="title">
                    User redux Vu Dinh Tien
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="grid">
                            <div className="row">
                                <div className="col-12 text-center">
                                    {
                                        isLoadingGender &&
                                            isLoadingPosition &&
                                            isLoadingRole
                                            ?
                                            'Loading ...' : ''
                                    }
                                </div>
                                <div className="col-12 mt-2">
                                    <FormattedMessage id={action === CRUD_ACTIONS.CREATE ? "manage-user.add" : "manage-user.edit"} />
                                </div>
                                <div className="form-group mt-2 col-md-3">
                                    <label htmlFor="inputEmail"><FormattedMessage id="manage-user.email" /></label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                        disabled={action === CRUD_ACTIONS.UPDATE}
                                    />
                                </div>
                                <div className="form-group mt-2 col-md-3">
                                    <label htmlFor="inputPassword"><FormattedMessage id="manage-user.password" /></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPassword"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }}
                                        disabled={action === CRUD_ACTIONS.UPDATE}
                                    />
                                </div>
                                <div className="form-group mt-2 col-md-3">
                                    <label htmlFor="inputFirstName"><FormattedMessage id="manage-user.firstname" /></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputFirstName"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                    />
                                </div>
                                <div className="form-group mt-2 col-md-3">
                                    <label htmlFor="inputLastName"><FormattedMessage id="manage-user.lastname" /></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputLastName"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                    />
                                </div>

                                <div className="form-group mt-2 col-md-4">
                                    <label htmlFor="inputPhone"><FormattedMessage id="manage-user.phone" /></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputPhone"
                                        placeholder="Phone number"
                                        value={phoneNumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                    />
                                </div>
                                <div className="form-group mt-2 col-md-8">
                                    <label htmlFor="inputAddress"><FormattedMessage id="manage-user.address" /></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="1234 Main St"
                                        value={address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }}
                                    />
                                </div>

                                <div className="form-group mt-2 col-md-3">
                                    <label htmlFor="Gender"><FormattedMessage id="manage-user.gender" /></label>
                                    <select
                                        id="Gender"
                                        className="form-control"
                                        value={gender}
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    >
                                        {
                                            genderArr &&
                                            genderArr.length > 0 &&
                                            genderArr.map((gender, index) => {
                                                return (
                                                    <option key={index} value={gender.keyMap}>
                                                        {language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group mt-2 col-md-3">
                                    <label htmlFor="Position"><FormattedMessage id="manage-user.position" /></label>
                                    <select
                                        id="Position"
                                        className="form-control"
                                        value={position}
                                        onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    >
                                        {
                                            positionArr &&
                                            positionArr.length > 0 &&
                                            positionArr.map((position, index) => {
                                                return (
                                                    <option key={index} value={position.keyMap}>
                                                        {language === LANGUAGES.VI ? position.valueVi : position.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group mt-2 col-md-3">
                                    <label htmlFor="RoleId"><FormattedMessage id="manage-user.roleID" /></label>
                                    <select
                                        id="RoleId"
                                        className="form-control"
                                        value={roleId}
                                        onChange={(event) => { this.onChangeInput(event, 'roleId') }}
                                    >
                                        {
                                            roleArr &&
                                            roleArr.length > 0 &&
                                            roleArr.map((role, index) => {
                                                return (
                                                    <option key={index} value={role.keyMap}>
                                                        {language === LANGUAGES.VI ? role.valueVi : role.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group mt-2 col-md-3">
                                    <label><FormattedMessage id="manage-user.image" /></label>
                                    <div className="previewImg-container">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="image"
                                            hidden
                                            onChange={(event) => this.handleOnchangeImage(event)}
                                        />
                                        <label htmlFor="image" className="lable-upload">
                                            <FormattedMessage id="manage-user.prevViewImg" />
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        <div
                                            className="prevImg"
                                            style={{ backgroundImage: `url(${previewImage})` }}
                                            onClick={() => this.openPreviewImg(previewImage)}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <button
                                        className={action === CRUD_ACTIONS.CREATE ? "btn btn-primary" : "btn btn-warning"}
                                        onClick={() => { this.handleSubmitUser() }}
                                    >
                                        <FormattedMessage
                                            id={action === CRUD_ACTIONS.CREATE ? "manage-user.save" : "manage-user.update"} />
                                    </button>
                                </div>
                                <div className="col-12 my-5">
                                    <TableManageUsers
                                        hanldeEditUserFromParent={this.hanldeEditUserFromParent}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <Lightbox
                        mainSrc={previewImage}

                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                )}

            </div >
        )
    }

}
// save state
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        isLoadingPosition: state.admin.isLoadingPosition,
        isLoadingRole: state.admin.isLoadingRole,
        users: state.admin.users,
    };
};
// fire redux action
const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUsers: () => dispatch(actions.fetchAllUsersStart()),
        updateUser: (user) => dispatch(actions.updateUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

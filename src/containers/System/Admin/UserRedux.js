import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
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
    }
    handleOnchangeImage = (event) => {
        let file = event.target.files[0];
        if (file) {
            let objectURL = URL.createObjectURL(file)
            this.setState({
                previewImage: objectURL,
                avatar: file
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
        }, () => {
            console.log('check input onchange: ', this.state);
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
        let { email, password, firstName, lastName, phoneNumber, address, gender, roleId, position, avatar } = this.state;

        this.props.createNewUser({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            address: address,
            gender: gender,
            roleId: roleId,
            phoneNumber: phoneNumber,
            positionId: position
        })
    }

    render() {
        let { genderArr, positionArr, roleArr, previewImage, isOpen } = this.state;
        let { email, password, firstName, lastName, phoneNumber, address, gender, roleId, position, avatar } = this.state;
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
                                <div className="col-12 mt-2"><FormattedMessage id="manage-user.add" /></div>
                                <div className="form-group mt-2 col-md-3">
                                    <label htmlFor="inputEmail"><FormattedMessage id="manage-user.email" /></label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
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
                                        className="btn btn-primary"
                                        onClick={() => { this.handleSubmitUser() }}
                                    >
                                        <FormattedMessage id="manage-user.save" />
                                    </button>
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
        isLoadingRole: state.admin.isLoadingRole
    };
};
// fire redux action
const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

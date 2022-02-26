import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from 'react-router'
import { LANGUAGES, path } from "../../utils";
import logo from '../../assets/logo.svg'
import "./HomeHeader.scss";

import { changeLanguageApp } from "../../store/actions/appActions";
class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);

        //fire redux event : action
    };
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(path.HOMEPAGE)
        }
    }
    render() {
        let language = this.props.language;
        return (

            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <i className="fas fa-bars"></i>
                        <div
                            className="header-logo"
                            style={{ backgroundImage: `url(${logo})` }}
                            onClick={() => this.returnToHome()}
                        />
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <div>
                                <b>
                                    <FormattedMessage id="homeHeader.specialty" />
                                </b>
                            </div>
                            <div>
                                <FormattedMessage id="homeHeader.find-doctor" />
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>
                                    <FormattedMessage id="homeHeader.facilities" />
                                </b>
                            </div>
                            <div>
                                <FormattedMessage id="homeHeader.find-clinic" />
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>
                                    <FormattedMessage id="homeHeader.doctor" />
                                </b>
                            </div>
                            <div>
                                <FormattedMessage id="homeHeader.choose-doctor" />
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>
                                    <FormattedMessage id="homeHeader.package" />
                                </b>
                            </div>
                            <div>
                                <FormattedMessage id="homeHeader.check-general" />
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="support">
                            <span>
                                <i className="far fa-question-circle"></i>
                                <FormattedMessage id="homeHeader.support" />
                            </span>
                        </div>
                        <div
                            className={
                                language === LANGUAGES.VI
                                    ? "language-vi active"
                                    : "language-vi"
                            }
                        >
                            <span
                                onClick={() => {
                                    this.changeLanguage(LANGUAGES.VI);
                                }}
                            >
                                VN
                            </span>
                        </div>
                        <div
                            className={
                                language === LANGUAGES.EN
                                    ? "language-en active"
                                    : "language-en"
                            }
                        >
                            <span
                                onClick={() => {
                                    this.changeLanguage(LANGUAGES.EN);
                                }}
                            >
                                EN
                            </span>
                        </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    //tác dụng của mapDispatchToProps là truy cập hàm changeLanguageAppRedux thông qua this.props
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader)); // cho redux hiểu để kết nối react với redux ??

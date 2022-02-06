import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import "./HomeHeader.scss";

import { changeLanguageApp } from "../../store/actions/appActions";
class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);

        //fire redux event : action
    };
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
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

                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title-1">
                            <FormattedMessage id="banner.title-1" />
                        </div>
                        <div className="title-2">
                            <FormattedMessage id="banner.title-2" />
                        </div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="search something" />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child-1" />
                                </div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                                <div className="text-child">
                                    {" "}
                                    <FormattedMessage id="banner.child-2" />
                                </div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-file-medical"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child-3" />
                                </div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-flask"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child-4" />
                                </div>
                            </div>


                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-user"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child-5" />
                                </div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-briefcase-medical"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child-6" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader); // cho redux hiểu để kết nối react với redux ??

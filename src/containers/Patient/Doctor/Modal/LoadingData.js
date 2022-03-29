import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './LoadingData.scss'
class LoadingData extends Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   async componentDidMount() {
   }
   componentDidUpdate(prevProps, prevState, snapshot) { }
   render() {
      console.log('check loading data');
      return (
         <div className="loading-data-container">
            <div class="loading__ring"></div>
            <span className="loading__text">Loading...</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingData);

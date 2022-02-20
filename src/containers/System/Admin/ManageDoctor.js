import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils'
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManageUsers extends Component {
   constructor(props) {
      super(props);
      this.state = {
         contentHTML: '',
         contentMarkdown: '',
         selectedOption: '',
         description: '',
         arrDoctors: []
      };
   }

   async componentDidMount() {
      this.props.fetchAllDoctors()
   }
   buildDataSelect = (data) => {
      let results = [];
      let { language } = this.props;
      if (data && data.length > 0) {
         data.map((item, index) => {
            let object = {};
            let labelVi = `${item.lastName} ${item.firstName}`;
            let labelEn = `${item.firstName} ${item.lastName}`;

            object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.id

            results.push(object)
         })
      }
      return results;
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.allDoctors !== this.props.allDoctors) {
         let dataSelect = this.buildDataSelect(this.props.allDoctors)
         this.setState({
            arrDoctors: dataSelect
         })
      }
      if (prevProps.language !== this.props.language) {
         let dataSelect = this.buildDataSelect(this.props.allDoctors)
         this.setState({
            arrDoctors: dataSelect
         })
      }
   }
   handleEditorChange = ({ html, text }) => {
      this.setState({
         contentHTML: html,
         contentMarkdown: text
      })
   }
   handleSaveMarkdown = () => {
      let { contentHTML, contentMarkdown, description, selectedOption } = this.state;
      console.log(this.state);
      this.props.createDetailDoctor({
         contentHTML: contentHTML,
         contentMarkdown: contentMarkdown,
         description: description,
         doctorId: selectedOption.value
      })
   }
   handleChange = (selectedOption) => {
      this.setState({ selectedOption }, () => console.log(selectedOption));
   };
   handleOnchangeDesc = (event) => {
      this.setState({
         description: event.target.value,
      })
   }
   render() {
      let { selectedOption, description, arrDoctors } = this.state;
      return (
         <div className="manage-doctor-contanier contanier">
            <div className="manage-doctor-title">
               Thêm thông tin bác sỹ
            </div>
            <div className="more-infor">
               <div className="content-left">
                  <label>Chon bac sy</label>
                  <Select
                     value={selectedOption}
                     onChange={this.handleChange}
                     options={arrDoctors}
                  />
               </div>
               <div className="content-right form-group">
                  <label>Thong tin gioi thieu</label>
                  <textarea
                     className="form-control"
                     rows='4'
                     value={description}
                     onChange={(event) => this.handleOnchangeDesc(event)}
                  />
               </div>
            </div>
            <div className="manage-doctor-editor">
               <MdEditor
                  style={{ height: '500px' }}
                  renderHTML={text => mdParser.render(text)}
                  onChange={this.handleEditorChange}
               />
            </div>
            <button
               className="btn btn-primary save-content-doctor"
               onClick={() => { this.handleSaveMarkdown() }}
            >
               Lưu thông tin
            </button>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      allDoctors: state.admin.allDoctors,
      language: state.app.language
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
      createDetailDoctor: (data) => dispatch(actions.createDetailDoctor(data))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUsers);

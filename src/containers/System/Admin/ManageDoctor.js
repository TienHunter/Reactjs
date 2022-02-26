import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils'
import { getDetailInforDoctorById } from '../../../services/userService'
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManageUsers extends Component {
   constructor(props) {
      super(props);
      this.state = {
         contentHTML: '',
         contentMarkdown: '',
         selectedOption: null,
         description: '',
         arrDoctors: [],
         hasOldData: false,
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
   handleSaveMarkdown = async () => {
      let { contentHTML, contentMarkdown, description, selectedOption, hasOldData } = this.state;
      await this.props.createDetailDoctor({
         contentHTML: contentHTML,
         contentMarkdown: contentMarkdown,
         description: description,
         doctorId: selectedOption.value,
         action: hasOldData === true ? CRUD_ACTIONS.UPDATE : CRUD_ACTIONS.CREATE
      })
      let { createInforDoctor } = this.props
      if (createInforDoctor) {
         this.setState({
            contentHTML: '',
            contentMarkdown: '',
            selectedOption: null,
            description: '',
            hasOldData: false,
         })
      }

   }
   handleChangeSelect = async (selectedOption) => {
      this.setState({ selectedOption });
      let res = await getDetailInforDoctorById(selectedOption.value);
      console.log('res getDetailInforDoctorById from manage doctor: ', res);
      if (res && res.errCode === 0 && res.data && res.data.Markdown) {
         const markdown = res.data.Markdown;
         this.setState({
            contentHTML: markdown.contentHTML,
            contentMarkdown: markdown.contentMarkdown,
            description: markdown.description,
            hasOldData: true
         })
      } else {
         this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            hasOldData: false
         })
      }
   };
   handleOnchangeDesc = (event) => {
      this.setState({
         description: event.target.value,
      })
   }
   render() {
      let { selectedOption, description, arrDoctors, contentMarkdown, hasOldData } = this.state;
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
                     onChange={this.handleChangeSelect}
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
                  value={contentMarkdown}
                  onChange={this.handleEditorChange}
               />
            </div>
            <button
               className={`btn save-content-doctor  ${hasOldData ? 'btn-warning' : 'btn-primary'}`}
               onClick={() => { this.handleSaveMarkdown() }}
            >
               {hasOldData ? 'Cập nhật thông tin' : 'Lưu thông tin'}
            </button>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      allDoctors: state.admin.allDoctors,
      language: state.app.language,
      createInforDoctor: state.admin.createInforDoctor
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
      createDetailDoctor: (data) => dispatch(actions.createDetailDoctor(data))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUsers);

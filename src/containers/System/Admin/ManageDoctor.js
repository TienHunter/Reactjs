import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';

import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'

const mdParser = new MarkdownIt(/* Markdown-it options */);
const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' },
];
class TableManageUsers extends Component {
   constructor(props) {
      super(props);
      this.state = {
         contentHTML: '',
         contentMarkdown: '',
         selectedOption: '',
         description: ''
      };
   }

   async componentDidMount() {
   }

   componentDidUpdate(prevProps, prevState, snapshot) {

   }
   handleEditorChange = ({ html, text }) => {
      this.setState({
         contentHTML: html,
         contentMarkdown: text
      })
   }
   handleSaveMarkdown = () => {
      console.log('hoidanit check state: ', this.state);
   }
   handleChange = (selectedOption) => {
      this.setState({ selectedOption });
   };
   handleOnchangeDesc = (event) => {
      this.setState({
         description: event.target.value,
      })
   }
   render() {
      let { selectedOption, description } = this.state;
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
                     options={options}
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

   };
};

const mapDispatchToProps = (dispatch) => {
   return {

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUsers);

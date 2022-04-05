import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Lightbox from 'react-image-lightbox';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllcodeService } from '../../../services/userService'
import { CommonUtils, LANGUAGES } from '../../../utils'
import { createNewSpecialty } from '../../../services/userService'
import './ManageSpecialty.scss'


const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedSpecialty: null,
         arrSpecialties: [],
         descriptionMarkdown: '',
         descriptionHTML: '',
         image: '',
         previewImage: '',
         isOpenPreviewImage: false,
      }
   }

   async componentDidMount() {
      let arrSpecialties = await this.buildDataSelect();
      if (arrSpecialties.length > 0) {
         this.setState({ arrSpecialties })
      }
   }
   buildDataSelect = async () => {
      let res = await getAllcodeService('SPECIALTY');
      let data = [];
      if (res && res.errCode === 0) {
         data = res.data;
      }
      let results = [];
      let { language } = this.props;
      if (data && data.length > 0) {
         data.map((item, index) => {
            let object = {};
            object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
            object.value = item.keyMap
            results.push(object)
         })
      }
      return results;
   }
   async componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
         let arrSpecialties = await this.buildDataSelect();
         this.setState({ arrSpecialties })
      }
      if (prevState.arrSpecialties !== this.state.arrSpecialties) {
         let { arrSpecialties, selectedSpecialty } = this.state;
         if (selectedSpecialty) {
            this.setState({
               selectedSpecialty: this.fixShowLabel(arrSpecialties, selectedSpecialty)
            })
         }
      }
   }
   handleOnchangeText = (event, type) => {
      let copyState = { ...this.state };
      copyState[type] = event.target.value;
      this.setState({
         ...copyState
      })
   }
   handleOnchangeImage = async (event) => {
      let file = event.target.files[0];
      if (file) {
         let base64 = await CommonUtils.toBase64(file)
         let objectURL = URL.createObjectURL(file)
         this.setState({
            previewImage: objectURL,
            image: base64
         })
      }
   }
   openPreviewImg = (previewImage) => {
      if (!previewImage) return;
      this.setState({
         isOpenPreviewImage: true,
      })
   }
   handleEditorChange = ({ html, text }) => {
      this.setState({
         descriptionHTML: html,
         descriptionMarkdown: text
      })
   }
   handleSaveSpecialty = async () => {
      let { selectedSpecialty, descriptionHTML, descriptionMarkdown, image } = this.state;
      console.log();
      let specialtyId = selectedSpecialty.value;
      let res = await createNewSpecialty({
         specialtyId,
         descriptionMarkdown,
         descriptionHTML,
         image
      })
      if (res && res.errCode === 0) {
         toast.success('Create new specialty success');
         console.log('check save:', res.data);
         this.setState({
            selectedSpecialty: null,
            descriptionMarkdown: '',
            descriptionHTML: '',
            image: '',
            previewImage: '',
         })
      } else {
         toast.error('Something error ...!!!')
         console.log('error createNewSpecialty:', res);
      }
   }
   fixShowLabel = (arr, selectedOption) => {
      return arr.find(currentValue => {
         return currentValue.value === selectedOption.value
      })
   }
   handleChangeSelect = async (selectedOption) => {
      this.setState({ selectedSpecialty: selectedOption })
   };
   render() {
      let { selectedSpecialty, arrSpecialties, descriptionHTML, descriptionMarkdown, image, previewImage, isOpenPreviewImage } = this.state;
      return (
         <>
            <div className="manage-specialty-container container">
               <div className="row">
                  <div className="col-12 specialty__title">
                     Quản lý chuyên khoa
                  </div>
                  <div className="col-6 mt-2 form-group specialty__doctor">
                     <label>Tên chuyên khoa</label>
                     <Select
                        value={selectedSpecialty}
                        onChange={this.handleChangeSelect}
                        options={arrSpecialties}
                     // placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                     />
                  </div>
                  <div className="form-group mt-2 col-3 specialty_image">
                     <label>Chọn ảnh</label>
                     <div className="previewImg-container">
                        <input
                           type="file"
                           className="form-control"
                           id="image"
                           hidden
                           onChange={(event) => this.handleOnchangeImage(event)}
                        />
                        <label htmlFor="image" className="label-upload">
                           upload imange
                           <i className="fas fa-upload"></i>
                        </label>
                        <div
                           className="prevImg"
                           style={{ backgroundImage: `url(${previewImage})` }}
                           onClick={() => this.openPreviewImg(previewImage)}
                        />
                     </div>
                  </div>

                  <div className="specialty__editor col-12">
                     <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        value={descriptionMarkdown}
                        onChange={this.handleEditorChange}
                     />
                  </div>
                  <div className="col-12">
                     <button
                        className="btn-save"
                        onClick={() => { this.handleSaveSpecialty() }}
                     >Save</button>
                  </div>
               </div>

            </div>
            {isOpenPreviewImage && (
               <Lightbox
                  mainSrc={previewImage}

                  onCloseRequest={() => this.setState({ isOpenPreviewImage: false })}

               />
            )}
         </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

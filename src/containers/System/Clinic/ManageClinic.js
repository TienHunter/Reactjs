import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Lightbox from 'react-image-lightbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommonUtils, LANGUAGES } from '../../../utils'
import { createNewClinic } from "../../../services/userService"
import './ManageClinic.scss'

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
   constructor(props) {
      super(props);
      this.state = {
         address: "",
         descriptionHTML: "",
         descriptionMarkdown: "",
         image: "",
         name: "",
         previewImage: "",
         isOpenPreviewImage: false
      }
   }

   async componentDidMount() {
   }
   componentDidUpdate(prevProps, prevState, snapshot) { }
   handleEditorChange = ({ html, text }) => {
      this.setState({
         descriptionHTML: html,
         descriptionMarkdown: text
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
   saveNewclinic = async () => {
      let { address, name, image, descriptionMarkdown, descriptionHTML } = this.state;
      if (address && name && image && descriptionMarkdown && descriptionHTML) {
         let res = await createNewClinic({
            name,
            address,
            descriptionMarkdown,
            image,
            descriptionHTML
         })
         if (res && res.errCode === 0) {
            toast.success('Create new Clinic success');
            this.setState({
               address: "",
               descriptionHTML: "",
               descriptionMarkdown: "",
               image: "",
               name: "",
               previewImage: "",
            })
         } else {
            toast.error('create new Clinic failed');
         }
      } else {
         toast.error('have some fields arent validated');
      }
   }
   handleOnchangeText = (event, type) => {
      let copyState = { ...this.state };
      copyState[type] = event.target.value;
      this.setState({
         ...copyState
      })
   }
   render() {
      let { address, descriptionMarkdown, image, name, previewImage, isOpenPreviewImage } = this.state;
      return (
         <>
            <div className="manage-clinic-container container">
               <div className="manage-clinic__title">Quan ly phong kham</div>
               <div className="manage-clinic__body">
                  <div className="row manage-clinic__inputs">
                     <div className="col-6 form-group">
                        <label>Tên cơ sở</label>
                        <input
                           value={name}
                           className="form-control"
                           type="text"
                           onChange={(event) => this.handleOnchangeText(event, 'name')}
                        />
                     </div>
                     <div className="col-6 form-group">
                        <label>Địa chỉ</label>
                        <input
                           value={address}
                           className="form-control"
                           type="text"
                           onChange={(event) => this.handleOnchangeText(event, 'address')}
                        />
                     </div>
                     <div className="form-group mt-2 col-3 manage-clinic__image">
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
                  </div>
                  <div className="manage-clinic__editor col-12">
                     <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        value={descriptionMarkdown}
                        onChange={this.handleEditorChange}
                     />
                  </div>
                  <div
                     className="btn__save-clinic"
                     onClick={() => this.saveNewclinic()}
                  >Save</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);

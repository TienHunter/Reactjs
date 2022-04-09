import MarkdownIt from 'markdown-it';
import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from "react-redux";
import Select from 'react-select';
import { getDetailInforDoctorById, getAllClinics } from '../../../services/userService';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import './ManageDoctor.scss';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManageUsers extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // save to Markdown table
         contentHTML: '',
         contentMarkdown: '',
         selectedOption: null,
         description: '',
         arrDoctors: [],
         hasOldData: false,

         // save to doctor_infor table
         arrPrices: [],
         arrPayments: [],
         arrProvinces: [],
         arrSpecialties: [],
         arrClinics: [],
         selectedPrice: null,
         selectedPayment: null,
         selectedProvince: null,
         selectedSpecialty: null,
         selectedClinic: null,
         nameClinic: '',
         addressClinic: '',
         note: ''
      };
   }

   async componentDidMount() {
      this.props.fetchAllDoctors();
      this.props.fetchRequiredDoctorInfor();
      // get all Clinics
      let resClinics = await getAllClinics();
      if (resClinics && resClinics.errCode === 0) {
         this.setState({ arrClinics: this.buildDataSelect(resClinics.data, "CLINIC") })
      }
   }
   buildDataSelect = (data, type) => {
      let results = [];
      let { language } = this.props;
      if (type === 'USER') {
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
      } else if (type === 'PRICE') {
         if (data && data.length > 0) {
            data.map((item, index) => {
               let object = {};
               object.label = language === LANGUAGES.VI ? `${item.valueVi} VND` : `${item.valueEn} USD`;
               object.value = item.keyMap
               results.push(object)
            })
         }
      } else if (type === 'CLINIC') {
         data.map((item, index) => {
            let object = {};
            object.label = item.address;
            object.value = item.id;
            results.push(object)
         })
      }
      else {
         if (data && data.length > 0) {
            data.map((item, index) => {
               let object = {};
               object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
               object.value = item.keyMap
               results.push(object)
            })
         }
      }
      return results;
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.allDoctors !== this.props.allDoctors) {
         let arrDoctors = this.buildDataSelect(this.props.allDoctors, 'USER')
         this.setState({
            arrDoctors
         })
      }
      if (prevProps.language !== this.props.language) {
         let arrDoctors = this.buildDataSelect(this.props.allDoctors, 'USER')
         let { prices, payments, provinces, specialties } = this.props.requiredDoctorInfor
         let arrPrices = this.buildDataSelect(prices, "PRICE")
         let arrPayments = this.buildDataSelect(payments)
         let arrProvinces = this.buildDataSelect(provinces)
         let arrSpecialties = this.buildDataSelect(specialties)
         this.setState({
            arrPrices, arrPayments, arrProvinces, arrDoctors, arrSpecialties
         })
      }
      if (prevState.arrDoctors !== this.state.arrDoctors) {
         let { arrDoctors, arrPayments, arrProvinces, arrPrices, arrSpecialties } = this.state;
         let { selectedOption, selectedProvince, selectedPayment, selectedPrice, selectedSpecialty } = this.state;
         if (selectedOption) {
            this.setState({
               selectedOption: this.fixShowLabel(arrDoctors, selectedOption)
            })
         }
         if (selectedPrice) {
            this.setState({
               selectedPrice: this.fixShowLabel(arrPrices, selectedPrice)
            })
         }
         if (selectedPayment) {
            this.setState({
               selectedPayment: this.fixShowLabel(arrPayments, selectedPayment)
            })
         }
         if (selectedProvince) {
            this.setState({
               selectedProvince: this.fixShowLabel(arrProvinces, selectedProvince)
            })
         }
         if (selectedSpecialty) {
            this.setState({
               selectedSpecialty: this.fixShowLabel(arrSpecialties, selectedSpecialty)
            })
         }
      }
      if (prevProps.requiredDoctorInfor !== this.props.requiredDoctorInfor) {
         let { prices, payments, provinces, specialties } = this.props.requiredDoctorInfor
         let arrPrices = this.buildDataSelect(prices, "PRICE")
         let arrPayments = this.buildDataSelect(payments)
         let arrProvinces = this.buildDataSelect(provinces)
         let arrSpecialties = this.buildDataSelect(specialties)
         this.setState({
            arrPrices, arrPayments, arrProvinces, arrSpecialties
         })
      }
   }
   fixShowLabel = (arr, selectedOption) => {
      return arr.find(currentValue => {
         return currentValue.value === selectedOption.value
      })
   }
   showLabelAvailabel = (arr, value) => {
      return arr.find(currentValue => currentValue.value === value)
   }
   handleEditorChange = ({ html, text }) => {
      this.setState({
         contentHTML: html,
         contentMarkdown: text
      })
   }
   handleSaveMarkdown = async () => {
      let { contentHTML, contentMarkdown, description, selectedOption, hasOldData } = this.state;
      let { selectedProvince, selectedPayment, selectedPrice, nameClinic, addressClinic, note, selectedSpecialty, selectedClinic } = this.state;
      await this.props.createDetailDoctor({
         contentHTML: contentHTML,
         contentMarkdown: contentMarkdown,
         description: description,
         doctorId: selectedOption.value,
         action: hasOldData === true ? CRUD_ACTIONS.UPDATE : CRUD_ACTIONS.CREATE,

         priceId: selectedPrice.value,
         provinceId: selectedProvince.value,
         paymentId: selectedPayment.value,
         addressClinic: addressClinic,
         nameClinic: nameClinic,
         note: note,
         specialtyId: selectedSpecialty.value,
         clinicId: selectedClinic.value
      })
      let { createInforDoctor } = this.props
      if (createInforDoctor) {
         this.setState({
            contentHTML: '',
            contentMarkdown: '',
            selectedOption: null,
            description: '',
            hasOldData: false,

            selectedPrice: null,
            selectedPayment: null,
            selectedProvince: null,
            nameClinic: '',
            addressClinic: '',
            note: '',
            selectedSpecialty: null,
            selectedClinic: null
         })
      }

   }
   handleChangeSelect = async (selectedOption, name) => {
      let copyState = { ...this.state };
      copyState[name.name] = selectedOption;
      this.setState({ ...copyState });
      if (name.name === 'selectedOption') {
         let res = await getDetailInforDoctorById(selectedOption.value);
         if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Doctor_Infor) {
            const markdown = res.data.Markdown;
            const doctorInfor = res.data.Doctor_Infor;
            const { arrPrices, arrPayments, arrProvinces, arrSpecialties, arrClinics } = this.state;
            this.setState({
               contentHTML: markdown.contentHTML,
               contentMarkdown: markdown.contentMarkdown,
               description: markdown.description,
               hasOldData: true,

               selectedPrice: this.showLabelAvailabel(arrPrices, doctorInfor.priceId),
               selectedPayment: this.showLabelAvailabel(arrPayments, doctorInfor.paymentId),
               selectedProvince: this.showLabelAvailabel(arrProvinces, doctorInfor.provinceId),
               nameClinic: doctorInfor.nameClinic,
               addressClinic: doctorInfor.addressClinic,
               note: doctorInfor.note,
               selectedSpecialty: this.showLabelAvailabel(arrSpecialties, doctorInfor.specialtyId),
               selectedClinic: this.showLabelAvailabel(arrClinics, doctorInfor.clinicId)
            })
         } else {
            this.setState({
               contentHTML: '',
               contentMarkdown: '',
               description: '',
               hasOldData: false,

               selectedPrice: null,
               selectedPayment: null,
               selectedProvince: null,
               nameClinic: '',
               addressClinic: '',
               note: '',
               selectedSpecialty: null
            })
         }
      }

   };
   handleOnchangeText = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
         ...copyState
      })
   }
   render() {
      let { selectedOption, description, arrDoctors, contentMarkdown, hasOldData } = this.state;
      let { arrPrices, arrPayments, arrProvinces,
         selectedPrice, selectedPayment, selectedProvince,
         nameClinic, addressClinic, note, selectedSpecialty, arrSpecialties, selectedClinic, arrClinics } = this.state;
      return (
         <div className="manage-doctor-container container">
            <div className="manage-doctor-title">
               <FormattedMessage id="admin.manage-doctor.title" />
            </div>
            <div className="more-infor">
               <div className="content-left">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.select-doctor" />
                  </label>
                  <Select
                     value={selectedOption}
                     onChange={this.handleChangeSelect}
                     options={arrDoctors}
                     name='selectedOption'
                     placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                  />
               </div>
               <div className="content-right form-group">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.intro" />
                  </label>
                  <textarea
                     className="form-control"
                     value={description}
                     onChange={(event) => this.handleOnchangeText(event, 'description')}
                  />
               </div>
            </div>
            <div className="more-infor-detail row">
               <div className="col-4">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.province" />
                  </label>
                  <Select
                     value={selectedProvince}
                     onChange={this.handleChangeSelect}
                     options={arrProvinces}
                     name='selectedProvince'
                     placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                  />
               </div>
               <div className="col-4">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.price" />
                  </label>
                  <Select
                     value={selectedPrice}
                     onChange={this.handleChangeSelect}
                     options={arrPrices}
                     name='selectedPrice'
                     placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                  />
               </div>
               <div className="col-4">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.payment" />
                  </label>
                  <Select
                     value={selectedPayment}
                     onChange={this.handleChangeSelect}
                     options={arrPayments}
                     name='selectedPayment'
                     placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                  />
               </div>
               <div className="col-4">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.name-clinic" />
                  </label>
                  <input
                     type='text'
                     className="form-control"
                     value={nameClinic}
                     onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                  />

               </div>
               <div className="col-4">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.address-clinic" />
                  </label>
                  <input
                     type='text'
                     className="form-control"
                     value={addressClinic}
                     onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                  />

               </div>
               <div className="col-4 form-group">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.note" />
                  </label>
                  <input
                     type='text'
                     className="form-control"
                     value={note}
                     onChange={(event) => this.handleOnchangeText(event, 'note')}
                  />
               </div>
               <div className="col-4">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.specialty" />
                  </label>
                  <Select
                     value={selectedSpecialty}
                     onChange={this.handleChangeSelect}
                     options={arrSpecialties}
                     name='selectedSpecialty'
                     placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                  />
               </div>
               <div className="col-6">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.clinic" />
                  </label>
                  <Select
                     value={selectedClinic}
                     onChange={this.handleChangeSelect}
                     options={arrClinics}
                     name='selectedClinic'
                     placeholder={<FormattedMessage id="admin.manage-doctor.clinic" />}
                  />
               </div>
            </div>
            <div className="manage-doctor-editor">
               <MdEditor
                  style={{ height: '300px' }}
                  renderHTML={text => mdParser.render(text)}
                  value={contentMarkdown}
                  onChange={this.handleEditorChange}
               />
            </div>
            <button
               className={`btn save-content-doctor  ${hasOldData ? 'btn-warning' : 'btn-primary'}`}
               onClick={() => { this.handleSaveMarkdown() }}
            >
               {hasOldData ?
                  <FormattedMessage id="admin.manage-doctor.update" />
                  :
                  <FormattedMessage id="admin.manage-doctor.create" />
               }
            </button>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      allDoctors: state.admin.allDoctors,
      language: state.app.language,
      createInforDoctor: state.admin.createInforDoctor,
      requiredDoctorInfor: state.admin.requiredDoctorInfor
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
      fetchRequiredDoctorInfor: () => dispatch(actions.fetchRequiredDoctorInfor()),
      createDetailDoctor: (data) => dispatch(actions.createDetailDoctor(data))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUsers);

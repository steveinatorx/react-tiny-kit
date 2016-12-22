import React from 'react';
// import Animate from 'rc-animate';
import '../css/skeleton.css';
import '../css/custom.css';
// import './css/normalize.css';
import '../css/skeleton-alerts.css';
const MediaQuery = require('react-responsive');
import Formsy from 'formsy-react';
import * as FormElements from './FormElements';
import styles from '../style.js';
import Center from 'react-center';

export class SellComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar'
    };
  }
  componentWillReceiveProps (newProps) {
    console.log('CWRP new props', newProps);
   // console.log('CWRP res count', typeof newProps.state.get('resultsCount'));
  }
  render() {
    return (
         <div>
              <br/>
             <span className="blueFont">Complete and submit the request form below and we will email you your matches. 
Let’s get started locating your Porsche! </span>
             {/*<Formsy.Form onValidSubmit={this.submit} onValid={this.enableFormSubmit} onInvalid={this.disableFormSubmit}>
               <FormElements.MyInput 
                  name="fullName" 
                  type="text" 
                  placeholder="enter full name (required)" 
                  validations="isExisty" 
                  validationError="first name required" 
                  required/>
                <FormElements.MyInput 
                  name="email"
                  type="email" 
                  placeholder="enter email (required)"
                  validations="isEmail" 
                  className="u-full-width"
                  validationError="invalid email"
                  required/>
                <FormElements.MyInput 
                  name="repeatEmail"
                  type="email" 
                  placeholder="repeat email (required)"
                  validations="equalsField:email" 
                  className="u-full-width"
                  validationError="email does not match"
                  required/>
                <FormElements.MyInput 
                  name="companyName"
                  type="text" 
                  placeholder="company name (optional)"
                  className="u-full-width"
                  />
                <FormElements.MyInput 
                  name="phoneNumber"
                  type="text" 
                  placeholder="phone number"
                  validations="isNumeric" 
                  className="u-full-width"
                  validationError="not a valid phone number"
                  required/>
                  <span className="blueFont">Check all that apply (must check one):
                  </span>
                 <FormElements.MyCheck
                  name="checkResearch"
                  type="checkbox"
                  ref="check1" 
                  validations="isOneChecked" 
                  validationError="must check one"
                  title="I am researching millennial Porsche vehicles"
                  />
                  <FormElements.MyCheck
                  name="checkBuy"
                  type="checkbox"
                  ref="check2" 
                  validations="isOneChecked" 
                  validationError="must check one"
                  title="I am looking to buy a millenial Porsche vehicle"
                  />
                  <FormElements.MyCheck
                  name="checkSell"
                  type="checkbox"
                  ref="check3" 
                  validations="isOneChecked" 
                  validationError="must check one"
                  title="I am interested in selling a millennial Porsche vehicle"
                  />
                  <FormElements.MyCheck
                  name="checkDealer"
                  type="checkbox"
                  ref="check4" 
                  validations="isOneChecked" 
                  validationError="must check one"
                  title="I am a licensed dealer or broker"
                  />
                  <FormElements.MyCheck
                  name="checkOther"
                  type="checkbox"
                  ref="check5" 
                  validations="isOneChecked" 
                  validationError="must check one"
                  title="Other - enter inquiry in comment box"
                  />
                  <textarea className="commentBox" rows="4" cols="50" placeholder="comment box"/>
                  
                  <textarea className="legalese" readOnly="true" rows="3" cols="50">By clicking "Submit": I accept and agree with Concours By Appointment LLC (CBA) that a) information provided through PCNALocator may contain copyrighted material and I will not distribute any materials received by me as a result of using the application, and  b) I will not reproduce, duplicate, copy, sell, resell or exploit for any purpose, any portion of information I receive through PCNALocator, and c) CBA makes no representations, expressed or implied, as to the existence, ownership, availability for purchase or sale, accuracy, description or condition of vehicles, vehicle’s listed equipment, accessories, price or any warranties, and d) information provided through PCNALocator does not constitute an offer by CBA to buy or sell any vehicle absent a written contract between myself and CBA and e) I authorize CBA to send me email offers including vehicle information.
                  </textarea>
                 
                  {/*style={Object.assign({}, this.state.canSubmit ? {}: this.noDisplayStyle)} 
                <button className="button-success block" onClick={this.submitSearchForm} type="submit" 
                  disabled={!this.state.canSubmit}>
                    Submit
                </button>
  </Formsy.Form>*/}
      </div>
    );
  }
}
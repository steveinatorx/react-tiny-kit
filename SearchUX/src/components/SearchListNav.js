import React from 'react';
import sortBy from 'lodash'; 
var ReCAPTCHA = require("react-google-recaptcha");

import Dialog from 'rc-dialog';
import Animate from 'rc-animate';

import 'rc-dialog/assets/index.css';
import '../css/skeleton.css';
import '../css/prog-tracker.css';
import '../css/custom.css';
//import './css/normalize.css';
import '../css/skeleton-alerts.css';
var MediaQuery = require('react-responsive');
import Formsy from 'formsy-react';

import styles from '../style.js';

import Select from 'react-select';
import Center from 'react-center';

var classNames = require('classnames');
import '../css/react-select.css';
var Radium = require('radium');

import * as FormElements from './FormElements';

var SelectionTable = React.createClass({
	getInitialState () {
    var keys = this.props.state.getIn(['searchFields']).map (f =>  {
    });
    return ({
      selected: [],
      count: 0,
      activeIdx: 0,     
    });
  },
  getActiveFieldFromProp : function getActiveFieldFromProp(theProps){
    var ret=null;
    theProps.state.getIn(['searchFields']).map(f => {
      if (f.get('isActive') === true ) {
        // console.log('getting ative field', f.get('id'));
        ret = f.toJS();
      }
      });
    return ret;
  },
  componentWillReceiveProps (newProps) {
    var activeLine=this.getActiveFieldFromProp(newProps);    
    //console.log('activeLINLINELINE', activeLine);
    this.setState({ selected: activeLine.selected });
    this.setState({ activeIdx: activeLine.idx});
    this.setState({ count: newProps.state.get('resultsCount')});
  },
  getResultsBoxStyle : function getResultsBoxStyle(){
    if (this.state.activeIdx === 0 && this.state.selected.length === 0 ) {
     return styles.hidden;
    }
    if (this.state.activeIdx === 0  && this.state.count === 0) {
     return styles.hidden;
    }
    if (this.state.count === 15843) {
     return styles.hidden;
    }
    return (this.state.count > 0) ? Object.assign({},styles.resultsBox,styles.resultsBoxGreen) : Object.assign({},styles.resultsBox,styles.resultsBoxRed);
 },  
  render () {
        return (
          <div>
            <div style={this.getResultsBoxStyle()} >
            <MediaQuery query='(max-width: 550px)'>
                {this.state.count} Vehicles Match
              </MediaQuery>
              <MediaQuery query='(min-width: 551px)'>
                {this.state.count} Vehicles Match Your Selections
              </MediaQuery>
            </div>
          <table className="u-full-width">
      <thead>
        <tr>
          <th>Field</th>
          <th>Your Selections</th>
        </tr>
      </thead>
      <tbody>

  { this.props.state.getIn(['searchFields']).map(f => {
        return (
        <tr key={f.get('idx')}>
          <td style={styles.selectionTd}>{f.get('label')}</td>
          <td>{ f.get('selected')}</td>
        </tr>
        )
  })}
      </tbody>
    </table>
    </div>
    )
    }  
});//end class

export class MultiSelectField extends React.Component {
  constructor(props) {
    super(props);
    this._getActiveFieldLine = this._getActiveFieldLine.bind(this);
    this._setFocus = this._setFocus.bind(this);
    this._getActiveIdx = this._getActiveIdx.bind(this);
    this._handleSelectChange = this._handleSelectChange.bind(this);
    
    console.log(this._getActiveIdx());
    console.log('1',props.state.getIn(['searchFields', this._getActiveIdx(), 'opts']));
    //console.log(props.state.getIn(['searchFields', this._getActiveIdx(), 'opts']).toJS());
      this.state = {
       multi: true,
 			 disabled: false,
       options: props.state.getIn(['searchFields', this._getActiveIdx() , 'opts']),
   		 value: null,
       placeholder: "select " + props.state.getIn(['searchFields', this._getActiveIdx() , 'label']),
      }
}//constructor

_setFocus() {
    this.refs.theMultiSelect.focus(); 
}

//need to track last active line? might need to go into store
_getActiveFieldLine(theseProps){
    var ret=null;
      theseProps.state.getIn(['searchFields']).map(f => {
      if (f.get('isActive') === true ) {
        console.log('getting ative field', f.get('id'));
        ret = f.toJS();
      }
      });
    return ret;
}
_getActiveIdx(){
    let idx=null;
    this.props.state.getIn(['searchFields']).map(f => {
      if (f.get('isActive') === true ) {
        console.log('getting active idx', parseInt(f.get('idx')));
        idx = f.get('idx');
      }
      });
      return idx;
}
_clearDisabledOpts() {
    var newOpts = this.state.options.map(function(obj){
            obj['disabled'] = false;
            return obj;
         });
    this.setState({options: newOpts});
}
_getSelected(){
    console.log('in selected', this.props.state.getIn(['searchFields']));
    var selected=[]; 
    this.props.state.getIn(['searchFields']).map(f => {
      
              var thisSegment={};
              console.log(f.get('id') + ' selected length ', f.get('selected'));
              if (f.get('selected').length > 1 ) {
                selected.concat(f.get('selected'));
              } else if (f.get('selected').length>0){
                selected.concat(f.get('selected'));
              }
    });
    return selected;    
}
_handleSelectChange(value) {
    console.log('in selected');
    var allFlag = false;
    var activeIdx=this._getActiveIdx();
        if (value === null) {
          this.setState({ value });
        }
        //special case all - match all after previous selections
        else if (value.match(/^all$/) || value.match(/,all/)) {
          var allFlag = true;
          
          value=this._getActiveFieldLine(this.props).opts.map( o => {
          if (o.label !== 'All') {
            return o.label; 
        }
      }).join(',');
        //not sure why this appends a closing comma
        //console.log('setting value to ----->', value.replace(/,$/,''));
        value = value.replace(/,$/,'');
        value = value.replace(/^,/,'');
        this.setState({ value }); 

    }
    else {
        this.setState({ value }); 
        
        if (activeIdx === 0){
         var newOpts=this.state.options.map(function(obj){
           return obj['disabled']=true;
         });
         this.setState({options: newOpts});
        }
        
    }
    
    console.log('aaa');

    if (value === "" || typeof value === 'undefined') {
        this.setState({ value:''});

        if (activeIdx === 0){
         var newOpts=this.state.options.map(function(obj){
           return obj['disabled']=false;
         });
         this.setState({options: newOpts});
        }
      this.props.setFieldSelectionAndFetchData(activeIdx, []); 
    }

    // on remove dont set fields?   
    if (value !=="" && value !== null) {
      this.props.setFieldSelectionAndFetchData(activeIdx, [value]); 
    }
}
/*componentWillMount() {
}*/
componentWillReceiveProps (newProps) {
    // console.log('SELECT CWRP', newProps);
    var newPropLine = this._getActiveFieldLine(newProps);
    //console.log('SELECT CWRP newPropLine', newPropLine);
    
    var oldPropLine = this._getActiveFieldLine(this.props);
    
    if (newPropLine.id === 'Year') { 
    var tmpOpts= _.sortBy(newPropLine.opts, 'label');
        var lastOpt=tmpOpts.pop();
        //onsole.log('LAST OP', lastOpt.label);
        if (lastOpt.label === 'All'){
          var sortedOpts = tmpOpts;
          sortedOpts.unshift(lastOpt);
        } else {
          //single opts in Year
          var sortedOpts=newPropLine.opts;
        }      
    } else {
      var sortedOpts= _.sortBy(newPropLine.opts, 'label');
    }   
    if (typeof newPropLine.selected[0] !== 'undefined' && newPropLine.selected[0].match(',')){
      var selectedArr=newPropLine.selected[0].split(',');
      if(selectedArr.length > 0 && selectedArr.length === (sortedOpts.length -1)){
        sortedOpts = sortedOpts.filter( function(obj) {
          return obj.label != 'All'
        });
        
      } 
    }  
       
    if (typeof sortedOpts !== 'undefined') {
      this.setState({ options: sortedOpts});
    }
   
    if (newPropLine.idx != oldPropLine.idx){
        var placeMod = (newPropLine.metaMulti) ? 'one or more ' : 'one ';
        this.setState({ placeholder : "select " + placeMod + newPropLine.label });
    }
    if (typeof newPropLine.selected[0] !== 'undefined') {
     this.setState({value:newPropLine.selected[0]});
    }
     this._setFocus();
}
_toggleDisabled(e) {
		this.setState({ disabled: e.target.checked });
}
render () {
		return (
			<div className="section">
				<Select simpleValue
          ref="theMultiSelect"
          multi={this.state.multi} 
          autofocus={true}
          disabled={this.state.disabled} 
          value={this.state.value}
          placeholder={this.state.placeholder}
          options={this.state.options}
          onChange={this._handleSelectChange} 
          clearable={true}
          openAfterFocus={true}
          noResultsText={false}
          searchable={false}
          />
			</div>
		);
	}
};

@Radium export default class SearchListNav extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUUID();
    
    console.log(props.state);
    
    var theListSize = props.state.getIn(['searchFields']).size;
    this.state = {
      showPreviousBtn: false,
      showNextBtn: false,
      showMatchBtn: false,
      disabledMatchBtn: false,
      compState: 0,
      navState: this.getNavStates(0, theListSize),
      init: true,
      dialogVisible: false,
      canSubmit: false
    };
    this.hiddenStyle = {
      visibility: 'hidden'
    };
    this.noDisplayStyle = {
      display: 'none'
    };
    this.btnStyle = {
      marginRight: '5px' 
    };
    this.controlBoxStyle = {
      height: '30px' 
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.next = this.next.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.captchaCallback = this.captchaCallback.bind(this);
    this.onCaptchaChange= this.onCaptchaChange.bind(this);
    this.previous = this.previous.bind(this);
    this.startOver = this.startOver.bind(this);
    this.getActiveFieldFromProp = this.getActiveFieldFromProp.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.enableFormSubmit = this.enableFormSubmit.bind(this);
    this.disableFormSubmit = this.disableFormSubmit.bind(this);
    this.submit = this.submit.bind(this);
    
}
  getActiveFieldFromProp(theProps){
            var ret=null;
            theProps.state.getIn(['searchFields']).map(f => {
              if (f.get('isActive') === true ) {
                ret = f.toJS();
              }
             });
             return ret;
  }
  componentWillReceiveProps (newProps) {
        var isInit = (newProps.state.getIn(['searchFields', 0 , 'selected']).length === 0) ? true: false;
   // console.log('isInit>>' , isInit);
    this.setState({ init: isInit});
    this.setState({ count: newProps.state.get('resultsCount')});
    if(isInit) { 
      this.refs.multiSelect._clearDisabledOpts();
    }
    
    var newPropLine = this.getActiveFieldFromProp(newProps);
    var oldPropLine = this.getActiveFieldFromProp(this.props);
    if (newPropLine.idx != oldPropLine.idx) {
            // console.log('new active field'); 
            this.setNavState(newPropLine.idx);
    }
    
    //console.log('SHOW NEXT BTN' ,typeof newPropLine.selected !== undefined);
    //console.log('SHOW NEXT BTN' , newPropLine.selected.length);
    //console.log('SHOW NEXT BTN' ,newPropLine.idx !== 7); 
    if (typeof newPropLine.selected !=='undefined' && newPropLine.selected.length>0 && newPropLine.idx !== 7) {
     // console.log('show next');
        this.setState({ showNextBtn: true}); 
        this.setState({ showMatchBtn: false}); 
    } else if (newPropLine.idx===7) {
      //console.log('HIDE NEXT BTN');
       this.setState({ showNextBtn: false}); 
       this.setState({ showMatchBtn: true}); 
    } else {
        this.setState({ showNextBtn: false}); 
       this.setState({ showMatchBtn: false}); 
    }
  }

  getNavStates(indx, length) {
    let styles = [];
    for (let i=0; i<length; i++) {
      if(i < indx) {
        styles.push('done')
      }
      else if(i === indx) {
        styles.push('doing')
      }
      else {
        styles.push('todo')
      }
    }
    return { current: indx, styles: styles }
  }

  checkNavState(currentStep){
    // if(currentStep > 0 && currentStep !== this.props.steps.length - 1){
   if(currentStep > 0 && currentStep !== this.props.state.getIn(['searchFields']).size - 1){
      this.setState({
        showPreviousBtn: true,
        showNextBtn: true,
        showStartOverBtn: true,
      })
    }
    else if(currentStep === 0) {
      this.setState({
        showPreviousBtn: false,
        showNextBtn: true,
        showStartOverBtn: false,
      })
    }
    else {
      this.setState({
        showPreviousBtn: true,
        showNextBtn: false,
        showStartOverBtn: true,
      })
    }
  }

  setNavState(next) {
    var theListSize = this.props.state.getIn(['searchFields']).size;
    
     this.props.setActiveField(next); 
    
    this.setState({navState: this.getNavStates(next, theListSize)});
    if (next < theListSize) {
      this.setState({compState: next})
    }
    this.checkNavState(next);
    this.refs.multiSelect._setFocus();
  }

  handleKeyDown (evt) {
    if (evt.which === 13) {
      this.next()
    }
  }
   captchaCallback(){
    console.log('asdfsdafsadfsdaf');
  }
  onCaptchaChange(val){
    console.log(val);
  }
  next() {
    this.setNavState(this.state.compState + 1);
    this.refs.multiSelect._setFocus();
  }
  openDialog() {
    console.log('open dialog');
   this.setState({ dialogVisible: true }); 
  }
  previous() {
    if (this.state.compState > 0) {
      console.log('REFS', this.refs);
      this.refs.multiSelect._handleSelectChange('');
      this.setNavState(this.state.compState - 1);
      this.refs.multiSelect.setFocus();
    }
  }
  
  startOver() {
   console.log(this.props);
      this.props.clearAll();
      this.setNavState(0);
      this.setState({ init: true});
      this.refs.multiSelect._clearDisabledOpts();
      this.refs.multiSelect.setState({ value: ''});
      this.refs.multiSelect._setFocus();
  }
  
  getMatchBtnStyle() {
    console.log('in gmbs');
    var style={};
    var propLine = this.getActiveFieldFromProp(this.props);
    //display
    if (propLine.idx !== 7){
      
    }
  }

  getClassName(className, i){
    return className + "-" + this.state.navState.styles[i];
  }
  onCloseDialog(){
    console.log('closeD');
    this.setState({ dialogVisible: false }); 

  }
  renderSteps() {
      return this.props.state.getIn(['searchFields']).map (f => (
      /* <li className={this.getClassName("progtrckr", f.get('idx'))} onClick={this.handleOnClick} key={f.get('idx')} value={f.get('id')}> */
      <li className={this.getClassName("progtrckr", f.get('idx'))} key={f.get('idx')} value={f.get('id')}>
        <em>{f.get('idx')+1}</em>
        <span>{f.get('navLabel')}</span>
      </li>           
    ))  
  }

  enableFormSubmit() {
      this.setState({
        canSubmit: true
      });
  }
  disableFormSubmit() {
      this.setState({
        canSubmit: false
      });
  }
  submit(model) {
      console.log('model:',model);
  }


  render() {
      return (
        <div className="container" onKeyDown={this.handleKeyDown}>
        
          <ol className="progtrckr">
            {this.renderSteps()}
          </ol>
            <div className="row">
              <div className="six columns">

              <div style={this.controlBoxStyle}>
            <MediaQuery query='(max-width: 400px)'>
                   <button style={Object.assign({}, this.state.showStartOverBtn ? {} : this.noDisplayStyle ,this.btnStyle)}
                            className="multistep__btn--prev"
                            onClick={this.startOver}>Clear</button>
                   <button style={this.state.showPreviousBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--prev"
                            onClick={this.previous}>Prev
                   </button>
                   <button style={this.state.showNextBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--next button-primary u-pull-right"
                            onClick={this.next}>Next</button>
            <button style={this.state.showMatchBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--next button-success u-pull-right"
                            onClick={this.openDialog}>Submit2</button>

            </MediaQuery>
            <MediaQuery query='(min-width: 401px)'>
            <MediaQuery query='(max-width:800px)'>
                   <button style={Object.assign({}, this.state.showStartOverBtn ? {} : this.noDisplayStyle ,this.btnStyle)}
                            className="multistep__btn--prev"
                            onClick={this.startOver}>x</button>
                   <button style={this.state.showPreviousBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--prev"
                            onClick={this.previous}>&lt;
                   </button>
                   <button style={this.state.showNextBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--next button-primary u-pull-right"
                            onClick={this.next}>&gt;</button>
              <button style={this.state.showMatchBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--next button-success u-pull-right"
                            onClick={this.openDialog}>go</button>
            </MediaQuery>
            </MediaQuery>
             <MediaQuery query='(min-width: 801px)'>
            <MediaQuery query='(max-width:1199px)'>
                    <button style={Object.assign({}, this.state.showStartOverBtn ? {} : this.noDisplayStyle ,this.btnStyle)}
                            className="multistep__btn--prev"
                            onClick={this.startOver}>Clear</button>
                   <button style={this.state.showPreviousBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--prev"
                            onClick={this.previous}>Prev
                   </button>
                   <button style={this.state.showNextBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--next button-primary u-pull-right"
                            onClick={this.next}>Next</button>
                    <button style={this.state.showMatchBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--next button-success u-pull-right"
                            onClick={this.openDialog}>Submit</button>
            </MediaQuery>
            </MediaQuery>
            <MediaQuery query='(min-width: 1200px)'>
                   <button style={Object.assign({}, this.state.showStartOverBtn ? {} : this.noDisplayStyle ,this.btnStyle)}
                            className="multistep__btn--prev"
                            onClick={this.startOver}>Clear All</button>
                   <button style={this.state.showPreviousBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--prev"
                            onClick={this.previous}>Previous Field
                   </button>
                   <button style={this.state.showNextBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--next button-primary u-pull-right"
                            onClick={this.next}>Next Field</button>
                   <button style={this.state.showMatchBtn ? {} : this.noDisplayStyle}
                            className="multistep__btn--next button-success u-pull-right"
                            onClick={this.openDialog}>Get Matches</button>
           </MediaQuery>

                    <span style={this.state.init ? {} : this.noDisplayStyle} className="skeleton-alert alert-warning"><strong><center>Select a Model Below to Start the Search!</center></strong></span>
              </div>
                <MultiSelectField ref="multiSelect" {...this.props} />
                  {/* <div style={this.props.showNavigation ? {} : this.hidden}> */}
                               </div>
              <div className="six columns">
               <SelectionTable {...this.props} />
              </div>
            </div>
           <Dialog
                visible={this.state.dialogVisible}
                wrapClassName="center"
                animation="zoom"
                maskAnimation="fade"
                onClose={this.onCloseDialog}
                style={styles.dialogStyle}
              >
              
              <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                <FormElements.MyNameInput name="fistName" placeholder="enter first name" validationError="required" required/>
                <FormElements.MyEmailInput name="secondName" placeholder="enter last name" validationError="required" required/>
                <FormElements.MyEmailInput name="email" placeholder="enter email" validations="isEmail" validationError="invalid email" required/>
                <FormElements.MyEmailInput name="emailRepeat" placeholder="repeat email" validations="isEmail" validationError="invalid email" required/>
                <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
              </Formsy.Form>

              </Dialog>     
      </div>
    );
  }
}
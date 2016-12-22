import React from 'react';
import sortBy from 'lodash'; 
const ReCAPTCHA = require("react-google-recaptcha");

import Dialog from 'rc-dialog';
// import Animate from 'rc-animate';
import 'rc-dialog/assets/index.css';
import '../css/skeleton.css';
import '../css/prog-tracker.css';
import '../css/custom.css';
// import './css/normalize.css';
import '../css/skeleton-alerts.css';
const MediaQuery = require('react-responsive');
import Formsy from 'formsy-react';

import styles from '../style.js';

import Select from 'react-select';
// import Center from 'react-center';

// const classNames = require('classnames');
import '../css/react-select.css';
const Radium = require('radium');

import * as FormElements from './FormElements';

export class SelectionTable extends React.Component {
  constructor(props) {
    super(props);
    this._getActiveFieldLine = this._getActiveFieldLine.bind(this);
    this._getResultsBoxStyle = this._getResultsBoxStyle.bind(this);
    
    console.log('ST count:', props.state.getIn(['reducer','resultsCount']));
    this.state = {
      selected: [this._getActiveFieldLine(this.props).selected],
      count: props.state.getIn(['reducer','resultsCount']),
      activeIdx: this._getActiveFieldLine(this.props).idx
    };
  }
  _getActiveFieldLine(theProps) {
    let ret=null;
    theProps.state.getIn(['reducer','searchFields']).map(f => {
      if (f.get('isActive') === true ) {
        // console.log('getting ative field', f.get('id'));
        ret = f.toJS();
      }
      });
    return ret;
  }
  componentWillReceiveProps (newProps) {
    let activeLine=this._getActiveFieldLine(newProps);    

   // console.log('CWRP res count', newProps.state.get('resultsCount'));
    console.log('CWRP res count', typeof newProps.state.getIn(['reducer','resultsCount']));
    this.setState({ selected: activeLine.selected });
    this.setState({ activeIdx: activeLine.idx});
    this.setState({ count: newProps.state.getIn(['reducer','resultsCount'])});
  }
  _getResultsBoxStyle() {
    if (this.state.activeIdx === 0 && this.state.selected.length === 0 ) {
     return styles.hidden;
    }
    if (this.state.activeIdx === 0  && this.state.count === 0) {
     return styles.hidden;
    }
    if (this.state.count === 15843) {
     return styles.hidden;
    }
    return (this.state.count > 0) 
    ? Object.assign({},styles.resultsBox,styles.resultsBoxGreen)
    : Object.assign({},styles.resultsBox,styles.resultsBoxRed);
  }
  render() {
        return (
          <div>
            <div style={this._getResultsBoxStyle()} >
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

  { this.props.state.getIn(['reducer','searchFields']).map(f => {
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
}//end class

export class MultiSelectField extends React.Component {
  constructor(props) {
    super(props);
    this._getActiveFieldLine = this._getActiveFieldLine.bind(this);
    this._setFocus = this._setFocus.bind(this);
    this._getActiveIdx = this._getActiveIdx.bind(this);
    this._handleSelectChange = this._handleSelectChange.bind(this);
    this._clearDisabledOpts = this._clearDisabledOpts.bind(this);

    console.log('to', Array.isArray(props.state.getIn(['reducer','searchFields', this._getActiveIdx(), 'opts'])));
    console.log(props.state.getIn(['reducer','searchFields', this._getActiveIdx(), 'opts']));
    //this is a complete fucking mystery as to why this hydrates as an immut List or an array - localstorage 
    /*let thisOpts = (Array.isArray(props.state.getIn(['searchFields', this._getActiveIdx(), 'opts']))) 
    ?  props.state.getIn(['searchFields', this._getActiveIdx(), 'opts']) 
    : props.state.getIn(['searchFields', this._getActiveIdx(), 'opts']).toJS();*/
    
    let thisOpts = this._getActiveFieldLine(props).opts;
    let initValue = (Array.isArray(props.state.getIn(['searchFields', this._getActiveIdx(), 'selected']))) 
    ?  props.state.getIn(['reducer','searchFields', this._getActiveIdx(), 'selected']) 
    : props.state.getIn(['reducer','searchFields', this._getActiveIdx(), 'selected']).toJS();
      if (Array.isArray(initValue) && initValue.length === 0) {
        if (this._getActiveIdx() === 0){
          let newOpts = thisOpts.map(function(obj){
            obj.disabled = false;
            return obj;
         });
         thisOpts = newOpts; 
        }
        //remove All versus selected
               
       initValue=''; 
      }


    if (Array.isArray(initValue) && initValue.length === 1) {
      initValue = initValue[0]; 
    }
    console.log(' remove "all"', initValue) ;
    if (!Array.isArray(initValue) && (thisOpts.length-1 === initValue.split(',').length )) {
      console.log('yes remove ALL');
      thisOpts = thisOpts.filter(opt => opt.label !== 'All');
    }

    //console.log(props.state.getIn(['searchFields', this._getActiveIdx(), 'opts']).toJS());
      this.state = {
       // first init flag 
       init: true, 
       multi: true,
 			 disabled: false,
       options: thisOpts,
       value: initValue,
       initValue: initValue,
       placeholder: "select " + props.state.getIn(['reducer','searchFields', this._getActiveIdx() , 'label']),
      }
}//constructor
_setFocus() {
    console.log('in MS focus', this.refs.theMultiSelect.state);
    this.refs.theMultiSelect.focus(); 
    this.refs.theMultiSelect.setState({isOpen: true});
    console.log('in MS focus', this.refs.theMultiSelect.state);
    

    //this.refs.theMultiSelect.setState({isOpen: true});
}
//need to track last active line? might need to go into store
_getActiveFieldLine(theseProps){
    //console.log('props',theseProps);
    let ret=null;
      theseProps.state.getIn(['reducer','searchFields']).map(f => {
      if (f.get('isActive') === true ) {
        // console.log('getting ative field', f.get('id'));
        ret = f.toJS();
      }
      });
      //console.log(ret);
    return ret;
}
_getActiveIdx(){
    let idx=null;
    this.props.state.getIn(['reducer','searchFields']).map(f => {
      if (f.get('isActive') === true ) {
        // console.log('getting active idx', parseInt(f.get('idx')));
        idx = f.get('idx');
      }
      });
      return idx;
}
_clearDisabledOpts() {
    console.log('clearing opts');
    var newOpts = this.state.options.map(function(obj){
            obj['disabled'] = false;
            return obj;
         });
    this.setState({options: newOpts});
}
_getSelected(){
    console.log('in get selected', this.props.state.getIn(['searchFields']));
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
    console.log('XVXVXVXVXVXVXin select change:', value);
    var allFlag = false;
    var activeIdx=this._getActiveIdx();
    console.log('ACTIVE IDX', activeIdx);
        /*if (value === null) {
          console.log('in null selection block');
          this.setState({ value });
        }*/
        //special case all - match all after previous selections
      if (value.match(/^all$/) || value.match(/,all/)) {
          console.log('in "all" selection block');
          var allFlag = true;
          
          value=this._getActiveFieldLine(this.props).opts.map( o => {
          if (o.label !== 'All') {
            return o.label; 
        }
      }).join(',');
      
        //also remove all from options
        let newOpts = this.state.options.filter(opt => opt.label !== 'All');
        this.setState({options: newOpts});
        //not sure why this appends a closing comma
        //console.log('setting value to ----->', value.replace(/,$/,''));
        value = value.replace(/,$/,'');
        value = value.replace(/^,/,'');
        this.setState({ value }); 
        this.props.setFieldSelectionAndFetchData(activeIdx, [value]); 

    }
     else if ( value === null || value === [] || value === "" || typeof value === 'undefined') {
       console.log('in untruthy select block'); 
        this.setState({ value:''});
        if (activeIdx === 0){
         var newOpts=this.state.options.map(function(obj){
            //console.log(obj);
            obj.disabled=false;
           return obj;
         });
         this.setState({options: newOpts});
         // console.log('now state?', this.state.options);
        } else {
         let hasAll=this.state.options.some( o => o.label === 'All');
         console.log('this current state options', this.state.options); 
         if (hasAll === false && activeIdx >0 && this.state.options.length-1 > 0){
          let allOpts = this.state.options;
          allOpts.unshift({ label: 'All', value: 'all'});
          this.setState({options: allOpts});
         }
        }
      this.props.setFieldSelectionAndFetchData(activeIdx, []); 
    }
    //truthy block
    else {
        console.log('in truthy select block', activeIdx);
        this.setState({ value }); 
        
        if (activeIdx === 0){
          var newOpts=this.state.options.map(function(obj){
            // console.log(obj);
             obj.disabled=true;
           return obj;
         });
         console.log('disable opts!', newOpts);
         this.setState({options: newOpts});
        }
        //remove "ALL" is needed

         let hasAll=this.state.options.some( o => o.label === 'All');
         console.log('hasAll val', hasAll);
           console.log('do i need to remove all current OPtions ??????', this.state.options); 
           console.log('do i have ALl in current opts???????', hasAll); 
         if (hasAll && value.split(',').length > 0 && (this.state.options.length -1 === value.split(',').length)) {
           console.log('i need to remove all!!!!');
           let newOpts = this.state.options.filter(opt => opt.label !== 'All');
           this.setState({options: newOpts});
         } else {
         console.log('do i need to add all??????', this.state.options.length-1 > 0);
         //console.log('MAP', _.map(this.state.options,(_.pick, 'Label')));
         if (hasAll === false && activeIdx >0 && this.state.options.length-1 > 0){
           console.log('options has all??????', hasAll);
             console.log('adding ALL');
            let allOpts = this.state.options;
            allOpts.unshift({ label: 'All', value: 'all'});
            this.setState({options: allOpts});
         }
         
        }

      this.props.setFieldSelectionAndFetchData(activeIdx, [value]); 
    }

}
componentWillMount() {
  console.log('in CWM', this.state.initValue);
  
  /*if ((this.state.init === true && Object.call(this.state.initValue) === '[object Array]' && this.state.initValue.length>0)
     || 
  ( this.state.init === true && this.state.initValue !=='')) */
  

  /*if (this.state.init === true)
  {
    console.log('calling from init', this.state.initValue)
    this.setState({init: false});
    this._handleSelectChange(this.state.initValue);       
  } */  
}
componentWillReceiveProps (newProps) {
 //   console.log('SELECT CWRP', newProps);
    let newPropLine = this._getActiveFieldLine(newProps);
  //  console.log('SELECT CWRP newPropLine', newPropLine);
    console.log('SELECT CWRP newPropLine IDX====', newPropLine.idx);
    let oldPropLine = this._getActiveFieldLine(this.props);
 //   console.log('SELECT CWRP oldPropLine IDX====', oldPropLine.idx);

    //only do this stuff on an actual nav change
    if (oldPropLine.idx !== newPropLine.idx) {
      console.log('mounting new IDXXXXX');
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
          value={this.state.value}
          placeholder={this.state.placeholder}
          options={this.state.options}
          onChange={this._handleSelectChange} 
          openOnFocus={true}
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
    props.getUUID();
    
    console.log('where my data?', props.state.get('reducer'));
    
    let theListSize = props.state.getIn(['reducer','searchFields']).size;
    
    let activeLine = this.getActiveFieldFromProp(props);

    console.log('sLN active line', activeLine);
    console.log('sLN active selected', activeLine.selected.length);

    this.state = {
      showPreviousBtn: (activeLine.idx > 0),
      showStartOverBtn: activeLine.idx > 0 || (activeLine.idx === 0 && activeLine.selected.length > 0),
      showNextBtn:  (activeLine.idx !== 7 && activeLine.selected.length > 0),
      showMatchBtn: (activeLine.idx === 7),
      disabledMatchBtn: false,
      compState: activeLine.idx,
      //first param is current index
      navState: this.getNavStates(activeLine.idx, theListSize),
      init: activeLine.idx === 0 && activeLine.selected.length === 0 ,
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
    Formsy.addValidationRule('isOneChecked', (values, checked) => {
      //console.log('VALID:value of this check', checked);
       //console.log('values:', values); 
       //console.log('values:', typeof values);
      
       let checksValid=false;
       
       for (let v in values) {
         if (values.hasOwnProperty(v)) {
            checksValid = (values[v] === true) ? true : checksValid; 
         }

       }
       return checksValid;
    });
  
}
  getActiveFieldFromProp(theProps){
            var ret=null;
            console.log('theProps?', theProps);
            theProps.state.getIn(['reducer','searchFields']).map(f => {
              if (f.get('isActive') === true ) {
                ret = f.toJS();
              }
             });
             return ret;
  }
  componentWillMount(){
    

  }
  componentWillReceiveProps (newProps) {
    let isInit = (newProps.state.getIn(['reducer','searchFields', 0 , 'selected']).size === 0) ? true: false;
    console.log('isInit>>' , isInit);
    this.setState({ init: isInit});
    this.setState({ count: newProps.state.getIn(['reducer','resultsCount'])});
    this.setState({ disabledMatchBtn: (newProps.state.getIn(['reducer','resultsCount']) > 0 )}); 
    if (isInit) { 
      this.refs.multiSelect._clearDisabledOpts();
    }
    let newPropLine = this.getActiveFieldFromProp(newProps);
    let oldPropLine = this.getActiveFieldFromProp(this.props);
    if (newPropLine.idx != oldPropLine.idx) {
            // console.log('new active field'); 
            this.setNavState(newPropLine.idx);
    }
    //console.log('SHOW NEXT BTN' , newPropLine);
    //console.log('SHOW NEXT BTN' , newPropLine.selected);
    //console.log('SHOW NEXT BTN' ,typeof newPropLine.selected !== undefined);
    //console.log('SHOW NEXT BTN' , newPropLine.selected.size);
    //console.log('SHOW NEXT BTN' ,newPropLine.idx !== 7); 
    if (newPropLine.selected.length>0 && newPropLine.idx !== 7) {
      console.log('show next');
        this.setState({ showNextBtn: true}); 
        this.setState({ showMatchBtn: false}); 
    } else if (newPropLine.idx===7) {
      console.log('HIDE NEXT BTN');
       this.setState({ showNextBtn: false}); 
       this.setState({ showMatchBtn: true}); 
    } else {

      console.log('HIDE NEXT and MATCH BTN');
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
   if(currentStep > 0 && currentStep !== this.props.state.getIn(['reducer','searchFields']).size - 1){
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
    var theListSize = this.props.state.getIn(['reducer','searchFields']).size;
    
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
   //todo this should be a flag and only dipatch once per session
   this.props.openSearchForm();
  }
  previous() {
    console.log('in PREVIOUS - whats my nav', this.state.compState);
    
    if (this.state.compState > 0) {
      // console.log('REFS', this.refs);
      this.refs.multiSelect._handleSelectChange('');
      
      this.setNavState(this.state.compState - 1);
      //this.refs.multiSelect.setFocus();
    }
  }
  
  startOver() {
   console.log('start over????');
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
    console.log(this.refs);
    this.refs.multiSelect._setFocus();
   
   //hackenstein this forces the select window back open 
   setTimeout(() => this.refs.multiSelect._setFocus(), 200);

  }
  submit(data){
    console.log('submitSForm', data);
    this.props.submitSearchForm(data);
  }
  

  renderSteps() {
      return this.props.state.getIn(['reducer','searchFields']).map (f => (
      /* <li className={this.getClassName("progtrckr", f.get('idx'))} onClick={this.handleOnClick} key={f.get('idx')} value={f.get('id')}> */
      <li className={this.getClassName("progtrckr", f.get('idx'))} key={f.get('idx')} value={f.get('id')}>
        <em>{f.get('idx')+1}</em>
        <span>{f.get('navLabel')}</span>
      </li>           
    ))  
  }
  enableFormSubmit() {
    console.log('can submit !!!!');
      this.setState({
        canSubmit: true
      });
  }
  disableFormSubmit() {
    console.log('cant submit !!!!');
      this.setState({
        canSubmit: false
      });
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
                            disabled={!this.state.disabledMatchBtn}
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
              <br/>
             <span className="blueFont">Complete and submit the request form below and we will email you your matches. 
Let’s get started locating your Porsche! </span>
              <Formsy.Form onValidSubmit={this.submit} onValid={this.enableFormSubmit} onInvalid={this.disableFormSubmit}>
                {/*<FormElements.MyNameInput name="firstName" placeholder="enter first name" validations="isExisty" validationError="first name required" required/>
                <FormElements.MyNameInput name="secondName" placeholder="enter last name" validationError="required" required/>
                <FormElements.MyEmailInput name="email" placeholder="enter email" validations="isEmail" validationError="invalid email" required/>
                */}
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
                 
                  {/*style={Object.assign({}, this.state.canSubmit ? {}: this.noDisplayStyle)} */}
                <button className="button-success block" onClick={this.submitSearchForm} type="submit" 
                  disabled={!this.state.canSubmit}>
                    Submit
                </button>
              </Formsy.Form>
              </Dialog>     
      </div>
    );
  }
}

import React from 'react';
import sortBy from 'lodash'; 
import './css/skeleton.css';
import './css/prog-tracker.css';
import './css/custom.css';
import './css/normalize.css';
import './css/skeleton-alerts.css';
var MediaQuery = require('react-responsive');

import styles from './style.js';

import Select from 'react-select';
var classNames = require('classnames');
import './css/react-select.css';
var Radium = require('radium');

const cntQuery={
    
};



var SelectionTable = React.createClass({
	getInitialState () {
    var keys = this.props.state.reducer.getIn(['searchFields']).map (f =>  {
    });
    return ({
      selections: [],
      count: 0,
      activeIdx: 0,     
    });
  },
  getActiveFieldFromProp : function getActiveFieldFromProp(theProps){
    var ret=null;
    theProps.state.reducer.getIn(['searchFields']).map(f => {
      if (f.get('isActive') === true ) {
        // console.log('getting ative field', f.get('id'));
        ret = f.toJS();
      }
      });
    return ret;
  },
  componentWillReceiveProps (newProps) {
    //console.log('in SELECTIONTABLE CWRP', newProps.state.reducer);    
    var activeLine=this.getActiveFieldFromProp(newProps);    
    this.setState({ selections: this.props.state.reducer.getIn(['searchFields'])});
    this.setState({ activeIdx: activeLine.idx});
    this.setState({ count: newProps.state.reducer.get('resultsCount')});
  },
  getResultsBoxStyle : function getResultsBoxStyle(){
    if (this.state.activeIdx ===0 && this.state.count === 0 ) {
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

  { this.props.state.reducer.getIn(['searchFields']).map(f => {
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

var MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	getInitialState () {
    //console.log(' in gIS MSF:', this.props.state.reducer.getIn(['searchFields', 0, 'id']));
		return {
      multi: true,
			disabled: false,
			options: this.props.state.reducer.getIn(['searchFields', 0, 'opts']),
			value: null,
      placeholder: "select " + this.props.state.reducer.getIn(['searchFields',0, 'label']),
		};
	},
  setFocus : function setFocus() {
    this.refs.theMultiSelect.focus(); 
  },
  getActiveFieldFromProp : function getActiveFieldFromProp(theProps){
    var ret=null;
    theProps.state.reducer.getIn(['searchFields']).map(f => {
      if (f.get('isActive') === true ) {
        // console.log('getting ative field', f.get('id'));
        ret = f.toJS();
      }
      });
    return ret;
  },
  clearDisabledOpts: function () {
    var newOpts = this.state.options.map(function(obj){
            obj['disabled'] = false;
            return obj;
         });
    this.setState({options: newOpts});
  },
  getSelected : function getSelected(){
    console.log('in selected', this.props.state.reducer.getIn(['searchFields']));
    var selected=[]; 
    this.props.state.reducer.getIn(['searchFields']).map(f => {
      
              var thisSegment={};
              console.log(f.get('id') + ' selected length ', f.get('selected'));
              if (f.get('selected').length > 1 ) {
                selected.concat(f.get('selected'));
              } else if (f.get('selected').length>0){
                selected.concat(f.get('selected'));
              }
    });

    return selected;    
    
  },
 	handleSelectChange : function handleSelectChange(value) {
    //console.log('THIS PROPS', this.props);
		//console.log('You\'ve selected:', value);
    var allFlag = false;
    var activeIdx=this.getActiveFieldFromProp(this.props).idx;
    //console.log('trying to set field idx', activeIdx);
     // console.log('typeof selection', typeof value);
     // console.log('does selection === null??', value === null);
        if (value === null) {
          this.setState({ value });
        }
        //special case all - match all after previous selections
        else if (value.match(/^all$/) || value.match(/,all/)) {
          var allFlag = true;
          
          value=this.getActiveFieldFromProp(this.props).opts.map( o => {
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
         console.log('selected model - disable opts?');
         console.log(this.state.options);
         var newOpts=this.state.options.map(function(obj){
           return obj['disabled']=true;
         });
         this.setState({options: newOpts});
        }
        
    }

    if (value === "" || typeof value === 'undefined') {
      console.log('SELECTED {}{}{}{}{}{}{}{}{}NULL{}{}{}{}{}{}{}{}');
      console.log('in settingFIeldSelection block SETTING REDUCER STATE TO', [] );
      console.log('this.state.multi', this.state.multi);
        this.setState({ value:''});

        if (activeIdx === 0){
         console.log('selected model - disable opts?');
         console.log(this.state.options);
         var newOpts=this.state.options.map(function(obj){
           return obj['disabled']=false;
         });
         this.setState({options: newOpts});
         

          
        }

        

      this.props.setFieldSelectionAndFetchData(activeIdx, []); 
    }

    // on remove dont set fields?   
    if (value !=="" && value !== null) {
      console.log('in settingFIeldSelection block SETTING REDUCER STATE TO ', [value]);
      this.props.setFieldSelectionAndFetchData(activeIdx, [value]); 
     
      /*if ((activeIdx!=7) && (value != null) && (this.getActiveFieldFromProp(this.props).metaMulti != true)) {
        this.props.setActiveField(activeIdx+1);
      } else 
      // bump if only 1 opts
      if ((value != null) && (this.getActiveFieldFromProp(this.props).opts.length===1)) {
        this.props.setActiveField(activeIdx+1);
      } else 
      // bump if All
      if ( allFlag === true) {
        this.props.setActiveField(activeIdx+1);
      }*/
    }
	},
  componentWillMount() {
    // console.log('CWM state', this.state);  
    // console.log('CWM props', this.props);  
  },
  componentWillReceiveProps (newProps) {
    // console.log('SELECT CWRP', newProps);
    var newPropLine = this.getActiveFieldFromProp(newProps);
    console.log('SELECT CWRP newPropLine', newPropLine);
    
    var oldPropLine = this.getActiveFieldFromProp(this.props);
    
    if (newPropLine.id !== 'Year') {    
      var sortedOpts= _.sortBy(newPropLine.opts, 'label');
    } else {
      var sortedOpts=newPropLine.opts;
    }

    if (typeof newPropLine.selected[0] !== 'undefined' && newPropLine.selected[0].match(',')){
      var selectedArr=newPropLine.selected[0].split(',');
      if(selectedArr.length > 0 && selectedArr.length === (sortedOpts.length -1)){
        console.log('remove all from opts');
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
     this.setFocus();
  },
	toggleDisabled (e) {
		this.setState({ disabled: e.target.checked });
	},
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
          onChange={this.handleSelectChange} 
          clearable={true}
          openAfterFocus={true}
          noResultsText={false}
          searchable={false}
          />
			</div>
		);
	}
});

@Radium export default class SearchListNav extends React.Component {
  constructor(props) {
    super(props);
    // const { searchFields, setActiveField } = props;
    //const clickField = id => event => setActiveField(id);      
    //console.log('PROPS', props);
    var theListSize = props.state.reducer.getIn(['searchFields']).size;
    // console.log('activeFObj', activeFieldObj);
    this.state = {
      showPreviousBtn: false,
      showNextBtn: false,
      compState: 0,
      navState: this.getNavStates(0, theListSize),
      init: true,
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
    

    //this.handleOnClick = this.handleOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.startOver = this.startOver.bind(this);
    this.getActiveFieldFromProp = this.getActiveFieldFromProp.bind(this);
    //this.getActiveSearchField = this.getActiveSearchField.bind(this);
  }
  getActiveFieldFromProp(theProps){
            var ret=null;
            theProps.state.reducer.getIn(['searchFields']).map(f => {
              if (f.get('isActive') === true ) {
                ret = f.toJS();
              }
             });
             return ret;
  }
  componentWillReceiveProps (newProps) {
    // console.log('------------------------------------------NAV CWRP', newProps);
    // this.setActiveField(newProps);
    // update opts
    
    // console.log(' selected length of 0 idx?', newProps.state.reducer.getIn(['searchFields', 0 , 'selected']).length);
    var isInit = (newProps.state.reducer.getIn(['searchFields', 0 , 'selected']).length === 0) ? true: false;
    console.log('isInit>>' , isInit);
    this.setState({ init: isInit});
    if(isInit) { 
      this.refs.multiSelect.clearDisabledOpts();
    }


    
    var newPropLine = this.getActiveFieldFromProp(newProps);
    //console.log('NAV CWRP newPropLine', newPropLine);
    
    var oldPropLine = this.getActiveFieldFromProp(this.props);
    // console.log('NAV CWRP oldPropLine', oldPropLine.idx);

    //move to new nav?
    if (newPropLine.idx != oldPropLine.idx) {
            console.log('new active field'); 
            this.setNavState(newPropLine.idx);
    }
    
    //console.log('NAV CWRPPPPPPPPPPPPPPPPPPPPPPPP--------> is anything selected?', typeof newPropLine.selected[0] !== 'undefined');       
    //console.log('NAV CWRPPPPPPPPPPPPPPPPPPPPPPPP--------> is anything selected?', newPropLine.selected);       
    if (typeof newPropLine.selected[0] !=='undefined') {
      //console.log('SHOW NEXT BTN');
      this.setState({ showNextBtn: true}); 
    } else {

      //console.log('HIDE NEXT BTN');
       this.setState({ showNextBtn: false}); 
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
   // console.log('in cNavSt', this.props.state.reducer.size);
    // if(currentStep > 0 && currentStep !== this.props.steps.length - 1){
   if(currentStep > 0 && currentStep !== this.props.state.reducer.getIn(['searchFields']).size - 1){
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
    // console.log('in setNavState i want to move to:', next);
    // console.log('in setNavState i want to move to:', this.props);
    var theListSize = this.props.state.reducer.getIn(['searchFields']).size;
    
     this.props.setActiveField(next); 
    
    this.setState({navState: this.getNavStates(next, theListSize)});
    if (next < theListSize) {
      this.setState({compState: next})
    }
    this.checkNavState(next);
    this.refs.multiSelect.setFocus();
  }

  handleKeyDown (evt) {
    if (evt.which === 13) {
      this.next()
    }
  }

  /*handleOnClick (evt) {
    console.log('in hClick', evt.currentTarget.value);
    if (evt.currentTarget.value === (this.props.state.reducer.size - 1) &&
      this.state.compState === (this.props.state.reducer.size - 1)) {
      this.setNavState(this.props.state.reducer.size)
    }
    else {
      this.setNavState(evt.currentTarget.value)
    }
  }*/

  next() {
    this.setNavState(this.state.compState + 1);
    this.refs.multiSelect.setFocus();
  }

  previous() {
    if (this.state.compState > 0) {
      console.log('REFS', this.refs);
      this.refs.multiSelect.handleSelectChange('');
      this.setNavState(this.state.compState - 1);
      this.refs.multiSelect.setFocus();
    }
  }
  
  startOver() {
   console.log(this.props);
      this.props.clearAll();
      this.setNavState(0);
      this.setState({ init: true});

      this.refs.multiSelect.clearDisabledOpts();
      this.refs.multiSelect.setState({ value: ''});
      this.refs.multiSelect.setFocus();

  }

  getClassName(className, i){
    return className + "-" + this.state.navState.styles[i];
  }

  renderSteps() {
      return this.props.state.reducer.getIn(['searchFields']).map (f => (
      /* <li className={this.getClassName("progtrckr", f.get('idx'))} onClick={this.handleOnClick} key={f.get('idx')} value={f.get('id')}> */
      <li className={this.getClassName("progtrckr", f.get('idx'))} key={f.get('idx')} value={f.get('id')}>
        <em>{f.get('idx')+1}</em>
        <span>{f.get('navLabel')}</span>
      </li>           
    ))  
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
      </div>
    );
  }
}

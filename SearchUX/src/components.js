import React from 'react';
import sortBy from 'lodash'; 
import './css/skeleton.css';
import './css/prog-tracker.css';
import './css/custom.css';
import './css/normalize.css';
import Select from 'react-select';

import './css/react-select.css';

var MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	/*propTypes: {
		label: React.PropTypes.string,
		activeField: React.PropTypes.object,
	},*/

	getInitialState () {
    console.log(' in gIS MSF:', this.props.state.reducer.getIn(['searchFields', 0, 'id']));
		return {
      multi: false,
			disabled: false,
			options: this.props.state.reducer.getIn(['searchFields', 0, 'opts']),
			value: null,
      placeholder: "Select " + this.props.state.reducer.getIn(['searchFields',0, 'id']),
		};
	},/*
  setActiveField : function setActiveField(){
    console.log('in setActiveField', newProps);
      props.state.reducer.map(f => {
             // console.log('f.isActive', f.get('isActive'));
             // console.log(f);
            if (f.get('isActive') === true ) {
              // console.log('setting active field=', f.get('id'));  
              this.setState({ options: f.opts })
            }      
        });
  },*/
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
  //todo: glom all selected values
  getSelected : function getSelected(){
    
    console.log('in selected', this.props.state.reducer.getIn(['searchFields']));
    var selected=[]; 
    this.props.state.reducer.getIn(['searchFields']).map(f => {
      
              var thisSegment={};
              //multi
              console.log(f.get('id') + ' selected lenght ', f.get('selected'));
              if (f.get('selected').length > 1 ) {
                
                selected.concat(f.get('selected'));

              } else if (f.get('selected').length>0){
                
                selected.concat(f.get('selected'));

              }
    });

    return selected;    
    
  },
 	handleSelectChange : function handleSelectChange(value) {
    console.log('THIS PROPS', this.props);
		console.log('You\'ve selected:', value);
    var activeIdx=this.getActiveFieldFromProp(this.props).idx;
    console.log('trying to set field idx', activeIdx);
      console.log('typeof selection', typeof value);

        if (value === null) {
          this.setState({ value }); 
        }
              //special case all
        else if (value === 'all') {
          console.log('ALL -- setting value to', this.getActiveFieldFromProp(this.props).opts);
          value=this.getActiveFieldFromProp(this.props).opts.map( o => {
          if (o.label !== 'all') {
            return o.label; 
        }
      }).join(',');
        this.setState({ value }); 
    }
    else {
        this.setState({ value }); 
    }
     
    // on remove dont set fields?   
    if (value !=="" && value !== null) {
      console.log('in settingFIeldSelection block');
      this.props.setFieldSelection(activeIdx, [value]); 
    
		// this.setState({ value:value });
    //todo: do we care? cant i just send the value out?
    // var selected = this.getSelected(); 
    // console.log('selected= ', selected);
    
    //dont fetch on last field
    if (activeIdx < (this.props.state.reducer.getIn(['searchFields']).size-1)){ 
      console.log('fetching next field vals...');
      var selectQueryKey = this.props.state.reducer.getIn(['searchFields',activeIdx,'id']);
      var selectQueryObj = {};
      selectQueryObj[selectQueryKey] =  value ;
      console.log(' im looking for a distinct: ',  this.props.state.reducer.getIn(['searchFields',activeIdx+1,'id']));
      console.log(' my query=  ',  selectQueryObj);
      this.props.fetchFields(this.props.state.reducer.getIn(['searchFields',activeIdx+1, 'id']), selectQueryObj);      

    }
    console.log('is multi?', this.getActiveFieldFromProp(this.props).multi);
    //todo check for last field?
    console.log('is != nul', value != null);
    console.log('is single opt?', this.getActiveFieldFromProp(this.props).opts.length===1);

    if ((value != null) && (this.getActiveFieldFromProp(this.props).multi != true)) {
      this.props.setActiveField(activeIdx+1);
      //next nav state
      //todo: check for end
    }
    // bump if only 1 opts
    if ((value != null) && (this.getActiveFieldFromProp(this.props).opts.length===1)) {
      this.props.setActiveField(activeIdx+1);
    }
    
    
    }//end block dont do on remove
    //if this is not a multi then move to next nav
	},
  componentWillMount() {
    // console.log('CWM state', this.state);  
    // console.log('CWM props', this.props);  
  },
  componentWillReceiveProps (newProps) {
    console.log('SELECT CWRP', newProps);
    // this.setActiveField(newProps);
    // update opts
    var newPropLine = this.getActiveFieldFromProp(newProps);
    console.log('SELECT CWRP newPropLine', newPropLine);
    
    var oldPropLine = this.getActiveFieldFromProp(this.props);
    console.log('SELECT CWRP oldPropLine', oldPropLine);
    
    var sortedOpts= _.sortBy(newPropLine.opts, 'label');
    this.setState({ options: sortedOpts});

    console.log(newPropLine);

    if (newPropLine.opts.length>1 && newPropLine.multi===true){
      console.log('setting multi to TRUE');
      this.setState({ multi:true});
    }
    else {
      this.setState({ multi:false});
    }
    //move to new nav?
    if (newPropLine.idx != oldPropLine.idx){
      //   console.log('wants a new nav');
        this.state.placeholder="Select " + newPropLine.id; 
    }

    console.log('Does this guy have a selection? ',newPropLine.selected.length);

    if (newPropLine.selected.length>0){

      console.log('this.state.multi ===', this.state.multi);
      console.log('in setting the select value to', newPropLine.selected[0]);
      console.log('props.val=',this.props);
        if (this.state.multi === true) {
          var mySelected=newPropLine.selected;
          console.log('typeof opts?', typeof this.props.state.reducer.getIn(['searchFields',newPropLine.idx, 'opts'])[0].value);
          console.log('opts[0]?', this.props.state.reducer.getIn(['searchFields',newPropLine.idx, 'opts'])[0]);

          console.log('trying to set to', mySelected[0]);
          console.log('typeof myselect',typeof mySelected[0]);
          this.setState({mySelected});
       }
        else{

         this.setState({value:newPropLine.selected[0]});
        } 
    }
        
  },
	toggleDisabled (e) {
		this.setState({ disabled: e.target.checked });
	},
  /*
	toggleChocolate (e) {
		let crazy = e.target.checked;
		this.setState({
			crazy: crazy,
			options: crazy ? WHY_WOULD_YOU : FLAVOURS,
		});
	},*/
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{(this.state.multi) ? "select one or more" : "select one"}</h3>
				<Select simpleValue
          multi={this.state.multi} 
          disabled={this.state.disabled} 
          value={this.state.value}
          placeholder={this.state.placeholder}
          options={this.state.options}
          onChange={this.handleSelectChange} 
          clearable={true}
          />
			</div>
		);
	}
});

export default class SearchListNav extends React.Component {
  constructor(props) {
    super(props);
    // const { searchFields, setActiveField } = props;
    //const clickField = id => event => setActiveField(id);      
    console.log('PROPS', props);
    var theListSize = props.state.reducer.getIn(['searchFields']).size;
    // console.log('activeFObj', activeFieldObj);
    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      compState: 0,
      navState: this.getNavStates(0, theListSize)
    };
    this.hidden = {
      display: 'none'
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
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
    console.log('NAV CWRP', newProps);
    // this.setActiveField(newProps);
    // update opts
    var newPropLine = this.getActiveFieldFromProp(newProps);
    // console.log('NAV CWRP newPropLine', newPropLine.idx);
    
    var oldPropLine = this.getActiveFieldFromProp(this.props);
    // console.log('NAV CWRP oldPropLine', oldPropLine.idx);
    this.setState({ options: newPropLine.opts});
    //move to new nav?
    if (newPropLine.idx != oldPropLine.idx) {
            console.log('new active field'); 
            this.setNavState(newPropLine.idx);
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
        showNextBtn: true
      })
    }
    else if(currentStep === 0) {
      this.setState({
        showPreviousBtn: false,
        showNextBtn: true
      })
    }
    else {
      this.setState({
        showPreviousBtn: true,
        showNextBtn: false
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
  }

  handleKeyDown (evt) {
    if (evt.which === 13) {
      this.next()
    }
  }

  handleOnClick (evt) {
    console.log('in hClick', evt.currentTarget.value);
    if (evt.currentTarget.value === (this.props.state.reducer.size - 1) &&
      this.state.compState === (this.props.state.reducer.size - 1)) {
      this.setNavState(this.props.state.reducer.size)
    }
    else {
      this.setNavState(evt.currentTarget.value)
    }
  }

  next() {
    this.setNavState(this.state.compState + 1)
  }

  previous() {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1)
    }
  }

  getClassName(className, i){
    // console.log('getCName', i);
   // console.log(className + "-" + this.state.navState.styles[i]);
    return className + "-" + this.state.navState.styles[i];
  }

  renderSteps() {
      // console.log('in renderSteps');
      // console.log('in renderSteps', this.props);
      return this.props.state.reducer.getIn(['searchFields']).map (f => (
      /* <li className={this.getClassName("progtrckr", f.get('idx'))} onClick={this.handleOnClick} key={f.get('idx')} value={f.get('id')}> */
      <li className={this.getClassName("progtrckr", f.get('idx'))} onClick={this.handleOnClick} key={f.get('idx')} value={f.get('id')}>
        <em>{f.get('idx')+1}</em>
        <span>{f.get('id')}</span>
      </li>           
    ))  
      /*
    return this.props.steps.map((s, i)=> (
      <li className={this.getClassName("progtrckr", i)} onClick={this.handleOnClick} key={i} value={i}>
        <em>{i+1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ));*/
  }

  render() {
      return (
        <div className="container" onKeyDown={this.handleKeyDown}>
          <ol className="progtrckr">
            {this.renderSteps()}
          </ol>
          {/* render component via var name? */}
          {/* this.props.steps[this.state.compState].component */}
          {/* this.state.compState */} 
            <div className="row">
              <div className="six columns">
                <MultiSelectField {...this.props} />
                  {/* <div style={this.props.showNavigation ? {} : this.hidden}> */}
                  <div>
                    <button style={this.state.showPreviousBtn ? {} : this.hidden}
                            className="multistep__btn--prev"
                            onClick={this.previous}>Previous</button>

                    <button style={this.state.showNextBtn ? {} : this.hidden}
                            className="multistep__btn--next"
                            onClick={this.next}>Next</button>
                  </div>
              </div>
            </div>
      </div>
    );
  }
}

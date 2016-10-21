import React from 'react';
import './css/skeleton.css';
import './css/prog-tracker.css';
import './css/custom.css';
import './css/normalize.css';
import Select from 'react-select';

import './css/react-select.css';

var MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: React.PropTypes.string,
		activeField: React.PropTypes.object,
	},

	getInitialState () {
    console.log(' in gIS MSF:', this.props);
		return {
			disabled: false,
			options: this.props.activeField.opts,
			value: null,
      placeholder: "Select " + this.props.activeField.id
		};
	},
  setActiveField : function setActiveField(){
    console.log('in setActiveField', newProps);
      props.state.reducer.map(f => {
             console.log('f.isActive', f.get('isActive'));
             console.log(f);
            if (f.get('isActive') === true ) {
              console.log('setting active field=', f.get('id'));  
              this.setState({ options: f.opts })
            }      
        });
  },
  getActiveFieldFromProp : function getActiveFieldFromProp(theProps){
            var ret=null;
            theProps.state.fieldList.map(f => {
              if (f.get('isActive') === true ) {
                ret = f.toJS();
              }
             });
            return ret;
  },
  //todo: glom all selected values
  getSelected : function getSelected(){
    
    
    
  },
 	handleSelectChange : function handleSelectChange(value) {
		console.log('You\'ve selected:', value);
    var foo=this.getActiveFieldFromProp(this.props);
    console.log('foo',foo);
    var activeIdx=this.getActiveFieldFromProp(this.props).idx;
    console.log('trying to set ', activeIdx);
    this.props.setFieldSelection(activeIdx, [value]); 
		this.setState({ value });
    //maybe a thunk?
    console.log('is multi?', this.getActiveFieldFromProp(this.props).multi != true);
    //todo check for last field?
    console.log('is == nul', value != null);
    if ((value != null) && (this.getActiveFieldFromProp(this.props).multi != true)) {
      this.props.setActiveField(activeIdx+1);
      //next nav state
      //todo: check for end
    }    
    //if this is not a multi then move to next nav
	},
  componentWillMount() {
    console.log('CWM state', this.state);  
    console.log('CWM props', this.props);  
  },
  componentWillReceiveProps (newProps) {
    console.log('CWRP', newProps);
    // this.setActiveField(newProps);
    // update opts
    var newPropLine = this.getActiveFieldFromProp(newProps);
    console.log('CWRP newPropLine', newPropLine);
    
    var oldPropLine = this.getActiveFieldFromProp(this.props);
    console.log('CWRP oldPropLine', oldPropLine);
    this.setState({ options: newPropLine.opts});
    //move to new nav?
    if (newPropLine.idx != oldPropLine.idx){
        console.log('wants a new nav');
        this.state.placeholder="Select " + newPropLine.id; 
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
				<h3 className="section-heading">{this.props.label}</h3>
				<Select simpleValue 
          disabled={this.state.disabled} 
          value={this.state.value}
          placeholder={this.state.placeholder}
          options={this.state.options}
          onChange={this.handleSelectChange} />
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
    var theListSize = props.state.fieldList.size;
    var activeFieldObj = null;
    props.state.fieldList.map(f => {
        // console.log('f.isActive', f.get('isActive'));
        // console.log(f);
        if (f.get('isActive') === true ) {
          // console.log('active field?', f.get('id'));  
          activeFieldObj=f.toJS();
        }      
    });

     // console.log('activeFObj', activeFieldObj);
    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      compState: 0,
      navState: this.getNavStates(0, theListSize),
      activeSearchField: activeFieldObj,
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
            theProps.state.fieldList.map(f => {
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
    console.log('NAV CWRP newPropLine', newPropLine.idx);
    
    var oldPropLine = this.getActiveFieldFromProp(this.props);
    console.log('NAV CWRP oldPropLine', oldPropLine.idx);
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
    if(currentStep > 0 && currentStep !== this.props.state.fieldList.size - 1){
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
    console.log('in setNavState i want to move to:', next);
    console.log('in setNavState i want to move to:', this.props);
    var theListSize=this.props.state.fieldList.size;
    
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
      console.log('in renderSteps', this.props);
      return this.props.state.fieldList.map (f => (
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
                <MultiSelectField {...this.props} activeField={this.state.activeSearchField} />
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

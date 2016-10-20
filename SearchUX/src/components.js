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
  setActiveField : function setActiveField(newProps){
    console.log('in setActiveField', newProps);
      newProps.state.reducer.map(f => {
             console.log('f.isActive', f.get('isActive'));
             console.log(f);
            if (f.get('isActive') === true ) {
              console.log('setting active field=', f.get('id'));  
              this.setState({ options: f.opts })
            }      
        });
  },
  getActiveField : function getActiveField(){
        var ret=null;
        this.props.state.reducer.map(f => {
          console.log('getActiveField', f.get('idx'));
          console.log('getActiveField', f.get('isActive') === true);
         if (f.get('isActive') === true ) {
           console.log('is true', f.get('idx'));
           ret = f.get('idx');
         }
        });
        return ret;
  },
 	handleSelectChange : function handleSelectChange(value) {
		console.log('You\'ve selected:', value);
    var activeIdx=this.getActiveField();
    console.log('trying to set ', activeIdx);
    this.props.setFieldSelection(activeIdx, [value]); 
		this.setState({ value });
	},
  componentWillMount() {
    console.log('CWM state', this.state);  
    console.log('CWM props', this.props);  
  },
  componentWillReceiveProps: function(newProps){
    console.log('CWRP', newProps);
    this.setActiveField(newProps);
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
    console.log(props.state.reducer);
    var theListSize = props.state.reducer.size;
    var activeFieldObj = null;
    props.state.reducer.map(f => {
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
    //this.getActiveSearchField = this.getActiveSearchField.bind(this);
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
    if(currentStep > 0 && currentStep !== this.props.state.reducer.size - 1){
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
    var theListSize=this.props.state.reducer.size;
    
    this.props.setActiveField(2); 
    
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
      return this.props.state.reducer.map (f => (
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

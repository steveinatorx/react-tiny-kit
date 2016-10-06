import React, { Component } from 'react';
import './css/skeleton.css';
import './css/prog-tracker.css';
import './css/custom.css';
import './css/normalize.css';

  export default class SearchListNav extends Component {
  constructor (props) {
    super(props);
    const { searchFields, setActiveField } = props;
    //const clickField = id => event => setActiveField(id);

    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      compState: 0,
      navState: this.getNavStates(0, { searchFields }.length),
    };
    this.hidden = {
      display: 'none'
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
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
    if(currentStep > 0 && currentStep !== {searchFields}.length - 1){
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
    this.setState({navState: this.getNavStates(next, this.props.steps.length)})
    if (next < this.props.steps.length) {
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
    if (evt.currentTarget.value === (this.props.steps.length - 1) &&
      this.state.compState === (this.props.steps.length - 1)) {
      this.setNavState(this.props.steps.length)
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
    return className + "-" + this.state.navState.styles[i];
  }

  renderSteps() {
    { searchFields.map (f => (
      <li className={this.getClassName("progtrckr", f.get('idx'))} onClick={this.handleOnClick} key={f.get('idx')} value={i}>
        <em>{f.get('idx')+1}</em>
        <span>{f.get('id')}</span>
      </li>           
    ))}  
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
        component (put these in an array so they have access to props)
        <p></p>
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
    );
  }
}

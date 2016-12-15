import React from 'react';
import Formsy from 'formsy-react';

export const MyInput = React.createClass({
    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
      this.setValue(event.currentTarget.value);
    },
  render() {
    const errorMessage = this.getErrorMessage();
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.title}</label>
          <input
            type={this.props.type || 'text'}
            name={this.props.name}
            title={this.props.title}
            placeholder={this.props.placeholder}
            onChange={this.changeValue}
            value={this.getValue()}
            className="searchSubmit"
          />
          <span className='validation-error'>{errorMessage}</span>
      </div>
     );
    }
  });

 export const MyCheck = React.createClass({
    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
      console.log('change val', event.currentTarget.value);
        let target = event.currentTarget;
        this.setValue(target.checked);
        //this.props.onChange(this.props.name, target.checked);
    },
  render() {
    const errorMessage = this.getErrorMessage();
    return (
      <div>
        <label className="checkLabel" htmlFor={this.props.name}>
          <input
            type="checkbox"
            name={this.props.name}
            title={this.props.title}
            checked={this.getValue() === true}
            onChange={this.changeValue}
            className="formCheck"
          />
          {this.props.title}</label>

      </div>
     );
    }
  });
  
import React from 'react';

export class EmailTrackerComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log('hello');
  }
  componentWillReceiveProps (newProps) {
    console.log('CWRP new props', newProps);
   // console.log('CWRP res count', typeof newProps.state.get('resultsCount'));
  }
  render() {

    let logoURL = require("../images/logo-1.png");

    return (
      <img src={logoURL} />
    );
  }
}
import React from 'react';

export class EmailTrackerComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps (newProps) {
    console.log('CWRP new props', newProps);
   // console.log('CWRP res count', typeof newProps.state.get('resultsCount'));
  }
  render() {
    return (
      <img src="./images/logo-1.png" />
    );
  }
}
import * as React from 'react';

export default class SignUpBaseStep extends React.Component {
  getInitialStepState = () => {
    return {
      checkedStep: false
    };
  }

  validateStep = () => {
    this.setState({
      checkedStep: true
    });
    this.props.onChangeCheckedStep(true);
  }
}

import * as React from 'react';

export default class SignUpBaseStep extends React.Component {
  validateStep = () => {
    this.props.onChangeCheckedStep(true);
  }

  uncheckStep = () => {
    this.props.onChangeCheckedStep(false);
  }
}

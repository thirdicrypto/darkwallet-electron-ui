import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class AppMessage extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
  }

  render() {
    return (
      <li className={"appMessage appMessage-" + this.props.message.type}>{this.props.message.text}</li>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class AppMessage extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    deleteAppMessage: PropTypes.func.isRequired,
  }

  handleClick = () => {
    this.props.deleteAppMessage(this.props.message.name);
  }

  render() {
    return (
      <li onClick={this.handleClick} className={"appMessage appMessage-" + this.props.message.type}>{this.props.message.text}</li>
    );
  }
}

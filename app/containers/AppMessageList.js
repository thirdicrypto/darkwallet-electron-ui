import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppMessage from '../components/AppMessage';

export default class AppMessageList extends Component {
  static propTypes = {
    appMessages: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="appMessageList">
        {this.props.appMessages.map((message, i) => {
          return <AppMessage message={message} key={i}/>
        })}
      </ul>
    );
  }
}


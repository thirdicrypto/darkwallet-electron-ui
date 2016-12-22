import React, { Component } from 'react';
import { Link } from 'react-router';
import SendForm from '../components/SendForm';

export default class SendPage extends Component {
  render() {
    return (
      <div className="scroller off-canvas-wrap ">
        <div className="inner-wrap">
          <SendForm />
        </div>
      </div>
    );
  }
}

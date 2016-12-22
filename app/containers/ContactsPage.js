import React, { Component } from 'react';
import { Link } from 'react-router';
import ContactsList from '../components/ContactsList';

export default class SendPage extends Component {
  render() {
    return (
      <div className="scroller off-canvas-wrap">
        <div className="inner-wrap">
          <ContactsList />
        </div>
      </div>
    );
  }
}

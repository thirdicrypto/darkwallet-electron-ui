import React, { Component } from 'react';
import { Link } from 'react-router';
import IdentityList from './IdentityList';

export default class IdentityPage extends Component {
  render() {
    return (
      <div className="scroller off-canvas-wrap identityPage">
        <div className="inner-wrap">
          <IdentityList />
        </div>
      </div>
    );
  }
}

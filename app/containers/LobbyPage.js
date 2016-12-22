import React, { Component } from 'react';
import { Link } from 'react-router';
import ChannelList from '../components/ChannelList';
import Channel from '../components/Channel';
import Peers from '../components/Peers';

export default class SendPage extends Component {
  render() {
    return (
      <div className="scroller off-canvas-wrap">
        <div className="lobbyback">
          <div className="row">
            <ChannelList />
            <Channel />
            <Peers />
          </div>
        </div>
      </div>
    );
  }
}

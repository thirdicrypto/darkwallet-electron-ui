import React, { Component } from 'react';

export default class ChannelList extends Component {
  render() {
    return (
        <div className="medium-2 columns panel">
          <h4>Channels</h4>
          <div>
            <select className="select-list" size="10">
            </select>
          </div>
          <form>
            <label>
              <input type="password" className="password" value="" placeholder="Enter channel name" />
            </label>
            <button className="button small radius expand">
              Join
            </button>
          </form>
            <button className="button small radius expand alert">
              Leave
            </button>
          <h4>Requests</h4>
          <div>
            <select className="select-list" size="10">
            </select>
          </div>
      </div>
    );
  }
}

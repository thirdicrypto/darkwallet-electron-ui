import React, { Component } from 'react';

export default class Peers extends Component {
  render() {
    return (
        <div className="medium-3 columns">
          <div>
            <h5>Channel</h5>
            <span className="label">5a61aaab</span>
            <a title="Send beacons to unmask yourself to contacts" className="fa fa-magnet"></a>
          </div>
          <h5>Your permanent identity</h5>
          <div className="wrapper"><img className="identicon" /> girlfriend figure relationship gasp</div>
          <h5 title="Your temporary identity">Cloak
            <a className="fa fa-refresh" title="Change cloak"></a>
          </h5>
          <div className="row">
            <div className="small-12 columns">
              <img className="identicon" /> cry rhythm self regret
            </div>
          </div>
          <h5>Peers</h5>
            <div>
              <span><img className="identicon" /> cease empty window uncle</span>
              <a className="fa fa-link" title="Send identity information for long term pairing"></a>
              <a className="fa fa-comment-o" title="Open a private chat with this peer"></a>
            </div>
            <div>
            <a className="fa fa-link" title="Send identity information for long term pairing"></a>
            <span><img className="identicon" /> bump excuse left pack</span>
            <a className="fa fa-comment-o" title="Open a private chat with this peer"></a>
          </div>
        </div>
    );
  }
}

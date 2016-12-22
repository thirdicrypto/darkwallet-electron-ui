import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SendForm extends Component {
  render() {
    return(
      <form className="send">
        <div className="row">
          <div className="small-12 columns">
            <h3>Send</h3>
          </div>
        </div>
        <div className="row">
          <div className="small-12 columns">
            <div className="row collapse">
              <div className="large-10 medium-9 columns">
                <h6>Description</h6>
                <input type="text" className="prefix radius" placeholder="Enter a short description for this transaction here." />
              </div>
              <div className="large-2 medium-3 columns">
                <h6>Sending from</h6>
                <a href="" className="fa button postfix radius fa-chevron-circle-down">Account Name</a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="small-12 columns">
            <div className="row collapse">
              <div className="small-2 columns">
                <input className="prefix radius" placeholder="Enter amount" />
                <input className="prefix radius" placeholder="Enter amount" />
              </div>

              <div className="small-1 columns">
                <a className="button postfix">BTC</a>
              </div>

              <div className="small-1 columns">
                <span className="postfix">to</span>
              </div>

              <div className="small-8 columns">
                <input type="text" className="address-buttons" placeholder="Enter a bitcoin address here or use the buttons on the right." />
                <span className="postfix" title="">
                   Identity Icon
                </span>
                <span className="input-status fa fa-check"></span>
                <a href="" className="fa button square righted fa-qrcode"><i className="icon-qrcode"></i></a>
                <a href="" className="fa button square righted fa-users"><i className="icon-contacts"></i></a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="medium-10 columns">
            <a className="button small radius fa fa-eye"> Show advanced options</a>
          </div>
          <div className="medium-2 columns aright">
            <button id="send-button" href="" className="button radius expand" disabled="disabled"><span>Send</span><span>Sending</span><span >Sent</span><div id="send-progress" className="progbar"></div></button>
          </div>
        </div>

        <div className="row">
        </div>
        <ul id="wallets" className="f-dropdown">
          <li className="colorhead"><h6>My pockets</h6></li>
          <li><a>spending</a></li>
          <li><a>business</a></li>
          <li><a>savings</a></li>
          <li><a>Any</a></li>
          <li className="colorhead"><h6>Multisig funds</h6></li>
        </ul>
      </form>
    )
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SendForm extends Component {
  render() {
    return (
      <div>
        <div className="scroller">
          <div className="row">
            <div className="small-6 columns">
              <h3 >Contacts</h3>
            </div>
            <div className="small-6 columns text-right">
              <a id="newcontact" className="button tiny radius fa fa-plus topright"> New contact</a>
            </div>
          </div>
          <div className="row">
            <div className="small-12 columns">
                <form name="searchForm" >
                  <input id="contact-search" type="text" placeholder="Search..." className="radius" />
                </form>
            </div>
          </div>
          <form name="createContactForm">
            <div className="row">
              <div className="small-12 columns">
                <div className="row collapse hide-for-small">
                  <div className="medium-2 columns">
                    <label>Name</label>
                  </div>
                  <div className="medium-10 columns">
                    <label>Address</label>
                  </div>
                </div>
                <div className="row collapse">
                  <div className="medium-2 columns">
                  <input id="new-contact-name" type="text" className="radius prefix" placeholder="Name for this contact..." required="" />
                </div>
                  <div className="medium-6 columns">
                    <input className="prefix" type="text" placeholder="Bitcoin address..." required="" />
                    <span className="input-status fa fa-check"></span>
                  </div>
                  <div className="small-6 medium-2 columns"><a href="" className="button postfix fa fa-clipboard">Paste</a></div>
                  <div className="small-6 medium-2 columns"><a href="" className="button radius postfix fa fa-qrcode">Scan QR</a></div>
                </div>
              </div>
            </div>
            <div className="row text-right">
              <div className="small-12 columns">
                <a href="" className="button alert small radius">Cancel</a>
                <input type="submit" className="button small radius" value="Save" disabled="disabled" />
              </div>
            </div>
          </form>

          <div className="row">
            <div className="small-12 columns">
              <div className="contact-mosaic-full">
                <ul className="contacts large-block-grid-5 medium-block-grid-3 small-block-grid-2">
                  <li>
                    <div className="contact-mosaic-square">
                      <img className="identicon" />

                      <div className="contact-label"> <i className="icon-bitcoin"></i> DarkWallet team <span className="label radius" >online</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="contact-mosaic-square">
                      <img className="identicon" />
                      <div className="contact-label"> <i className="icon-bitcoin"></i> libbitcoin team <span className="label radius">online</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

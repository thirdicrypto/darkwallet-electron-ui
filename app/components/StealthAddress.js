import React, { Component } from 'react';

export default class StealthAddress extends Component {
  render() {
    return (

<div className="panel radius">
  <div className="row collapse">
  <h5>Stealth address</h5>
  <div className="small-1 columns text-center">
    Icon
  </div>
    <div className="small-9 columns">
      <input type="text" className="prefix radius nomarginbottom" />
    </div>
    <div className="small-1 columns">
      <a href="" className="button prefix square icon-copy"></a>
    </div>
    <div className="small-1 columns">
      <a className="button postfix square radius icon-qrcode" ></a>
    </div>
  </div>
</div>

  )}
}

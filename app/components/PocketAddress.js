import React, { Component, PropTypes } from 'react';

export default class PocketAddresses extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
  }

  render() {
    return (
<div className="row collapse address-row ">
  <div className="small-2 columns ellipsis">
    <a className="button square lefted"><i className="icon-chevron-circle-down"></i></a>
    <span className="address-label editable" >
    </span>
  </div>

  <div className="small-8 columns ellipsis">
    {this.props.address}
  </div>
</div>
    );
  }
}

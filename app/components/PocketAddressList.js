import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PocketAddress from './PocketAddress';

class PocketAddressList extends Component {
  static propTypes = {
    addresses: PropTypes.array.isRequired,
  }

	render() {
		return (
<div className="large-6 columns">
  <div className="panel radius">
    <dl className="sub-nav">
      <dt>Filter:</dt>
      <dd className="active"><a>Unused</a></dd>
      <dd><a>Labelled</a></dd>
      <dd><a>Top</a></dd>
      <dd><a>All</a></dd>
    </dl>
    <ul id="address-actions" className="f-dropdown" >
      <li>
        <a className="fa fa-qrcode"> Show QR code</a>
      </li>
      <li>
        <a className="fa fa-pencil-square"> Edit name</a>
      </li>
      <li>
        <a className="fa fa-clipboard"> Copy address</a>
      </li>
      <li>
        <a className="fa fa-key"> Copy public key</a>
      </li>
    </ul>
    {this.props.addresses.map((address, i) => {
      return <PocketAddress key={i} address={address} />
    })}
    <div className="text-right topmargin">
      <a className="button small radius nomarginbottom fa fa-plus" > New address</a>
    </div>
  </div>
</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    addresses: state.addresses.addresses,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketAddressList);

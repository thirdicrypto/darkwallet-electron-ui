import React, { Component, PropTypes } from 'react';
import Balance from './Balance';

export default class PendingPaymentsItem extends Component {
  static propTypes = {
    createdDate: PropTypes.string.isRequired,
    destinations: PropTypes.array.isRequired,
    fee: PropTypes.number.isRequired,
    hash: PropTypes.string,
    totalAmount: PropTypes.number.isRequired,
  }

  render() {
    return (
<div className="row collapse address-row payment-row">
  <div className="small-4 ellipsis columns">
    {this.props.hash}
  </div>
  <div className="small-2 columns ellipsis text-right">
    {this.props.createdDate}
  </div>
  <div className="small-4 columns ellipsis text-right">
    <Balance balance={this.props.totalAmount} />
  </div>
  <div className="small-2 columns ellipsis text-right">
    <Balance balance={this.props.fee} />
  </div>
</div>
    );
  }
}

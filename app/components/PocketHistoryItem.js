import React, { Component, PropTypes } from 'react';
import Balance from './Balance';

export default class PocketHistoryItem extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    output: PropTypes.object.isRequired,
  }

  render() {
    return (
<div className="row collapse address-row ">
  <div className="small-1 columns ellipsis">
    <a className="button square lefted"><i className="icon-chevron-circle-down"></i></a>
    <span className="address-label editable" >
    </span>
  </div>

  <div className="small-8 columns ellipsis">
    {this.props.address}
  </div>
  <div className="small-3 columns text-right">
     <Balance balance={this.props.value} />
  </div>
</div>
    );
  }
}

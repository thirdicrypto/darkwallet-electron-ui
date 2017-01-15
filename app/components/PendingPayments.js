import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PendingPaymentsItem from './PendingPaymentsItem';


class PendingPayments extends Component {

  static propTypes = {
    pendingPayments: PropTypes.array.isRequired,
  }

	render() {

    if(this.props.pendingPayments.length <= 0 || !Array.isArray(this.props.pendingPayments)) {
      return (
<div className="pendingPayments panel radius off-canvas-wrap">
  <div className="emptyComponentMessage">
    <h2> No pending payments for this pocket </h2>
  </div>
</div>
      )
    }

		return (
<div className="panel radius pendingPayments">
  <div className="row collapse pendingHeader">
    <div className="small-4 columns">
      Pending Payments
    </div>
    <div className="small-2 columns ellipsis text-right">
      Date
    </div>
    <div className="small-4 columns ellipsis text-right">
      Amount
    </div>
    <div className="small-2 columns ellipsis text-right">
      Fee
    </div>
  </div>
	<div className="tab-scroller" >
    {this.props.pendingPayments.map((item, i) => {
      let totalAmount = 0;
      for(let i in item.destinations) {
        totalAmount += item.destinations[i][1];
      }
      return <PendingPaymentsItem key={i} createdDate={item.created_date} totalAmount={totalAmount} destinations={item.destinations} fee={item.fee} hash={item.tx_hash} />
    })}
  </div>
</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    pendingPayments: state.pendingPayments.pendingPayments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingPayments);

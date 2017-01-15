import React, { Component } from 'react';
import SendFormSimple from './SendFormSimple';
import StealthAddress from './StealthAddress';
import PendingPayments from './PendingPayments';

export default class PocketOverview extends Component {
	render() {
		return (
<div className="columns">
  <SendFormSimple />
	<PendingPayments />
  <StealthAddress />
</div>
  );
	}
}

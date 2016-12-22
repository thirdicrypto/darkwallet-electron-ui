import React, { Component } from 'react';
import SendFormSimple from './SendFormSimple';
import StealthAddress from './StealthAddress';

export default class PocketOverview extends Component {
	render() {
		return (
<div className="large-6 columns">
  <SendFormSimple />

  <StealthAddress />
</div>
  );
	}
}

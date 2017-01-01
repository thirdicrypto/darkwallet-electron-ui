import React, { Component } from 'react';
import SendFormSimple from './SendFormSimple';
import StealthAddress from './StealthAddress';

export default class PocketOverview extends Component {
	render() {
		return (
<div className="columns">
  <SendFormSimple />

  <StealthAddress />
</div>
  );
	}
}

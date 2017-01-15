import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PocketHistoryItem from './PocketHistoryItem';


class PocketHistory extends Component {

  static propTypes = {
    history: PropTypes.array.isRequired,
  }

	render() {

    if(this.props.history.length <= 0) {
      return (
<div className="scroller off-canvas-wrap">
  <div className="emptyComponentMessage">
    <h2> No history for this pocket </h2>
  </div>
</div>
      )
    }

		return (
<div className="large-12 columns">
  <div className="panel radius">
		<div className="tab-scroller" >
      {this.props.history.map((item, i) => {
        return <PocketHistoryItem key={i} address={item.addr} value={item.value} spend={item.spend} type={item.type} output={item.output} />
      })}
    </div>
  </div>
</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    history: state.history.history,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketHistory);

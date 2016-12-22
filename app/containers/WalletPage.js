import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import PocketList from '../components/PocketList';
import Balance from '../components/Balance';

class WalletPage extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    pockets: PropTypes.array.isRequired,
    currentBalance: PropTypes.number.isRequired,
    currentIdentity: PropTypes.string,
  }

	render() {
    if(this.props.currentIdentity == null) {
      return (
<div className="scroller off-canvas-wrap">
  <div className="emptyComponentMessage">
    <h2> Please log in or create an identity </h2>
  </div>
</div>
      )
    }

		return (

<div className="scroller off-canvas-wrap">
	<div className="inner-wrap pinned">
		<nav className="tab-bar">
      <h1 className="title lin">All Pockets</h1>
      <div className="lin"> <Balance balance={this.props.currentBalance} /> </div>
		</nav>
		<aside className="left-off-canvas-menu" >
      <PocketList pockets={this.props.pockets} />
    </aside>
    <section className="main-section">
      {this.props.children}
    </section>
	</div>
</div>

		);
	}
}


function mapStateToProps(state) {
  return {
    pockets: state.pockets.pockets,
    currentBalance: state.identities.currentBalance,
    currentIdentity: state.identities.currentIdentity,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletPage);

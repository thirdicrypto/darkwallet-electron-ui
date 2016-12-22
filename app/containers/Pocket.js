import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { handleSetCurrentPocket } from '../actions/pockets';
import Balance from '../components/Balance';

class Pocket extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    handleSetCurrentPocket: PropTypes.func.isRequired,
    currentPocket: PropTypes.string.isRequired,
  }

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.setState({handleSetCurrentPocket:this.props.handleSetCurrentPocket})
  }

  handleSetCurrentPocket = (e) => {
    let pocketName = this.props.name;
    this.state.handleSetCurrentPocket(pocketName);

  }

  render() {
    return(
      <li className={this.props.name == this.props.currentPocket ? "active" : ""}>
        <Link onClick={this.handleSetCurrentPocket} to={"/wallet/details/overview/" + this.props.name} > {this.props.name} : <Balance balance={this.props.balance} /> </Link>
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentPocket : state.pockets.currentPocket,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSetCurrentPocket : (pocketName) => dispatch(handleSetCurrentPocket(pocketName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pocket);

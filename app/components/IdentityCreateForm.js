import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createIdentity } from '../actions/identities';

class IdentityCreate extends Component {
  static propTypes = {
    dwDaemon: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({dwDaemonCreateIdentity: this.props.dwDaemon.createIdentity});
  }

  handleCreateIdentity = (e) => {
    e.preventDefault();
    let identityName = e.target.querySelector('[name=identityName]').value;
    let password = e.target.querySelector('[name=password]').value;
    let passwordConfirm = e.target.querySelector('[name=passwordConfirm]').value;
    let useTestnet = e.target.querySelector('[name=testnet]').checked;

    if(password !== passwordConfirm) {
      //TODO: Throw an error here
      console.log("passwords do not match")
      return;
    }

    this.state.dwDaemonCreateIdentity(identityName, password, useTestnet);
  }



  render() {
    return(
<div className="large-10 medium-9 columns">
  <div className="row collapse">
    <div className="large-10 large-centered columns cardflipper">
      <div className="wizard">
        <form name="newIdentityForm" onSubmit={this.handleCreateIdentity}>
          <div className="row">
            <div className="small-12 columns">
              <h2>Create New Identity</h2>
              <h6>Identities are accounts that keep track of your pockets and coins</h6>
            </div>
          </div>
          <div className="row">
            <div className="small-9 columns">
              <input type="text" name="identityName" placeholder="Name your identity..." />
            </div>
          </div>
          <div className="row">
            <div className="small-9 columns">
              <input type="password" name="password" placeholder="Choose a password..." />
            </div>
          </div>
          <div className="row">
            <div className="small-9 columns">
              <input type="password" name="passwordConfirm" placeholder="Confirm your password..." />
            </div>
          </div>
          <div className="row">
            <div className="small-9 columns">
              <input type="checkbox" name="testnet" /> Use Testnet (Practice before using real BTC)
            </div>
          </div>
          <div className="row">
            <div className="small-9 columns">
              <input type="submit" className="button small expand radius" value="Create" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    )
  }
}


function mapStateToProps(state) {
  return {
    dwDaemon: state.app.dwDaemon,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createIdentity: (name) => dispatch(createIdentity(name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentityCreate);

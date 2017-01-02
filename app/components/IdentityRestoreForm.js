import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class IdentityRestore extends Component {
  static propTypes = {
    dwDaemon: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({dwDaemonRestoreIdentity: this.props.dwDaemon.restoreIdentity});
  }

  handleRestoreIdentity = (e) => {
    e.preventDefault();
    let identityName = e.target.querySelector('[name=identityName]').value;
    let password = e.target.querySelector('[name=password]').value;
    let passwordConfirm = e.target.querySelector('[name=passwordConfirm]').value;
    let useTestnet = e.target.querySelector('[name=testnet]').checked;
    let brainwallet = e.target.querySelector('[name=brainwallet]').value.split(" ");

    if(password !== passwordConfirm) {
      //TODO: Throw an error here
      console.log("passwords do not match")
      return;
    }

    this.state.dwDaemonRestoreIdentity(identityName, password, brainwallet, useTestnet);
  }



  render() {
    return(
<div className="large-10 medium-9 columns">
  <div className="row collapse">
    <div className="large-10 large-centered columns cardflipper">
      <div className="wizard">
        <form name="newIdentityForm" onSubmit={this.handleRestoreIdentity}>
          <div className="row">
            <div className="small-12 columns">
              <h2>Restore an Identity</h2>
              <h6>Choose a name and password, then enter your 12 restore words.</h6>
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
              <input type="text" name="brainwallet" placeholder="Enter your restore words..." />
            </div>
          </div>
          <div className="row">
            <div className="small-9 columns">
              <input type="checkbox" name="testnet" /> Use Testnet (Practice before using real BTC)
            </div>
          </div>
          <div className="row">
            <div className="small-9 columns">
              <input type="submit" className="button small expand radius" value="Restore" />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentityRestore);

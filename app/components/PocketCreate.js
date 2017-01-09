import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createPocket } from '../actions/identities';

class PocketCreate extends Component {
  static propTypes = {
    dwDaemon: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    let newPocketForm = null;
  }

  componentDidMount() {
    this.setState({dwDaemonCreatePocket: this.props.dwDaemon.createPocket});
  }

  handleCreatePocket = (e) => {
    e.preventDefault();
    let pocketName = e.target.querySelector('[name=pocketName]').value;
    if(pocketName == "none") {
      alert("Pocket name not allowed: " + pocketName);
      return;
    }
    newPocketForm.reset();
    this.state.dwDaemonCreatePocket(pocketName);
  }



  render() {
    return(
<div className="large-10 medium-9 columns">
  <div className="row collapse">
    <div className="large-10 large-centered columns cardflipper">
      <div className="wizard">
        <form name="newPocketForm" ref="newPocketForm" onSubmit={this.handleCreatePocket}>
          <div className="row">
            <div className="small-12 columns">
              <h6>Pockets allow organizing your wallet in different privacy zones</h6>
            </div>
          </div>
          <div className="row">
            <div className="small-9 columns">
              <input type="text" name="pocketName" placeholder="Name your pocket..." />
            </div>

            <div className="small-3 columns">
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
    createPocket: (name) => dispatch(createPocket(name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketCreate);

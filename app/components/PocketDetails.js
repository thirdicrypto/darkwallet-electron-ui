import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class PocketDetails extends Component {
  static propTypes = {
    dwDaemonHandleDelete: PropTypes.func.isRequired,
    pocketName: PropTypes.string.isRequired,
    url: PropTypes.object.isRequired,
  }

  handleDeletePocket = (event) => {
    if(confirm("Are you sure you want to delete this pocket?")){
      console.log("deleting the pocket");
      this.props.dwDaemonHandleDelete(this.props.pocketName);
    }
  }

  render() {
    if(typeof this.props.url == "undefined" || this.props.url == null) {
      return null;
    }

    if(this.props.pocketName == "") {
      return (
<div className="scroller off-canvas-wrap">
  <div className="emptyComponentMessage">
    <h2> Select a pocket from the list. </h2>
  </div>
</div>
      )
    }

    return(
<div>
  <div className="tabbable totheleft">
    <div className="row topmargin">
      <div className="small-12 columns">
        <dl className="tabs">
          <dd className={this.props.url.pathname.indexOf("overview") > 0 ? "active" : ""}>
            <Link to={"/wallet/details/overview/" + this.props.pocketName}>Send/Recv</Link>
          </dd>
          <dd className={this.props.url.pathname.indexOf("history") > 0 ? "active" : ""}>
            <Link to={"/wallet/details/history/" + this.props.pocketName}>History</Link>
          </dd>
          <dd className={this.props.url.pathname.indexOf("addresses") > 0 ? "active" : ""}>
            <Link to={"/wallet/details/addresses/" + this.props.pocketName}>Addresses</Link>
          </dd>
          <dd className="right warning">
            <a onClick={this.handleDeletePocket}>Delete Pocket</a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
  {this.props.children}
</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pocketName: state.pockets.currentPocket,
    url: state.routing.locationBeforeTransitions,
    dwDaemonHandleDelete: state.app.dwDaemon.deletePocket,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketDetails);

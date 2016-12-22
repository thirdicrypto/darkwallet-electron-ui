import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SendFormSimple extends Component {
  static propTypes = {
    pocketName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
  }

  handleSend = (e) => {
    e.preventDefault();
    let address = e.target.querySelector('[name=sendAddress]').value;
    let amount = e.target.querySelector('[name=sendAmount]').value;
    this.props.dwDaemonHandleSend(address, amount);
  }

  render() {
    return (
<div className="panel radius sendFormSimple">
  <form onSubmit={this.handleSend} name="sendFormSimple">
    <div className="row collapse">
      <h5>Send</h5>
      <div className="small-1 columns">
        <a href="" title="Select from Contacts" className="button square prefix"><i className="icon-contacts"></i></a>
        <a href="" title="Scan QR code" className="button square prefix"><i className="icon-qrcode"></i></a>
      </div>
      <div className="small-1 columns">
        <a className="button square"></a>
      </div>
      <div className="small-6 columns">
        <input type="hidden" name="pocket" value={this.props.pocketName} />
        <input type="text" name="sendAddress" placeholder="Send to address..." className="nomarginbottom" />
        <input type="text" name="sendAmount" placeholder="Enter amount" className="nomarginbottom" />
      </div>
      <div className="small-4 columns">
        <button type="submit" className="button postfix radius nomarginbottom" disabled="">Send</button>
      </div>
    </div>
  </form>
</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pocketName: state.pockets.currentPocket,
    dwDaemonHandleSend: state.app.dwDaemon.sendCoins,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendFormSimple);





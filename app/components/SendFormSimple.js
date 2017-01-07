import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SendFormSimple extends Component {
  static propTypes = {
    pocketName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      addressIsValid: false,
      amountIsValid: false,
      feeIsValid: false,
      fieldsAreValid: false,
    };
  }

  componentDidMount() {
    this.handleDaemonEvents();
  }

  componentDidUpdate() {
    if(this.state.fieldsAreValid != this.fieldsAreValid()) {
      this.setState({fieldsAreValid: this.fieldsAreValid()})
    }
  }

  componentWillUnmount() {
    this.props.dwDaemon.removeAllListeners("validAddress")
    this.props.dwDaemon.removeAllListeners("invalidAddress")
  }

  handleDaemonEvents = () => {
    this.props.dwDaemon.on("validAddress", (type) => {
      this.setState({addressIsValid: true});
      this.setState({addressType: type});
    });
    this.props.dwDaemon.on("invalidAddress", () => {
      this.setState({addressIsValid: false});
      this.setState({addressType: ""});
    });
  }

  handleAddressChange = (e) => {
    e.preventDefault();
    let address = e.target.value;
    this.props.dwDaemonValidateAddress(address);
  }

  handleAmountChange = (e) => {
    e.preventDefault();
    if(this.isInteger(e.target.value)){
      this.setState({amountIsValid: true});
    } else {
      this.setState({amountIsValid: false});
    }
  }

  handleFeeChange = (e) => {
    e.preventDefault()
    if(this.isInteger(e.target.value)){
      this.setState({feeIsValid: true});
    } else {
      this.setState({feeIsValid: false});
    }
  }

  isInteger = (value) => {
    return (!isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value, 10)))
  }

  fieldsAreValid = () => {
    return (this.state.addressIsValid && this.state.amountIsValid && this.state.feeIsValid);
  }

  handleSend = (e) => {
    e.preventDefault();
    let address = e.target.querySelector('[name=sendAddress]').value;
    let amount = e.target.querySelector('[name=sendAmount]').value;
    let fee = e.target.querySelector('[name=sendFee]').value;
    this.props.dwDaemonHandleSend(address, amount, this.props.pocketName, fee);
  }

  render() {
    return (
<div className="panel radius sendFormSimple">
  <form onSubmit={this.handleSend} name="sendFormSimple">
    <div className="row collapse">
      <h5>Send</h5>
{/*      <div className="small-1 columns">
        <a href="" title="Select from Contacts" className="button square prefix"><i className="icon-contacts"></i></a>
        <a href="" title="Scan QR code" className="button square prefix"><i className="icon-qrcode"></i></a>
      </div>
      <div className="small-1 columns">
        <a className="button square"></a>
      </div> */}
      <div className="small-8 columns">
        <input type="hidden" name="pocket" value={this.props.pocketName} />
        <input onChange={this.handleAddressChange} type="text" name="sendAddress" placeholder="Send to address..." className="nomarginbottom" />
        <input onChange={this.handleAmountChange} type="text" name="sendAmount" placeholder="Amount in m฿..." className="nomarginbottom" />
        <input onChange={this.handleFeeChange} type="text" name="sendFee" placeholder="Fee in m฿..." className="nomarginbottom" />
      </div>
      <div className="small-4 columns">
        <button type="submit" className={this.state.addressType + " " + (this.state.fieldsAreValid ? "" : "disabled ") + "button postfix radius nomarginbottom"} disabled={!this.state.fieldsAreValid}>Send</button>
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
    dwDaemon: state.app.dwDaemon,
    dwDaemonHandleSend: state.app.dwDaemon.sendCoins,
    dwDaemonValidateAddress: state.app.dwDaemon.validateAddress,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendFormSimple);





import React, { Component , PropTypes} from 'react';
import { connect } from 'react-redux';

class StealthAddress extends Component {
  static propTypes = {
    stealthAddress: PropTypes.string.isRequired,
  }

  render() {
    return (

<div className="panel radius">
  <div className="row collapse">
  <h5>Stealth address</h5>


{/*  <div className="small-1 columns text-center">
    Icon
  </div>*/}
    <div className="small-12 columns">
      <input type="text" className="prefix radius nomarginbottom" value={this.props.stealthAddress} />
    </div>
{/*    <div className="small-1 columns">
      <a href="" className="button prefix square icon-copy"></a>
    </div>
    <div className="small-1 columns">
      <a className="button postfix square radius icon-qrcode" ></a>
    </div> */}
  </div>
</div>

  )}
}

function mapStateToProps(state) {
  return {
    stealthAddress: state.stealthAddress.stealthAddress,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StealthAddress);


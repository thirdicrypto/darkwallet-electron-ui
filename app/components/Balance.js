import React, { Component, PropTypes } from 'react';

export default class Balance extends Component {
  static propTypes = {
    balance: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.balance == -1) {
      this.setState({"balance": "-"});
      return;
    }
    this.setState({"balance": this.props.balance});
  }
  componentWillReceiveProps(newProps) {
    if (newProps.balance == -1) {
      this.setState({"balance": "-"});
      return;
    }
    this.setState({balance: newProps.balance});
  }
  render() {
    return (
<span className="dwBalance">
  {this.state.balance} ฿
</span>
    );
  }
}

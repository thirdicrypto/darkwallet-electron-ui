import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Pocket from '../containers/Pocket';

export default class PocketList extends Component {
  static propTypes = {
    pockets: PropTypes.array.isRequired,
  }

	render() {
		return(
			<ul className="off-canvas-list">
				<li className="pocketpinned show-for-large-up">
					<label>Pockets</label>
					<a className="fa fa-arrow-left"></a>
				</li>
      	<li><a>All</a></li>
      	<li><label>my pockets <Link to="/wallet/createpocket" className="cornerbutton right" title="Add a new pocket"> + </Link></label></li>
        {this.props.pockets.map((pocket, i) => {
          return <Pocket key={i} name={pocket.name} balance={pocket.balance} />
        })}
        <li className="divider"></li>
        {/*<li><label>multisig funds <a className="cornerbutton right" title="Add new multisig"> + </a></label></li>
        <li>
        </li>
        <li><label>Watch-only pockets</label></li>*/}
      </ul>
		)
	}
}

import React, { Component } from 'react';

export default class Channel extends Component {
  render() {
    return (
      <div className="medium-7 columns">
        <div className="panel">
          Join a channel on the left to start!
        </div>
        <div>
          <form>
            <div className="row collapse panel radius">
              <div className="small-9 columns">
                <input type="text" value="" />
              </div>
              <div className="small-3 columns">
                <button className="button postfix radius fa fa-comments" >Shout!</button>
              </div>
              <div className="row collapse">
                <img className="identicon" />
              </div>
            </div>
          </form>
          <div className="chat-text">
             <div className="wrapper"><div className="shoutFace"><img className="identicon" /></div> <div className="shoutText">test</div></div>
          </div>
        </div>
      </div>
    );
  }
}

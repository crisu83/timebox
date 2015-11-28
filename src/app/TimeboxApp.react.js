import React from 'react';
import TimerConstants from '../timer/TimerConstants';
import Header from '../header/Header.react';
import Timer from '../timer/Timer.react';
import Footer from '../footer/Footer.react';

var TimeboxApp = React.createClass({
  getHeaderContent() {
    return (
      <div className="header-content">
        <h1 className="brand"><i className="fa fa-clock-o"></i> timebox</h1>
      </div>
    );
  },
  getFooterContent() {
    return (
      <div className="footer-content">
        Crafted by <a className="footer-link" href="http://twitter.com/Crisu83" target="_blank" rel="nofollow">Crisu83</a>
      </div>
    );
  },
  render() {
    return (
      <div className="timebox">
        <Header content={this.getHeaderContent()} />
        <div className="centered">
          <Timer buttons={this.props.buttons} />
        </div>
        <Footer content={this.getFooterContent()} />
      </div>
    );
  }
});

export default TimeboxApp;

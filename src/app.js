import './app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './timer/Timer.react';
import TimerConstants from './timer/TimerConstants';

var buttons = [
  {id: 1, label: '15 min', minutes: 15},
  {id: 2, label: '30 min', minutes: 30},
  {id: 3, label: '60 min', minutes: 60}
];

var TimeboxApp = React.createClass({
  getInitialState() {
    return {timerState: false};
  },
  handleTimerChange(state) {
    if (!state) {
      return;
    }

    this.setState({timerState: state.name});
  },
  resolveClassName() {
    switch(this.state.timerState) {
      case TimerConstants.TIMER_STARTED:
        return 'timebox running';
      case TimerConstants.TIMER_TIMESUP:
        return 'timebox timesup';
      case TimerConstants.TIMER_STOPPED:
      default:
        return 'timebox';
    }
  },
  render() {
    return (
      <div className={this.resolveClassName()}>
        <header>
          <h1 className="brand">timebox</h1>
        </header>
        <div className="centered">
          <Timer buttons={buttons} onTimerChange={this.handleTimerChange} />
        </div>
        <footer>Crafted by <a className="link" href="http://twitter.com/Crisu83" target="_blank" rel="nofollow">@Crisu83</a></footer>
      </div>
    );
  }
});

ReactDOM.render(
  <TimeboxApp />,
  document.getElementById('app')
);

import React from 'react';
import moment from 'moment';
import TimerConstants from './TimerConstants';

var Timer = React.createClass({
  componentWillMount() {
    this.interval = null;
  },
  componentWillUnmount() {
    clearInterval(this.interval);
  },
  getInitialState() {
    return {
      name: TimerConstants.TIMER_STOPPED,
      duration: null
    };
  },
  startTimer(minutes) {
    var duration = moment.duration(minutes * 60 * 1000);
    // var duration = moment.duration(5000);
    var fn = () => {
      this.setState({duration: duration});

      duration.subtract(1, 's');

      if (duration.asMilliseconds() < 0) {
        this.setState({name: TimerConstants.TIMER_TIMESUP});
      }
    }

    fn();

    this.setState({name: TimerConstants.TIMER_STARTED});

    this.interval = setInterval(fn, 1000);
  },
  stopTimer() {
    clearInterval(this.interval);

    this.setState({
      name: TimerConstants.TIMER_STOPPED,
      duration: null
    });
  },
  renderIdle() {
    var buttons = this.props.buttons.map((button) => {
      return (
        <a key={button.id}
           className="timer-button button large"
           onClick={this.startTimer.bind(this, button.minutes)}>
         {button.label}
        </a>
      )
    });

    return (
      <div className="timer">
        <h2 className="timer-title">How much time do you have?</h2>
        <div className="timer-buttons">{buttons}</div>
      </div>
    );
  },
  renderTime() {
    if (!this.state.duration) {
      return null;
    }

    var minutes = Math.round(this.state.duration.asMinutes());

    return minutes > 1 ? `${minutes} minutes` : `${minutes} minute`;
  },
  renderRunning() {
    var timeText = this.state.duration ? Math.round(this.state.duration.asMinutes()) : null;

    return (
      <div className="timer">
        <h2 className="timer-title">You have...</h2>
        <div className="timer-text">{this.renderTime()}</div>
        <a className="timer-action button large"
          onClick={this.stopTimer}>Cancel</a>
      </div>
    );
  },
  renderDone() {
    return (
      <div className="timer">
        <h2 className="timer-title">That's it...</h2>
        <div className="timer-text">you're out of time!</div>
        <a className="timer-action button large"
          onClick={this.stopTimer}>Done</a>
      </div>
    );
  },
  render() {
    switch(this.state.name) {
      case TimerConstants.TIMER_STARTED:
        return this.renderRunning();
      case TimerConstants.TIMER_TIMESUP:
        return this.renderDone();
      case TimerConstants.TIMER_STOPPED:
      default:
        return this.renderIdle();
    }
  }
});

export default Timer;

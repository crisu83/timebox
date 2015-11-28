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
    var millis = 1000;
    var fn = () => {
      this.changeState({duration: duration});

      duration.subtract(millis, 'ms');

      if (duration.asMilliseconds() < 0) {
        this.changeState({name: TimerConstants.TIMER_TIMESUP});
      }
    }

    fn();

    this.changeState({name: TimerConstants.TIMER_STARTED});

    this.interval = setInterval(fn, millis);
  },
  stopTimer() {
    clearInterval(this.interval);

    setTimeout(() => {
      this.changeState({
        name: TimerConstants.TIMER_STOPPED,
        duration: null
      });
    }, 1000);
  },
  changeState(state) {
    this.setState(state);

    this.props.onTimerChange.call(this, this.state);
  },
  renderIdle() {
    var buttonNodes = this.props.buttons.map((button) => {
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
        <h2>How much time do you have?</h2>
        <div className="buttons">{buttonNodes}</div>
      </div>
    );
  },
  renderRunning() {
    var timeText = this.state.duration ? this.state.duration.humanize() : null;

    return (
      <div className="timer">
        <h2>You have...</h2>
        <div className="timer-text">{timeText}</div>
        <a className="timer-action button large"
          onClick={this.stopTimer}>Cancel</a>
      </div>
    );
  },
  renderDone() {
    return (
      <div className="timer">
        <h2>That's it...</h2>
        <div className="timer-text">time's up!</div>
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

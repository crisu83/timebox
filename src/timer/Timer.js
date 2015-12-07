import React from 'react';
import TimerConstants from './constants';
import AppConstants from '../app/constants';
import store from '../app/store';

class Timer extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  dismissTimer() {
    const state = store.getState();
    store.dispatch({type: TimerConstants.ACTION_DISMISS});
    clearInterval(state.intval);
  }

  getTitle(state) {
    return state.duration ? 'You have...' : 'That\'s it...';
  }

  getText(state) {
    if (state.duration) {
      const minutes = Math.round(state.duration.asMinutes());
      return minutes > 1 ? `${minutes} minutes` : `${minutes} minute`;
    } else {
      return 'you\'re out of time!';
    }
  }

  render() {
    const state = store.getState();
    const title = this.getTitle(state);
    const text = this.getText(state);

    if (state.name === AppConstants.STATE_DEFAULT) {
      return null;
    }

    return (
      <div className="timer">
        <h2 className="timer-title">{title}</h2>
        <div className="timer-text">{text}</div>
        <a className="timer-action button large" onClick={this.dismissTimer}>Done</a>
      </div>
    );
  }
}

export default Timer;

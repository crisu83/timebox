import React from 'react';
import store from '../app/store';
import AppConstants from '../app/constants';
import TimerConstants from '../timer/constants';
import moment from 'moment';

class Picker extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  startTimer(minutes) {
    const duration = moment.duration(minutes * 60 * 1000);
    const fn = () => {
      const state = store.getState();

      store.dispatch({type: TimerConstants.ACTION_UPDATE, duration: duration});
      duration.subtract(1, 's');

      if (state.intval && duration.asSeconds() < 0) {
        store.dispatch({type: TimerConstants.ACTION_DONE});
        clearInterval(state.intval);
      }
    }
    const intval = setInterval(fn, 1000);

    fn();

    store.dispatch({
      type: TimerConstants.ACTION_START,
      duration: duration,
      minutes: minutes,
      intval: intval
    });
  }

  render() {
    const state = store.getState();

    if (state.name !== AppConstants.STATE_DEFAULT) {
      return null;
    }

    const buttons = this.props.buttons.map(button => {
      return (
        <button key={button.id}
           className="timer-button button large"
           onClick={this.startTimer.bind(this, button.minutes)}>
         {button.label}
        </button>
      );
    });

    return (
      <div className="timer">
        <h2 className="timer-title">How much time do you have?</h2>
        <div className="timer-buttons">{buttons}</div>
      </div>
    );
  }
}

export default Picker;

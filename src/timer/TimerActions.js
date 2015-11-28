import AppDispatcher from '../common/AppDispatcher';
import TimerConstants from 'TimerConstants';

var TimerActions = {
  startTimer(time) {
    AppDispatcher.dispatch({
      actionType: TimerConstants.TIMER_START,
      time: time
    });
  },
  stopTimer() {
    AppDispatcher.dispatch({
      actionType: TimerConstants.TIMER_STOP
    });
  }
};

export default TimerActions;

import {createStore} from 'redux';
import AppConstants from '../app/constants';
import TimerConstants from '../timer/constants'

const initialState = {
  name: AppConstants.STATE_DEFAULT,
  duration: null,
  minutes: null,
  intval: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TimerConstants.ACTION_START:
      console.log('timer started with %d minutes', action.minutes);
      return {
        ...state,
        name: AppConstants.STATE_RUNNING,
        duration: action.duration,
        minutes: action.minutes,
        intval: action.intval
      };
    case TimerConstants.ACTION_UPDATE:
      console.log('timer updated');
      return {
        ...state,
        duration: action.duration
      };
    case TimerConstants.ACTION_DONE:
      console.log('timer done');
      return {
        ...state,
        name: AppConstants.STATE_DONE,
        duration: null,
        intval: null
      };
    case TimerConstants.ACTION_DISMISS:
      console.log('timer dismissed');
      return {
        ...state,
        name: AppConstants.STATE_DEFAULT,
        duration: null,
        minutes: null,
        intval: null
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

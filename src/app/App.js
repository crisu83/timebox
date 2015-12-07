import React from 'react';
import store from './store';
import AppConstants from './constants';
import TimerConstants from '../timer/constants';
import Header from '../header/Header';
import Picker from '../picker/Picker';
import Timer from '../timer/Timer';
import Footer from '../footer/Footer';

class App extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getClassNames() {
    const state = store.getState();
    let classNames = ['timebox'];

    switch (state.name) {
      case AppConstants.STATE_RUNNING:
        classNames.push('state-running');
        break;
      case AppConstants.STATE_DONE:
        classNames.push('state-done');
        break;
      case AppConstants.STATE_DEFAULT:
      default:
        classNames.push('state-default');
        break;
    }

    return classNames.join(' ');
  }

  render() {
    return (
      <div className={this.getClassNames()}>
        <Header />
        <div className="centered">
          <Picker buttons={this.props.buttons} />
          <Timer />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

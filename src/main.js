import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import App from './app/App';

import './main.scss';

const buttons = [
  {id: 1, label: '15 min', minutes: 15},
  {id: 2, label: '30 min', minutes: 30},
  {id: 3, label: '60 min', minutes: 60}
];

ReactDOM.render(
  <App buttons={buttons} />,
  document.getElementById('root')
);

import './app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import TimeboxApp from './app/TimeboxApp.react';

var buttons = [
  {id: 1, label: '15 min', minutes: 15},
  {id: 2, label: '30 min', minutes: 30},
  {id: 3, label: '60 min', minutes: 60}
];

ReactDOM.render(
  <TimeboxApp buttons={buttons} />,
  document.getElementById('app')
);

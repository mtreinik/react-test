import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './src/App'

const CONFIG = {
  width: 10,
  height: 10,
  webSocketUrl: 'wss://guarded-fjord-59352.herokuapp.com/'
//  webSocketUrl: 'ws://localhost:5000/'
}

ReactDOM.render(
  <App webSocketUrl={ CONFIG.webSocketUrl }
    width={ CONFIG.width }
    height={ CONFIG.height } />,
  document.getElementById('main')
);

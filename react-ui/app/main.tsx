import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './src/App'

const CONFIG = {
  width: 10,
  height: 10,
}

const webSocketUrl =
  (window.location.protocol === 'https:' ? 'wss://' : 'ws://') +
  window.location.hostname +
  '/';

ReactDOM.render(
  <App webSocketUrl={ webSocketUrl }
    width={ CONFIG.width }
    height={ CONFIG.height } />,
  document.getElementById('main')
);

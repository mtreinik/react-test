import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './src/App'

const CONFIG = {
  width: 10,
  height: 10
}

ReactDOM.render(
  <App webSocketUrl='ws://cryptic-harbor-46674.herokuapp.com/'
    width={ CONFIG.width }
    height={ CONFIG.height } />,
  document.getElementById('main')
);

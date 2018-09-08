import * as React from "react";
import * as ReactDOM from "react-dom";

import App from './src/App'

ReactDOM.render(
  <App webSocketUrl="ws://example.com/" />,
  document.getElementById("main")
);

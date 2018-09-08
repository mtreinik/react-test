import * as React from 'react';
import ToolPalette from './ToolPalette';
import Painting from './Painting';

const config = {
  width: 10,
  height: 10
}

interface Props {
  webSocketUrl: string
}

interface State {
  penColor: string
}

export default class App extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      penColor: '#00ff00'
    };
  }

  render() {
    return (
      <div className="app">
        <ToolPalette penColor = { this.state.penColor } />
        <Painting
          width={ config.width }
          height={ config.height }
          penColor={ this.state.penColor }/>
      </div>
    );
  }
}

import * as React from 'react';
import ToolPalette from './ToolPalette';
import Painting from './Painting';
import { COLORS } from './ToolPalette';

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
      penColor: COLORS['green']
    };
  }

  handleToolChange = (penColor:string) => {
    this.setState({
      penColor: penColor
    })
  }

  render() {
    return (
      <div className="app">
        <ToolPalette
          penColor = { this.state.penColor }
          onChange = { this.handleToolChange } />
        <Painting
          width={ config.width }
          height={ config.height }
          penColor={ this.state.penColor } />
      </div>
    );
  }
}

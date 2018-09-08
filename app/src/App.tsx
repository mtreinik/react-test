import * as React from 'react';
import ToolPalette from './ToolPalette';
import Painting from './Painting';
import { PixelStatus } from './Painting';
import { COLORS } from './ToolPalette';

interface Props {
  width: number,
  height: number,
  webSocketUrl: string
}

interface State {
  penColor: string,
  pixels: PixelStatus[][]
}

export default class App extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      penColor: COLORS['green'],
      pixels: []
    };
    for (let y = 0; y < this.props.height; y++) {
      let pixelRow: PixelStatus[] = [];
      for (let x = 0; x < this.props.width; x++) {
        pixelRow[x] = {
          color: COLORS['white'],
          unsaved: false
        };
      }
      this.state.pixels[y] = pixelRow;
    }

  }

  handleToolChange = (newPenColor:string) => {
    this.setState({
      penColor: newPenColor
    })
  }

  handlePixelsChange = (newPixels:PixelStatus[][]) => {
    this.setState({
      pixels: newPixels
    })
  }

  render() {
    return (
      <div className="app">
        <ToolPalette
          onChange = { this.handleToolChange }
          penColor = { this.state.penColor } />
        <Painting
          onChange = { this.handlePixelsChange }
          width={ this.props.width }
          height={ this.props.height }
          penColor={ this.state.penColor }
          pixels = { this.state.pixels } />
      </div>
    );
  }
}

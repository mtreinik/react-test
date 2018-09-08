import * as React from 'react';
import ToolPalette from './ToolPalette';
import Painting from './Painting';
import { PixelStatus } from './Painting';
import { COLORS } from './ToolPalette';
import WebSocketClient from './WebSocketClient';
import { PixelValue } from './WebSocketClient';

interface Props {
  width: number,
  height: number,
  webSocketUrl: string
}

interface State {
  penColor: string,
  pixels: PixelStatus[][],
  changedPixels: PixelValue[]
}

export default class App extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      penColor: COLORS['green'],
      pixels: this.initializePixels(),
      changedPixels: []
    };
  }

  initializePixels() {
    let pixels: PixelStatus[][] = [];
    for (let y = 0; y < this.props.height; y++) {
      let pixelRow: PixelStatus[] = [];
      for (let x = 0; x < this.props.width; x++) {
        pixelRow[x] = {
          color: COLORS['white'],
          unsaved: false
        };
      }
      pixels[y] = pixelRow;
    }
    return pixels;
  }

  handleWebSocketChange = (changedPixels:PixelValue[]) => {
//    console.log('changing pixels: ' + JSON.stringify(changedPixels));
    let newPixels:PixelStatus[][] = [...this.state.pixels]
    changedPixels.forEach((pixelValue:PixelValue) => {
      newPixels[pixelValue.y][pixelValue.x] = {
        color: pixelValue.color,
        unsaved: false
      };
    })
    this.setState({
      pixels: newPixels,
      changedPixels: []  // TODO tässä saattaa olla bugi
    })
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
    this.sendChanges();
  }

  sendChanges = () => {
    let changedPixels:PixelValue[] = [];
    let newPixels:PixelStatus[][] = [...this.state.pixels];
    for (let y = 0; y < this.props.height; y++) {
      for (let x = 0; x < this.props.width; x++) {
        if (this.state.pixels[y][x].unsaved) {
          changedPixels.push({
            x: x,
            y: y,
            color: this.state.pixels[y][x].color
          });
          newPixels[y][x].unsaved = false;
        }
      }
    }
    this.setState({
      changedPixels: changedPixels,
      pixels: newPixels
    });
  }

  render() {
    return (
      <div className="app">
        <WebSocketClient
          webSocketUrl = { this.props.webSocketUrl }
          changedPixels = { this.state.changedPixels }
          onChange = { this.handleWebSocketChange } />
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

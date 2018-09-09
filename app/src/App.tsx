import * as React from 'react';
import ToolPalette from './ToolPalette';
import Painting from './Painting';
import { PixelStatus } from './Painting';
import { COLORS } from './ToolPalette';
import WebSocketClient from './WebSocketClient';
import { PixelValue } from './WebSocketClient';
import { SyncAction } from './SyncTool';

interface Props {
  width: number,
  height: number,
  webSocketUrl: string
}

interface State {
  paintingId: number,
  penColor: string,
  pixels: PixelStatus[][],
  online: boolean
}

export default class App extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      paintingId: 1,
      penColor: COLORS['green'],
      pixels: this.initializePixels(),
      online: true
    };
  }

  initializePixels() {
    let pixels: PixelStatus[][] = [];
    for (let y = 0; y < this.props.height; y++) {
      let pixelRow: PixelStatus[] = [];
      for (let x = 0; x < this.props.width; x++) {
        pixelRow[x] = {
          x: x,
          y: y,
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
        x: pixelValue.x,
        y: pixelValue.y,
        color: pixelValue.color,
        unsaved: false
      };
    })
    this.setState({
      pixels: newPixels,
    })
  }

  handleToolColorChange = (newPenColor:string) => {
    this.setState({
      penColor: newPenColor,
    })
  }

  handlePaintingIdChange = (newPaintingId:number) => {
    if (newPaintingId !== this.state.paintingId) {
      this.setState({
        paintingId: newPaintingId,
        pixels: this.initializePixels() // TODO fetch painting from server
      })
    }
  }

  handleToolSyncAction = (syncAction:SyncAction) => {
    let online = syncAction === SyncAction.GO_ONLINE;
    this.setState({
      online: online
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
        <WebSocketClient
          webSocketUrl = { this.props.webSocketUrl }
          paintingId = { this.state.paintingId }
          pixels = { this.state.pixels }
          online = { this.state.online }
          onChange = { this.handleWebSocketChange } />
        <ToolPalette
          paintingId = { this.state.paintingId }
          online = { this.state.online }
          penColor = { this.state.penColor }
          onColorChange = { this.handleToolColorChange }
          onPaintingIdChange = { this.handlePaintingIdChange }
          onSyncAction = { this.handleToolSyncAction } />
        <Painting
          width={ this.props.width }
          height={ this.props.height }
          penColor={ this.state.penColor }
          pixels = { this.state.pixels }
          onChange = { this.handlePixelsChange } />
      </div>
    );
  }
}

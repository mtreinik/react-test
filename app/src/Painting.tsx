import * as React from 'react';
import Pixel from './Pixel';
import { EVENT_TYPES } from './Pixel';
import { COLORS } from './ToolPalette';

interface PixelStatus {
  color: string,
  unsaved: boolean
}

interface Props {
  width: number,
  height: number,
  penColor: string
}

interface State {
  pixels: PixelStatus[][],
  mouseDown: boolean
}

function numberToHex(num:number): string {
    let hex = num.toString(16);
    return hex.length < 2 ? '0' + hex : hex;
}

function rgbToHex(red:number, green:number, blue:number): string {
    return '#' + numberToHex(red) + numberToHex(green) + numberToHex(blue);
}

export default class Painting extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      pixels: [],
      mouseDown: false
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

  setPixel = (pixels: PixelStatus[][], x: number, y: number, color: string) => {
    let newPixels = [...pixels];
    newPixels[y][x] = {
      color: color,
      unsaved: true
    }
    return newPixels;
  }

  handlePixelChange = (x:number, y:number, eventType:EVENT_TYPES) => {
    switch (eventType) {
      case EVENT_TYPES.MOUSE_DOWN: {
        console.log('mouse down');
        this.setState((state, props) => ({
          pixels: this.setPixel(state.pixels, x, y, props.penColor),
          mouseDown: true
        }));
        break;
      }
      case EVENT_TYPES.MOUSE_UP: {
        console.log('mouse up');
        this.setState({mouseDown: false});
        break;
      }
      case EVENT_TYPES.TOUCH_START: {
        console.log('touch start');
        if (this.state.mouseDown) {
          this.setState((state, props) => ({
            pixels: this.setPixel(state.pixels, x, y, props.penColor)
          }));
        }
        break;
      }
    }
  }

  render() {
    let pixelRows: JSX.Element[] = [];
    for (let y = 0; y < this.props.height; y++) {
      let pixelRow: JSX.Element[] = [];
      for (let x = 0; x < this.props.width; x++) {
        let pixelKey = x + ',' + y;
        pixelRow.push(
          <Pixel x={ x } y={ y }
            key={ pixelKey }
            color= { this.state.pixels[y][x].color }
            onChange = { this.handlePixelChange } />
        );
      }
      let rowKey = 'row' + y;
      pixelRows.push(
        <div className="pixel-row" key={ rowKey }>
          { pixelRow }
        </div>
      );
    }
    return (
      <div className="pixels">
        { pixelRows }
      </div>
    );
  }
}

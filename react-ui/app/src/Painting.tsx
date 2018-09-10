import * as React from 'react';
import Pixel from './Pixel';
import { EVENT_TYPES } from './Pixel';
import { COLORS } from './ToolPalette';
import { PixelStatus } from './App';

interface Props {
  width: number,
  height: number,
  penColor: string,
  pixels: PixelStatus[][],
  onChange: (newPixels:PixelStatus[][]) => void
}

interface State {
  mouseDown: boolean
}

export default class Painting extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      mouseDown: false
    };
  }

  setPixel = (pixels: PixelStatus[][], x: number, y: number, color: string) => {
    let newPixels = [...pixels];
    newPixels[y][x] = {
      x: x,
      y: y,
      color: color,
      unsaved: true
    };
    this.props.onChange(newPixels);
  }

  handlePixelChange = (x:number, y:number, eventType:EVENT_TYPES) => {
    switch (eventType) {
      case EVENT_TYPES.MOUSE_DOWN: {
        this.setState({ mouseDown: true });
        this.setPixel(this.props.pixels, x, y, this.props.penColor)
        break;
      }
      case EVENT_TYPES.MOUSE_UP: {
        this.setState({ mouseDown: false });
        break;
      }
      case EVENT_TYPES.TOUCH_START: {
        if (this.state.mouseDown) {
          this.setPixel(this.props.pixels, x, y, this.props.penColor)
        }
        break;
      }
    }
  }

  handleMouseLeave = () => {
    this.setState({ mouseDown: false });
  }

  render() {
    let pixelRows: JSX.Element[] = [];
    for (let y = 0; y < this.props.height; y++) {
      let pixelRow: JSX.Element[] = [];
      for (let x = 0; x < this.props.width; x++) {
        const pixelKey = x + ',' + y;
        pixelRow.push(
          <Pixel x={ x } y={ y }
            key={ pixelKey }
            color= { this.props.pixels[y][x].color }
            onChange = { this.handlePixelChange }
            unsaved = { this.props.pixels[y][x].unsaved } />
        );
      }
      const rowKey = 'row' + y;
      pixelRows.push(
        <div className="pixel-row" key={ rowKey }>
          { pixelRow }
        </div>
      );
    }
    return (
      <div className="pixels"
        onMouseLeave={ this.handleMouseLeave }
        >
        { pixelRows }
      </div>
    );
  }
}

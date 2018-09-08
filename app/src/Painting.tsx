import * as React from 'react';
import Pixel from './Pixel';

interface PixelStatus {
  color: string,
  unsaved: boolean
}

interface Props {
  width: number,
  height: number,
  penColor: string
}

function numberToHex(num:number): string {
    let hex = num.toString(16);
    return hex.length < 2 ? '0' + hex : hex;
}

function rgbToHex(red:number, green:number, blue:number): string {
    return '#' + numberToHex(red) + numberToHex(green) + numberToHex(blue);
}

export default class Painting extends React.Component<Props> {

  constructor(props:Props) {
    super(props);
    for (let y = 0; y < this.props.height; y++) {
      let pixelRow: PixelStatus[] = [];
      for (let x = 0; x < this.props.width; x++) {
        pixelRow[x] = {
          color: rgbToHex(x*25, y*25, 0),
          unsaved: false
        };
      }
      this.pixels[y] = pixelRow;
    }
  }

  pixels: PixelStatus[][] = [];
  mouseDown: boolean = false;

  render() {
    let pixelRows: JSX.Element[] = [];
    for (let y = 0; y < this.props.height; y++) {
      let pixelRow: JSX.Element[] = [];
      for (let x = 0; x < this.props.width; x++) {
        let pixelKey = x + ',' + y;
        pixelRow.push(
          <Pixel x={ x } y={ y }
            key={ pixelKey }
            mouseDown={ this.mouseDown }
            initialColor= { this.pixels[y][x].color }
            initialUnsaved = { this.pixels[y][x].unsaved }
            penColor = { this.props.penColor }/>
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

import * as React from 'react';
import Pixel from './Pixel';

interface PixelStatus {
  color: string,
  unsaved: boolean
}

interface Props {
  width: number,
  height: number
}

function componentToHex(c:number): string {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r:number, g:number, b:number): string {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
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
        pixelRow.push(
          <Pixel x={ x } y={ y }
            mouseDown={ this.mouseDown }
            color= { this.pixels[y][x].color }
            unsaved = { this.pixels[y][x].unsaved } />
        );
      }
      pixelRows.push(
        <div className="pixel-row">
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

import * as React from 'react';

interface Props {
  width: number,
  height: number
}

export default class Painting extends React.Component<Props> {


  constructor(props:Props) {
    super(props);
  }

  mouseDown: boolean = false;

  render() {
    let pixelRows: JSX.Element[] = [];
    for (let y = 0; y < this.props.height; y++) {
      let pixelRow: JSX.Element[] = [];
      for (let x = 0; x < this.props.width; x++) {
        pixelRow.push(
          <div
            className="pixel"
            id="pixel-{y}-{x}"
            onMouseDown={ (event) => this._onMouseDown(event, x, y) }
            onMouseUp={this._onMouseUp}
            onMouseEnter={(event) => this._onTouchStart(event, x, y)} />
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
  _drawPixel = (x:number, y:number) => {
    console.log('drawing at ' + x + ',' + y);
  }
  _onMouseDown = (event:any, x:number, y:number) => {
    this.mouseDown = true;
    this._drawPixel(x, y);
  }
  _onMouseUp = (event:any) => {
    this.mouseDown = false;
  }
  _onTouchStart = (event:any, x:number, y:number) => {
    if (this.mouseDown) {
      this._drawPixel(x, y);
    }
  }
}

import * as React from 'react';

interface Props {
  x: number,
  y: number,
  mouseDown: boolean,
  color: string,
  unsaved: boolean
}

export default class Pixel extends React.Component<Props> {

  constructor(props:Props) {
    super(props);
  }

  render() {
    let style = {
      backgroundColor: this.props.color
    };
    return(<div
      className="pixel"
      style={ style }
      onMouseDown={ (event) => this._onMouseDown(this.props.x, this.props.y) }
      onMouseUp={ (event) => this._onMouseUp() }
      onMouseEnter={(event) => this._onTouchStart(this.props.x, this.props.y)} />
    );
  }

  _drawPixel = (x:number, y:number) => {
    console.log('drawing at ' + x + ',' + y);
  }

  _onMouseDown = (x:number, y:number) => {
//    this.props.mouseDown = true;
    this._drawPixel(x, y);
  }

  _onMouseUp = () => {
//    this.props.mouseDown = false;
  }

  _onTouchStart = (x:number, y:number) => {
    if (this.props.mouseDown) {
      this._drawPixel(x, y);
    }
  }

}

import * as React from 'react';
import { COLORS } from './ToolPalette';

interface Props {
  x: number,
  y: number,
  color: string,
  unsaved: boolean,
  onChange: (x:number, y:number, eventType:EVENT_TYPES) => void
}

export enum EVENT_TYPES {
  MOUSE_DOWN,
  MOUSE_UP,
  TOUCH_START
}

export default class Pixel extends React.Component<Props> {

  constructor(props:Props) {
    super(props);
  }

  render() {
    const borderColor =
      this.props.unsaved ? 'black' : 'lightgray';
    const style = {
      backgroundColor: this.props.color,
      border: '2px solid ' + borderColor
    };
    return(<div
      className="pixel"
      style={ style }
      onMouseDown={ this._onMouseDown }
      onMouseUp={ this._onMouseUp }
      onMouseEnter={ this._onTouchStart } />
    );
  }

  _onMouseDown = () => {
    this.props.onChange(this.props.x, this.props.y, EVENT_TYPES.MOUSE_DOWN)
  }

  _onMouseUp = () => {
    this.props.onChange(this.props.x, this.props.y, EVENT_TYPES.MOUSE_UP)
  }

  _onTouchStart = () => {
    this.props.onChange(this.props.x, this.props.y, EVENT_TYPES.TOUCH_START)
  }

}

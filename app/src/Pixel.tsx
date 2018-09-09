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
      onMouseDown={ this.handleMouseDown }
      onMouseUp={ this.handleMouseUp }
      onMouseEnter={ this.handleTouchStart } />
    );
  }

  onChange = (eventType:EVENT_TYPES) => {
    this.props.onChange(this.props.x, this.props.y, eventType);
  }

  handleMouseDown = () => {
    this.onChange(EVENT_TYPES.MOUSE_DOWN);
  }

  handleMouseUp = () => {
    this.onChange(EVENT_TYPES.MOUSE_UP);
  }

  handleTouchStart = () => {
    this.onChange(EVENT_TYPES.TOUCH_START);
  }

}

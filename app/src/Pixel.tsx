import * as React from 'react';

interface Props {
  x: number,
  y: number,
  color: string,
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
    let style = {
      backgroundColor: this.props.color
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
    console.log('mouse down');
    this.props.onChange(this.props.x, this.props.y, EVENT_TYPES.MOUSE_DOWN)
  }

  _onMouseUp = () => {
    console.log('mouse up');
    this.props.onChange(this.props.x, this.props.y, EVENT_TYPES.MOUSE_UP)
  }

  _onTouchStart = () => {
    console.log('touch start');
    this.props.onChange(this.props.x, this.props.y, EVENT_TYPES.TOUCH_START)
  }

}

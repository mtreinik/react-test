import * as React from 'react';

interface Props {
  x: number,
  y: number,
  mouseDown: boolean,
  initialColor: string,
  initialUnsaved: boolean,
  penColor: string
}

interface State {
  color: string,
  unsaved: boolean
}

export default class Pixel extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);

    this.state = {
      color: this.props.initialColor,
      unsaved: this.props.initialUnsaved
    };
    this._drawPixel = this._drawPixel.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
  }

  render() {
    let style = {
      backgroundColor: this.state.color
    };
    return(<div
      className="pixel"
      style={ style }
      onMouseDown={ this._onMouseDown }
      onMouseUp={ this._onMouseUp }
      onMouseEnter={ this._onTouchStart } />
    );
  }

  _drawPixel() {
    console.log('drawing at ' + this.props.x + ',' + this.props.y);
    this.setState((state, props) => ({
      color: props.penColor,
      unsaved: true
    }));
  }

  _onMouseDown() {
    console.debug('mouse down');
    //    this.setState({mouseDown: true});
    this._drawPixel();
  }

  _onMouseUp() {
    console.debug('mouse up');
    //    this.setState({mouseDown: false});
  }

  _onTouchStart() {
    console.debug('touch start');
    if (this.props.mouseDown) {
      this._drawPixel();
    }
  }

}

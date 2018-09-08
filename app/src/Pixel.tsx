import * as React from 'react';

interface Props {
  x: number,
  y: number,
  key: string,
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

  _drawPixel = () => {
    console.log('drawing at ' + this.props.x + ',' + this.props.y);
    this.setState((state, props) => ({
      color: props.penColor,
      unsaved: true
    }));
  }

  _onMouseDown = () => {
    console.log('mouse down');
    //    this.setState({mouseDown: true});
    this._drawPixel();
  }

  _onMouseUp = () => {
    console.log('mouse up');
    //    this.setState({mouseDown: false});
  }

  _onTouchStart = () => {
    console.log('touch start');
    if (this.props.mouseDown) {
      this._drawPixel();
    }
  }

}
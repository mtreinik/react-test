import * as React from 'react';

interface Props {
  color: string
  penColor: string
}

export default class ColorSelector extends React.Component<Props> {

    constructor(props: Props) {
      super(props);
    }

    render() {
      let style = {
        backgroundColor: this.props.color,
        border: '5px solid ' + (this.props.color === this.props.penColor ? '#404040' : 'lightgray')
      }
      return (
        <div className="color-selector"
          style={ style } />
      )
    }
}

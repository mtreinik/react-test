import * as React from 'react';

interface Props {
  color: string,
  penColor: string,
  onChange: (newPenColor: string) => void
}

export default class ColorSelector extends React.Component<Props> {

    constructor(props: Props) {
      super(props);
    }

    handleClick = () => {
      this.props.onChange(this.props.color);
    }

    render() {
      const borderColor =
        this.props.color === this.props.penColor ? '#404040' : 'lightgray';
      const style = {
        backgroundColor: this.props.color,
        border: '5px solid ' + borderColor
      };
      return (
        <div className="color-selector"
          onClick = { this.handleClick }
          style={ style } />
      );
    }
}

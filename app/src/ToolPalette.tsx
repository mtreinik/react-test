import * as React from 'react';
import ColorSelector from './ColorSelector';

const COLORS: string[] = [
  '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'
];

interface Props {
  penColor: string
}

export default class ToolPalette extends React.Component<Props> {
  constructor(props:Props) {
    super(props);
  }
  render() {
    return (
      <div className="tool-palette">
        {
          COLORS.map((color, index) =>
            <ColorSelector
              key={ index }
              color={ color }
              penColor={ this.props.penColor} />)
        }
      </div>
    );
  }
}

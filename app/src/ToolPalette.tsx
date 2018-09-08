import * as React from 'react';
import ColorSelector from './ColorSelector';

export const COLORS: {[key:string]: string } = {
  black: '#000000',
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  yellow: '#ffff00',
  magenta: '#ff00ff',
  cyan: '#00ffff',
  white: '#ffffff'
};

interface Props {
  penColor: string,
  onChange: (penColor:string) => void
}

export default class ToolPalette extends React.Component<Props> {
  constructor(props:Props) {
    super(props);
  }
  render() {
    return (
      <div className="tool-palette">
        {
          Object.keys(COLORS).map((key, index) =>
            <ColorSelector
              key={ index }
              color={ COLORS[key] }
              onChange= { this.props.onChange }
              penColor={ this.props.penColor} />)
        }
      </div>
    );
  }
}

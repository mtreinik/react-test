import * as React from 'react';
import ColorSelector from './ColorSelector';

const COLORS: string[] = [
  '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'
];

export default class ToolPalette extends React.Component<{}> {
  constructor(props:any) {
    super(props);
  }
  render() {
    return (
      <div className="tool-palette">
        { COLORS.map((color) => <ColorSelector color={ color } />) }
      </div>
    );
  }
}

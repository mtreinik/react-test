import * as React from 'react';
import ColorSelector from './ColorSelector';

const COLORS: string[] = [
  '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'
];

export default class ColorPalette extends React.Component<{}> {
  constructor(props:any) {
    super(props);
  }
  render() {
    return (
      <div className="color-palette">
        { COLORS.map((color) => <ColorSelector color={ color } />) }
      </div>
    );
  }
}

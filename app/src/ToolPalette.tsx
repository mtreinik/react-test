import * as React from 'react';
import ColorSelector from './ColorSelector';
import SyncTool from './SyncTool';
import { SyncAction } from './SyncTool';

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
  onColorChange: (penColor:string) => void,
  onSyncChange: (syncAction:SyncAction) => void,
  online: boolean
}

export default class ToolPalette extends React.Component<Props> {

  constructor(props:Props) {
    super(props);
  }

  render() {
    return (
      <div className="tool-palette">
        <SyncTool
          online = { this.props.online }
          onChange = { this.handleSyncToolChange } />
        {
          Object.keys(COLORS).map((key, index) =>
            <ColorSelector
              key={ index }
              color={ COLORS[key] }
              onChange= { this.handleColorChange }
              penColor={ this.props.penColor} />)
        }
      </div>
    );
  }

  handleSyncToolChange = (syncAction:SyncAction) => {
    this.props.onSyncChange(syncAction);
  }

  handleColorChange = (penColor: string) => {
    this.props.onColorChange(penColor);
  }
}

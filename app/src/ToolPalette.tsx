import * as React from 'react';
import ColorSelector from './ColorSelector';
import SyncTool from './SyncTool';
import { SyncAction } from './App';

export const COLORS: {[key:string]: string } = {
  black: '#000000',
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  yellow: '#ffff00',
  magenta: '#ff00ff',
  cyan: '#00ffff',
  white: '#ffffff'
}

interface Props {
  paintingId: number,
  online: boolean,
  penColor: string,
  onColorChange: (penColor:string) => void,
  onSyncAction: (syncAction:SyncAction) => void,
  onPaintingIdChange: (newPaintingId:number) => void
}

export default class ToolPalette extends React.Component<Props> {

  constructor(props:Props) {
    super(props);
  }

  render() {
    return (
      <div className="tool-palette">
        <SyncTool
          paintingId = { this.props.paintingId }
          online = { this.props.online }
          onPaintingIdChange = { this.props.onPaintingIdChange }
          onSyncAction = { this.props.onSyncAction } />
        {
          Object.keys(COLORS).map((key, index) =>
            <ColorSelector
              key={ index }
              color={ COLORS[key] }
              onChange= { this.props.onColorChange }
              penColor={ this.props.penColor} />)
        }
      </div>
    );
  }

}

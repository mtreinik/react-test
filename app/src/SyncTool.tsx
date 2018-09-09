import * as React from 'react';
import { COLORS } from './ToolPalette';

export enum SyncAction {
  GO_ONLINE,
  GO_OFFLINE
}

interface Props {
  paintingId: number,
  online: boolean,
  onSyncAction: (syncAction: SyncAction) => void,
  onPaintingIdChange: (newPaintingId: number) => void
}

export default class SyncTool extends React.Component<Props> {

    constructor(props: Props) {
      super(props);
    }

    handleClick = () => {
      this.props.onSyncAction(
        this.props.online ? SyncAction.GO_OFFLINE : SyncAction.GO_ONLINE);
    }

    handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      let val = event.target.value;
      let newPaintingId = parseInt(val, 10);
      if (isNaN(newPaintingId)) {
        newPaintingId = 0;
      }
      this.props.onPaintingIdChange(newPaintingId);
      event.preventDefault();
    }

    render() {
      let buttonStyle = {
        backgroundColor: this.props.online ? COLORS['green'] : COLORS['red']
      };
      return (
        <div className="sync-tool">

          <button onClick = { this.handleClick }
            style={ buttonStyle }>
            { this.props.online ? 'ONLINE' : 'OFFLINE'}
          </button>

          <span className="painting-id">
            painting&nbsp;
            <input type="text"
              size={ 5 }
              value={ this.props.paintingId }
              onChange={ this.handleChange } />
          </span>

        </div>
      )
    }
}

import * as React from 'react';

export enum SyncAction {
  GO_ONLINE,
  GO_OFFLINE
}

interface Props {
  online: boolean,
  onChange: (syncAction: SyncAction) => void
}

export default class SyncTool extends React.Component<Props> {

    constructor(props: Props) {
      super(props);
    }

    onClick = () => {
      this.props.onChange(
        this.props.online ? SyncAction.GO_OFFLINE : SyncAction.GO_ONLINE);
    }

    render() {
      return (
        <div className="sync-tool"
          onClick = { this.onClick }>
          { this.props.online ? 'ONLINE' : 'OFFLINE '}
        </div>
      )
    }
}

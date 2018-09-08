import * as React from 'react';

const TIMEOUT = 1000

enum MessageType {
  Open = "OPEN",
  Painting = "PAINTING",
  Update = "UPDATE"
}

export interface PixelValue {
  x: number,
  y: number,
  color: string
}

interface Props {
  webSocketUrl: string,
  changedPixels: PixelValue[],
  onChange: (changedPixels:PixelValue[]) => void
}

interface State {
  webSocket: WebSocket
}

export default class WebSocketClient extends React.Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      webSocket: this.initializeWebSocket(props.webSocketUrl),
    }
  }

  render() {
    if (this.props.changedPixels.length > 0) {
      // TODO FIXME this might send changed pixels multiple times
      this.sendUpdate(this.props.changedPixels);
    }
    return (
      <div>websocket</div>
    );
  }

  initializeWebSocket(webSocketUrl: string):WebSocket {
    console.log('opening WebSocket to ' + webSocketUrl);
    let webSocket = new WebSocket(webSocketUrl);
    webSocket.onopen = this.onOpen;
    webSocket.onclose = this.onClose;
    webSocket.onerror = this.onError;
    webSocket.onmessage = this.onMessage;
    return webSocket;
  }

  onOpen = (event:MessageEvent) => {
    console.log('WebSocket opened');
  }

  onClose = (event:CloseEvent) => {
    console.log('WebSocket closed');
    setTimeout(
      () => {
        this.setState({ webSocket: this.initializeWebSocket(this.props.webSocketUrl) });
      },
      TIMEOUT);
  }

  onError = (event:MessageEvent) => {
    console.error('WebSocket error: ' + JSON.stringify(event));
  }

  onMessage = (event:MessageEvent) => {
//    console.log('WebSocket message: ' + JSON.stringify(event));
    let data:any = JSON.parse(event.data);
//    console.log('data=' + JSON.stringify(data));
    switch (data.type) {
      case MessageType.Update: {
//        console.log('update message ' + JSON.stringify(data.pixels));
        this.props.onChange(data.pixels);
        break;
      }
    }
  }

  sendUpdate(changedPixels:PixelValue[]) {
    let message = JSON.stringify({
        type: MessageType.Update,
        pixels: changedPixels
    });
//    console.log('sending ' + message);
    this.state.webSocket.send(message);
  }

}

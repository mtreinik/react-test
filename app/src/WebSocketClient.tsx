import * as React from 'react';
import { PixelStatus } from './Painting';

const TIMEOUT = 1000

enum MessageType {
  Open = "OPEN",
  Painting = "PAINTING",
  Changes = "CHANGES"
}

export interface PixelValue {
  x: number,
  y: number,
  color: string
}

interface Props {
  webSocketUrl: string,
  paintingId: number,
  pixels: PixelStatus[][],
  online: boolean,
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
    if (this.props.online) {
      let changedPixels:PixelValue[] = this.getChangedPixels(this.props.pixels);
      if (changedPixels.length > 0) {
        this.sendChanges(changedPixels);
      }
    }
    // Nothing to render for now.
    // This component could be used for displaying status of WebSocket communication.
    return (false);
  }

  getChangedPixels(pixels:PixelStatus[][]):PixelValue[] {
    let changedPixels:PixelValue[] = [];
    pixels.forEach((pixelRow) => {
      pixelRow.forEach((pixel) => {
        if (pixel.unsaved) {
          changedPixels.push({
            x: pixel.x,
            y: pixel.y,
            color: pixel.color
          })
        }
      });
    });
    return changedPixels;
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
    if (!this.props.online) {
      // TODO FIXME this forgets remote changes made during offline mode
      return;
    }
//    console.log('WebSocket message: ' + JSON.stringify(event));
    let data:any = JSON.parse(event.data);

    if (data.paintingId !== this.props.paintingId) {
      // skip messages related to other paintings
      return;
    }

//    console.log('data=' + JSON.stringify(data));
    switch (data.type) {
      case MessageType.Changes: {
//        console.log('update message ' + JSON.stringify(data.pixels));
        this.props.onChange(data.pixels);
        break;
      }
    }
  }

  sendChanges(changedPixels:PixelValue[]) {
    let message = JSON.stringify({
        type: MessageType.Changes,
        paintingId: this.props.paintingId,
        pixels: changedPixels
    });
//    console.log('sending ' + message);
    // TODO check state of webSocket before sending
    this.state.webSocket.send(message);
  }

}

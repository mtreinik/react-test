import * as React from 'react';
import ColorPalette from './ColorPalette';
import Painting from './Painting';

const config = {
  width: 10,
  height: 10
}

export default class App extends React.Component <{}> {
  render() {
    return (
      <div className="app">
        <div className="drawing-area">
          <ColorPalette />
          <Painting width={ config.width } height={ config.height } />
        </div>
        <div className="footer">Mikko Reinikainen, 2018</div>
      </div>
    );
  }
}

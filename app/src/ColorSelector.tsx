import * as React from 'react';

interface Props {
  color: string;
}

export default class ColorSelector extends React.Component<Props> {

    constructor(props: Props) {
      super(props);
    }

    render() {
      let style = {
        backgroundColor: this.props.color
      }
      return (
        <div className="color-selector"
          style={ style } />
      )
    }
}

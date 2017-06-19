import React from 'react';

class Cell extends React.Component {
  render() {
    const contents = typeof this.props.contents != 'undefined' ? this.props.contents : '';
    return <div className={'grid-cell'}>{contents}</div>;
  }
}

export default Cell;
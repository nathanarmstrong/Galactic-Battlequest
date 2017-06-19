import React from 'react';
import Cell from './Cell';

class Grid extends React.Component {
  render() {
    // Generate cells
    const rows = [];
    for (let r = 0; r < this.props.rowCount; r++) {
      const row = [];
      for (let c = 0; c < this.props.columnCount; c++) {
        row.push(<Cell key={c} />);
      }
      rows.push(<div key={r} className={'grid-row'}>{row}</div>);
    }

    // Generate row & column names
    const rowNames = [];
    for (let r = 0; r < this.props.rowCount; r++) {
      rowNames.push(<Cell key={r} contents={String.fromCharCode('A'.charCodeAt(0) + r)} />);
    }
    const columnNames = [];
    for (let c = 0; c < this.props.columnCount; c++) {
      columnNames.push(<Cell key={c} contents={c} />);
    }

    return (
      <div className={'grid-container'}>
        <div>
          <div></div>
          <div className={'column-names'}>{columnNames}</div>
        </div>
        <div>
          <div className={'row-names'}>{rowNames}</div>
          <div>
            <div className={'grid'}>{rows}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;
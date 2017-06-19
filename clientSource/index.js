import React from 'react';
import ReactDOM from 'react-dom';

import Grid from './Grid';

document.addEventListener('DOMContentLoaded', (event) => {
  ReactDOM.render(
    <Grid rowCount={10} columnCount={10} />,
    document.getElementById('root')
  );
});
import React from 'react';
import JsonView from '@uiw/react-json-view';

import './Results.scss';


function Results(props) {
  return (
    <section>
      <JsonView data-testid="results" value={props.data.data} style={{ fontSize: '1rem' }} collapsed={3} />
    </section>
  );
}

export default Results;

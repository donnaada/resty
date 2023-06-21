import React from 'react';
import JsonView from '@uiw/react-json-view';

import './Results.scss';


function Results(props) {
  return (
    <section>
      <JsonView data-testid="results" value={props.data} style={{fontSize:'1rem'}} collapsed={1} />
    </section>
  );
}

export default Results;

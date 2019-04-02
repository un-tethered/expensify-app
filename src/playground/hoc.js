import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>This is the info</h1>
    <p>Info: {props.info}</p>
  </div>
);

const higherOrderNigga = WrappedNigga => props => (
  <div>
    <p>I am higher Nigga</p>
    <WrappedNigga {...props} />
  </div>
);

const HigherNigga = higherOrderNigga(Info);

ReactDOM.render(<HigherNigga info="She said is this an ocean? It's just a pool" />, document.getElementById('app'));
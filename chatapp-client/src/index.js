import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider';


ReactDOM.render(
  <ActionCableProvider url={'ws://localhost:3001/cable'}>
    <App />
  </ActionCableProvider>,
  document.getElementById('root')
);

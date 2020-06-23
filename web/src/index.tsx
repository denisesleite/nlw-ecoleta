import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import App from './App-introducao-react'; ESTA LINHA EXECUTARIA O OUTRO ARQUIVO DE EXEMPLO

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
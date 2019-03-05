import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Using bootstrap CSS
import 'bootstrap/dist/css/bootstrap-grid.css';
// Using CSS of Stora Enso SEEDS
import '@storaensods/se-design-system/dist/css/styles.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

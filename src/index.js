import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as R } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<R><App /></R>, document.getElementById('root'));
registerServiceWorker();

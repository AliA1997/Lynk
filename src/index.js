import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as R } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './ducks/store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<R><Provider store={store}><PersistGate persistor={persistor}><App /></PersistGate></Provider></R>,
     document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './Redux/rootReducer';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer, applyMiddleware(thunk))

export const URL = process.env.BACKEND_URL || 'http://localhost'
export const PORT = 3000

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();

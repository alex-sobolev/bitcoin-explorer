import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import combinedReducer from './combinedReducer';
import thunkMiddleware from 'redux-thunk';

const middlewares = [ thunkMiddleware ];
const store = createStore(combinedReducer, composeWithDevTools(applyMiddleware(...middlewares)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

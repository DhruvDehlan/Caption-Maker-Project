import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Homepage from './Components/Homepage';
import './Components/Homepage.css';

const App = () => (
  <Provider store={store}>
    <Homepage />
  </Provider>
);

export default App;

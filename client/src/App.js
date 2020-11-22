import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Utility/Navbar';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
      </Router>
    </Provider>
  );
}

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';
import Dashboard from './components/Dashboard/Dashboard';
import Movie from './components/Movie/Movie';
import Search from './components/Search/SearchMovie';
import Navbar from './components/Utility/Navbar';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Dashboard} />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/movie/:id" component={Movie} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

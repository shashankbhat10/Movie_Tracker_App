import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';
import Dashboard from './components/Dashboard/Dashboard';
import Movie from './components/Movie/Movie';
import MovieCompleteCast from './components/Movie/MovieCompleteCast/MovieCompleteCast';
import Person from './components/People/Person';
import Search from './components/Search/SearchMovie';
import TV from './components/TV/TV';
import TVCompleteCredits from './components/TV/TVCompleteCredits/TVCompleteCredits';
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
          <Route exact path="/tv/:id" component={TV} />
          <Route exact path="/person/:id" component={Person} />
          <Route
            exact
            path="/movie/:id/complete-cast"
            component={MovieCompleteCast}
          />
          <Route
            exact
            path="/tv/:id/complete-credits"
            component={TVCompleteCredits}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

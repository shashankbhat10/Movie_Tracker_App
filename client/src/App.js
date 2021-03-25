import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { checkAuth } from './actions/auth';
import { getProfileData } from './actions/profile';

import './App.scss';
import Homepage from './components/Homepage/Homepage';
import Landing from './components/Landing/Landing';
import Movie from './components/Movie/Movie';
import MovieCompleteCast from './components/Movie/MovieCompleteCast/MovieCompleteCast';
import Person from './components/People/Person';
import Search from './components/Search/SearchMovie';
import TV from './components/TV/TV';
import TVCompleteCredits from './components/TV/TVCompleteCredits/TVCompleteCredits';
import Navbar from './components/Utility/Navbar';

import store from './store';

store.dispatch(checkAuth());
store.dispatch(getProfileData());

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/homepage" component={Homepage} />
          <Route exact path="/movie/:id" component={Movie} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/tv/:id" component={TV} />
          <Route exact path="/person/:id" component={Person} />
          <Route
            exact
            path="/movie/:id/complete-credits"
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

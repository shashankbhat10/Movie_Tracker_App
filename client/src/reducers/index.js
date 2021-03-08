import { combineReducers } from 'redux';
import alert from './alert';
import movie from './movie';
import search from './search';
import dashboard from './dashboard';
import tv from './tv';
import person from './person';
import auth from './auth';

export default combineReducers({
  alert,
  movie,
  search,
  dashboard,
  tv,
  person,
  auth,
});

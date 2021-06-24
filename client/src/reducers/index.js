import { combineReducers } from 'redux';
import alert from './alert';
import movie from './movie';
import search from './search';
import homepage from './homepage';
import tv from './tv';
import person from './person';
import auth from './auth';
import profile from './profile';
import dashboard from './dashboard';

export default combineReducers({
  alert,
  movie,
  search,
  homepage,
  tv,
  person,
  auth,
  profile,
  dashboard,
});

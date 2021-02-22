import { combineReducers } from 'redux';
import alert from './alert';
import movie from './movie';
import search from './search';
import dashboard from './dashboard';

export default combineReducers({ alert, movie, search, dashboard });

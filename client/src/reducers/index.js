import { combineReducers } from 'redux';
import alert from './alert';
import movie from './movie';
import search from './search';

export default combineReducers({ alert, movie, search });

import { combineReducers } from 'redux';
import alert from './alert';
import movie from './movie';

export default combineReducers({ alert, movie });

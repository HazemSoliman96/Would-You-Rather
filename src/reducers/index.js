import { combineReducers } from 'redux';
import User from './User';
import users from './users';
import questions from './questions';

export default combineReducers({
  User,
  users,
  questions
});

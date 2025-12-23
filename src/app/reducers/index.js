import { combineReducers } from 'redux';

import user from './user';
import posts from './posts';
import users from './users';
import notifications from './notification';

export default combineReducers({
  user,
  posts,
  users,
  notifications,
});

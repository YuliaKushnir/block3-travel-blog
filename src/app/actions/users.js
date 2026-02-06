import storage, { keys } from 'misc/storage';
import {
  REQUEST_USERS,
  RECEIVE_USERS,
  ERROR_USERS,
} from '../constants/usersActionTypes';
import config from 'config';
import {api} from 'misc/requests';

const { USER_SERVICE } = config;

export const requestUsers = () => ({ type: REQUEST_USERS, });
export const receiveUsers = (users) => ({ type: RECEIVE_USERS, payload: users, });
export const errorUsers = (error) => ({ type: ERROR_USERS, error, });

export const fetchUsers = () => (dispatch) => {
  dispatch(requestUsers());

  return api.get(`${USER_SERVICE}`)
    .catch(() => {
      const storedUsers = storage.getItem(keys.USERS);
      return { data: storedUsers ? JSON.parse(storedUsers) : [] };
    })
    .then(({ data }) => {
      const usersArray = Array.isArray(data) ? data : [];
      storage.setItem(keys.USERS, JSON.stringify(usersArray));
      dispatch(receiveUsers(usersArray));
    })
    .catch((error) => {
      dispatch(errorUsers(error));
    });
};
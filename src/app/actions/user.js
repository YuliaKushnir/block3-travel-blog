import { api } from 'misc/requests';
import {
  REQUEST_USER,
  RECEIVE_USER,
} from '../constants/actionTypes';
import { login } from './auth';

export const fetchProfile = () => async (dispatch) => {
  dispatch({ type: REQUEST_USER });

  try {
    const res = await api.get('/api/profile', { withCredentials: true });
    dispatch({ type: RECEIVE_USER, payload: res.data });
    return res.data;
  } catch (e) {
    if (e.response?.status === 401) {
      // dispatch({ type: AUTH_ERROR });
      // login();
      window.location.href = `http://34.118.68.15.nip.io/oauth2/authorization/google`;
    } 
  }
};

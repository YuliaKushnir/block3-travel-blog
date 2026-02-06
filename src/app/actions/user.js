import { api } from 'misc/requests';
import {
  REQUEST_USER,
  RECEIVE_USER,
} from '../constants/actionTypes';
import config from 'config';

export const fetchProfile = () => async (dispatch) => {
  dispatch({ type: REQUEST_USER });

  try {
    const res = await api.get('/profile', { withCredentials: true });
    dispatch({ type: RECEIVE_USER, payload: res.data });
    return res.data;
  } catch (e) {
    // if (e.response?.status === 401 || e.response?.status === 302) {
      // dispatch({ type: AUTH_ERROR });
      window.location.href = `${config.BLOG_GATEWAY}/oauth2/authorization/google`;
    // } 
  }
};

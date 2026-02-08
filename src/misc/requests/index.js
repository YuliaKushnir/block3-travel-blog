import axios from 'axios';
// import config from 'config';

const api = axios.create({
  baseURL: "",
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('User is not authenticated (401)');
      window.location.href = `https://34.118.68.15.nip.io/oauth2/authorization/google`;
    }
    return Promise.reject(error);
  }
);

export {api}
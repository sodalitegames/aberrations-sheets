import Axios from 'axios';

Axios.defaults.baseURL = process.env.REACT_APP_AUTH_API;

export function signUserIn(body) {
  return Axios.post(`/auth/login?app=sheets`, body);
}

export function signUserUp(body) {
  return Axios.post(`/auth/signup?app=sheets`, body);
}

export function fetchUser(token) {
  return Axios.get(`/users/getMe`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

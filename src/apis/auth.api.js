import Axios from 'axios';

const apiUrl = process.env.REACT_APP_AUTH_API;

const authApi = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const signUserIn = body => authApi.post(`/auth/login`, body);
export const signUserUp = body => authApi.post(`/auth/signup`, body);

export const getUser = () => authApi.get(`/users/getMe`);

export default authApi;

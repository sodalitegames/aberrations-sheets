import Axios from 'axios';

const apiUrl = `http://localhost:2120/v1`;

const authApi = Axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2VmYTFjMWY1N2U4ODY1MWRmMGRhYyIsImlhdCI6MTYzNjE0NjE1NCwiZXhwIjoxNjQzOTIyMTU0fQ.fl5wwM-3a-uK_fwhg-VfQ8m-W4Tq8-vj_pJYC6FsFRo`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const signUserIn = body => authApi.post(`/auth/login`, body);
export const signUserUp = body => authApi.post(`/auth/signup`, body);

export const getUser = () => authApi.get(`/users/getMe`);

export default authApi;

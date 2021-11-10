import Axios from 'axios';

const apiUrl = `http://localhost:1337`;

const manageApi = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default manageApi;

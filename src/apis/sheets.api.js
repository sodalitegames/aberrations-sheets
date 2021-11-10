import Axios from 'axios';

const apiUrl = `http://localhost:2341/v1`;

const sheetsApi = Axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2VmYTFjMWY1N2U4ODY1MWRmMGRhYyIsImlhdCI6MTYzNjE0NjE1NCwiZXhwIjoxNjQzOTIyMTU0fQ.fl5wwM-3a-uK_fwhg-VfQ8m-W4Tq8-vj_pJYC6FsFRo`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default sheetsApi;

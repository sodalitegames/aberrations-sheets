import Axios from 'axios';

const apiUrl = `http://localhost:1337`;

const manageApi = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const fetchSpecies = query => manageApi.get(`/species/${query ? query : ''}`);
export const fetchAugmentations = () => manageApi.get('/augmentation-groups');
export const fetchWeapons = () => manageApi.get('/weapons?type=Standard');

export const fetchConsumableCategories = () => manageApi.get('/consumables-categories');
export const fetchCreatureTypes = () => manageApi.get('/creature-types');

export default manageApi;

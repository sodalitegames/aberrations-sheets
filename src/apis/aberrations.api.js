import Axios from 'axios';

const apiUrl = process.env.REACT_APP_ABERRATIONS_API;

const aberrationsApi = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const fetchSpecies = query => aberrationsApi.get(`/species/${query ? query : ''}`);
export const fetchAugmentations = () => aberrationsApi.get('/augmentation-groups');
export const fetchWeapons = () => aberrationsApi.get('/weapons?type=Standard');

export const fetchConsumableCategories = () => aberrationsApi.get('/consumables-categories');
export const fetchCreatureTypes = () => aberrationsApi.get('/creature-types');

export const fetchNpcTypes = () => aberrationsApi.get('/preset-npc-types');

export default aberrationsApi;

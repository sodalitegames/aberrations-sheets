import Axios from 'axios';

import { Species, AugmentationGroup, Weapon, ConsumableCategory, CreatureType, NpcType } from '../models/interfaces/data';

const apiUrl = process.env.REACT_APP_ABERRATIONS_API;

const aberrationsApi = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const fetchSpecies = (query?: string): Promise<Species[]> => aberrationsApi.get(`/species/${query ? query : ''}`);
export const fetchAugmentationGroups = (): Promise<AugmentationGroup[]> => aberrationsApi.get('/augmentation-groups');
export const fetchWeapons = (): Promise<Weapon[]> => aberrationsApi.get('/weapons?type=Standard');

export const fetchConsumableCategories = (): Promise<ConsumableCategory[]> => aberrationsApi.get('/consumables-categories');
export const fetchCreatureTypes = (): Promise<CreatureType[]> => aberrationsApi.get('/creature-types');

export const fetchNpcTypes = (): Promise<NpcType[]> => aberrationsApi.get('/preset-npc-types');

export default aberrationsApi;

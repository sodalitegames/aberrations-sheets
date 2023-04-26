import Axios from 'axios';

import { Species, AugmentationGroup, Weapon, ConsumableCategory, CreatureType, NpcType } from '../models/resource';

const apiUrl = process.env.REACT_APP_DATABASE_API;

const databaseApi = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const fetchSingleSpecies = (id: string): Promise<Species> => databaseApi.get(`/species/${id}`);

export const fetchSpecies = (): Promise<Species[]> => databaseApi.get('/species?limit=100');
export const fetchAugmentationGroups = (): Promise<AugmentationGroup[]> => databaseApi.get('/augmentation-groups?limit=100');
export const fetchWeapons = (): Promise<Weapon[]> => databaseApi.get('/weapons?limit=100');

export const fetchConsumableCategories = (): Promise<ConsumableCategory[]> => databaseApi.get('/consumable-categories?limit=100');
export const fetchCreatureTypes = (): Promise<CreatureType[]> => databaseApi.get('/creature-types?limit=100');

export const fetchNpcTypes = (): Promise<NpcType[]> => databaseApi.get('/npc-types?limit=100');

export default databaseApi;

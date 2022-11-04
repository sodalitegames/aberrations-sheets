import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectSpecies, selectAugmentationGroups, selectWeapons, selectConsumableCategories, selectCreatureTypes, selectNpcTypes } from '../redux/resource/resource.selectors';

import { useActions } from './useActions';

import { FetchedResourceType } from '../models/resource';

export const useResource = (resource: FetchedResourceType) => {
  const { fetchResourceStart } = useActions();

  const species = useSelector(selectSpecies);
  const augmentationGroups = useSelector(selectAugmentationGroups);
  const weapons = useSelector(selectWeapons);
  const consumableCategories = useSelector(selectConsumableCategories);
  const creatureTypes = useSelector(selectCreatureTypes);
  const npcTypes = useSelector(selectNpcTypes);

  useEffect(() => {
    switch (resource) {
      case FetchedResourceType.Species:
        if (!species) fetchResourceStart(FetchedResourceType.Species);
        return;
      case FetchedResourceType.AugmentationGroups:
        if (!augmentationGroups) fetchResourceStart(FetchedResourceType.AugmentationGroups);
        return;
      case FetchedResourceType.Weapons:
        if (!weapons) fetchResourceStart(FetchedResourceType.Weapons);
        return;
      case FetchedResourceType.ConsumableCategories:
        if (!consumableCategories) fetchResourceStart(FetchedResourceType.ConsumableCategories);
        return;
      case FetchedResourceType.CreatureTypes:
        if (!creatureTypes) fetchResourceStart(FetchedResourceType.CreatureTypes);
        return;
      case FetchedResourceType.NpcTypes:
        if (!npcTypes) fetchResourceStart(FetchedResourceType.NpcTypes);
        return;
      default:
        return;
    }
  }, [fetchResourceStart, resource, species, augmentationGroups, weapons, consumableCategories, creatureTypes, npcTypes]);

  const getRequestedResource = (resource: FetchedResourceType) => {
    switch (resource) {
      case FetchedResourceType.Species:
        return species;
      case FetchedResourceType.AugmentationGroups:
        return augmentationGroups;
      case FetchedResourceType.Weapons:
        return weapons;
      case FetchedResourceType.ConsumableCategories:
        return consumableCategories;
      case FetchedResourceType.CreatureTypes:
        return creatureTypes;
      case FetchedResourceType.NpcTypes:
        return npcTypes;
      default:
        return null;
    }
  };

  return getRequestedResource(resource);
};

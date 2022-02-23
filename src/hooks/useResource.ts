import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectSpecies, selectAugmentationGroups, selectWeapons, selectConsumableCategories, selectCreatureTypes } from '../redux/resource/resource.selectors';

import { useActions } from './useActions';

import { ResourceType } from '../models/enums';

export const useResource = (resource: ResourceType) => {
  const { fetchResourceStart } = useActions();

  const species = useSelector(selectSpecies);
  const augmentationGroups = useSelector(selectAugmentationGroups);
  const weapons = useSelector(selectWeapons);
  const consumableCategories = useSelector(selectConsumableCategories);
  const creatureTypes = useSelector(selectCreatureTypes);

  useEffect(() => {
    switch (resource) {
      case ResourceType.Species:
        if (!species) fetchResourceStart(ResourceType.Species);
        return;
      case ResourceType.AugmentationGroups:
        if (!augmentationGroups) fetchResourceStart(ResourceType.AugmentationGroups);
        return;
      case ResourceType.Weapons:
        if (!weapons) fetchResourceStart(ResourceType.Weapons);
        return;
      case ResourceType.ConsumableCategories:
        if (!consumableCategories) fetchResourceStart(ResourceType.ConsumableCategories);
        return;
      case ResourceType.CreatureTypes:
        if (!creatureTypes) fetchResourceStart(ResourceType.CreatureTypes);
        return;
      default:
        return;
    }
  }, [fetchResourceStart, resource, species, augmentationGroups, weapons, consumableCategories, creatureTypes]);

  const getRequestedResource = (resource: ResourceType) => {
    switch (resource) {
      case ResourceType.Species:
        return species;
      case ResourceType.AugmentationGroups:
        return augmentationGroups;
      case ResourceType.Weapons:
        return weapons;
      case ResourceType.ConsumableCategories:
        return consumableCategories;
      case ResourceType.CreatureTypes:
        return creatureTypes;
      default:
        return null;
    }
  };

  return getRequestedResource(resource);
};

import { Species, Abilities } from '../../models/resource';

export const getSpeciesAbility = (speciesId: string, speciesList: Species[]): Abilities => {
  const currSpec = getSpecies(speciesId, speciesList);
  if (!currSpec) return { activated: 'no_species_found', passive: 'no_species_found', detraction: 'no_species_found' };
  return currSpec.abilities;
};

export const getSpecies = (speciesId: string, speciesList: Species[]): Species | undefined => {
  if (!speciesList) return undefined;
  const species = speciesList.find(spec => spec.id === speciesId);
  return species;
};

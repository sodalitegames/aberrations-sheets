export const getSpeciesAbility = (speciesId, speciesList) => {
  if (!speciesList) return 'Loading...';
  const currSpec = speciesList.find(spec => spec._id === speciesId);
  return currSpec.abilities;
};

export const getSpecies = (speciesId, speciesList) => {
  if (!speciesList) return 'Loading...';
  const species = speciesList.find(spec => spec._id === speciesId);
  return species;
};

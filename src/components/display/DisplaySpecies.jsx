import DescriptionList from '../data/DescriptionList';

const DisplaySpecies = ({ species }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Species Name', values: [species.name] },
        { name: 'Species Ability', values: [species.ability] },
        // { name: 'Appearance', values: [species.appearance] },
        // { name: 'Basic Info', values: [species.basicInfo] },
        { name: 'Fortitude Base', values: [species.stats.fortitude], half: true },
        { name: 'Agility Base', values: [species.stats.agility], half: true },
        { name: 'Persona Base', values: [species.stats.persona], half: true },
        { name: 'Aptitude Base', values: [species.stats.aptitude], half: true },
      ]}
    />
  );
};

export default DisplaySpecies;

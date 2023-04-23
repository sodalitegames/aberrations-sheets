import DescriptionList from '../data/DescriptionList';

const DisplaySpecies = ({ species }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Species Name', values: [species.name] },
        { name: 'Health', values: [species.health.starting], half: true },
        { name: 'Increment', values: [species.health.increment], half: true },
        { name: 'Strength', values: [`D${species.stats.strength}`], half: true },
        { name: 'Agility', values: [`D${species.stats.agility}`], half: true },
        { name: 'Persona', values: [`D${species.stats.persona}`], half: true },
        { name: 'Aptitude', values: [`D${species.stats.aptitude}`], half: true },
        { name: 'Appearance', values: [species.appearance] },
        { name: 'Activated Ability', values: [species.abilities.activated] },
        { name: 'Passive Abilities', values: [species.abilities.passive] },
        { name: 'Detraction', values: [species.abilities.detraction] },
      ]}
    />
  );
};

export default DisplaySpecies;

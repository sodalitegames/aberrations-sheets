import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { ResourceType } from '../../../models/enums';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Row from '../elements/Row';
import { SelectInput } from '../elements/Select';
import { LoadingSpinner } from '../elements/SubmitButton';
import Detail from '../elements/Detail';
import Select from '../elements/Select';

import DisplaySpecies from '../../display/DisplaySpecies';
import Notice from '../../Notice';

const NpcForm = ({ id }) => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const fetchedSpecies = useResource(ResourceType.Species);
  const fetchedTypes = useResource(ResourceType.NpcTypes);

  const [speciesList, setSpeciesList] = useState(null);
  const [typesList, setTypesList] = useState(null);

  const [name, setName] = useState('');
  const [diplomacy, setDiplomacy] = useState('');
  const [temperament, setTemperament] = useState('');

  // Only needed if creating
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');

  const [levelId, setLevelId] = useState(null);

  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (fetchedSpecies) {
      // Format the species list for the select component
      const newSpeciesList = fetchedSpecies.map(spec => {
        return {
          id: spec.id,
          name: spec.name,
        };
      });

      setSpeciesList(newSpeciesList);
    }

    if (fetchedTypes) {
      // Format the types list for the select component
      const newTypesList = fetchedTypes.npcTable.map(type => {
        return {
          id: type.id,
          name: type.npcType,
        };
      });

      setTypesList(newTypesList);
    }
  }, [fetchedSpecies, fetchedTypes]);

  useEffect(() => {
    if (id && campSheet) {
      const currentNpc = campSheet.npcs.find(npc => npc._id === id);

      setName(currentNpc.name);
      setDiplomacy(currentNpc.diplomacy);
      setTemperament(currentNpc.temperament);
      setSpecies(fetchedSpecies ? fetchedSpecies.find(spec => spec.id === currentNpc.speciesId) : '');
      setType(fetchedTypes ? fetchedTypes.npcTable.find(type => type.npcType === currentNpc.type) : '');
      setLevelId(currentNpc.levelId);
    }
  }, [id, campSheet, fetchedTypes, fetchedSpecies]);

  const selectCurrentSpecies = e => {
    if (!e.target.value) setSpecies('');

    const currSpec = fetchedSpecies.find(spec => spec.id === e.target.value);

    setSpecies(currSpec);
  };

  const selectCurrentType = e => {
    if (!e.target.value) setType('');

    const currType = fetchedTypes.npcTable.find(type => type.id === e.target.value);

    setType(currType);
  };

  const selectLevel = e => {
    if (!e.target.value) return setLevelId('');
    setLevelId(e.target.value);
  };

  const selectDiplomacy = e => {
    if (!e.target.value) return setDiplomacy(null);
    setDiplomacy(e.target.value);
  };

  const selectTemperament = e => {
    if (!e.target.value) return setTemperament(null);
    setTemperament(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!name) return alert('Must provide a name');
    if (!diplomacy) return alert('Must provide a diplomacy');
    if (!temperament) return alert('Must provide a temperament');

    // Check for species, type, and level
    if (!species) return alert('Must select a species');
    if (!type) return alert('Must select a type');
    if (!levelId) return alert('Must select a levelId');

    // Get level data based on the type and the saved id
    const levelData = type.level.find(lev => lev.id === levelId);

    let body = {
      name,
      diplomacy,
      temperament,
    };

    if (id) {
      // Get the current npc data
      const currentNpc = campSheet.npcs.find(npc => npc._id === id);

      if (levelId !== currentNpc.levelId) {
        body = {
          ...body,
          // fortitude: { ...currentNpc.fortitude, points: species.stats.fortitude + levelData.fortitude },
          // agility: { ...currentNpc.agility, points: species.stats.agility + levelData.agility },
          // persona: { ...currentNpc.persona, points: species.stats.persona + levelData.persona },
          // aptitude: { ...currentNpc.aptitude, points: species.stats.aptitude + levelData.aptitude },
          // // calculate currentHp and stats based on the type and level
          // currentHp: (species.stats.fortitude + levelData.fortitude) * 10,
        };
      }

      dispatch(
        updateSheetResourceStart('campaigns', campSheet._id, 'npcs', id, body, {
          slideOver: true,
          notification: { status: 'success', heading: 'Npc Updated', message: `You have successfully updated ${name}.` },
        })
      );
      return;
    }

    if (!description) return alert('Must select a description');
    if (!background) return alert('Must provide a background');

    body = {
      ...body,
      type: type.npcType,
      speciesId: species.id,
      speciesName: species.name,
      levelId,
      description,
      background,
      currentHp: species.health,
      maxHp: species.health,
      strength: { die: species.stats.strength },
      agility: { die: species.stats.agility },
      persona: { die: species.stats.persona },
      aptitude: { die: species.stats.aptitude },
      // fortitude: { points: species.stats.fortitude + levelData.fortitude },
      // agility: { points: species.stats.agility + levelData.agility },
      // persona: { points: species.stats.persona + levelData.persona },
      // aptitude: { points: species.stats.aptitude + levelData.aptitude },
      // // calculate currentHp and stats based on the type and level
      // currentHp: (species.stats.fortitude + levelData.fortitude) * 10,
    };

    dispatch(
      createSheetResourceStart('campaigns', campSheet._id, 'npcs', body, {
        slideOver: true,
        notification: { status: 'success', heading: 'Npc Created', message: `You have successfully created ${name}.` },
      })
    );
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Npc' : 'New Npc'}
      description={id ? 'Update the information below to edit your npc.' : 'Fill out the information below to create your new npc.'}
      submitText={id ? 'Save npc' : 'Create npc'}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Name" type="text" name="name" value={name} changeHandler={setName} />

      <Select
        slideOver
        label="Diplomacy"
        name="diplomacy"
        value={diplomacy}
        options={[
          { name: 'Ally', id: 'Ally' },
          { name: 'Neutral', id: 'Neutral' },
          { name: 'Enemy', id: 'Enemy' },
        ]}
        changeHandler={selectDiplomacy}
        required
      />

      <Select
        slideOver
        label="Temperament"
        name="temperament"
        value={temperament}
        options={[
          { name: 'Earth', id: 'Earth' },
          { name: 'Fire', id: 'Fire' },
          { name: 'Water', id: 'Water' },
          { name: 'Air', id: 'Air' },
        ]}
        changeHandler={selectTemperament}
        required
      />

      {id ? (
        <Row slideOver name="species" label="Species">
          {species ? <DisplaySpecies species={species} /> : <LoadingSpinner dark />}
        </Row>
      ) : (
        <Row slideOver name="species" label="Species">
          {fetchedSpecies && speciesList ? (
            <>
              <SelectInput name="species" value={species ? species.id : ''} options={speciesList} changeHandler={selectCurrentSpecies} />
              {species ? (
                <ul className="mt-3 divide-y divide-gray-200">
                  <DisplaySpecies species={species} />
                </ul>
              ) : null}
            </>
          ) : (
            <Row slideOver label="Species" name="species">
              <LoadingSpinner dark />
            </Row>
          )}
        </Row>
      )}

      {id ? (
        <Detail slideOver label="Type" detail={type.npcType} />
      ) : (
        <Row slideOver name="type" label="Type">
          {fetchedTypes && typesList ? (
            <>
              <SelectInput name="type" value={type ? type.id : ''} options={typesList} changeHandler={selectCurrentType} />
            </>
          ) : (
            <Row slideOver label="Type" name="type">
              <LoadingSpinner dark />
            </Row>
          )}
        </Row>
      )}

      <Select
        slideOver
        label="Level &amp; Power"
        name="level"
        value={levelId || ''}
        options={type ? type.level.map(level => ({ name: `${level.totalPower} Power (Base + ${level.powerAdded})`, id: level._id })) : []}
        changeHandler={selectLevel}
        required
      />

      {id && <Notice status="warn" message="Note: Changing your npc's level &amp; power will reset their stats" />}

      {!id && (
        <>
          <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} />
          <TextArea slideOver label="Background" name="background" rows={8} value={background} changeHandler={setBackground} />
        </>
      )}
    </SlideOverForm>
  );
};

export default NpcForm;

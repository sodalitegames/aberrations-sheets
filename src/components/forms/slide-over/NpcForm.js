import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { FetchedResourceType } from '../../../models/resource';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Row from '../elements/Row';
import { BasicSelect } from '../elements/Select';
import { LoadingSpinner } from '../elements/SubmitButton';
import Select from '../elements/Select';

import DisplaySpecies from '../../display/DisplaySpecies';
import Notice from '../../Notice';

const NpcForm = ({ id }) => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const fetchedSpecies = useResource(FetchedResourceType.Species);
  const fetchedTypes = useResource(FetchedResourceType.NpcTypes);

  const [speciesList, setSpeciesList] = useState(null);
  const [typesList, setTypesList] = useState(null);

  const [name, setName] = useState('');
  const [diplomacy, setDiplomacy] = useState('Neutral');
  const [temperament, setTemperament] = useState('Earth');

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

    // Get level data based on the type and the saved id
    const levelData = levelId ? type.level.find(lev => lev.id === levelId) : null;

    let body = {
      name,
      diplomacy,
      temperament,
      type: type ? type.npcType : undefined,
      levelId: levelId ? levelId : undefined,
    };

    if (id) {
      // Get the current npc data
      const currentNpc = campSheet.npcs.find(npc => npc._id === id);

      if (levelData && levelId !== currentNpc.levelId) {
        body = {
          ...body,
          strength: { ...currentNpc.strength, die: levelData.strength },
          agility: { ...currentNpc.agility, die: levelData.agility },
          persona: { ...currentNpc.persona, die: levelData.persona },
          aptitude: { ...currentNpc.aptitude, die: levelData.aptitude },
          currentHp: levelData.health,
          maxHp: levelData.health,
          experience: levelData.experience,
          milestones: levelData.milestone,
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
      speciesId: species.id,
      speciesName: species.name,
      description,
      background,
      currentHp: species.health,
      maxHp: species.health,
      strength: { die: species.stats.strength },
      agility: { die: species.stats.agility },
      persona: { die: species.stats.persona },
      aptitude: { die: species.stats.aptitude },
    };

    if (levelData) {
      body = {
        ...body,
        strength: { die: levelData.strength },
        agility: { die: levelData.agility },
        persona: { die: levelData.persona },
        aptitude: { die: levelData.aptitude },
        currentHp: levelData.health,
        maxHp: levelData.health,
        experience: levelData.experience,
        milestones: levelData.milestone,
      };
    }

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
              <BasicSelect name="species" value={species ? species.id : ''} options={speciesList} changeHandler={selectCurrentSpecies} />
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

      <Row slideOver name="type" label="Type (Opt.)">
        {fetchedTypes && typesList ? (
          <>
            <BasicSelect name="type" value={type ? type.id : ''} options={typesList} changeHandler={selectCurrentType} />
          </>
        ) : (
          <Row slideOver label="Type" name="type">
            <LoadingSpinner dark />
          </Row>
        )}
      </Row>

      <Select
        slideOver
        label="Level (Opt.)"
        name="level"
        value={levelId || ''}
        options={
          type
            ? type.level.map(level => ({ name: `Milestone ${level.milestone} - D${level.strength} / D${level.agility} / D${level.persona} / D${level.aptitude} / ${level.health} HP`, id: level._id }))
            : []
        }
        changeHandler={selectLevel}
      />

      {id && <Notice status="warn" message="Note: Changing your npc's level will reset their stats" />}

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

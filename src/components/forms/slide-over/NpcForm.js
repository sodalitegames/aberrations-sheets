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

const NpcForm = ({ id }) => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const fetchedSpecies = useResource(ResourceType.Species);
  const fetchedTypes = useResource(ResourceType.NpcTypes);

  const [speciesList, setSpeciesList] = useState(null);
  const [typesList, setTypesList] = useState(null);

  const [name, setName] = useState('');
  const [diplomacy, setDiplomacy] = useState('Ally');
  const [temperament, setTemperament] = useState('Earth');
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');

  // Only needed if editing
  const [wallet, setWallet] = useState('');
  // mortality
  // spentUpgradePoints
  // currentHp
  // conditions

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
      setDescription(currentNpc.description);
      setBackground(currentNpc.background);

      setSpecies(fetchedSpecies ? fetchedSpecies.find(spec => spec.id === currentNpc.speciesId) : '');
      setType(fetchedTypes ? fetchedTypes.npcTable.find(type => type.npcType === currentNpc.type) : '');
      setLevelId(currentNpc.levelId);

      // Only needed if editing
      setWallet(currentNpc.wallet);
      // mortality
      // spentUpgradePoints
      // currentHp
      // conditions
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

  const submitHandler = async e => {
    e.preventDefault();

    if (!name) return alert('Must provide a name');
    if (!diplomacy) return alert('Must provide a diplomacy');
    if (!temperament) return alert('Must provide a temperament');
    if (!description) return alert('Must select a description');
    if (!background) return alert('Must provide a background');

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
      description,
      background,
      // calculate currentHp and stats based on the type and level
      currentHp: (species.stats.fortitude + levelData.fortitude) * 5,
    };

    if (id) {
      // Check for properties that are only there when editing an npc
      if (!wallet) return alert('Must provide a wallet amount');

      // Get the current npc data
      const currentNpc = campSheet.npcs.find(npc => npc._id === id);

      body = {
        ...body,
        wallet,
        fortitude: { ...currentNpc.fortitude, points: species.stats.fortitude + levelData.fortitude },
        agility: { ...currentNpc.agility, points: species.stats.agility + levelData.agility },
        persona: { ...currentNpc.persona, points: species.stats.persona + levelData.persona },
        aptitude: { ...currentNpc.aptitude, points: species.stats.aptitude + levelData.aptitude },
      };

      dispatch(
        updateSheetResourceStart('campaigns', campSheet._id, 'npcs', id, body, {
          slideOver: true,
          notification: { status: 'success', heading: 'Npc Updated', message: `You have successfully updated ${name}.` },
        })
      );
      return;
    }

    body = {
      ...body,
      type: type.npcType,
      speciesId: species.id,
      speciesName: species.name,
      levelId,
      fortitude: { points: species.stats.fortitude + levelData.fortitude },
      agility: { points: species.stats.agility + levelData.agility },
      persona: { points: species.stats.persona + levelData.persona },
      aptitude: { points: species.stats.aptitude + levelData.aptitude },
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

      {id ? <Input slideOver label="Wallet" type="text" name="wallet" value={wallet} changeHandler={setWallet} /> : null}

      {/* Temperament - Radio Group */}
      {/* Diplomacy - Radio Group */}

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

      <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} />
      <TextArea slideOver label="Background" name="background" rows={8} value={background} changeHandler={setBackground} />
    </SlideOverForm>
  );
};

export default NpcForm;

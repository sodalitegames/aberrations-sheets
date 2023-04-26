import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { FetchedResourceType, NpcType, Species } from '../../../models/resource';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Row from '../elements/Row';
import { BasicSelect } from '../elements/Select';
import { LoadingSpinner } from '../elements/SubmitButton';
import Select from '../elements/Select';

import DisplaySpecies from '../../display/DisplaySpecies';
import Notice, { NoticeStatus } from '../../Notice';

import { SheetResourceType, SheetType } from '../../../models/sheet';
import { Npc } from '../../../models/sheet/resources';

interface Props {
  data: {
    sheetId: string;
    npc?: Npc;
  };
}

const NpcForm: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const fetchedSpecies = useResource(FetchedResourceType.Species) as Species[];
  const fetchedTypes = useResource(FetchedResourceType.NpcTypes) as NpcType[];

  const speciesOptions = (fetchedSpecies || []).map(spec => {
    return {
      id: spec.id,
      name: spec.name,
    };
  });

  const typesOptions = (fetchedTypes || []).map(type => {
    return {
      id: type.name,
      name: type.name,
    };
  });

  const [name, setName] = useState('');
  const [diplomacy, setDiplomacy] = useState('Neutral');
  const [temperament, setTemperament] = useState('Earth');
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');

  const [speciesId, setSpeciesId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [levelId, setLevelId] = useState('');

  const type = (fetchedTypes || []).find(type => type.name === typeId);
  const species = (fetchedSpecies || []).find(spec => spec.id === speciesId);

  useEffect(() => {
    if (data.npc) {
      setName(data.npc.name);
      setDiplomacy(data.npc.diplomacy);
      setTemperament(data.npc.temperament);
      setSpeciesId(data.npc.speciesId);
      setTypeId(data.npc.type);
      setLevelId(data.npc.levelId);
    }
  }, [data.npc]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!name) return alert('Must provide a name');
    if (!diplomacy) return alert('Must provide a diplomacy');
    if (!temperament) return alert('Must provide a temperament');

    // Check for species, type, and level
    if (!species) return alert('Must select a species');

    // Get level data based on the type and the saved id
    const levelData = levelId && type ? type.levels.find(lev => lev.id === levelId) : null;

    let body: any = {
      name,
      diplomacy,
      temperament,
      type: type ? type.name : undefined,
      levelId: levelId ? levelId : undefined,
    };

    if (data.npc) {
      if (levelData && levelId !== data.npc.levelId) {
        body = {
          ...body,
          strength: { ...data.npc.strength, die: levelData.strength },
          agility: { ...data.npc.agility, die: levelData.agility },
          persona: { ...data.npc.persona, die: levelData.persona },
          aptitude: { ...data.npc.aptitude, die: levelData.aptitude },
          // currentHp: levelData.health,
          // maxHp: levelData.health,
          // experience: levelData.experience,
          milestones: levelData.milestone,
        };
      }

      dispatch(
        updateSheetResourceStart(SheetType.campaigns, data.sheetId, SheetResourceType.npcs, data.npc._id, body, {
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
      currentHp: species.health.starting,
      maxHp: species.health.starting,
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
        // currentHp: levelData.health,
        // maxHp: levelData.health,
        // experience: levelData.experience,
        milestones: levelData.milestone,
      };
    }

    dispatch(
      createSheetResourceStart(SheetType.campaigns, data.sheetId, SheetResourceType.npcs, body, {
        slideOver: true,
        notification: { status: 'success', heading: 'Npc Created', message: `You have successfully created ${name}.` },
      })
    );
  };

  return (
    <SlideOverForm
      title={data.npc ? 'Edit Npc' : 'New Npc'}
      description={data.npc ? 'Update the information below to edit your npc.' : 'Fill out the information below to create your new npc.'}
      submitText={data.npc ? 'Save npc' : 'Create npc'}
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
        changeHandler={setDiplomacy}
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
        changeHandler={setTemperament}
        required
      />

      {data.npc ? (
        <Row slideOver name="species" label="Species">
          {species ? <DisplaySpecies species={species} /> : <LoadingSpinner dark />}
        </Row>
      ) : (
        <Row slideOver name="species" label="Species">
          {speciesOptions ? (
            <>
              <BasicSelect name="species" value={speciesId} options={speciesOptions} changeHandler={setSpeciesId} />
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
        {typesOptions ? (
          <>
            <BasicSelect name="type" value={typeId} options={typesOptions} changeHandler={setTypeId} />
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
        value={levelId}
        options={type ? type.levels.map(level => ({ name: `Milestone ${level.milestone} - D${level.strength} / D${level.agility} / D${level.persona} / D${level.aptitude}`, id: level.id })) : []}
        changeHandler={setLevelId}
      />

      {data.npc && <Notice status={NoticeStatus.Warn} message="Note: Changing your npc's level will reset their stats" />}

      {!data.npc && (
        <>
          <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} />
          <TextArea slideOver label="Background" name="background" rows={8} value={background} changeHandler={setBackground} />
        </>
      )}
    </SlideOverForm>
  );
};

export default NpcForm;

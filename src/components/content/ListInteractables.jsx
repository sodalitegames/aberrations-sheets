import { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { useActions } from '../../hooks/useActions';

import ListContainer from '../data/ListContainer';
import Notice from '../Notice';
import Button from '../Button';

import DisplayWeapon from '../display/DisplayWeapon';
import DisplayWearable from '../display/DisplayWearable';
import DisplayConsumable from '../display/DisplayConsumable';
import DisplayUsable from '../display/DisplayUsable';
import DisplayCreature from '../display/DisplayCreature';
import DisplayEnvironment from '../display/DisplayEnvironment';
import DisplayNpc from '../display/DisplayNpc';

import classNames from '../../utils/classNames';
import SlideOverTypes from '../../utils/SlideOverTypes';

const createForm = {
  weapons: SlideOverTypes.newWeaponForm,
  wearables: SlideOverTypes.wearableForm,
  consumables: SlideOverTypes.consumableForm,
  usables: SlideOverTypes.usableForm,
  creatures: SlideOverTypes.creatureForm,
  environments: SlideOverTypes.environmentForm,
  npcs: SlideOverTypes.npcForm,
};

export const ListInteractablesMessage = ({ show, interactableType }) => {
  return (
    <Fragment>
      {show !== 'current' || show !== 'all' ? (
        <div className="col-span-4">
          {show === 'archived' ? <Notice status="warn" message={`You are viewing your archived ${interactableType}. To view your current ${interactableType}, specify so below.`} /> : null}
          {show === 'active' ? <Notice status="success" message={`You are viewing only your active ${interactableType}. To view all of your ${interactableType}, specify so below.`} /> : null}
          {show === 'inactive' ? <Notice status="info" message={`You are viewing only your inactive ${interactableType}. To view all of your ${interactableType}, specify so below.`} /> : null}
        </div>
      ) : null}
    </Fragment>
  );
};

const ListInteractables = ({ sheetType, sheetId, id, interactablesList, show, interactableType, label }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSlideOver } = useActions();

  return (
    <>
      <ListContainer
        list={interactablesList}
        button={show !== 'archived' ? { click: () => setSlideOver({ type: createForm[interactableType], data: { sheetType, sheetId } }), text: `Add a new ${label}` } : null}
        empty={{
          heading: `No ${label}s`,
          message:
            show === 'archived'
              ? `You have no archived ${interactableType}`
              : show === 'active'
              ? `You have no active ${interactableType}.`
              : show === 'inactive'
              ? `You have no inactive ${interactableType}`
              : 'Get started by creating your first one now',
          button: show !== 'archived' ? { click: () => setSlideOver({ type: createForm[interactableType], data: { sheetType, sheetId } }), text: `New ${label}` } : null,
        }}
      >
        {interactablesList.map(interactable => (
          <div
            key={interactable._id}
            className={classNames('flex justify-between items-center px-2 cursor-pointer', id === interactable._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
            onClick={() => setSearchParams({ ...Object.fromEntries([...searchParams]), id: interactable._id })}
          >
            {interactableType === 'weapons' ? (
              <DisplayWeapon key={interactable._id} weapon={interactable} sheetType={sheetType} condensed listItem />
            ) : interactableType === 'wearables' ? (
              <DisplayWearable key={interactable._id} wearable={interactable} sheetType={sheetType} condensed listItem />
            ) : interactableType === 'consumables' ? (
              <DisplayConsumable key={interactable._id} consumable={interactable} sheetType={sheetType} condensed listItem />
            ) : interactableType === 'usables' ? (
              <DisplayUsable key={interactable._id} usable={interactable} sheetType={sheetType} condensed listItem />
            ) : interactableType === 'creatures' ? (
              <DisplayCreature key={interactable._id} creature={interactable} condensed listItem />
            ) : interactableType === 'environments' ? (
              <DisplayEnvironment key={interactable._id} environment={interactable} condensed listItem />
            ) : interactableType === 'npcs' ? (
              <DisplayNpc key={interactable._id} npc={interactable} condensed listItem />
            ) : null}

            {/* Display if it's a character sheet interactable is equipped */}
            {sheetType === 'characters' && interactable.equipped ? (
              <div className="ml-2 shrink-0" title="Equipped">
                <CheckCircleIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
              </div>
            ) : null}

            {/* Display if it's a campaign sheet and interactable is active */}
            {sheetType === 'campaigns' && interactable.active ? (
              <div className="ml-2 shrink-0" title="Active">
                <CheckCircleIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
              </div>
            ) : null}
          </div>
        ))}
      </ListContainer>

      {show === 'archived' ? (
        <Button classes="mt-8" onClick={() => setSearchParams({ ...Object.fromEntries([...searchParams]), show: 'current' })}>
          Show Current
        </Button>
      ) : (
        <Button text classes="mt-8" onClick={() => setSearchParams({ ...Object.fromEntries([...searchParams]), show: 'archived' })}>
          Show Archived
        </Button>
      )}
    </>
  );
};

export default ListInteractables;

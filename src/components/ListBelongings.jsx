import { Fragment } from 'react';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { useActions } from '../hooks/useActions';

import ListContainer from '../shared/data/ListContainer';
import Notice from '../shared/Notice';

import DisplayWeapon from './display/DisplayWeapon';
import DisplayWearable from './display/DisplayWearable';
import DisplayConsumable from './display/DisplayConsumable';
import DisplayUsable from './display/DisplayUsable';

import classNames from '../../utils/classNames';
import SlideOverTypes from '../../utils/SlideOverTypes';

const createForm = {
  weapons: SlideOverTypes.newWeaponForm,
  wearables: SlideOverTypes.wearableForm,
  consumables: SlideOverTypes.consumableForm,
  usables: SlideOverTypes.usableForm,
};

export const ListBelongingsMessage = ({ show, belongingType }) => {
  return (
    <Fragment>
      {show !== 'current' || show !== 'all' ? (
        <div className="col-span-4">
          {show === 'archived' ? <Notice status="warn" message={`You are viewing your archived ${belongingType}. To view your current ${belongingType}, specify so above.`} /> : null}
          {show === 'active' ? <Notice status="success" message={`You are viewing only your active ${belongingType}. To view all of your ${belongingType}, specify so above.`} /> : null}
          {show === 'inactive' ? <Notice status="info" message={`You are viewing only your inactive ${belongingType}. To view all of your ${belongingType}, specify so above.`} /> : null}
        </div>
      ) : null}
    </Fragment>
  );
};

const ListBelongings = ({ sheetType, id, setId, belongingsList, show, belongingType, belongingKind }) => {
  const { setSlideOver } = useActions();

  return (
    <ListContainer
      list={belongingsList}
      button={show !== 'archived' ? { click: () => setSlideOver({ type: createForm[belongingType], data: { sheetType: sheetType } }), text: `Add a new ${belongingKind}` } : null}
      empty={{
        heading: `No ${belongingKind}`,
        message:
          show === 'archived'
            ? `You have no archived ${belongingType}`
            : show === 'active'
            ? `You have no active ${belongingType}.`
            : show === 'inactive'
            ? `You have no inactive ${belongingType}`
            : 'Get started by creating your first one now',
        button: show !== 'archived' ? { click: () => setSlideOver({ type: createForm[belongingType], data: { sheetType: sheetType } }), text: `New ${belongingKind}` } : null,
      }}
    >
      {belongingsList.map(belonging => (
        <div
          key={belonging._id}
          className={classNames('flex justify-between items-center px-2 cursor-pointer', id === belonging._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
          onClick={() => setId(belonging._id)}
        >
          {belongingType === 'weapons' ? (
            <DisplayWeapon key={belonging._id} weapon={belonging} sheetType={sheetType} condensed listItem />
          ) : belongingType === 'wearables' ? (
            <DisplayWearable key={belonging._id} wearable={belonging} sheetType={sheetType} condensed listItem />
          ) : belongingType === 'consumables' ? (
            <DisplayConsumable key={belonging._id} consumable={belonging} sheetType={sheetType} condensed listItem />
          ) : belongingType === 'usables' ? (
            <DisplayUsable key={belonging._id} usable={belonging} sheetType={sheetType} condensed listItem />
          ) : null}

          {/* Display if it's a character sheet belonging is equipped */}
          {sheetType === 'characters' && belonging.equipped ? (
            <div className="ml-2 shrink-0" title="Equipped">
              <CheckCircleIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
            </div>
          ) : null}

          {/* Display if it's a campaign sheet and belonging is active */}
          {sheetType === 'campaigns' && belonging.active ? (
            <div className="ml-2 shrink-0" title="Active">
              <CheckCircleIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
            </div>
          ) : null}
        </div>
      ))}
    </ListContainer>
  );
};

export default ListBelongings;

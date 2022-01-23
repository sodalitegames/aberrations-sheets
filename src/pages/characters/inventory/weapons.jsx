import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/shared/PanelSection';
import ListContainer from '../../../components/shared/ListContainer';

import Button from '../../../components/shared/Button';

import DisplayWeapon from '../../../components/sheets/display/DisplayWeapon';
import classNames from '../../../utils/classNames';

const CharacterWeaponsPage = () => {
  const dispatch = useDispatch();
  const charSheet = useSelector(selectCurrentCharacter);

  const [weapon, setWeapon] = useState(charSheet.weapons[0]);

  console.log(weapon);

  return (
    <SheetPageContent title="Weapons" columns={4}>
      {/* All Weapons */}
      <PanelSection title="Manage Weapons">
        <div className="flow-root mt-2">
          <ListContainer
            list={charSheet.weapons}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm, data: { sheetType: 'characters' } })), text: 'Add a new Weapon' }}
            empty={{
              heading: 'No Weapons',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm, data: { sheetType: 'characters' } })), text: 'New Weapon' },
            }}
          >
            {charSheet.weapons.map(weapon => (
              <div key={weapon._id} className={classNames('flex justify-between items-center hover:bg-gray-50 px-2 cursor-pointer', weapon.equipped ? '' : '')} onClick={() => setWeapon(weapon)}>
                <DisplayWeapon key={weapon._id} weapon={weapon} condensed listItem />{' '}
                {weapon.equipped ? (
                  <div className="shrink-0 ml-2" title="Equipped">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Weapon */}
      <PanelSection title="Selected Weapon" colSpan={3}>
        <div className="grid gap-8 grid-cols-3 divide-x divide-gray-200">
          <div className="col-span-2">
            <DisplayWeapon weapon={weapon} />
          </div>

          <div className="col-span-1 space-y-4 pl-8">
            <Button>{weapon.equipped ? 'Unequip' : 'Equip'}</Button>
            <Button>Give</Button>
            <Button>Sell</Button>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </div>
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterWeaponsPage;

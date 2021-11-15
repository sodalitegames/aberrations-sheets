import { useRecoilValue, useSetRecoilState } from 'recoil';

import { slideOverState } from '../../recoil/app/app.atoms';
import { charSheetState } from '../../recoil/character/character.atoms';

import SlideOverTypes from '../../utils/SlideOverTypes';
import ModalTypes from '../../utils/ModalTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';
import ListItem from '../../components/shared/ListItem';
import DescriptionList from '../../components/shared/DescriptionList';

const CharacterInventoryPage = () => {
  const charSheet = useRecoilValue(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  console.log(charSheet.weapons);
  console.log(charSheet.wearables);
  console.log(charSheet.consumables);
  console.log(charSheet.usables);

  return (
    <SheetPageContent title="Inventory" columns={4}>
      <PanelSection title="Weapons">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.newWeaponForm })}>Add a new Weapon</Button>
          </div>

          <ul className="-my-5 divide-y divide-gray-200">
            {charSheet.weapons.map(weapon => (
              <ListItem
                key={weapon._id}
                heading={weapon.nickname || weapon.name}
                editable={{ type: SlideOverTypes.editWeaponForm, id: weapon._id }}
                deletable={{
                  type: ModalTypes.confirmDelete,
                  id: weapon._id,
                  data: { type: 'weapons', title: `Are you sure you want to delete ${weapon.nickname || weapon.name}?`, submitText: `Yes, delete ${weapon.nickname || weapon.name}` },
                }}
              >
                <DescriptionList
                  list={[
                    { name: 'Type', values: [weapon.type], half: true },
                    { name: 'Associated Stat', values: [weapon.associatedStat[0].toUpperCase() + weapon.associatedStat.slice(1)], half: true },
                    { name: 'Level & Damage', values: [weapon.levelDamage], half: true },
                    { name: 'Range', values: [weapon.range], half: true },
                    weapon.ability ? { name: 'Ability', values: [weapon.ability] } : null,
                    weapon.description ? { name: 'Description', values: [weapon.description] } : null,
                  ]}
                  classes="mt-2"
                />
              </ListItem>
            ))}
          </ul>
        </div>
      </PanelSection>
      <PanelSection title="Wearables">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.wearableForm })}>Add a new Wearable</Button>
          </div>
          <ul className="-my-5 divide-y divide-gray-200">
            {charSheet.wearables.map(wearable => (
              <ListItem
                key={wearable._id}
                heading={wearable.name}
                editable={{ type: SlideOverTypes.wearableForm, id: wearable._id }}
                deletable={{
                  type: ModalTypes.confirmDelete,
                  id: wearable._id,
                  data: { type: 'wearables', title: `Are you sure you want to delete ${wearable.name}?`, submitText: `Yes, delete ${wearable.name}` },
                }}
              >
                <DescriptionList
                  list={[
                    { name: 'Body Area', values: [wearable.bodyArea[0].toUpperCase() + wearable.bodyArea.slice(1)] },
                    { name: 'Description', values: [wearable.description] },
                    { name: 'Fortitude Mod', values: [wearable.statMods.fortitude], half: true },
                    { name: 'Agility Mod', values: [wearable.statMods.agility], half: true },
                    { name: 'Persona Mod', values: [wearable.statMods.persona], half: true },
                    { name: 'Aptitude Mod', values: [wearable.statMods.aptitude], half: true },
                  ]}
                  classes="mt-2"
                />
              </ListItem>
            ))}
          </ul>
        </div>
      </PanelSection>
      <PanelSection title="Consumables">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.consumableForm })}>Add a new Consumable</Button>
          </div>
          <ul className="-my-5 divide-y divide-gray-200">
            {charSheet.consumables.map(consumable => (
              <ListItem
                key={consumable._id}
                heading={consumable.name}
                editable={{ type: SlideOverTypes.consumableForm, id: consumable._id }}
                deletable={{
                  type: ModalTypes.confirmDelete,
                  id: consumable._id,
                  data: { type: 'consumables', title: `Are you sure you want to delete ${consumable.name}?`, submitText: `Yes, delete ${consumable.name}` },
                }}
              >
                <DescriptionList
                  list={[
                    { name: 'Level', values: [consumable.level], half: true },
                    { name: 'Quantity', values: [consumable.quantity], half: true },
                    { name: 'Uses', values: [consumable.uses], half: true },
                    consumable.associatedStat ? { name: 'Associated Stat', values: [consumable.associatedStat], half: true } : null,
                    { name: 'Categories', values: [consumable.categories.map(cat => cat.name).join(', ')] },
                    consumable.description ? { name: 'Description', values: [consumable.description] } : null,
                  ]}
                  classes="mt-2"
                />
              </ListItem>
            ))}
          </ul>
        </div>
      </PanelSection>
      <PanelSection title="Usables">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.usableForm })}>Add a new Usable</Button>
          </div>
          <ul className="-my-5 divide-y divide-gray-200">
            {charSheet.usables.map(usable => (
              <ListItem
                key={usable._id}
                heading={usable.name}
                editable={{ type: SlideOverTypes.usableForm, id: usable._id }}
                deletable={{
                  type: ModalTypes.confirmDelete,
                  id: usable._id,
                  data: { type: 'usables', title: `Are you sure you want to delete ${usable.name}?`, submitText: `Yes, delete ${usable.name}` },
                }}
              >
                <DescriptionList
                  list={[
                    { name: 'Type', values: [usable.type], half: true },
                    { name: 'Quantity', values: [usable.quantity], half: true },
                    { name: 'Description', values: [usable.description] },
                  ]}
                  classes="mt-2"
                />
              </ListItem>
            ))}
          </ul>
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterInventoryPage;

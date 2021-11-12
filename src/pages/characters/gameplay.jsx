import { useRecoilValue } from 'recoil';

import { getCharSheet } from '../../recoil/character/character.selectors';

import classNames from '../../utils/classNames';

import PanelSection from '../../components/characters/PanelSection';
import Stats from '../../components/characters/Stats';
import Button from '../../components/characters/Button';
import Chip from '../../components/characters/Chip';
import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

const equippedWeapons = [
  {
    name: 'Sniper (Aptitude)',
    handle: 'Level 2 / 2 - 5 Range',
    ability: `"Rafiki's Wrath"`,
    href: '#',
  },
  {
    name: 'Bolas (Fortitude)',
    handle: 'Level 3 / 1 - 3 Range',
    ability: `"Rafiki's Wrath"`,
    href: '#',
  },
];

const equippedWearables = [
  {
    name: 'Head',
    equipped: 'Helmet (+1 FOR)',
  },
  {
    name: 'Face',
    equipped: false,
  },
  {
    name: 'Torso',
    equipped: 'Shirt',
  },
  {
    name: 'Arms',
    equipped: 'Tattoo Sleeves (+1 PER)',
  },
  {
    name: 'Hands',
    equipped: 'Gloves (+1 APT)',
  },
  {
    name: 'Legs',
    equipped: 'Greaves (-1 AGL)',
  },
  {
    name: 'Feet',
    equipped: 'Boots',
  },
];

const equippedConsumables = [
  {
    name: 'Bars',
    handle: 'Level 2 Ration (3 uses)',
    href: '#',
  },
  {
    name: `Carbonated 'Chocolate' Milk`,
    handle: 'Level 1 Stimulant (1 use)',
    href: '#',
  },
  {
    name: 'Beverage',
    handle: 'Level 1 Fortitude Enhancer (1 use)',
    href: '#',
  },
];

const equippedUsables = [
  {
    name: 'Rope (Common)',
    handle: 'Here are some long words about the rope here written here written here here here.',
    href: '#',
  },
  {
    name: 'Pigwigdeon Feathers',
    handle: 'Rare',
    href: '#',
  },
  {
    name: `Harvey's Datapad`,
    handle: 'Custom',
    href: '#',
  },
];

const CharacterGameplayPage = () => {
  const charSheet = useRecoilValue(getCharSheet);

  if (!charSheet) {
    return <div>Collecting character sheet data...</div>;
  }

  return (
    <SheetPageContent title="Gameplay" columns={3}>
      {/* Left column */}
      <div className="grid grid-cols-2 gap-4 lg:col-span-2">
        {/* Welcome panel */}
        <PanelSection colSpan={2}>
          <div className="sm:flex sm:items-center sm:justify-between pb-6">
            <div className="sm:flex sm:space-x-5">
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{charSheet.characterName}</p>
                <p className="text-sm font-medium text-gray-500">Kuma Ability: Once per day, you may reroll the dice after seeing the roll.</p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <Button>Roll Dice</Button>
            </div>
          </div>
        </PanelSection>

        <PanelSection colSpan={2}>
          <Stats
            generalExhaustion={charSheet.generalExhaustion}
            power={charSheet.power}
            stats={[
              { name: 'Fortitude', passive: { name: 'Max Hp', calc: 'Fortitude * 5', value: charSheet.maxHp }, ...charSheet.fortitude },
              { name: 'Agility', passive: { name: 'Dodge Value', calc: 'Agility / 3 (Rd. Down)', value: charSheet.dodgeValue }, ...charSheet.agility },
              { name: 'Persona', ...charSheet.persona },
              { name: 'Aptitude', ...charSheet.aptitude },
            ]}
          />
        </PanelSection>

        <div className="space-y-4">
          {/* Equipped Weapons */}
          <PanelSection title="Equipped Weapons">
            <div className="flow-root mt-6">
              <ul className="-my-5 divide-y divide-gray-200">
                {equippedWeapons.map(weap => (
                  <li key={weap.handle} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img className="h-8 w-8 rounded-full" src="/weapons/sniper.png" alt="temp" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{weap.name}</p>
                        <p className="text-sm text-gray-500 truncate">{weap.handle}</p>
                        <p className="text-sm text-gray-500 truncate" title="Here are the ability words and how to take care of it.">
                          {weap.ability}
                        </p>
                      </div>
                      <div>
                        <a
                          href={weap.href}
                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button>Manage equipped Weapons</Button>
              </div>
            </div>
          </PanelSection>
          {/* Equipped Wearables */}
          <PanelSection title="Equipped Wearables">
            <div className="flow-root mt-6">
              <ul className="-my-5 divide-y divide-gray-200">
                {equippedWearables.map(wear => (
                  <li key={wear.name} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img className="h-8 w-8 rounded-full" src="/weapons/bow.png" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{wear.name}</p>
                        <p className="text-sm text-gray-500 truncate">{wear.equipped || 'n/a'}</p>
                      </div>
                      {wear.equipped ? (
                        <div>
                          <Button rounded>View</Button>
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button>Manage equipped Weapons</Button>
              </div>
            </div>
          </PanelSection>
        </div>

        <div className="space-y-4">
          {/* Equipped Consumables */}
          <PanelSection title="Equipped Consumables">
            <div className="flow-root mt-6">
              <ul className="-my-5 divide-y divide-gray-200">
                {equippedConsumables.map(cons => (
                  <li key={cons.handle} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img className="h-8 w-8 rounded-full" src="/weapons/rapier.png" alt="temp" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{cons.name}</p>
                        <p className="text-sm text-gray-500 truncate">{cons.handle}</p>
                      </div>
                      <div>
                        <a
                          href={cons.href}
                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button>Manage equipped Consumables</Button>
              </div>
            </div>
          </PanelSection>
          {/* Equipped Usables */}
          <PanelSection title="Equipped Usables">
            <div className="flow-root mt-6">
              <ul className="-my-5 divide-y divide-gray-200">
                {equippedUsables.map(usab => (
                  <li key={usab.handle} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img className="h-8 w-8 rounded-full" src="/weapons/bostaff.png" alt="temp" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{usab.name}</p>
                        <p className="text-sm text-gray-500 truncate" title="Here are some long words about the rope here written here written here here here.">
                          {usab.handle}
                        </p>
                      </div>
                      <div>
                        <a
                          href={usab.href}
                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button>Manage equipped Usables</Button>
              </div>
            </div>
          </PanelSection>
        </div>
      </div>

      {/* Right column */}
      <div className="grid grid-cols-1 gap-4">
        {/* Health */}
        <PanelSection>
          <div className="flex flex-col items-center justify-between text-5xl font-semibold text-gray-900">
            <h5 className="font-normal text-xl">Current Health</h5>
            <span className={classNames(charSheet.currentHp >= charSheet.maxHp / 2 ? 'text-green-800' : '', charSheet.currentHp >= charSheet.maxHp / 4 ? 'text-yellow-800' : 'text-red-800')}>
              {charSheet.currentHp} / {charSheet.maxHp}
            </span>
            <span className="text-sm font-medium text-gray-500 uppercase">You're in good condition</span>
          </div>
          <div className="mt-6">
            <Button>Take Damage</Button>
            <Button classes="mt-2">Heal Damage</Button>
          </div>
        </PanelSection>

        {/* Wallet */}
        <PanelSection>
          <div className="flex flex-col items-center justify-between text-5xl font-semibold">
            <h5 className="font-normal text-xl">Wallet</h5>
            <span>{charSheet.wallet}</span>
            <span className="text-sm font-medium text-gray-500 uppercase">Cash on your person</span>
          </div>
          <div className="mt-6">
            <Button>Recieve Money</Button>
            <Button classes="mt-2">Pay Money</Button>
          </div>
        </PanelSection>

        {/* Augmentations */}
        <PanelSection>
          <div className="flex justify-between">
            <h2 className="text-base font-medium text-gray-900">Augmentations</h2>
            <Chip editable color={charSheet.upgradePoints ? 'green' : 'yellow'}>
              {charSheet.upgradePoints} Upgrade Points
            </Chip>
          </div>
          <div className="flow-root mt-6">
            <ul className="-my-5 divide-y divide-gray-200">
              {charSheet.augmentations.map(aug => (
                <li key={aug._id} className="py-5">
                  <h3 className="text-sm font-semibold text-gray-800">{aug.name}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{aug.description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button>Purchase a new Augmentation</Button>
            </div>
          </div>
        </PanelSection>
      </div>
    </SheetPageContent>
  );
};

export default CharacterGameplayPage;

import { useRecoilValue } from 'recoil';

import { getCharSheet } from '../../recoil/character/character.selectors';

import classNames from '../../utils/classNames';

import ActiveStatsPanel from '../../components/characters/ActiveStatsPanel';
import PassiveStatsPanel from '../../components/characters/PassiveStatsPanel';
import AugmentationsPanel from '../../components/characters/AugmentationsPanel';
import Button from '../../components/characters/Button';
import EquippedWeaponsPanel from '../../components/characters/EquippedWeaponsPanel';
import EquippedConsumablesPanel from '../../components/characters/EquippedConsumablesPanel';
import EquippedUsablesPanel from '../../components/characters/EquippedUsablesPanel';
import EquippedWearablesPanel from '../../components/characters/EquippedWearablesPanel';
import PanelSection from '../../components/characters/PanelSection';
import Panel from '../../layouts/components/shared/Panel';

const user = {
  name: 'Chelsea Hagon',
  email: 'chelseahagon@example.com',
  role: 'Human Resources Manager',
  imageUrl: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const stats = [
  { label: 'Vacation days left', value: 12 },
  { label: 'Sick days left', value: 4 },
  { label: 'Personal days left', value: 2 },
];

const CharacterGameplayPage = () => {
  const charSheet = useRecoilValue(getCharSheet);

  if (!charSheet) {
    return <div>Collecting character sheet data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="sr-only">Gameplay</h1>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {/* Welcome panel */}
          <section className="lg:col-span-2" aria-labelledby="profile-overview-title">
            <div className="rounded-lg bg-white overflow-hidden shadow">
              <h2 className="sr-only" id="profile-overview-title">
                Profile Overview
              </h2>
              <div className="bg-white p-6">
                <div className="sm:flex sm:items-center sm:justify-between pb-6">
                  <div className="sm:flex sm:space-x-5">
                    <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                      <p className="text-xl font-bold text-gray-900 sm:text-2xl">{charSheet.characterName}</p>
                      <p className="text-sm font-medium text-gray-500">Once per day, you may reroll the dice after seeing the roll.</p>
                      {/* <dl>
                        <dt className="text-sm font-medium text-gray-500">Species Name</dt>
                        <dd>
                          <div className="text-sm font-normal text-gray-900">Kuma</div>
                        </dd>
                        <dt className="text-sm font-medium text-gray-500 mt-2">Species Ability</dt>
                        <dd>
                          <div className="text-sm font-normal text-gray-900">Here is the fake speice ability that I am typin gion akfjr asdf</div>
                        </dd>
                        <dt className="text-sm font-medium text-gray-500 mt-2">Power</dt>
                        <dd>
                          <div className="text-sm font-normal text-gray-900">12</div>
                        </dd>
                      </dl> */}
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center sm:mt-0">
                    <Button>Roll Dice</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <PanelSection colSpan={2}>
            <ActiveStatsPanel
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

          <section className="space-y-4">
            {/* Equipped Belongings */}
            <EquippedWeaponsPanel />

            <EquippedWearablesPanel />
          </section>

          <section className="space-y-4">
            <EquippedConsumablesPanel />
            <EquippedUsablesPanel />
          </section>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4">
          {/* <PanelSection title="Kuma">
            {/* <h3 className="text-sm font-semibold text-gray-800"> */}
          {/* Extend touch target to entire panel */}
          {/* <span className="absolute inset-0" aria-hidden="true" />
              Kuma
            </h3> */}
          {/*</div><p className="text-sm text-gray-600 line-clamp-2">Once per day, you may reroll the dice after seeing the roll.</p>
          </PanelSection> */}
          {/* Health */}
          <PanelSection>
            <div className="flex flex-col items-center flex-shrink-0 justify-between text-5xl font-semibold text-gray-900 relative">
              <h5 className="font-normal text-xl">Current Health</h5>
              <span className={classNames(charSheet.currentHp >= charSheet.maxHp / 2 ? 'text-green-600' : '', charSheet.currentHp >= charSheet.maxHp / 4 ? 'text-yellow-600' : 'text-red-600')}>
                {charSheet.currentHp} / {charSheet.maxHp}
              </span>
              <span className="ml-2 text-sm font-medium text-gray-500 uppercase">You're in good condition</span>
            </div>
            <div className="mt-4">
              <Button>Take Damage</Button>
              <Button classes="mt-2">Heal Damage</Button>
            </div>
          </PanelSection>

          <PanelSection>
            <div className="flex flex-col items-center flex-shrink-0 justify-between text-5xl font-semibold text-gray-900 relative">
              <h5 className="font-normal text-xl">Wallet</h5>
              <span>{charSheet.wallet}</span>
              <span className="ml-2 text-sm font-medium text-gray-500 uppercase">Cash on your person</span>
            </div>
            <div className="mt-4">
              <Button>Recieve Money</Button>
              <Button classes="mt-2">Pay Money</Button>
            </div>
          </PanelSection>
          {/* <div className="px-4 py-5 sm:p-6">
          <dd className="mt-1 flex flex-col justify-between items-top md:block lg:flex">
            <div className="flex flex-col items-center flex-shrink-0 items-start text-5xl font-semibold text-gray-900 relative">
              <h5 className="font-normal text-xl">Wallet</h5>
              <span>{wallet}</span>
              <span className="ml-2 text-sm font-medium text-gray-500">CASH ON YOUR PERSON</span>
            </div>

            <div className="mt-4">
              <Button>Recieve Money</Button>
              <Button classes="mt-2">Pay Money</Button>
            </div>
          </dd>
        </div> */}

          {/* Basic Info */}
          {/* <PanelSection title="Basic Info">
            <dl>
              <dt className="text-sm font-medium text-gray-500">Species Name</dt>
              <dd>
                <div className="text-sm font-normal text-gray-900">Kuma</div>
              </dd>
              <dt className="text-sm font-medium text-gray-500 mt-2">Species Ability</dt>
              <dd>
                <div className="text-sm font-normal text-gray-900">Here is the fake speice ability that I am typin gion akfjr asdf</div>
              </dd>
            </dl>
          </PanelSection> */}

          {/* <PanelSection title="alsdk;f">
            <PassiveStatsPanel maxHp={charSheet.maxHp} currentHp={charSheet.currentHp} dodgeValue={charSheet.dodgeValue} wallet={charSheet.wallet} />
          </PanelSection> */}

          {/* Augmentations */}
          <AugmentationsPanel augmentations={charSheet.augmentations} upgradePoints={charSheet.upgradePoints} />
        </div>
      </div>
    </div>
  );
};

export default CharacterGameplayPage;

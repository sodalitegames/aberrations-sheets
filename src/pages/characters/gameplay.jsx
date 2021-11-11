import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { Menu, Popover, Transition } from '@headlessui/react';
import { AcademicCapIcon, BadgeCheckIcon, BellIcon, CashIcon, ClockIcon, MenuIcon, ReceiptRefundIcon, UsersIcon, XIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';

import { charIdState } from '../../recoil/character/character.atoms';
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
const actions = [
  {
    icon: ClockIcon,
    name: 'Request time off',
    href: '#',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    icon: BadgeCheckIcon,
    name: 'Benefits',
    href: '#',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    icon: UsersIcon,
    name: 'Schedule a one-on-one',
    href: '#',
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  { icon: CashIcon, name: 'Payroll', href: '#', iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
  {
    icon: ReceiptRefundIcon,
    name: 'Submit an expense',
    href: '#',
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    icon: AcademicCapIcon,
    name: 'Training',
    href: '#',
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
];

const CharacterGameplayPage = () => {
  let { charId } = useParams();
  let setCharId = useSetRecoilState(charIdState);

  useEffect(() => {
    if (charId) {
      setCharId(charId);
    }
  });

  const charSheet = useRecoilValue(getCharSheet);

  console.log(charSheet);

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
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="sm:flex sm:space-x-5">
                    <div className="flex-shrink-0">
                      <img className="mx-auto h-20 w-20 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                      <p className="text-sm font-medium text-gray-600">Welcome back,</p>
                      <p className="text-xl font-bold text-gray-900 sm:text-2xl">{charSheet.characterName}</p>
                      <p className="text-sm font-medium text-gray-600">{user.role}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center sm:mt-0">
                    <Button>Roll Dice</Button>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                {stats.map(stat => (
                  <div key={stat.label} className="px-6 py-5 text-sm font-medium text-center">
                    <span className="text-gray-900">{stat.value}</span> <span className="text-gray-600">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="lg:col-span-2">
            <ActiveStatsPanel
              generalExhaustion={charSheet.generalExhaustion}
              stats={[
                { name: 'Fortitude', ...charSheet.fortitude },
                { name: 'Agility', ...charSheet.agility },
                { name: 'Persona', ...charSheet.persona },
                { name: 'Aptitude', ...charSheet.aptitude },
              ]}
            />
          </section>

          <section className="lg:col-span-2">
            {/* Equipped Belongings */}
            <EquippedWeaponsPanel />
          </section>

          <section>
            <EquippedConsumablesPanel />
            <EquippedUsablesPanel />
          </section>

          <section>
            <EquippedWearablesPanel />
          </section>

          {/* Actions panel */}
          <section aria-labelledby="quick-links-title">
            <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
              <h2 className="sr-only" id="quick-links-title">
                Quick links
              </h2>
              {actions.map((action, actionIdx) => (
                <div
                  key={action.name}
                  className={classNames(
                    actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                    actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                    actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                    'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500'
                  )}
                >
                  <div>
                    <span className={classNames(action.iconBackground, action.iconForeground, 'rounded-lg inline-flex p-3 ring-4 ring-white')}>
                      <action.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <a href={action.href} className="focus:outline-none">
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        {action.name}
                      </a>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.</p>
                  </div>
                  <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4">
          <PassiveStatsPanel maxHp={charSheet.maxHp} currentHp={charSheet.currentHp} dodgeValue={charSheet.dodgeValue} wallet={charSheet.wallet} />

          {/* Augmentations */}
          <AugmentationsPanel augmentations={charSheet.augmentations} upgradePoints={charSheet.upgradePoints} />
        </div>
      </div>
    </div>
  );
};

export default CharacterGameplayPage;

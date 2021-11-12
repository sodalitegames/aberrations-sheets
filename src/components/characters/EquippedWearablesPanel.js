import Button from './Button';

const fakeEquippedWearables = [
  {
    name: 'Head',
    equipped: 'Helmet / +1 FOR',
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
    equipped: 'Tattoo Sleeves / +1 PER',
  },
  {
    name: 'Hands',
    equipped: 'Gloves / +1 APT',
  },
  {
    name: 'Legs',
    equipped: 'Greaves / -1 AGL',
  },
  {
    name: 'Feet',
    equipped: 'Boots',
  },
];

const EquippedWearablesPanel = () => {
  return (
    <section aria-labelledby="recent-hires-title">
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <div className="p-6">
          <h2 className="text-base font-medium text-gray-900" id="recent-hires-title">
            Equipped Wearables
          </h2>
          <div className="flow-root mt-6">
            <ul className="-my-5 divide-y divide-gray-200">
              {fakeEquippedWearables.map(wear => (
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
          </div>
          <div className="mt-6">
            <Button>Manage equipped Wearables</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquippedWearablesPanel;

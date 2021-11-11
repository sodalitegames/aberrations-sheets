import Button from './Button';
import Chip from './Chip';

const AugmentationsPanel = ({ augmentations, upgradePoints }) => {
  return (
    <section aria-labelledby="announcements-title">
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <div className="p-6">
          <div className="flex justify-between">
            <h2 className="text-base font-medium text-gray-900" id="augmentations-title">
              Augmentations
            </h2>
            <Chip color={upgradePoints ? 'green' : 'yellow'}>{upgradePoints} Upgrade Points</Chip>
          </div>
          <div className="flow-root mt-6">
            <ul className="-my-5 divide-y divide-gray-200">
              {augmentations.map(aug => (
                <li key={aug.id} className="py-5">
                  <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {aug.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{aug.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button>Purchase a new Augmentation</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AugmentationsPanel;

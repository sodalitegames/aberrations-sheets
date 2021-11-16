import DropdownButton from './DropdownButton';

const actions = [
  { name: 'Roll', href: '#' },
  { name: 'Take Damage', href: '#' },
  { name: 'Heal Damage', href: '#' },
  { name: 'Edit Stats', href: '#' },
];

const StatsTracker = ({ list }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  {/* <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Species
                  </th> */}
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Power
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fortitude
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agility
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Persona
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aptitude
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dodge
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Initiative
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assist
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Health
                  </th>
                  {/* <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diplomacy
                  </th> */}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={item._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">{item.name || item.characterName}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.speciesId}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.power}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.fortitude.points + item.fortitude.modifier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.agility.points + item.agility.modifier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.persona.points + item.persona.modifier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.aptitude.points + item.aptitude.modifier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.dodgeValue}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.initiative}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.assist}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item.currentHp} / {item.maxHp}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.diplomacy}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownButton actions={actions} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTracker;

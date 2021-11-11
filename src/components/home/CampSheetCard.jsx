import { Link } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';

// import { getSpecies } from '../../recoil/resources/resources.selector';

const user = {
  name: 'Rebecca Nicholas',
  role: 'Product Designer',
  imageUrl: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const stats = [
  { label: 'Fortitude', value: 12 },
  { label: 'ID', value: 1234212342341243 },
  { label: 'Power', value: 12 },
  { label: 'Aptitude', value: 4 },
];

export default function CampSheetCard({ campSheet }) {
  //const species = useRecoilValue(getSpecies);

  // console.log(species);

  // const getSpeciesName = speciesId => {
  //   const currSpecies = species.find(spec => spec.id === speciesId);
  //   return currSpecies.name;
  // };

  return (
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
              {/* <p className="text-sm font-medium text-gray-600">{getSpeciesName(charSheet.speciesId)}</p> */}
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">{campSheet.name}</p>
              {/* <p className="text-sm font-medium text-gray-600">{charSheet.campaign ? charSheet.campaign.name : 'No campaign assigned'}</p> */}
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:mt-0">
            <Link to={campSheet._id}>
              <button className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Manage campaign
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
        {stats.map(stat => (
          <div key={stat.label} className="px-6 py-5 text-sm font-medium text-center">
            <span className="text-gray-900">{stat.value}</span> <span className="text-gray-600">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

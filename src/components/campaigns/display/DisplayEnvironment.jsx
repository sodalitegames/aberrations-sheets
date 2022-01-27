import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';

import ListItem from '../../shared/data/ListItem';
import DescriptionList from '../../shared/data/DescriptionList';
import InfoList from '../../shared/data/InfoList';

const EnvironmentDetails = ({ environment }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Active', values: [environment.active ? 'Yes' : 'No'], half: true },
        { name: 'Description', values: [environment.description] },
      ]}
      classes="mt-2"
    />
  );
};

const DisplayEnvironment = ({ environment, condensed, noButtonPanel, listItem }) => {
  if (listItem) {
    if (condensed) {
      return (
        <ListItem heading={environment.name}>
          <InfoList list={[{ value: environment.description, clamp: true }]} />
        </ListItem>
      );
    }

    return (
      <ListItem
        heading={environment.name}
        noButtonPanel={noButtonPanel}
        editable={{ type: SlideOverTypes.usableForm, id: environment._id, data: { sheetType: 'campaigns' } }}
        deletable={{
          type: ModalTypes.deleteResource,
          id: environment._id,
          data: {
            sheetType: 'campaigns',
            resourceType: 'environments',
            title: `Are you sure you want to delete ${environment.name}?`,
            submitText: `Yes, delete ${environment.name}`,
            notification: { heading: 'Environment Deleted', message: `You have successfully deleted ${environment.name}.` },
          },
        }}
      >
        <EnvironmentDetails environment={environment} />
      </ListItem>
    );
  }

  return (
    <div className="py-3">
      <h3 className="text-sm font-semibold text-gray-800">{environment.name}</h3>
      <div>
        <EnvironmentDetails environment={environment} />
      </div>
    </div>
  );
};

export default DisplayEnvironment;

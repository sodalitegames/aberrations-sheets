import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';

import ListItem from '../../shared/ListItem';
import DescriptionList from '../../shared/DescriptionList';
import InfoList from '../../shared/InfoList';

const DisplayUsable = ({ usable, condensed, noButtonPanel, listItem, sheetType }) => {
  if (listItem) {
    if (condensed === 'view') {
      return (
        <ListItem heading={`${usable.name} (${usable.type})`} view={{ type: ModalTypes.showBelonging, id: usable._id, data: { sheetType: sheetType, resourceType: 'usables' } }}>
          <InfoList list={[{ title: usable.description, value: usable.description }]} />
        </ListItem>
      );
    }

    if (condensed) {
      return (
        <ListItem heading={`${usable.name} (${usable.quantity} ${usable.unit || 'Units'})`}>
          <InfoList list={[usable.type]} />
        </ListItem>
      );
    }

    return (
      <ListItem
        heading={usable.name}
        noButtonPanel={noButtonPanel}
        editable={{ type: SlideOverTypes.usableForm, id: usable._id, data: { sheetType: sheetType } }}
        deletable={{
          type: ModalTypes.deleteResource,
          id: usable._id,
          data: { sheetType: sheetType, resourceType: 'usables', title: `Are you sure you want to delete ${usable.name}?`, submitText: `Yes, delete ${usable.name}`, equipped: usable.equipped },
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
    );
  }

  return (
    <div className="py-3">
      <h3 className="text-sm font-semibold text-gray-800">{usable.name}</h3>
      <div>
        <DescriptionList
          list={[
            { name: 'Type', values: [usable.type], half: true },
            { name: 'Quantity', values: [usable.quantity], half: true },
            { name: 'Description', values: [usable.description] },
          ]}
          classes="mt-2"
        />
      </div>
    </div>
  );
};

export default DisplayUsable;

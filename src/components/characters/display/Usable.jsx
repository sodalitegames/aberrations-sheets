import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';

import ListItem from '../../shared/ListItem';
import DescriptionList from '../../shared/DescriptionList';
import InfoList from '../../shared/InfoList';

const Usable = ({ usable, condensed, noButtonPanel }) => {
  if (condensed === 'view') {
    return (
      <ListItem heading={`${usable.name} (${usable.type})`} view={{ type: ModalTypes.displayBelonging, id: usable._id, data: { type: 'usables' } }}>
        <InfoList list={[{ title: usable.description, value: usable.description }]} />
      </ListItem>
    );
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem
      heading={usable.name}
      noButtonPanel={noButtonPanel}
      editable={{ type: SlideOverTypes.usableForm, id: usable._id }}
      deletable={{
        type: ModalTypes.confirmDelete,
        id: usable._id,
        data: { type: 'usables', title: `Are you sure you want to delete ${usable.name}?`, submitText: `Yes, delete ${usable.name}`, equipped: usable.equipped },
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
};

export default Usable;

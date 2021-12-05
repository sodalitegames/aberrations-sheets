import ModalTypes from '../../../utils/ModalTypes';
import InfoList from '../../shared/InfoList';

import ListItem from '../../shared/ListItem';

const Augmentation = ({ aug, condensed, noButtonPanel }) => {
  if (condensed === 'view') {
    return 'view';
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem
      heading={aug.name}
      noButtonPanel={noButtonPanel}
      deleteText="Remove"
      deletable={{
        type: ModalTypes.deleteResource,
        id: aug._id,
        data: {
          type: 'augmentations',
          title: `Are you sure you want to remove ${aug.name}?`,
          message: 'You will not be able to undo this action, and you will NOT recieve your upgrade points back.',
          submitText: `Yes, remove ${aug.name}`,
        },
      }}
    >
      <InfoList list={[aug.description]} />
    </ListItem>
  );
};

export default Augmentation;

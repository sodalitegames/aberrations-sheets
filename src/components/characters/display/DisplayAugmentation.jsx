import ModalTypes from '../../../utils/ModalTypes';
import InfoList from '../../shared/data/InfoList';

import ListItem from '../../shared/data/ListItem';

const DisplayAugmentation = ({ aug, noButtonPanel }) => {
  return (
    <ListItem
      heading={aug.name}
      noButtonPanel={noButtonPanel}
      deleteText="Remove"
      deletable={{
        type: ModalTypes.deleteResource,
        id: aug._id,
        data: {
          sheetType: 'characters',
          resourceType: 'augmentations',
          title: `Are you sure you want to remove ${aug.name}?`,
          message: 'You will not be able to undo this action, and you will NOT receive your upgrade points back.',
          submitText: `Yes, remove ${aug.name}`,
        },
      }}
    >
      <InfoList list={[aug.description]} />
    </ListItem>
  );
};

export default DisplayAugmentation;

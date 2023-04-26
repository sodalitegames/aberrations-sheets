import { Augmentation } from '../../models/sheet/resources';
import ModalTypes from '../../utils/ModalTypes';
import InfoList from '../data/InfoList';

import ListItem from '../data/ListItem';

interface Props {
  aug: Augmentation;
  noButtonPanel?: boolean;
}

const DisplayAugmentation: React.FC<Props> = ({ aug, noButtonPanel }) => {
  return (
    <ListItem
      heading={aug.name}
      noButtonPanel={noButtonPanel}
      deleteText="Remove"
      deletable={{
        type: ModalTypes.deleteResource,
        data: {
          sheetType: 'characters',
          resourceType: 'augmentations',
          resource: aug,
          title: `Are you sure you want to remove ${aug.name}?`,
          message: 'You will not be able to undo this action.',
          submitText: `Yes, remove ${aug.name}`,
          notification: { heading: 'Augmentation Removed', message: `You have successfully removed ${aug.name}.` },
        },
      }}
    >
      <InfoList list={[aug.description]} />
    </ListItem>
  );
};

export default DisplayAugmentation;

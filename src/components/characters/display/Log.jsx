import ModalTypes from '../../../utils/ModalTypes';
import SlideOverTypes from '../../../utils/SlideOverTypes';

import ListItem from '../../shared/ListItem';
import InfoList from '../../shared/InfoList';

const Log = ({ log, condensed }) => {
  if (condensed === 'view') {
    return 'view';
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem
      heading={new Date(log.date).toDateString()}
      editable={{ type: SlideOverTypes.charLogForm, id: log._id }}
      deletable={{
        type: ModalTypes.deleteResource,
        id: log._id,
        data: { type: 'logs', title: 'Are you sure you want to delete this character log?', submitText: 'Yes, delete this character log' },
      }}
    >
      <InfoList list={[log.content]} />
    </ListItem>
  );
};

export default Log;

import ModalTypes from '../../../utils/ModalTypes';
import SlideOverTypes from '../../../utils/SlideOverTypes';

import ListItem from '../../shared/ListItem';
import InfoList from '../../shared/InfoList';

const CaptainsLog = ({ log, condensed }) => {
  if (condensed === 'view') {
    return 'view';
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem
      heading={new Date(log.date).toDateString()}
      editable={{ type: SlideOverTypes.captainsLogForm, id: log._id }}
      deletable={{
        type: ModalTypes.deleteCampResource,
        id: log._id,
        data: { type: 'logs', title: `Are you sure you want to delete this captain's log?`, submitText: `Yes, delete this captain's log` },
      }}
    >
      <InfoList list={[log.content]} />
    </ListItem>
  );
};

export default CaptainsLog;

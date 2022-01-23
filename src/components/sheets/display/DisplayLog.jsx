import ModalTypes from '../../../utils/ModalTypes';
import SlideOverTypes from '../../../utils/SlideOverTypes';
import { formatDate } from '../../../utils/formatDate';

import ListItem from '../../shared/ListItem';
import InfoList from '../../shared/InfoList';

const DisplayLog = ({ sheetType, log, condensed }) => {
  if (condensed === 'view') {
    return 'view';
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem
      heading={formatDate(log.date)}
      editable={{ type: SlideOverTypes.logForm, id: log._id, data: { sheetType: sheetType } }}
      deletable={{
        type: ModalTypes.deleteResource,
        id: log._id,
        data: {
          sheetType: sheetType,
          resourceType: 'logs',
          title: `Are you sure you want to delete this ${sheetType === 'campaigns' ? `captain's` : 'character'} log?`,
          submitText: `Yes, delete this ${sheetType === 'campaigns' ? `captain's` : 'character'} log`,
        },
      }}
    >
      <InfoList list={[log.content]} />
    </ListItem>
  );
};

export default DisplayLog;

import ModalTypes from '../../../utils/ModalTypes';
import SlideOverTypes from '../../../utils/SlideOverTypes';
import { formatDate } from '../../../utils/formatDate';

import ListItem from '../../shared/ListItem';
import InfoList from '../../shared/InfoList';

const DisplayLog = ({ sheet, log, condensed }) => {
  if (condensed === 'view') {
    return 'view';
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem
      heading={formatDate(log.date)}
      editable={sheet === 'campaigns' ? { type: SlideOverTypes.captainsLogForm, id: log._id } : { type: SlideOverTypes.charLogForm, id: log._id }}
      deletable={{
        type: ModalTypes.deleteResource,
        id: log._id,
        data: {
          sheetType: sheet,
          resourceType: 'logs',
          title: `Are you sure you want to delete this ${sheet === 'campaigns' ? `captain's` : 'character'} log?`,
          submitText: `Yes, delete this ${sheet === 'campaigns' ? `captain's` : 'character'} log`,
        },
      }}
    >
      <InfoList list={[log.content]} />
    </ListItem>
  );
};

export default DisplayLog;

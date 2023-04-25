import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';
import { formatDate } from '../../utils/helpers/dates';

import ListItem from '../data/ListItem';
import InfoList from '../data/InfoList';

import { Log } from '../../models/sheet/resources';
import { SheetType } from '../../models/sheet';

interface Props {
  log: Log;
  sheetType: SheetType;
}

const DisplayLog: React.FC<Props> = ({ sheetType, log }) => {
  return (
    <ListItem
      heading={formatDate(log.date)}
      editable={{ type: SlideOverTypes.logForm, data: { sheetType: sheetType, sheetId: log.sheetId, log } }}
      deletable={{
        type: ModalTypes.deleteResource,
        id: log._id,
        data: {
          sheetType: sheetType,
          resourceType: 'logs',
          title: `Are you sure you want to delete this ${sheetType === 'campaigns' ? `captain's` : 'character'} log?`,
          submitText: `Yes, delete this ${sheetType === 'campaigns' ? `captain's` : 'character'} log`,
          notification: {
            heading: sheetType === 'characters' ? 'Character Log Deleted' : `Captain's Log Deleted`,
            message: `You have successfully deleted ${sheetType === 'characters' ? 'character' : `captain's`} log from ${formatDate(log.date)}.`,
          },
        },
      }}
    >
      <InfoList list={[log.content]} />
    </ListItem>
  );
};

export default DisplayLog;
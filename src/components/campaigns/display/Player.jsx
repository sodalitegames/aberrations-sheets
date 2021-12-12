// import SlideOverTypes from '../../../utils/SlideOverTypes';
// import ModalTypes from '../../../utils/ModalTypes';
// import { capitalize } from '../../../utils/strings';

import ListItem from '../../shared/ListItem';
import DescriptionList from '../../shared/DescriptionList';

const Player = ({ player, condensed, noButtonPanel }) => {
  if (condensed === 'view') {
    return 'view';
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem
      heading={player.playerName}
      noButtonPanel={noButtonPanel}
      // editable={{ type: SlideOverTypes.wearableForm, id: wearable._id }}
      // deletable={{
      //   type: ModalTypes.deleteResource,
      //   id: wearable._id,
      //   data: { type: 'wearables', title: `Are you sure you want to delete ${wearable.name}?`, submitText: `Yes, delete ${wearable.name}`, equipped: wearable.equipped },
      // }}
    >
      <DescriptionList list={[{ name: 'Character Name', values: [player.characterName] }]} classes="mt-2" />
    </ListItem>
  );
};

export default Player;

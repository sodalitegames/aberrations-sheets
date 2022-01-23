// import SlideOverTypes from '../../../utils/SlideOverTypes';
// import ModalTypes from '../../../utils/ModalTypes';
// import { capitalize } from '../../../utils/strings';

import ListItem from '../../shared/data/ListItem';
import DescriptionList from '../../shared/data/DescriptionList';

const DisplayPlayer = ({ player, condensed, noButtonPanel }) => {
  if (condensed === 'view') {
    return 'view';
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem
      heading={player.playerNickname ? `${player.playerNickname} (${player.playerName})` : player.playerName}
      noButtonPanel={noButtonPanel}
      // editable={{ type: SlideOverTypes.wearableForm, id: wearable._id }}
      // deletable={{
      //   type: ModalTypes.deleteResource,
      //   id: wearable._id,
      //   data: { type: 'wearables', title: `Are you sure you want to delete ${wearable.name}?`, submitText: `Yes, delete ${wearable.name}`, equipped: wearable.equipped },
      // }}
    >
      <DescriptionList
        list={[
          { name: 'Character Name', values: [player.characterName] },
          { name: 'Character Power', values: [player.power] },
        ]}
        classes="mt-2"
      />
    </ListItem>
  );
};

export default DisplayPlayer;

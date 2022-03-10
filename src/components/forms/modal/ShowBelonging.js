import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { ModalContainer } from '../Modal';

import DisplayWeapon from '../../display/DisplayWeapon';
import DisplayWearable from '../../display/DisplayWearable';
import DisplayConsumable from '../../display/DisplayConsumable';
import DisplayUsable from '../../display/DisplayUsable';

const ShowBelonging = ({ id, data, nested }) => {
  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [belonging, setBelonging] = useState();

  useEffect(() => {
    if (data.sheetType === 'characters') {
      if (charSheet && id && data) {
        // set current belonging to view
        const currentBelonging = charSheet[data.belongingType].find(bel => bel._id === id);
        setBelonging(currentBelonging);
      }
    }

    if (data.sheetType === 'campaigns') {
      if (campSheet && id && data) {
        // set current belonging to view
        const currentBelonging = campSheet[data.belongingType].find(bel => bel._id === id);
        setBelonging(currentBelonging);
      }
    }

    if (data.sheetType === 'players') {
      if (campSheet && id && data) {
        // set current belonging to view
        const player = campSheet.players.find(player => player._id === data.playerId);
        const currentBelonging = player[data.belongingType].find(bel => bel._id === id);
        setBelonging(currentBelonging);
      }
    }
  }, [charSheet, campSheet, id, data]);

  return (
    <ModalContainer nested={nested}>
      {belonging ? (
        <>
          {data.belongingType === 'weapons' ? (
            <DisplayWeapon weapon={belonging} />
          ) : data.belongingType === 'wearables' ? (
            <DisplayWearable wearable={belonging} />
          ) : data.belongingType === 'consumables' ? (
            <DisplayConsumable consumable={belonging} />
          ) : data.belongingType === 'usables' ? (
            <DisplayUsable usable={belonging} />
          ) : null}
        </>
      ) : (
        'Loading belonging...'
      )}
    </ModalContainer>
  );
};

export default ShowBelonging;

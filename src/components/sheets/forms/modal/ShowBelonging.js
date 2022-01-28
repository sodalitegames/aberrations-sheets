import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { ModalContainer } from '../../../../layouts/components/app/Modal';

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
        const currentBelonging = charSheet[data.resourceType].find(bel => bel._id === id);
        setBelonging(currentBelonging);
      }
    }

    if (data.sheetType === 'campaigns') {
      if (campSheet && id && data) {
        // set current belonging to view
        const currentBelonging = campSheet[data.resourceType].find(bel => bel._id === id);
        setBelonging(currentBelonging);
      }
    }
  }, [charSheet, campSheet, id, data]);

  return (
    <ModalContainer nested={nested}>
      {belonging ? (
        <>
          {data.resourceType === 'weapons' ? (
            <DisplayWeapon weapon={belonging} />
          ) : data.resourceType === 'wearables' ? (
            <DisplayWearable wearable={belonging} />
          ) : data.resourceType === 'consumables' ? (
            <DisplayConsumable consumable={belonging} />
          ) : data.resourceType === 'usables' ? (
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

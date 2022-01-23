import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { ModalContainer } from '../../../../layouts/components/app/Modal';

import DisplayWeapon from '../../display/DisplayWeapon';
import Wearable from '../../../characters/display/Wearable';
import Consumable from '../../../characters/display/Consumable';
import Usable from '../../../characters/display/Usable';

const ShowBelonging = ({ id, data }) => {
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
    <ModalContainer>
      {belonging ? (
        <ul className="-my-5 mt-2 divide-y divide-gray-200">
          {data.resourceType === 'weapons' ? (
            <DisplayWeapon weapon={belonging} noButtonPanel />
          ) : data.resourceType === 'wearables' ? (
            <Wearable wearable={belonging} noButtonPanel />
          ) : data.resourceType === 'consumables' ? (
            <Consumable consumable={belonging} noButtonPanel />
          ) : data.resourceType === 'usables' ? (
            <Usable usable={belonging} noButtonPanel />
          ) : null}
        </ul>
      ) : (
        'Loading belonging...'
      )}
    </ModalContainer>
  );
};

export default ShowBelonging;

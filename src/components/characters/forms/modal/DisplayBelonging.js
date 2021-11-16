import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';

import { ModalContainer } from '../../../../layouts/components/app/Modal';

import Weapon from '../../display/Weapon';
import Wearable from '../../display/Wearable';
import Consumable from '../../display/Consumable';
import Usable from '../../display/Usable';

const DisplayBelonging = ({ id, data }) => {
  const charSheet = useRecoilValue(charSheetState);

  const [belonging, setBelonging] = useState();

  useEffect(() => {
    if (charSheet && id && data) {
      // set current belonging to view
      const currentBelonging = charSheet[data.type].find(bel => bel._id === id);
      setBelonging(currentBelonging);
    }
  }, [charSheet, id, data]);

  return (
    <ModalContainer>
      {belonging ? (
        <ul className="-my-5 mt-2 divide-y divide-gray-200">
          {data.type === 'weapons' ? (
            <Weapon weapon={belonging} noButtonPanel />
          ) : data.type === 'wearables' ? (
            <Wearable wearable={belonging} noButtonPanel />
          ) : data.type === 'consumables' ? (
            <Consumable consumable={belonging} noButtonPanel />
          ) : data.type === 'usables' ? (
            <Usable usable={belonging} noButtonPanel />
          ) : null}
        </ul>
      ) : (
        'Loading belonging...'
      )}
    </ModalContainer>
  );
};

export default DisplayBelonging;

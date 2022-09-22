import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

const ReceiveMoney = ({ data: { type, playerId, npcId } }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [amount, setAmount] = useState(0);

  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    switch (type) {
      case 'character':
        setSheet(charSheet);
        return;
      case 'player':
        const player = campSheet.players.find(player => player._id === playerId);
        setSheet(player);
        return;
      case 'npc':
        const npc = campSheet.npcs.find(npc => npc._id === npcId);
        setSheet(npc);
        return;
      default:
        return;
    }
  }, [charSheet, campSheet, type, playerId, npcId]);

  const submitHandler = async e => {
    e.preventDefault();

    switch (type) {
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
            sheet._id,
            { wallet: sheet.wallet + +amount },
            { forPlayer: true, modal: true, notification: { status: 'success', heading: 'Money Received', message: `You have successfully received ${amount} monies.` } }
          )
        );
        return;
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            charSheet._id,
            { wallet: charSheet.wallet + +amount },
            { modal: true, notification: { status: 'success', heading: 'Money Received', message: `You have successfully received ${amount} monies.` } }
          )
        );
        return;
      case 'npc':
        dispatch(
          updateSheetResourceStart(
            'campaigns',
            campSheet._id,
            'npcs',
            npcId,
            { wallet: sheet.wallet + +amount },
            { modal: true, notification: { status: 'success', heading: 'Money Received', message: `You have successfully received ${amount} monies.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Receive Money" submitText={`Receive ${amount} monies`} submitHandler={submitHandler}>
      <Input label="How much money?" name="amount" type="number" value={amount} changeHandler={setAmount} />
    </ModalForm>
  );
};

export default ReceiveMoney;

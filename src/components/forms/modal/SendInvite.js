import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';

const SendInvite = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const [campaignName, setCampaignName] = useState('');
  const [ccName, setCcName] = useState('');
  const [charId, setCharId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCampaignName(campSheet.name);
    setCcName(campSheet.ccNickname || campSheet.ccName);
  }, [campSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(
      createSheetResourceStart(
        'campaigns',
        campSheet._id,
        'invites',
        { campaignName, ccName, charSheetId: charId, message },
        { modal: true, notification: { status: 'success', heading: 'Invite Sent', message: `You have successfully sent an invite to character #${charId}` } }
      )
    );
  };

  return (
    <ModalForm title="Send Campaign Invitation" submitText="Send Invitation" submitHandler={submitHandler}>
      <Input label="Campaign Name" name="campaignName" type="text" value={campaignName} changeHandler={setCampaignName} />
      <Input label="CC Name" name="ccName" type="text" value={ccName} changeHandler={setCcName} />
      <Input label="Character Id" name="charId" type="text" value={charId} changeHandler={setCharId} />
      <TextArea label="Message (Opt.)" name="message" rows={8} value={message} changeHandler={setMessage} />
    </ModalForm>
  );
};

export default SendInvite;

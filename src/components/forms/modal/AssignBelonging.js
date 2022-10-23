import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { getBelongingTypeCapitalized } from '../../../utils/helpers/belongings';

import { ModalForm } from '../Modal';

import ListContainer from '../../data/ListContainer';
import Select from '../elements/Select';

import DisplayNpc from '../../display/DisplayNpc';

const AssignBelonging = ({ id, data }) => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const [npc, setNpc] = useState(null);
  const [npcId, setNpcId] = useState('');

  useEffect(() => {
    if (npcId) {
      setNpc(campSheet.npcs.find(npc => npc._id === npcId));
      return;
    }

    setNpc(null);
  }, [npcId, campSheet]);

  const selectNpc = e => {
    if (!e.target.value) return setNpcId('');
    setNpcId(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!npcId) alert('You must select an Npc');
    if (!npc) alert('You must select an Npc');

    dispatch(
      updateSheetResourceStart(
        'campaigns',
        campSheet._id,
        data.type,
        id,
        { npcId: npcId },
        {
          modal: true,
          notification: {
            status: 'success',
            heading: `${getBelongingTypeCapitalized(data.type)} Assigned`,
            message: `You have successfully assigned ${data.name} to ${npc?.name}.`,
          },
        }
      )
    );
  };

  return (
    <ModalForm title={`Assign ${data.name}`} submitText={`Assign ${data.name} ${npc ? `to ${npc.name}` : ''}`} submitHandler={submitHandler} submitDisabled={!npcId}>
      <Select label="Assign to Npc" name="npcId" value={npcId} options={campSheet.npcs.filter(npc => npc.active).map(npc => ({ name: npc.name, id: npc._id }))} changeHandler={selectNpc} required />
      {npc ? (
        <ListContainer classes="mt-4">
          <DisplayNpc key={npc._id} npc={npc} condensed listItem />
        </ListContainer>
      ) : null}
    </ModalForm>
  );
};

export default AssignBelonging;

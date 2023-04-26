import { useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { ModalForm } from '../Modal';

import { capitalize } from '../../../utils/helpers/strings';
import { ResourceType, getResourceLabel } from '../../../utils/helpers/resources';

import ListContainer from '../../data/ListContainer';
import Select from '../elements/Select';

import DisplayNpc from '../../display/DisplayNpc';

import { Belonging, BelongingType, SheetResourceType, SheetType } from '../../../models/sheet';
import { FetchedResourceType, Species } from '../../../models/resource';
import { Weapon } from '../../../models/sheet/resources';

interface Props {
  data: {
    belongingType: BelongingType;
    belonging: Belonging;
  };
}

const AssignBelonging: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign)!;

  const species = useResource(FetchedResourceType.Species) as Species[];

  const [npcId, setNpcId] = useState('');

  const npc = campSheet.npcs.find(npc => npc._id === npcId) || null;

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!npcId) return alert('You must select an Npc');
    if (!npc) return alert('You must select an Npc');

    dispatch(
      updateSheetResourceStart(
        SheetType.campaigns,
        campSheet._id,
        SheetResourceType[data.belongingType],
        data.belonging._id,
        { npcId: npcId },
        {
          modal: true,
          notification: {
            status: 'success',
            heading: `${capitalize(getResourceLabel(ResourceType[data.belongingType]))} Assigned`,
            message: `You have successfully assigned ${data.belonging.name} to ${npc.name}.`,
          },
        }
      )
    );
  };

  return (
    <ModalForm
      title={`Assign ${(data.belonging as Weapon).nickname || data.belonging.name}`}
      submitText={`Assign ${(data.belonging as Weapon).nickname || data.belonging.name} ${npc ? `to ${npc.name}` : ''}`}
      submitHandler={submitHandler}
      submitDisabled={!npcId}
    >
      <Select label="Assign to Npc" name="npcId" value={npcId} options={campSheet.npcs.filter(npc => npc.active).map(npc => ({ name: npc.name, id: npc._id }))} changeHandler={setNpcId} required />
      {npc ? (
        <ListContainer list={[npc]} classes="mt-4">
          <DisplayNpc key={npc._id} npc={npc} species={species} condensed listItem />
        </ListContainer>
      ) : null}
    </ModalForm>
  );
};

export default AssignBelonging;

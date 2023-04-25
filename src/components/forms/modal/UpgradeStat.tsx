import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Notice, { NoticeStatus } from '../../Notice';

import { SheetEntity, SheetEntityType, SheetResourceType, SheetType, StatType } from '../../../models/sheet';
import { Npc } from '../../../models/sheet/resources';

interface Props {
  data: {
    stat: StatType;
    entityType: SheetEntityType;
    entity: SheetEntity;
  };
}

const UpgradeStat: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (data.entity.experience < data.entity[data.stat].die) {
      alert('You do not have enough experience to upgrade this stat.');
      return;
    }

    if (data.entity[data.stat].die === 20) {
      alert('You cannot upgrade this stat any further.');
      return;
    }

    let body = {
      experience: data.entity.experience - data.entity[data.stat].die,
      [data.stat]: { die: +data.entity[data.stat].die + 2 },
    };

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(SheetType.characters, data.entity._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stat Upgraded', message: `You have successfully upgraded your ${data.stat} stat.` },
          })
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(SheetType.characters, data.entity._id, body, {
            forPlayer: true,
            modal: true,
            notification: { status: 'success', heading: 'Stat Upgraded', message: `You have successfully upgraded your player's ${data.stat} stat.` },
          })
        );
        return;
      case 'npcs':
        dispatch(
          updateSheetResourceStart(SheetType.campaigns, (data.entity as Npc).sheetId, SheetResourceType.npcs, data.entity._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stat Upgraded', message: `You have successfully upgraded your ${data.stat} stat.` },
          })
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Upgrade Health" submitText={`Submit Upgrade`} submitDisabled={data.entity.experience < data.entity[data.stat].die} submitHandler={submitHandler}>
      {data.entity.experience >= data.entity[data.stat].die ? (
        <div className="mt-2 space-y-4">
          <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
            Upgrade your {data.stat} die for {data.entity[data.stat].die} experience?
          </p>{' '}
        </div>
      ) : (
        <Notice noIcon status={NoticeStatus.Error} message="You do not have enough experience to upgrade this stat." />
      )}
    </ModalForm>
  );
};

export default UpgradeStat;

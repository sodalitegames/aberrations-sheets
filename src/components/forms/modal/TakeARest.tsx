import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';
import { correctCurrentHp } from '../../../utils/functions/updateHealth';

import { ModalForm } from '../Modal';

import Select from '../elements/Select';
import Notice, { NoticeStatus } from '../../Notice';

import { SheetEntity, SheetEntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Npc } from '../../../models/sheet/resources';

interface Props {
  data: {
    entityType: SheetEntityType;
    entity: SheetEntity;
  };
}

const TakeARest: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [rest, setRest] = useState('');
  const [actions, setActions] = useState<string[]>([]);

  const selectRest = (id: string) => {
    if (id === 'slumber') {
      let actionsArr = [`You'll Recover all your health points`, `All points in Injured will be removed`];
      setActions(actionsArr);
    }

    if (id === 'nap') {
      setActions([`You will recover ${Math.floor(data.entity.maxHp / 2)} health`, `1 point in Injured will be removed`]);
    }

    setRest(id);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (rest === 'slumber') {
      switch (data.entityType) {
        case 'players':
          dispatch(
            updateSheetStart(
              SheetType.characters,
              data.entity._id,
              {
                currentHp: data.entity.maxHp,
                conditions: { ...data.entity.conditions, injured: 0 },
              },
              { forPlayer: true, modal: true, notification: { status: 'success', heading: 'Rest Taken', message: `You have successfully taken a ${rest}.` } }
            )
          );
          return;
        case 'characters':
          dispatch(
            updateSheetStart(
              SheetType.characters,
              data.entity._id,
              {
                currentHp: data.entity.maxHp,
                conditions: { ...data.entity.conditions, injured: 0 },
              },
              { modal: true, notification: { status: 'success', heading: 'Rest Taken', message: `You have successfully taken a ${rest}.` } }
            )
          );
          return;
        case 'npcs':
          dispatch(
            updateSheetResourceStart(
              SheetType.campaigns,
              (data.entity as Npc).sheetId,
              SheetResourceType.npcs,
              data.entity._id,
              {
                currentHp: data.entity.maxHp,
                conditions: { ...data.entity.conditions, injured: 0 },
              },
              { modal: true, notification: { status: 'success', heading: 'Rest Taken', message: `You have successfully taken a ${rest}.` } }
            )
          );
          return;
        default:
          return;
      }
    }

    if (rest === 'nap') {
      let injured = data.entity.conditions.injured === 0 ? 0 : data.entity.conditions.injured - 1;

      switch (data.entityType) {
        case 'players':
          dispatch(
            updateSheetStart(
              SheetType.characters,
              data.entity._id,
              {
                currentHp: correctCurrentHp(data.entity.currentHp + Math.floor(data.entity.maxHp / 2), data.entity.maxHp),
                conditions: { ...data.entity.conditions, injured },
              },
              { forPlayer: true, modal: true, notification: { status: 'success', heading: 'Rest Taken', message: `You have successfully taken a ${rest}.` } }
            )
          );

          return;
        case 'characters':
          dispatch(
            updateSheetStart(
              SheetType.characters,
              data.entity._id,
              {
                currentHp: correctCurrentHp(data.entity.currentHp + Math.floor(data.entity.maxHp / 2), data.entity.maxHp),
                conditions: { ...data.entity.conditions, injured },
              },
              { modal: true, notification: { status: 'success', heading: 'Rest Taken', message: `You have successfully taken a ${rest}.` } }
            )
          );

          return;
        case 'npcs':
          dispatch(
            updateSheetResourceStart(
              SheetType.campaigns,
              (data.entity as Npc).sheetId,
              SheetResourceType.npcs,
              data.entity._id,
              {
                currentHp: correctCurrentHp(data.entity.currentHp + Math.floor(data.entity.maxHp / 2), data.entity.maxHp),
                conditions: { ...data.entity.conditions, injured },
              },
              { modal: true, notification: { status: 'success', heading: 'Rest Taken', message: `You have successfully taken a ${rest}.` } }
            )
          );
          return;
        default:
          return;
      }
    }
  };

  return (
    <ModalForm title="Take a Rest" submitText={`Take a ${rest ? capitalize(rest) : 'Rest'}`} submitDisabled={!rest} submitHandler={submitHandler}>
      <Select
        label="How long is your rest?"
        name="rest"
        value={rest}
        options={[
          { name: 'Slumber (8+ hours)', id: 'slumber' },
          { name: 'Nap (1 - 7 hours)', id: 'nap' },
        ]}
        changeHandler={selectRest}
        required
      />

      {rest && actions.length && (
        <Notice
          noIcon
          status={NoticeStatus.Info}
          heading={`If you take this ${capitalize(rest)}, your character sheet will be automatically updated with the following changes:`}
          message={actions}
          classes="mt-6"
        />
      )}
    </ModalForm>
  );
};

export default TakeARest;

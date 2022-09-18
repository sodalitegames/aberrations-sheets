import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Notice from '../../Notice';

const UpgradeStat = ({ id, data }) => {
  const dispatch = useDispatch();

  const submitHandler = async e => {
    e.preventDefault();

    if (data.resource.experience < data.resource[id].die) {
      alert('You do not have enough experience to upgrade this stat.');
      return;
    }

    if (data.resource[id].die === 20) {
      alert('You cannot upgrade this stat any further.');
      return;
    }

    let body = {
      experience: data.resource.experience - data.resource[id].die,
      [id]: { die: +data.resource[id].die + 2 },
    };

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart('characters', data.resource._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stat Upgraded', message: `You have successfully upgraded your ${id} stat.` },
          })
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart('characters', data.resource._id, body, {
            forPlayer: true,
            modal: true,
            notification: { status: 'success', heading: 'Stat Upgraded', message: `You have successfully upgraded your player's ${id} stat.` },
          })
        );
        return;
      case 'npc':
        dispatch(
          updateSheetResourceStart('campaigns', data.resource.sheetId, 'npcs', data.resource._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stat Upgraded', message: `You have successfully upgraded your ${id} stat.` },
          })
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Upgrade Health" submitText={`Submit Upgrade`} submitDisabled={data.resource.experience < data.resource[id].die} submitHandler={submitHandler}>
      {data.resource.experience >= data.resource[id].die ? (
        <div className="mt-2 space-y-4">
          <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
            Upgrade your {id} die for {data.resource[id].die} experience?
          </p>{' '}
        </div>
      ) : (
        <Notice noIcon status="error" message="You do not have enough experience to upgrade this stat." />
      )}
    </ModalForm>
  );
};

export default UpgradeStat;

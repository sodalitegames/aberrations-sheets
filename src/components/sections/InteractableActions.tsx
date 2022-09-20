import { Fragment } from 'react';

import { useActions } from '../../hooks/useActions';

import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';

import Button from '../Button';

interface BelongingActionsProps {
  type: 'npc' | 'player' | 'creature';
  id: {
    prop: 'npcId' | 'playerId' | 'creatureId';
    value: string;
  };
}

const InteractableActions: React.VFC<BelongingActionsProps> = ({ type, id }) => {
  const { setModal, setSlideOver } = useActions();

  return (
    <Fragment>
      <Button onClick={() => setSlideOver({ type: SlideOverTypes.rollDice, data: { type: type, [id.prop]: id.value } })}>Roll Dice</Button>
      <Button onClick={() => setModal({ type: ModalTypes.takeDamage, data: { type: type, [id.prop]: id.value } })}>Take Damage</Button>
      <Button onClick={() => setModal({ type: ModalTypes.healDamage, data: { type: type, [id.prop]: id.value } })}>Heal Damage</Button>

      {(type === 'player' || type === 'npc') && (
        <Fragment>
          <Button onClick={() => setModal({ type: ModalTypes.payMoney, data: { type: type, [id.prop]: id.value } })}>Pay Money</Button>
          <Button onClick={() => setModal({ type: ModalTypes.receiveMoney, data: { type: type, [id.prop]: id.value } })}>Recieve Money</Button>
          <Button onClick={() => setModal({ type: ModalTypes.takeARest, data: { type: type, [id.prop]: id.value } })}>Take A Rest</Button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default InteractableActions;

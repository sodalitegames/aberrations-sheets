import { Fragment } from 'react';

import { useActions } from '../../hooks/useActions';
import { Creature, Npc, Player } from '../../models/sheet/resources';

import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';

import Button from '../Button';

interface InteractableActionsProps {
  type: 'npc' | 'player' | 'creature';
  id: {
    prop: 'npcId' | 'playerId' | 'creatureId';
    value: string;
  };
  entity: Player | Npc | Creature;
}

const InteractableActions: React.VFC<InteractableActionsProps> = ({ type, id, entity }) => {
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
          <Button onClick={() => setModal({ type: ModalTypes.reachMilestone, data: { type: type, [id.prop]: id.value, entity } })}>Reach Milestone</Button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default InteractableActions;

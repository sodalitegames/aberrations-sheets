import { Fragment } from 'react';

import { useActions } from '../../hooks/useActions';

import { Entity, EntityType } from '../../models/sheet';

import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';

import Button from '../Button';

interface InteractableActionsProps {
  type: EntityType;
  entity: Entity;
}

const InteractableActions: React.VFC<InteractableActionsProps> = ({ type, entity }) => {
  const { setModal, setSlideOver } = useActions();

  return (
    <Fragment>
      <Button onClick={() => setSlideOver({ type: SlideOverTypes.rollDice })}>Roll Dice</Button>
      <Button onClick={() => setSlideOver({ type: SlideOverTypes.rollStat, data: { entityType: type, entityId: entity._id } })}>Roll Stat</Button>

      <Button onClick={() => setModal({ type: ModalTypes.takeDamage, data: { entityType: type, entity } })}>Take Damage</Button>
      <Button onClick={() => setModal({ type: ModalTypes.healDamage, data: { entityType: type, entity } })}>Heal Damage</Button>

      {(type === 'players' || type === 'npcs') && (
        <Fragment>
          <Button onClick={() => setModal({ type: ModalTypes.payMoney, data: { entityType: type, entity } })}>Pay Money</Button>
          <Button onClick={() => setModal({ type: ModalTypes.receiveMoney, data: { entityType: type, entity } })}>Recieve Money</Button>
          <Button onClick={() => setModal({ type: ModalTypes.takeARest, data: { entityType: type, entity } })}>Take A Rest</Button>
          <Button onClick={() => setModal({ type: ModalTypes.reachMilestone, data: { entityType: type, entity } })}>Reach Milestone</Button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default InteractableActions;

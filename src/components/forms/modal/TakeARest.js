import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';
import { correctCurrentHp } from '../../../utils/functions/updateHealth';

import { ModalForm } from '../Modal';

import Select from '../elements/Select';
import Notice from '../../Notice';

const TakeARest = ({ data: { type, playerId, npcId } }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [rest, setRest] = useState('');
  const [actions, setActions] = useState([]);

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

  const selectRest = e => {
    if (!e.target.value) return setRest('');
    setRest(e.target.value);

    if (e.target.value === 'slumber') {
      let actionsArr = [`You'll Recover all your health points`, `All points in Injured and Disturbed will be removed`];
      setActions(actionsArr);
    }

    if (e.target.value === 'nap') {
      setActions([`You will recover ${Math.floor(sheet.maxHp / 2)} health`, `1 point in Injured and 1 point in Disturbed will be removed`]);
    }
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (rest === 'slumber') {
      switch (type) {
        case 'player':
          dispatch(
            updateSheetStart(
              'characters',
              playerId,
              {
                currentHp: sheet.maxHp,
                conditions: { ...sheet.conditions, injured: 0, disturbed: 0 },
              },
              { forPlayer: true, modal: true, notification: { status: 'success', heading: 'Rest Taken', message: `You have successfully taken a ${rest}.` } }
            )
          );
          return;
        case 'character':
          dispatch(
            updateSheetStart(
              'characters',
              charSheet._id,
              {
                currentHp: charSheet.maxHp,
                conditions: { ...charSheet.conditions, injured: 0, disturbed: 0 },
              },
              { modal: true, notification: { status: 'success', heading: 'Rest Taken', message: `You have successfully taken a ${rest}.` } }
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
              {
                currentHp: sheet.maxHp,
                conditions: { ...sheet.conditions, injured: 0, disturbed: 0 },
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
      let newInjured = sheet.conditions.injured - 1;
      let newDisturbed = sheet.conditions.disturbed - 1;

      // Hardcore mode: correctCurrentHp(sheet.currentHp + Math.floor((sheet.fortitude.points + sheet.fortitude.modifier) / 2), sheet.maxHp)

      switch (type) {
        case 'player':
          dispatch(
            updateSheetStart(
              'characters',
              playerId,
              {
                currentHp: correctCurrentHp(sheet.currentHp + Math.floor(sheet.maxHp / 2), sheet.maxHp),
                conditions: { ...sheet.conditions, injured: newInjured < 0 ? 0 : newInjured, disturbed: newDisturbed < 0 ? 0 : newDisturbed },
                fortitude: { ...sheet.fortitude, advantage: 0 },
                agility: { ...sheet.agility, advantage: 0 },
                persona: { ...sheet.persona, advantage: 0 },
                aptitude: { ...sheet.aptitude, advantage: 0 },
              },
              { modal: true, notification: { status: 'success', heading: 'Rest Taken', message: `You have successfully taken a ${rest}.` } }
            )
          );

          return;
        case 'character':
          dispatch(
            updateSheetStart(
              'characters',
              charSheet._id,
              {
                currentHp: correctCurrentHp(charSheet.currentHp + Math.floor(charSheet.maxHp / 2), charSheet.maxHp),
                conditions: { ...charSheet.conditions, injured: newInjured < 0 ? 0 : newInjured, disturbed: newDisturbed < 0 ? 0 : newDisturbed },
                fortitude: { ...charSheet.fortitude, advantage: 0 },
                agility: { ...charSheet.agility, advantage: 0 },
                persona: { ...charSheet.persona, advantage: 0 },
                aptitude: { ...charSheet.aptitude, advantage: 0 },
              },
              { modal: true, notification: { status: 'success', heading: 'Rest Taken', message: `You have successfully taken a ${rest}.` } }
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
              {
                currentHp: correctCurrentHp(sheet.currentHp + Math.floor(sheet.maxHp / 2), sheet.maxHp),
                conditions: { ...sheet.conditions, injured: newInjured < 0 ? 0 : newInjured, disturbed: newDisturbed < 0 ? 0 : newDisturbed },
                fortitude: { ...sheet.fortitude, advantage: 0 },
                agility: { ...sheet.agility, advantage: 0 },
                persona: { ...sheet.persona, advantage: 0 },
                aptitude: { ...sheet.aptitude, advantage: 0 },
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
    <ModalForm title="Take a Rest" submitText={`Take my ${rest ? capitalize(rest) : 'rest'}`} submitHandler={submitHandler}>
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

      {rest && actions.length ? (
        <Notice
          noIcon
          status="info"
          heading={`If you take this ${capitalize(rest)}, your character sheet will be automatically updated with the following changes:`}
          message={actions}
          classes="mt-6"
        />
      ) : null}
    </ModalForm>
  );
};

export default TakeARest;

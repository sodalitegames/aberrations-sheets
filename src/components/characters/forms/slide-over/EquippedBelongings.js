import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart, updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../../utils/strings';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Row from '../../../shared/Row';
import { SelectInput } from '../../../shared/Select';

import DisplayWeapon from '../../../sheets/display/DisplayWeapon';
import DisplayConsumable from '../../../sheets/display/DisplayConsumable';
import DisplayUsable from '../../../sheets/display/DisplayUsable';

const EquippedBelongings = ({ id }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [belongingsList, setBelongingsList] = useState([]);

  const [equipped1, setEquipped1] = useState();
  const [equipped2, setEquipped2] = useState();
  const [equipped3, setEquipped3] = useState();

  useEffect(() => {
    if (id && charSheet) {
      // create the full belongings list
      const fullList = charSheet[id].map(bel => ({ name: bel.name, id: bel._id }));

      // set belongings list
      setBelongingsList(fullList);

      // if wearables, don't do anything
      // wearables equip form is in another file
      if (id === 'wearables') {
        return;
      }

      // set already equipped belongings
      if (charSheet.equipped[id].one) {
        // set equipped 1
        const equipped1 = charSheet[id].find(bel => bel._id === charSheet.equipped[id].one);
        setEquipped1(equipped1);
      }

      if (charSheet.equipped[id].two) {
        // set equipped 2
        const equipped2 = charSheet[id].find(bel => bel._id === charSheet.equipped[id].two);
        setEquipped2(equipped2);
      }

      if (id === 'consumables' || id === 'usables') {
        if (charSheet.equipped[id].three) {
          // set equipped 3
          const equipped3 = charSheet[id].find(bel => bel._id === charSheet.equipped[id].three);
          setEquipped3(equipped3);
        }
      }
    }
  }, [id, charSheet]);

  const selectEquipped1 = e => {
    if (!e.target.value) return setEquipped1(null);
    const equipped1 = charSheet[id].find(bel => bel._id === e.target.value);
    setEquipped1(equipped1);
  };

  const selectEquipped2 = e => {
    if (!e.target.value) return setEquipped2(null);
    const equipped2 = charSheet[id].find(bel => bel._id === e.target.value);
    setEquipped2(equipped2);
  };

  const selectEquipped3 = e => {
    if (!e.target.value) return setEquipped3(null);
    const equipped3 = charSheet[id].find(bel => bel._id === e.target.value);
    setEquipped3(equipped3);
  };

  const submitHandler = async e => {
    e.preventDefault();

    let body = {};

    // if wearables, don't do anything
    // wearables equip form is in another file
    if (id === 'wearables') {
      return;
    }

    body.one = equipped1 ? equipped1._id : null;
    body.two = equipped2 ? equipped2._id : null;

    if (id === 'usables' || id === 'consumables') {
      body.three = equipped3 ? equipped3._id : null;
    }

    // if equipped 1 has changed, update the resource in the database
    if (body.one !== charSheet.equipped[id].one) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, id, body.one || charSheet.equipped[id].one, { equipped: body.one ? true : false }));
    }

    // if equipped 2 has changed, update the resource in the database
    if (body.two !== charSheet.equipped[id].two) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, id, body.two || charSheet.equipped[id].two, { equipped: body.two ? true : false }));
    }

    // if equipped 3 has changed, update the resource in the database
    if (id === 'usables' || id === 'consumables') {
      if (body.three !== charSheet.equipped[id].three) {
        dispatch(updateSheetResourceStart('characters', charSheet._id, id, body.three || charSheet.equipped[id].three, { equipped: body.three ? true : false }));
      }
    }

    // Update the character sheet in the database
    dispatch(updateSheetStart('characters', charSheet._id, { equipped: { ...charSheet.equipped, [id]: body } }));
  };

  return (
    <SlideOverForm
      title={`Manage equipped ${capitalize(id)}`}
      description={`Update the information below to edit your equipped ${capitalize(id)}.`}
      submitText="Save changes"
      submitHandler={submitHandler}
    >
      {id === 'weapons' ? (
        <>
          <Row slideOver name="weapon1" label="Equipped Weapon #1">
            <SelectInput name="weapon1" value={equipped1 ? equipped1._id : ''} options={belongingsList} changeHandler={selectEquipped1} />
            {equipped1 ? (
              <ul className="mt-3 divide-y divide-gray-200">
                <DisplayWeapon weapon={equipped1} noButtonPanel />
              </ul>
            ) : null}
          </Row>
          <Row slideOver name="weapon2" label="Equipped Weapon #2">
            <SelectInput name="weapon2" value={equipped2 ? equipped2._id : ''} options={belongingsList} changeHandler={selectEquipped2} />
            {equipped2 ? (
              <ul className="mt-3 divide-y divide-gray-200">
                <DisplayWeapon weapon={equipped2} noButtonPanel />
              </ul>
            ) : null}
          </Row>
        </>
      ) : id === 'consumables' ? (
        <>
          <Row slideOver name="consumable1" label="Equipped Consumable #1">
            <SelectInput name="consumable1" value={equipped1 ? equipped1._id : ''} options={belongingsList} changeHandler={selectEquipped1} />
            {equipped1 ? (
              <ul className="mt-3 divide-y divide-gray-200">
                <DisplayConsumable consumable={equipped1} noButtonPanel />
              </ul>
            ) : null}
          </Row>
          <Row slideOver name="consumable2" label="Equipped Consumable #2">
            <SelectInput name="consumable2" value={equipped2 ? equipped2._id : ''} options={belongingsList} changeHandler={selectEquipped2} />
            {equipped2 ? (
              <ul className="mt-3 divide-y divide-gray-200">
                <DisplayConsumable consumable={equipped2} noButtonPanel />
              </ul>
            ) : null}
          </Row>
          <Row slideOver name="consumable3" label="Equipped Consumable #3">
            <SelectInput name="consumable3" value={equipped3 ? equipped3._id : ''} options={belongingsList} changeHandler={selectEquipped3} />
            {equipped3 ? (
              <ul className="mt-3 divide-y divide-gray-200">
                <DisplayConsumable consumable={equipped3} noButtonPanel />
              </ul>
            ) : null}
          </Row>
        </>
      ) : id === 'usables' ? (
        <>
          <Row slideOver name="usable1" label="Equipped Usable #1">
            <SelectInput name="usable1" value={equipped1 ? equipped1._id : ''} options={belongingsList} changeHandler={selectEquipped1} />
            {equipped1 ? (
              <ul className="mt-3 divide-y divide-gray-200">
                <DisplayUsable usable={equipped1} noButtonPanel />
              </ul>
            ) : null}
          </Row>
          <Row slideOver name="usable2" label="Equipped Usable #2">
            <SelectInput name="usable2" value={equipped2 ? equipped2._id : ''} options={belongingsList} changeHandler={selectEquipped2} />
            {equipped2 ? (
              <ul className="mt-3 divide-y divide-gray-200">
                <DisplayUsable usable={equipped2} noButtonPanel />
              </ul>
            ) : null}
          </Row>
          <Row slideOver name="usable3" label="Equipped Usable #3">
            <SelectInput name="usable3" value={equipped3 ? equipped3._id : ''} options={belongingsList} changeHandler={selectEquipped3} />
            {equipped3 ? (
              <ul className="mt-3 divide-y divide-gray-200">
                <DisplayUsable usable={equipped3} noButtonPanel />
              </ul>
            ) : null}
          </Row>
        </>
      ) : null}
    </SlideOverForm>
  );
};

export default EquippedBelongings;

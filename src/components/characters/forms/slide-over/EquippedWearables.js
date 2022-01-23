import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart, updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Row from '../../../shared/form/Row';
import { SelectInput } from '../../../shared/form/Select';

import DisplayWearable from '../../../sheets/display/DisplayWearable';

const calculateStatMods = equippedWearables => {
  let fortitude = 0;
  let agility = 0;
  let persona = 0;
  let aptitude = 0;

  equippedWearables.forEach(wearable => {
    if (!wearable) return;

    const { fortitude: FOR, agility: AGL, persona: PER, aptitude: APT } = wearable.statMods;

    fortitude = fortitude + FOR;
    agility = agility + AGL;
    persona = persona + PER;
    aptitude = aptitude + APT;
  });

  // Maximum modifier amount is five
  if (fortitude > 5) fortitude = 5;
  if (agility > 5) agility = 5;
  if (persona > 5) persona = 5;
  if (aptitude > 5) aptitude = 5;

  // Minimum modifier amount if five
  if (fortitude < -5) fortitude = -5;
  if (agility < -5) agility = -5;
  if (persona < -5) persona = -5;
  if (aptitude < -5) aptitude = -5;

  return { fortitude, agility, persona, aptitude };
};

const EquippedWearables = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [headList, setHeadList] = useState([]);
  const [faceList, setFaceList] = useState([]);
  const [torsoList, setTorsoList] = useState([]);
  const [armsList, setArmsList] = useState([]);
  const [handsList, setHandsList] = useState([]);
  const [legsList, setLegsList] = useState([]);
  const [feetList, setFeetList] = useState([]);

  const [head, setHead] = useState();
  const [face, setFace] = useState();
  const [torso, setTorso] = useState();
  const [arms, setArms] = useState();
  const [hands, setHands] = useState();
  const [legs, setLegs] = useState();
  const [feet, setFeet] = useState();

  useEffect(() => {
    if (charSheet) {
      // create the belongings list's for each bodyArea
      const headList = charSheet.wearables.map(bel => (bel.bodyArea === 'head' ? { name: bel.name, id: bel._id } : null)).filter(bel => bel);
      setHeadList(headList);

      const faceList = charSheet.wearables.map(bel => (bel.bodyArea === 'face' ? { name: bel.name, id: bel._id } : null)).filter(bel => bel);
      setFaceList(faceList);

      const torsoList = charSheet.wearables.map(bel => (bel.bodyArea === 'torso' ? { name: bel.name, id: bel._id } : null)).filter(bel => bel);
      setTorsoList(torsoList);

      const armsList = charSheet.wearables.map(bel => (bel.bodyArea === 'arms' ? { name: bel.name, id: bel._id } : null)).filter(bel => bel);

      setArmsList(armsList);

      const handsList = charSheet.wearables.map(bel => (bel.bodyArea === 'hands' ? { name: bel.name, id: bel._id } : null)).filter(bel => bel);
      setHandsList(handsList);

      const legsList = charSheet.wearables.map(bel => (bel.bodyArea === 'legs' ? { name: bel.name, id: bel._id } : null)).filter(bel => bel);
      setLegsList(legsList);

      const feetList = charSheet.wearables.map(bel => (bel.bodyArea === 'feet' ? { name: bel.name, id: bel._id } : null)).filter(bel => bel);
      setFeetList(feetList);

      // set already equipped wearables
      if (charSheet.equipped.wearables.head) {
        // set equipped head
        const equippedHead = charSheet.wearables.find(bel => bel._id === charSheet.equipped.wearables.head);
        setHead(equippedHead);
      }

      if (charSheet.equipped.wearables.face) {
        // set equipped face
        const equippedFace = charSheet.wearables.find(bel => bel._id === charSheet.equipped.wearables.face);
        setFace(equippedFace);
      }

      if (charSheet.equipped.wearables.torso) {
        // set equipped torso
        const equippedTorso = charSheet.wearables.find(bel => bel._id === charSheet.equipped.wearables.torso);
        setTorso(equippedTorso);
      }

      if (charSheet.equipped.wearables.arms) {
        // set equipped arms
        const equippedArms = charSheet.wearables.find(bel => bel._id === charSheet.equipped.wearables.arms);
        setArms(equippedArms);
      }

      if (charSheet.equipped.wearables.hands) {
        // set equipped hands
        const equippedHands = charSheet.wearables.find(bel => bel._id === charSheet.equipped.wearables.hands);
        setHands(equippedHands);
      }

      if (charSheet.equipped.wearables.legs) {
        // set equipped legs
        const equippedLegs = charSheet.wearables.find(bel => bel._id === charSheet.equipped.wearables.legs);
        setLegs(equippedLegs);
      }

      if (charSheet.equipped.wearables.feet) {
        // set equipped feet
        const equippedFeet = charSheet.wearables.find(bel => bel._id === charSheet.equipped.wearables.feet);
        setFeet(equippedFeet);
      }
    }
  }, [charSheet]);

  const selectHead = e => {
    if (!e.target.value) return setHead(null);
    const head = charSheet.wearables.find(bel => bel._id === e.target.value);
    setHead(head);
  };

  const selectFace = e => {
    if (!e.target.value) return setFace(null);
    const face = charSheet.wearables.find(bel => bel._id === e.target.value);
    setFace(face);
  };

  const selectTorso = e => {
    if (!e.target.value) return setTorso(null);
    const torso = charSheet.wearables.find(bel => bel._id === e.target.value);
    setTorso(torso);
  };

  const selectArms = e => {
    if (!e.target.value) return setArms(null);
    const arms = charSheet.wearables.find(bel => bel._id === e.target.value);
    setArms(arms);
  };

  const selectHands = e => {
    if (!e.target.value) return setHands(null);
    const hands = charSheet.wearables.find(bel => bel._id === e.target.value);
    setHands(hands);
  };

  const selectLegs = e => {
    if (!e.target.value) return setLegs(null);
    const legs = charSheet.wearables.find(bel => bel._id === e.target.value);
    setLegs(legs);
  };

  const selectFeet = e => {
    if (!e.target.value) return setFeet(null);
    const feet = charSheet.wearables.find(bel => bel._id === e.target.value);
    setFeet(feet);
  };

  const submitHandler = async e => {
    e.preventDefault();

    const statMods = calculateStatMods([head, face, torso, arms, hands, legs, feet]);

    let body = {};

    body.head = head ? head._id : null;
    body.face = face ? face._id : null;
    body.torso = torso ? torso._id : null;
    body.arms = arms ? arms._id : null;
    body.hands = hands ? hands._id : null;
    body.legs = legs ? legs._id : null;
    body.feet = feet ? feet._id : null;

    // if head has changed, update the resource in the database
    if (body.head !== charSheet.equipped.wearables.head) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, 'wearables', body.head || charSheet.equipped.wearables.head, { equipped: body.head ? true : false }));
    }

    // if face has changed, update the resource in the database
    if (body.face !== charSheet.equipped.wearables.face) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, 'wearables', body.face || charSheet.equipped.wearables.face, { equipped: body.face ? true : false }));
    }

    // if torso has changed, update the resource in the database
    if (body.torso !== charSheet.equipped.wearables.torso) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, 'wearables', body.torso || charSheet.equipped.wearables.torso, { equipped: body.torso ? true : false }));
    }

    // if arms has changed, update the resource in the database
    if (body.arms !== charSheet.equipped.wearables.arms) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, 'wearables', body.arms || charSheet.equipped.wearables.arms, { equipped: body.arms ? true : false }));
    }

    // if hands has changed, update the resource in the database
    if (body.hands !== charSheet.equipped.wearables.hands) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, 'wearables', body.hands || charSheet.equipped.wearables.hands, { equipped: body.hands ? true : false }));
    }

    // if legs has changed, update the resource in the database
    if (body.legs !== charSheet.equipped.wearables.legs) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, 'wearables', body.legs || charSheet.equipped.wearables.legs, { equipped: body.legs ? true : false }));
    }

    // if feet has changed, update the resource in the database
    if (body.feet !== charSheet.equipped.wearables.feet) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, 'wearables', body.feet || charSheet.equipped.wearables.feet, { equipped: body.feet ? true : false }));
    }

    // Update the character sheet in the database
    dispatch(
      updateSheetStart('characters', charSheet._id, {
        fortitude: { ...charSheet.fortitude, modifier: statMods.fortitude },
        agility: { ...charSheet.agility, modifier: statMods.agility },
        persona: { ...charSheet.persona, modifier: statMods.persona },
        aptitude: { ...charSheet.aptitude, modifier: statMods.aptitude },
        equipped: { ...charSheet.equipped, wearables: body },
      })
    );
  };

  return (
    <SlideOverForm title="Manage equipped Wearables" description="Update the information below to edit your equipped wearables" submitText="Save changes" submitHandler={submitHandler}>
      <Row slideOver name="head" label="Head">
        <SelectInput name="head" value={head ? head._id : ''} options={headList} changeHandler={selectHead} />
        {head ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <DisplayWearable wearable={head} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="face" label="Face">
        <SelectInput name="face" value={face ? face._id : ''} options={faceList} changeHandler={selectFace} />
        {face ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <DisplayWearable wearable={face} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="torso" label="Torso">
        <SelectInput name="torso" value={torso ? torso._id : ''} options={torsoList} changeHandler={selectTorso} />
        {torso ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <DisplayWearable wearable={torso} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="arms" label="Arms">
        <SelectInput name="arms" value={arms ? arms._id : ''} options={armsList} changeHandler={selectArms} />
        {arms ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <DisplayWearable wearable={arms} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="hands" label="Hands">
        <SelectInput name="hands" value={hands ? hands._id : ''} options={handsList} changeHandler={selectHands} />
        {hands ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <DisplayWearable wearable={hands} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="legs" label="Legs">
        <SelectInput name="legs" value={legs ? legs._id : ''} options={legsList} changeHandler={selectLegs} />
        {legs ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <DisplayWearable wearable={legs} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="feet" label="Feet">
        <SelectInput name="feet" value={feet ? feet._id : ''} options={feetList} changeHandler={selectFeet} />
        {feet ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <DisplayWearable wearable={feet} noButtonPanel />
          </ul>
        ) : null}
      </Row>
    </SlideOverForm>
  );
};

export default EquippedWearables;

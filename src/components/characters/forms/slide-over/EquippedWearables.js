import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';
import { slideOverState } from '../../../../recoil/app/app.atoms';

import { updateSheet, updateResource } from '../../../../apis/sheets.api';

import { replaceItemById } from '../../../../utils/arrays';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Row from '../../../shared/Row';
import { SelectInput } from '../../../shared/Select';

import Wearable from '../../display/Wearable';

const EquippedWearables = () => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

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
      const response = await updateResource('characters', charSheet._id, 'wearables', body.head || charSheet.equipped.wearables.head, { equipped: body.head ? true : false });
      setCharSheet(oldCharSheet => {
        return { ...oldCharSheet, wearables: replaceItemById(oldCharSheet.wearables, body.head || charSheet.equipped.wearables.head, response.data.data.doc) };
      });
    }

    // if face has changed, update the resource in the database
    if (body.face !== charSheet.equipped.wearables.face) {
      const response = await updateResource('characters', charSheet._id, 'wearables', body.face || charSheet.equipped.wearables.face, { equipped: body.face ? true : false });
      setCharSheet(oldCharSheet => {
        return { ...oldCharSheet, wearables: replaceItemById(oldCharSheet.wearables, body.face || charSheet.equipped.wearables.face, response.data.data.doc) };
      });
    }

    // if torso has changed, update the resource in the database
    if (body.torso !== charSheet.equipped.wearables.torso) {
      const response = await updateResource('characters', charSheet._id, 'wearables', body.torso || charSheet.equipped.wearables.torso, { equipped: body.torso ? true : false });
      setCharSheet(oldCharSheet => {
        return { ...oldCharSheet, wearables: replaceItemById(oldCharSheet.wearables, body.torso || charSheet.equipped.wearables.torso, response.data.data.doc) };
      });
    }

    // if arms has changed, update the resource in the database
    if (body.arms !== charSheet.equipped.wearables.arms) {
      const response = await updateResource('characters', charSheet._id, 'wearables', body.arms || charSheet.equipped.wearables.arms, { equipped: body.arms ? true : false });
      setCharSheet(oldCharSheet => {
        return { ...oldCharSheet, wearables: replaceItemById(oldCharSheet.wearables, body.arms || charSheet.equipped.wearables.arms, response.data.data.doc) };
      });
    }

    // if hands has changed, update the resource in the database
    if (body.hands !== charSheet.equipped.wearables.hands) {
      const response = await updateResource('characters', charSheet._id, 'wearables', body.hands || charSheet.equipped.wearables.hands, { equipped: body.hands ? true : false });
      setCharSheet(oldCharSheet => {
        return { ...oldCharSheet, wearables: replaceItemById(oldCharSheet.wearables, body.hands || charSheet.equipped.wearables.hands, response.data.data.doc) };
      });
    }

    // if legs has changed, update the resource in the database
    if (body.legs !== charSheet.equipped.wearables.legs) {
      const response = await updateResource('characters', charSheet._id, 'wearables', body.legs || charSheet.equipped.wearables.legs, { equipped: body.legs ? true : false });
      setCharSheet(oldCharSheet => {
        return { ...oldCharSheet, wearables: replaceItemById(oldCharSheet.wearables, body.legs || charSheet.equipped.wearables.legs, response.data.data.doc) };
      });
    }

    // if feet has changed, update the resource in the database
    if (body.feet !== charSheet.equipped.wearables.feet) {
      const response = await updateResource('characters', charSheet._id, 'wearables', body.feet || charSheet.equipped.wearables.feet, { equipped: body.feet ? true : false });
      setCharSheet(oldCharSheet => {
        return { ...oldCharSheet, wearables: replaceItemById(oldCharSheet.wearables, body.feet || charSheet.equipped.wearables.feet, response.data.data.doc) };
      });
    }

    // Update the character sheet in the database
    const sheetResponse = await updateSheet('characters', charSheet._id, { equipped: { ...charSheet.equipped, wearables: body } });
    setCharSheet(oldCharSheet => {
      return { ...oldCharSheet, equipped: sheetResponse.data.data.sheet.equipped };
    });

    setSlideOver(null);
  };

  return (
    <SlideOverForm title="Manage equipped Wearables" description="Update the information below to edit your equipped wearables" submitText="Save edits" submitHandler={submitHandler}>
      <Row slideOver name="head" label="Head">
        <SelectInput name="head" value={head ? head._id : ''} options={headList} changeHandler={selectHead} />
        {head ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <Wearable wearable={head} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="face" label="Face">
        <SelectInput name="face" value={face ? face._id : ''} options={faceList} changeHandler={selectFace} />
        {face ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <Wearable wearable={face} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="torso" label="Torso">
        <SelectInput name="torso" value={torso ? torso._id : ''} options={torsoList} changeHandler={selectTorso} />
        {torso ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <Wearable wearable={torso} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="arms" label="Arms">
        <SelectInput name="arms" value={arms ? arms._id : ''} options={armsList} changeHandler={selectArms} />
        {arms ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <Wearable wearable={arms} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="hands" label="Hands">
        <SelectInput name="hands" value={hands ? hands._id : ''} options={handsList} changeHandler={selectHands} />
        {hands ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <Wearable wearable={hands} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="legs" label="Legs">
        <SelectInput name="legs" value={legs ? legs._id : ''} options={legsList} changeHandler={selectLegs} />
        {legs ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <Wearable wearable={legs} noButtonPanel />
          </ul>
        ) : null}
      </Row>
      <Row slideOver name="feet" label="Feet">
        <SelectInput name="feet" value={feet ? feet._id : ''} options={feetList} changeHandler={selectFeet} />
        {feet ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <Wearable wearable={feet} noButtonPanel />
          </ul>
        ) : null}
      </Row>
    </SlideOverForm>
  );
};

export default EquippedWearables;
